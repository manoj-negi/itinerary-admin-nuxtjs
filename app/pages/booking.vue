<template>
  <div>
    <div class="flex justify-between items-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-slate-50">Bookings Management</h1>
      <button class="px-8 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 font-semibold">View Reports</button>
    </div>

    <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden">
      <div class="p-6 border-b border-gray-200 dark:border-slate-700">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-slate-50">All Bookings ({{ bookings.length }})</h2>
      </div>

      <div class="overflow-x-auto p-6">
        <table id="bookings-table" class="display min-w-full border-collapse text-gray-900 dark:text-slate-100">
          <thead>
            <tr class="bg-gray-50 dark:bg-slate-800">
              <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">ID</th>
              <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Customer</th>
              <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Package</th>
              <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Price</th>
              <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Status</th>
              <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Travel Date</th>
              <th class="border-b border-gray-200 dark:border-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in bookings" :key="booking.id" class="hover:bg-gray-50 dark:hover:bg-slate-800">
              <td class="border-b border-gray-200 dark:border-slate-700 p-4">{{ booking.id }}</td>
              <td class="border-b border-gray-200 dark:border-slate-700 p-4 font-semibold">{{ booking.user }}</td>
              <td class="border-b border-gray-200 dark:border-slate-700 p-4">{{ booking.package }}</td>
              <td class="border-b border-gray-200 dark:border-slate-700 p-4 font-semibold text-green-600">${{ booking.total_price }}</td>
              <td class="border-b border-gray-200 dark:border-slate-700 p-4">{{ booking.status }}</td>
              <td class="border-b border-gray-200 dark:border-slate-700 p-4">{{ booking.travel_start }}</td>
              <td class="border-b border-gray-200 dark:border-slate-700">
                  <div class="flex gap-2">
                    <button class="px-3 py-1 text-blue-600 border border-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:hover:bg-slate-700 rounded-lg">Edit</button>
                    <button class="px-3 py-1 text-red-600 border border-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-slate-700 rounded-lg">Delete</button>
                  </div>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const bookings = [
  {
    id: 1,
    user: 'Kartik Gupta',
    package: 'Paris Deluxe',
    total_price: 1250,
    status: 'Confirmed',
    travel_start: '2025-12-15'
  },
  {
    id: 2,
    user: 'Vishal Negi',
    package: 'Rome Classic',
    total_price: 850,
    status: 'Pending',
    travel_start: '2025-12-20'
  },
  {
    id: 3,
    user: 'Raj Rajput',
    package: 'Tokyo Premium',
    total_price: 1800,
    status: 'Completed',
    travel_start: '2025-12-10'
  }
]

onMounted(() => {
  $('#bookings-table').DataTable()
})
</script>
