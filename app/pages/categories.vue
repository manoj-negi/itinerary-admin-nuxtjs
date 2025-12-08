<template>
  <div>
    <div :class="showForm ? 'hidden' : 'block'">
      <div class="flex justify-between items-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-slate-50">Categories Management</h1>
        <button class="px-8 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 font-semibold" @click="showForm = true">+ New Category</button>
      </div>

      <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-200 dark:border-slate-700">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-slate-50">Tour Categories ({{ categories.length }})</h2>
        </div>
        <div class="overflow-x-auto p-6">
          <table id="categories-table" class="display min-w-full border-collapse text-gray-900 dark:text-slate-100">
            <thead>
              <tr class="bg-gray-50 dark:bg-slate-800 text-left text-sm font-semibold text-gray-700 dark:text-slate-200">
                <th class="border-b border-gray-200 dark:border-slate-700 p-4">ID</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4">Category</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4">Description</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4">Tours</th>
                <th class="border-b border-gray-200 dark:border-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cat in categories" :key="cat.id" class="hover:bg-gray-50 dark:hover:bg-slate-800 text-sm">
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">{{ cat.id }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4 font-medium">{{ cat.category_name }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">{{ cat.description }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4 text-blue-600 font-semibold">{{ cat.tour_count }}</td>
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
            <h3 class="text-2xl font-bold text-gray-900 dark:text-slate-50">Add New Category</h3>
            <button class="text-2xl text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200" @click="showForm = false">✕</button>
          </div>

          <form @submit.prevent="showForm = false">
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Category Name</label>
              <input v-model="form.category_name" type="text" class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"/>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Description</label>
              <textarea v-model="form.description" rows="3" class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"></textarea>
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
import { ref, onMounted } from 'vue'

const categories = [
  { 
    id: 1, 
    category_name: 'City Tours',      
    description: 'Explore famous cities',           
    tour_count: 12 
  },
  { 
    id: 2, 
    category_name: 'Beach Tours',     
    description: 'Relax on beautiful beaches',     
    tour_count: 8 
  },
  { 
    id: 3, 
    category_name: 'History Tours',   
    description: 'Discover historical sites',      
    tour_count: 6 
  },
  { 
    id: 4, 
    category_name: 'Adventure Tours', 
    description: 'Thrilling outdoor activities',   
    tour_count: 5 
  }
]

const showForm = ref(false)
const form = ref({
  category_name: '',
  description: ''
})

onMounted(() => {
  $('#categories-table').DataTable()
})
</script>
