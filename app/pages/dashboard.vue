<template>
  <div>
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">Dashboard</h1>
      <p class="text-xl text-gray-600 dark:text-slate-300">Overview of all operations and key metrics</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <div class="p-8 border rounded-xl shadow-sm bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 hover:shadow-lg">
        <div class="text-sm font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wide">Total Users</div>
        <div class="text-4xl font-bold text-blue-600 mt-2">{{ stats.users }}</div>
      </div>

      <div class="p-8 border rounded-xl shadow-sm bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 hover:shadow-lg">
        <div class="text-sm font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wide">Active Tours</div>
        <div class="text-4xl font-bold text-green-600 mt-2">{{ stats.tours }}</div>
      </div>

      <div class="p-8 border rounded-xl shadow-sm bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 hover:shadow-lg">
        <div class="text-sm font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wide">Total Bookings</div>
        <div class="text-4xl font-bold text-purple-600 mt-2">{{ stats.bookings }}</div>
      </div>

      <div class="p-8 border rounded-xl shadow-sm bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 hover:shadow-lg">
        <div class="text-sm font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wide">Total Revenue</div>
        <div class="text-4xl font-bold text-orange-600 mt-2">${{ stats.revenue.toLocaleString() }}</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-slate-700">
        <h2 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-slate-100">Recent Bookings</h2>
        <div class="overflow-x-auto">
          <table id="recent-bookings-table" class="display min-w-full border-collapse text-gray-900 dark:text-slate-100">
            <thead>
              <tr class="bg-gray-50 dark:bg-slate-800">
                <th class="border-b border-gray-200 dark:border-slate-700">ID</th>
                <th class="border-b border-gray-200 dark:border-slate-700">Customer</th>
                <th class="border-b border-gray-200 dark:border-slate-700">Tour</th>
                <th class="border-b border-gray-200 dark:border-slate-700">Price</th>
                <th class="border-b border-gray-200 dark:border-slate-700">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(b, index) in recentBookings" :key="b.id" class="hover:bg-gray-50 dark:hover:bg-slate-800">
                <td class="border-b border-gray-200 dark:border-slate-700">{{ index + 1 }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 font-medium">{{ b.user }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700">{{ b.tour }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 font-semibold text-green-500">${{ b.price }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700">
                  <span :class="b.status === 'confirmed' ? 'text-green-500' : b.status === 'completed' ? 'text-blue-500' : 'text-orange-400'">
                    {{ b.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-slate-700">
        <h2 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-slate-100">Top Tours</h2>
        <div class="overflow-x-auto">
          <table id="top-tours-table" class="display min-w-full border-collapse text-gray-900 dark:text-slate-100">
            <thead>
              <tr class="bg-gray-50 dark:bg-slate-800">
                <th class="border-b border-gray-200 dark:border-slate-700">Tour</th>
                <th class="border-b border-gray-200 dark:border-slate-700">Bookings</th>
                <th class="border-b border-gray-200 dark:border-slate-700">Revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in topTours" :key="t.title" class="hover:bg-gray-50 dark:hover:bg-slate-800">
                <td class="border-b border-gray-200 dark:border-slate-700 font-medium">{{ t.title }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700">{{ t.bookings }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 font-semibold text-green-500">{{ t.revenue }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'

const stats = ref({ users: 0, tours: 0, bookings: 0, revenue: 0 })
const recentBookings = ref([])
const topTours = ref([])

let recentDT = null
let topDT = null

const DASHBOARD_QUERY = `
  query {
    users { id }
    tours { id status }
    bookings {
      id
      total_price
      status
      booking_date
      user { full_name }
      package { package_name }
    }
  }
`

const toNumberSafe = (v) => {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

const formatMoney = (n) => '$' + Math.round(n).toLocaleString()

const initTables = async () => {
  await nextTick()

  if (recentDT) {
    recentDT.destroy()
    recentDT = null
  }
  if (topDT) {
    topDT.destroy()
    topDT = null
  }

  recentDT = $('#recent-bookings-table').DataTable()
  topDT = $('#top-tours-table').DataTable()
}

const loadDashboard = async () => {
  const res = await fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: DASHBOARD_QUERY })
  })

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)

  const json = await res.json()
  if (json.errors?.length) throw new Error(json.errors[0].message || 'Dashboard load failed')

  const users = json.data?.users || []
  const tours = json.data?.tours || []
  const bookings = json.data?.bookings || []

  // Stats
  const revenueSum = bookings
    .filter(b => ['confirmed', 'completed'].includes(b.status))
    .reduce((sum, b) => sum + toNumberSafe(b.total_price), 0)

  stats.value = {
    users: users.length,
    tours: tours.filter(t => t.status === 'published').length,
    bookings: bookings.length,
    revenue: revenueSum
  }

  // Recent bookings (latest)
  const sortedBookings = [...bookings].sort((a, b) => {
    const ad = a.booking_date ? new Date(a.booking_date).getTime() : 0
    const bd = b.booking_date ? new Date(b.booking_date).getTime() : 0
    return bd - ad
  })

  recentBookings.value = sortedBookings.slice(0, 10).map(b => ({
    id: b.id,
    user: b.user?.full_name || 'N/A',
    tour: b.package?.package_name || 'N/A',
    price: toNumberSafe(b.total_price),
    status: b.status
  }))

  // Top “Tours” (actually top packages by revenue/bookings)
  const byPkg = new Map()
  for (const b of bookings) {
    if (!['confirmed', 'completed'].includes(b.status)) continue
    const key = b.package?.package_name || 'Unknown Package'

    const cur = byPkg.get(key) || { title: key, bookings: 0, revenue: 0 }
    cur.bookings += 1
    cur.revenue += toNumberSafe(b.total_price)
    byPkg.set(key, cur)
  }

  topTours.value = [...byPkg.values()]
    .sort((a, b) => b.bookings - a.bookings)
    .slice(0, 10)
    .map(x => ({
      title: x.title,
      bookings: x.bookings,
      revenue: formatMoney(x.revenue)
    }))

  await initTables()
}

onMounted(async () => {
  try {
    await loadDashboard()
  } catch (err) {
    console.error('Dashboard error:', err)
    alert(err.message || 'Failed to load dashboard')
  }
})
</script>


