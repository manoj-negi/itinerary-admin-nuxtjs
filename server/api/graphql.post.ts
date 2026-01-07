export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const res = await fetch('http://localhost:8080/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return data
})
