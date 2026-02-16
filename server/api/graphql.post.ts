export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const apiBase = config.public.apiBaseUrl

  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  }
  const auth = getHeader(event, 'authorization')
  if (auth) {
    headers.Authorization = auth
  }

  try {
    const res = await $fetch.raw(`${apiBase}/query`, {
      method: 'POST',
      headers,
      body
    })

    if (!res.ok) {
      throw createError({
        statusCode: res.status,
        statusMessage: res.statusText
      })
    }

    return res._data
  } catch (error) {
    console.error('API Proxy Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})
