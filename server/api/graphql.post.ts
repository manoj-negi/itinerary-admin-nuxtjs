export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const apiBase = config.apiBaseUrl  // ✅ Fixed: public nahi chahiye server-side

  try {
    const res = await $fetch.raw(`${apiBase}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    // ✅ Raw response handle
    if (!res.ok) {
      throw createError({
        statusCode: res.status,
        statusMessage: res.statusText
      })
    }

    const data = await res._data
    return data
  } catch (error) {
    console.error('API Proxy Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})
