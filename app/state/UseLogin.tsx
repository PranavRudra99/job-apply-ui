import { create } from 'zustand'

type State = {
    userId: string | null
}

type Actions = {
  setCredentials: (userId: string) => void
  logout: () => void
}

export const useLogin = create<State & Actions>((set) => ({
  userId: null,
  setCredentials: (userId: string) => ({ userId : userId }),
  logout: () => ({ userId : null }),
}));