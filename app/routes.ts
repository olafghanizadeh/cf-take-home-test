import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    layout("routes/layout.tsx", [
        route("/", "routes/home.tsx"),
        ...prefix("/case", [
            route("/:id", "routes/case.tsx"),
            route("/create", "routes/case-create.tsx"),
        ]),
    ])
] satisfies RouteConfig;
