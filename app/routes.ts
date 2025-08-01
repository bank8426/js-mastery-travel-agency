import {
  type RouteConfig,
  route,
  layout,
  index,
} from "@react-router/dev/routes";

export default [
  route("api/create-trip", "routes/api/create-trip.ts"),
  route("sign-in", "routes/root/sign-in.tsx"),
  layout("routes/admin/admin-layout.tsx", [
    route("dashboard", "routes/admin/dashboard.tsx"),
    route("all-users", "routes/admin/all-users.tsx"),
    route("trips", "routes/admin/trips.tsx"),
    route("trips/create", "routes/admin/create-trip.tsx"),
    route("trips/:tripId", "routes/admin/trip-detail.tsx"),
  ]),
  layout("routes/root/page-layout.tsx", [index("routes/root/travel-page.tsx")]),
] satisfies RouteConfig;
