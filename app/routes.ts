import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("routes/redirect.tsx"),
    route("login", "routes/login.tsx"),
    route("signup", "routes/signup.tsx"),
    layout("layouts/global-layout.tsx", [
        route("home", "routes/home.tsx"),
        route("jobs", "routes/jobs.tsx"),
        route("network", "routes/network.tsx"),
        route("messages", "routes/messages.tsx"),
        route("notifications", "routes/notifications.tsx"),
    ]),
] satisfies RouteConfig;
