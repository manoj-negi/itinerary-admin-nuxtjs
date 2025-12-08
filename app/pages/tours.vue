<template>
  <div>
    <div :class="showForm ? 'hidden' : 'block'">
      <div class="flex justify-between items-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-slate-50">Tours Management</h1>
        <button class="px-8 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 font-semibold" @click="showForm = true">+ New Tour</button>
      </div>

      <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-200 dark:border-slate-700">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-slate-50">All Tours ({{ tours.length }})</h2>
        </div>
        <div class="overflow-x-auto p-6">
          <table id="tours-table" class="display min-w-full border-collapse text-gray-900 dark:text-slate-100">
            <thead>
              <tr class="bg-gray-50 dark:bg-slate-800">
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">ID</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Title</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Description</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">City</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Category</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Duration</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Status</th>
                <th class="border-b border-gray-200 dark:border-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tour in tours" :key="tour.id" class="hover:bg-gray-50 dark:hover:bg-slate-800">
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">{{ tour.id }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4 font-semibold">{{ tour.title }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">{{ tour.description }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4 text-blue-600">{{ tour.city }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">{{ tour.category }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">{{ tour.duration_days }} days</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">
                  <span :class="tour.status === 'published' ? 'text-green-600' : 'text-gray-400 dark:text-slate-400'">{{ tour.status }}</span>
                </td>
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
            <h3 class="text-2xl font-bold text-gray-900 dark:text-slate-50">Add New Tour</h3>
            <button class="text-2xl text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200" @click="showForm = false">✕</button>
          </div>

          <form @submit.prevent="showForm = false">
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Title</label>
              <input v-model="form.title" type="text" class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"/>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Description</label>
              <textarea v-model="form.description" rows="3" class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"></textarea>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">City</label>
              <input v-model="form.city" type="text" class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"/>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Category</label>
              <input v-model="form.category" type="text" class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"/>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Duration (days)</label>
              <input v-model="form.duration_days" type="number" min="1" class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"/>
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

const tours = [
  { 
    id: 1, 
    title: 'Paris Romantic City Tour', 
    description: 'Experience the magic of Paris with guided tours of iconic landmarks.',
    city: 'Paris',     
    category: 'City Tours',  
    duration_days: 3, 
    status: 'published' 
  },
  { 
    id: 2, 
    title: 'Barcelona Beach Escape', 
    description: 'Relax on beautiful Mediterranean beaches and enjoy local cuisine.',  
    city: 'Barcelona', 
    category: 'Beach Tours', 
    duration_days: 5, 
    status: 'draft' 
  },
  { 
    id: 3, 
    title: 'Rome Historical Tour',  
    description: 'Discover ancient Roman history and stunning architectural wonders.',   
    city: 'Rome',      
    category: 'History',     
    duration_days: 4, 
    status: 'published' 
  },
  { 
    id: 4, 
    title: 'Tokyo Adventure',    
    description: 'Immerse yourself in Tokyo\'s vibrant culture and modern technology.',      
    city: 'Tokyo',     
    category: 'Adventure',   
    duration_days: 7, 
    status: 'published' 
  }
]

const showForm = ref(false)
const form = ref({
  title: '',
  description: '',
  city: '',
  category: '',
  duration_days: 1
})

onMounted(() => {
  $('#tours-table').DataTable()
})
</script>
