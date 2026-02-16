/**
 * Global auth middleware: protects all routes except login (/).
 * - Unauthenticated users visiting any path other than / are redirected to /
 * - Authenticated users visiting / are redirected to /dashboard
 * Runs on client so we can read localStorage (token is stored there after login).
 */
export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const token =
    typeof localStorage !== 'undefined' ? localStorage.getItem('admin_token') : null
  const isLoginPage = to.path === '/'

  if (isLoginPage && token) {
    return navigateTo('/dashboard', { replace: true })
  }

  if (!isLoginPage && !token) {
    return navigateTo('/', { replace: true })
  }
})
