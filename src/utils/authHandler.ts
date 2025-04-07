import publicRoutes from "routes/publicRoutes";
import cookie from "js-cookie";
import {match} from 'path-to-regexp'

export const isRouteAccessible = (): boolean => {
    const token = cookie.get("token");
    const currentPath = window.location.pathname.slice(1);

    if (token) return true;

    return publicRoutes.some((route) =>
        !!match(route.path)(currentPath)
    );
};

export const shouldRedirectToProfile = (path: string): { shouldRedirect: boolean; username: string | null } => {
    const token = cookie.get("token");
    
    if (path === "/:username") {
        const currentPath = window.location.pathname;
        const matchs = match("/:username")(currentPath);
        if (token && matchs) {
            return {
                shouldRedirect: true,
                username: matchs.params.username as string
            };
        }
    }
    
    return {
        shouldRedirect: false,
        username: null
    };
};
