<template>
  <div>
    <div :class="showForm ? 'hidden' : 'block'">
      <div class="flex justify-between items-center mb-12">
        <div>
          <h1 class="text-4xl font-bold text-gray-900 dark:text-slate-50 mb-2">Packages Management</h1>
        </div>
        <button class="px-8 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 font-semibold shadow-sm" @click="showForm = true">+ New Package</button>
      </div>

      <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-200 dark:border-slate-700">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-slate-50">All Packages ({{ packages.length }})</h2>
        </div>

        <div class="overflow-x-auto p-6">
          <table id="packages-table" class="display min-w-full border-collapse text-gray-900 dark:text-slate-100">
            <thead>
              <tr class="bg-gray-50 dark:bg-slate-800 text-left text-sm font-semibold text-gray-700 dark:text-slate-200">
                <th class="border-b border-gray-200 dark:border-slate-700 p-4">Id</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4">Tour Id</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4">Package Name</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4">Price</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4">Currency</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4">Occupancy</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4">Is Featured</th>
                <th class="border-b border-gray-200 dark:border-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in packages" :key="p.id" class="hover:bg-gray-50 dark:hover:bg-slate-800 text-sm">
                <td class="border-b border-gray-200 dark:border-slate-700 p-4 font-mono text-xs">{{ p.id }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">{{ p.tour_id }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4 font-medium text-gray-900 dark:text-slate-50">{{ p.package_name }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4 font-semibold text-green-600">{{ p.price }} {{ p.currency }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">{{ p.currency }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">{{ p.occupancy }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">{{ p.is_featured }}</td>
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

    <div :class="showForm ? 'block' : 'hidden'" class="min-h-screen bg-gray-50 dark:bg-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-slate-50">Add New Package</h3>
            <button class="text-2xl text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200" @click="showForm = false">✕</button>
          </div>

          <form @submit.prevent="showForm = false">
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Tour ID</label>
              <input v-model="form.tour_id" type="number" class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"/>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Package Name</label>
              <input v-model="form.package_name" type="text" class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"/>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Price</label>
              <input v-model="form.price" type="number" class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"/>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Currency</label>
              <input v-model="form.currency" type="text" class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"/>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Occupancy</label>
              <input v-model="form.occupancy" type="text" class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"/>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Is Featured</label>
              <input v-model="form.is_featured" type="checkbox" class="h-4 w-4"/>
            </div>

            <div class="flex justify-end space-x-3 mt-4">
              <button type="button" class="px-4 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-slate-200 bg-white dark:bg-slate-800" @click="showForm = false">Cancel</button>
              <button type="submit" class="px-4 py-2 text-sm bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const packages = [
  {
    id: 1,
    tour_id: 1,
    package_name: 'Paris Budget Package',
    price: 1250,
    currency: 'USD',
    occupancy: '2 adults',
    is_featured: true
  },
  {
    id: 2,
    tour_id: 1,
    package_name: 'Paris Luxury Package',
    price: 32000,
    currency: 'USD',
    occupancy: '2 adults + 1 child',
    is_featured: false
  },
  {
    id: 3,
    tour_id: 2,
    package_name: 'Rome Weekend',
    price: 9000,
    currency: 'USD',
    occupancy: '2 adults',
    is_featured: true
  }
]

const showForm = ref(false)
const form = ref({
  tour_id: '',
  package_name: '',
  price: '',
  currency: '',
  occupancy: '',
  is_featured: false
})

onMounted(() => {
  $('#packages-table').DataTable()
})
</script>