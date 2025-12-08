import { redirect } from "react-router";
import type { Route } from "./+types/home";

export async function clientLoader({ request }: Route.ClientActionArgs) {
  return redirect("/login");
};

export default function Home() {
    return (
        <>
        </>
    )
}