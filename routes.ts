/**
 * Accessible Routes to the Public users
 * the routes do not requires authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = [
    "/",
    "/home"
]

/**
 * Routs that are used fot tha authentication
 * the routes that requires authentication to view the settings
 * @type {string[]}
 */
export const authRoutes: string[] = [
    "/auth/login",
    "/auth/register",
    "/auth/error"
]

/**
 * The Prefix for the Authentication Routes
 * Routes that start with this are API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = '/';