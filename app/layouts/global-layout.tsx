import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import Navbar from "~/components/navbar/navbar";
import { useLogin } from "~/state/UseLogin";

export default function GlobalLayout() {
    const { userId } = useLogin.getState();
    const navigate = useNavigate();
    useEffect(()=> {
        if(!userId){
            navigate("/login", {replace: true});
        }
    }, []);
    return (
        userId ? <div>
            <Navbar />
            <Outlet />
        </div> : <></>
    )
}