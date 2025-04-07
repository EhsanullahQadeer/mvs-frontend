import publicRoutes from "routes/publicRoutes";
import cookie from "js-cookie";

export const isRouteAccessible = (): boolean => {
    const token = cookie.get("token");
    const currentPath = window.location.pathname.slice(1);

    if (token) return true;

    return publicRoutes.some((route) =>
        new RegExp(`^${route.path.replace(/:([a-zA-Z]+)/g, "([^/]+)")}$`).test(currentPath)
    );
};
