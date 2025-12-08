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
              <tr v-for="b in recentBookings" :key="b.id" class="hover:bg-gray-50 dark:hover:bg-slate-800">
                <td class="border-b border-gray-200 dark:border-slate-700">{{ b.id }}</td>
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
import { onMounted } from 'vue'

const stats = { users: 124, tours: 28, bookings: 156, revenue: 45872 }

const recentBookings = [
  { id: 1, user: 'Kartik Gupta', tour: 'Paris City Tour',  price: 450, status: 'confirmed' },
  { id: 2, user: 'Vishal Negi',  tour: 'Rome Highlights',  price: 320, status: 'pending' },
  { id: 3, user: 'Raj Rajput',   tour: 'Tokyo Adventure',  price: 780, status: 'completed' }
]

const topTours = [
  { title: 'Paris City Tour',  bookings: 24, revenue: '$12,450' },
  { title: 'Rome Highlights',  bookings: 18, revenue: '$8,920' },
  { title: 'Tokyo Adventure',  bookings: 15, revenue: '$7,350' }
]

onMounted(() => {
  $('#recent-bookings-table').DataTable()
  $('#top-tours-table').DataTable()
})
</script>
