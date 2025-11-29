import React, { useState, useEffect, useCallback, useMemo, type JSX } from 'react';
import { RefreshCcw, Loader, Send, CheckCircle, XCircle, Clock } from 'lucide-react';

// --- CONSTANTS AND MOCK DATA STORE ---
// This array will simulate your Spring Backend's in-memory or database store.
// In a real application, the Spring Boot app would manage this data in a database (like Firestore or PostgreSQL).
let MOCK_JOB_DATA_STORE: Job[] = [];

interface Job {
  id: `${string}-${string}-${string}-${string}-${string}`;
  status: 'Pending' | 'In Progress' | 'Submitted' | 'Failed';
  url: string;
  jobTitle: string;
  attempts: number;
  log?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface JobInput {
  status: 'Pending' | 'In Progress' | 'Submitted' | 'Failed';
  url: string;
  jobTitle: string;
  attempts: number;
}

// --- Utility Functions ---

/**
 * Generates a unique, non-consecutive color based on the job status.
 * @param {string} status
 * @returns {string} Tailwind CSS class
 */
const getStatusClasses = (status: string): string => {
  switch (status) {
    case 'Submitted':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'Failed':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800 border-blue-300 animate-pulse';
    case 'Pending':
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

const getStatusIcon = (status: string): JSX.Element => {
  switch (status) {
    case 'Submitted':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'Failed':
      return <XCircle className="w-5 h-5 text-red-500" />;
    case 'In Progress':
      return <Loader className="w-5 h-5 text-blue-500 animate-spin" />;
    case 'Pending':
    default:
      return <Clock className="w-5 h-5 text-gray-500" />;
  }
};


// --- MOCK API FUNCTIONS (Simulating your Spring Backend Endpoints) ---

/**
 * Mock GET /api/jobs: Fetches all job listings.
 */
const mockFetchJobs = (): Promise<Job[]> => {
  // Simulate network delay
  return new Promise(resolve => setTimeout(() => {
    // Return a deep copy to prevent direct mutation of the store
    const sortedJobs: Job[] = [...MOCK_JOB_DATA_STORE].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    resolve(sortedJobs);
  }, 300));
};

/**
 * Mock POST /api/jobs: Adds a new job listing.
 * @param {object} job
 */
const mockAddJob = (job: JobInput) => {
  const newJob = {
    ...job,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Simulate server-side database insertion
  MOCK_JOB_DATA_STORE.push(newJob);

  // Simulate network delay
  return new Promise(resolve => setTimeout(() => {
    resolve({ message: "Job added successfully", job: newJob });
  }, 500));
};

/**
 * Mock POST /api/jobs/{id}/submit: Triggers the automation script.
 * NOTE: This mocks the Spring app's internal logic and database updates.
 * @param {string} jobId
 */
const mockTriggerAutomation = (jobId: Job["id"]) => {
  // Simulate the Spring App picking up the job and setting status to 'In Progress'
  const job = MOCK_JOB_DATA_STORE.find(j => j.id === jobId);
  if (!job) return Promise.reject(new Error("Job not found on server."));

  job.status = 'In Progress';
  job.updatedAt = new Date();

  // Simulate the long-running Selenium process (3-5 seconds)
  return new Promise(resolve => setTimeout(() => {
    // 3. Determine the result randomly (70% success rate for simulation)
    const success = Math.random() > 0.3;

    // 4. Update final status in the mock data store
    job.status = success ? 'Submitted' : 'Failed';
    job.updatedAt = new Date();
    job.attempts = (job.attempts || 0) + 1;
    job.log = success ? 'Application submitted successfully via automation script.' : 'Failed: CAPTCHA or Form Structure Change detected.';

    resolve({ message: `Submission finished with status: ${job.status}` });

  }, Math.random() * 2000 + 3000));
};

// --- Main Application Component ---
export const Welcome = () => {
  const [jobUrl, setJobUrl] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<String|null>(null);

  /**
   * Fetches the job list from the mock API (replacing the onSnapshot listener)
   */
  const fetchJobs = useCallback(async () => {
    try {
      const response = await mockFetchJobs();
      setJobs(response);
      setError(null);
    } catch (e) {
      console.error("API Error during job fetch:", e);
      setError("Failed to fetch jobs list from the API.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load and Polling setup
  useEffect(() => {
    // Initial fetch
    fetchJobs();

    // Set up polling (Fetch every 5 seconds) to simulate real-time updates
    const intervalId = setInterval(fetchJobs, 5000);

    // Cleanup function
    return () => clearInterval(intervalId);
  }, [fetchJobs]); // Re-run only if fetchJobs changes (it won't, due to useCallback)


  // Handler for adding a new job
  const handleAddJob = async () => {
    if (!jobUrl.trim()) return;

    // Simple URL validation
    if (!jobUrl.toLowerCase().includes('workday')) {
      // Replaced alert with custom error message
      setError("Please enter a valid Workday URL.");
      return;
    }

    const newJob: JobInput = {
      url: jobUrl.trim(),
      status: 'Pending', // Initial status
      attempts: 0,
      jobTitle: `Workday Listing ${new Date().toLocaleTimeString()}`, // Mock title
    };

    try {
      setJobUrl(''); // Clear input immediately
      setError(null);
      
      // Call the mock API POST /api/jobs
      await mockAddJob(newJob);

      // Trigger a refresh after a successful addition
      await fetchJobs();

    } catch (e) {
      console.error("API Error during job add: ", e);
      setError("Could not save job listing via API.");
    }
  };

  /**
   * Triggers the job submission via the mock API.
   * @param {object} job
   */
  const handleTriggerSubmission = useCallback(async (job: Job) => {
    // Prevent multiple submissions
    if (job.status === 'In Progress') return;

    try {
      setError(null);
      // Immediately update local state to reflect 'In Progress' for better UX
      setJobs(prevJobs => prevJobs.map(j => 
          j.id === job.id ? { ...j, status: 'In Progress', updatedAt: new Date() } : j
      ));

      // Call the mock API POST /api/jobs/{id}/submit
      await mockTriggerAutomation(job.id);

      // Trigger a refresh after the long-running simulation finishes
      await fetchJobs();

    } catch (e) {
      console.error("API Error during submission trigger:", e);
      setError(`Submission failed for job ${job.id}. Check console.`);
      // On failure, force a refresh to get the actual status from the "server"
      await fetchJobs();
    }
  }, [fetchJobs]);

  const numQueued = useMemo(() => jobs.length, [jobs]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader className="w-8 h-8 animate-spin text-indigo-500" />
        <span className="ml-3 text-lg font-medium text-gray-700">Loading Automation Manager via API...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2 flex items-center">
          <Send className="w-8 h-8 mr-2" /> Workday Automation Manager (API Client)
        </h1>
        <p className="text-sm text-gray-600 mb-6 border-b pb-4">
          This client interacts with your hypothetical Spring Boot API backend. The real-time updates from the server are simulated via a 5-second polling mechanism.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <p className="font-bold">Client Error:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Input Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Workday Job Listing (via POST /api/jobs)</h2>
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
            <input
              type="url"
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-gray-400 focus:text-gray-900"
              placeholder="Paste Workday Job URL here (e.g., https://wd5.myworkdayjobs.com/...)"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddJob()}
            />
            <button
              onClick={handleAddJob}
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-gray-700 transition duration-150 flex items-center justify-center disabled:bg-indigo-400"
              disabled={!jobUrl.trim() || !jobUrl.toLowerCase().includes('workday')}
            >
              <RefreshCcw className="w-5 h-5 mr-2" /> Queue Job
            </button>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            A valid URL must contain "workday" and will be submitted to the API.
          </p>
        </div>

        {/* Job Listings Table */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Queued Applications ({numQueued}) - Updated every 5s</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Job URL (Mock Title)</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Status</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Attempts</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Last Updated</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {numQueued === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500 italic">No job listings queued yet.</td>
                  </tr>
                ) : (
                  jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50 transition duration-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {job.jobTitle}
                        <p className="text-xs text-indigo-500 truncate mt-1">
                            <a href={job.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                {job.url}
                            </a>
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${getStatusClasses(job.status)}`}>
                          {getStatusIcon(job.status)}
                          <span className="ml-1">{job.status}</span>
                        </span>
                        {job.status === 'Failed' && job.log && (
                             <p className="text-xs text-red-500 mt-1 italic max-w-xs mx-auto truncate" title={job.log}>
                                {job.log}
                            </p>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                        {job.attempts}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                        {job.updatedAt.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          onClick={() => handleTriggerSubmission(job)}
                          disabled={job.status === 'In Progress'}
                          className="px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 disabled:bg-gray-400 transition duration-150"
                        >
                          {job.status === 'In Progress' ? 'Running...' : 'Run Automation'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;