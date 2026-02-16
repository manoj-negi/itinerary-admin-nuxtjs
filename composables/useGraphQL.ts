/**
 * Returns headers for GraphQL requests, including Bearer token from localStorage when available.
 * Use for all /api/graphql calls except login (login does not send a token).
 */
export function useGraphQL() {
  function getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('admin_token')
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
    }
    return headers
  }

  return { getAuthHeaders }
}
