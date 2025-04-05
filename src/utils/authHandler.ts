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

export const shouldRedirectToProfile = (path: string): { shouldRedirect: boolean; username: string | null } => {
    const token = cookie.get("token");
    
    // Only check for the specific username route pattern
    if (path === "/:username") {
        const currentPath = window.location.pathname;
        const usernameMatch = currentPath.match(/^\/([a-zA-Z0-9_-]{3,30})$/);
        
        if (token && usernameMatch) {
            return {
                shouldRedirect: true,
                username: usernameMatch[1]
            };
        }
    }
    
    return {
        shouldRedirect: false,
        username: null
    };
};
