<template>
  <div>
    <div :class="showForm ? 'hidden' : 'block'">
      <div class="flex justify-between items-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-slate-50">Users Management</h1>
        <button class="px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 font-semibold" @click="showForm = true">+ Add User</button>
      </div>

      <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-200 dark:border-slate-700">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-slate-50">All Users ({{ users.length }})</h2>
        </div>

        <div class="overflow-x-auto p-6">
          <table id="users-table" class="display min-w-full border-collapse text-gray-900 dark:text-slate-100">
            <thead>
              <tr class="bg-gray-50 dark:bg-slate-800">
                <th class="border-b border-gray-200 dark:border-slate-700">ID</th>
                <th class="border-b border-gray-200 dark:border-slate-700">Name</th>
                <th class="border-b border-gray-200 dark:border-slate-700">Email</th>
                <th class="border-b border-gray-200 dark:border-slate-700">Phone</th>
                <th class="border-b border-gray-200 dark:border-slate-700">Joined</th>
                <th class="border-b border-gray-200 dark:border-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-slate-800">
                <td class="border-b border-gray-200 dark:border-slate-700">{{ user.id }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700">{{ user.full_name }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700">{{ user.email }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700">{{ user.phone }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700">{{ user.created_at }}</td>
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
            <h3 class="text-2xl font-bold text-gray-900 dark:text-slate-50">Add New User</h3>
            <button class="text-2xl text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200" @click="showForm = false">✕</button>
          </div>

          <form @submit.prevent="showForm = false">
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Full Name</label>
              <input v-model="form.name" type="text" class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"/>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Email</label>
              <input v-model="form.email" type="text" class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"/>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Phone</label>
              <input v-model="form.phone" type="text" class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"/>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Password</label>
              <input v-model="form.password" type="password" class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"/>
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

const users = [
  { 
    id: 1, 
    full_name: 'Kartik Gupta', 
    email: 'kartik.gupta@email.com', 
    phone: '+91 9084658725', 
    created_at: '2025-11-15' 
  },
  { 
    id: 2, 
    full_name: 'Vishal Negi', 
    email: 'vishal.negi@email.com', 
    phone: '+91 9084658726', 
    created_at: '2025-11-10' 
  },
  { 
    id: 3, 
    full_name: 'Raj Rajput', 
    email: 'raj.rajput@email.com', 
    phone: '+91 9084658727', 
    created_at: '2025-11-08' 
  },
  { 
    id: 4, 
    full_name: 'Aman Negi', 
    email: 'aman.negi@email.com', 
    phone: '+91 9084658728', 
    created_at: '2025-11-05' 
  }
]

const showForm = ref(false)
const form = ref({
  name: '',
  email: '',
  phone: '',
  password: ''
})

onMounted(() => {
  $('#users-table').DataTable()
})
</script>
