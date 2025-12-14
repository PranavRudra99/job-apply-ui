import { Outlet } from "react-router";
import Navbar from "~/components/navbar/navbar";

export default function GlobalLayout() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}