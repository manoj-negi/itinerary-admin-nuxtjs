<template>
  <div>
    <div :class="showForm ? 'hidden' : 'block'">
      <div class="flex justify-between items-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-slate-50">Users Management</h1>
        <button
          class="px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 font-semibold"
          @click="openCreate"
        >
          + Add User
        </button>
      </div>

      <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-200 dark:border-slate-700">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-slate-50">
            All Users ({{ users.length }})
          </h2>
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
              <tr
                v-for="(user, index) in users"
                :key="user.id"
                class="hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                <td class="border-b border-gray-200 dark:border-slate-700">{{ index + 1 }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700">{{ user.full_name }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700">{{ user.email }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700">{{ user.phone }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700">{{ user.created_at }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700">
                  <div class="flex gap-2">
                    <button
                      class="px-3 py-1 text-blue-600 border border-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:hover:bg-slate-700 rounded-lg"
                      @click="openEdit(user)"
                    >
                      Edit
                    </button>
                    <button
                      class="px-3 py-1 text-red-600 border border-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-slate-700 rounded-lg"
                      @click="deleteUser(user)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div
      :class="showForm ? 'block' : 'hidden'"
      class="min-h-screen bg-gray-50 dark:bg-slate-800 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-4xl mx-auto">
        <div class="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-slate-50">
              {{ isEditing ? 'Edit User' : 'Add New User' }}
            </h3>
            <button
              class="text-2xl text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"
              @click="closeForm"
            >
              ✕
            </button>
          </div>

          <form @submit.prevent="submitUser">
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">
                Full Name
              </label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">
                Email
              </label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">
                Phone
              </label>
              <input
                v-model="form.phone"
                type="text"
                class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"
              />
            </div>

            <div class="mb-4" v-if="!isEditing">
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">
                Password
              </label>
              <input
                v-model="form.password"
                type="password"
                required
                class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"
              />
            </div>

            <div class="flex justify-end space-x-3 mt-4">
              <button
                type="button"
                class="px-4 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-slate-200 bg-white dark:bg-slate-800"
                @click="closeForm"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
              >
                {{ isEditing ? 'Update' : 'Save' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'

const showForm = ref(false)
const form = ref({
  id: null,
  name: '',
  email: '',
  phone: '',
  password: ''
})
const isEditing = ref(false)

const users = ref([])
let dataTable = null

const USERS_QUERY = `
  query {
    users {
      id
      full_name
      email
      phone
      created_at
    }
  }
`

const CREATE_USER = `
  mutation CreateUser(
    $full_name: String!
    $email: String!
    $password: String!
    $phone: String
  ) {
    createUser(
      full_name: $full_name
      email: $email
      password: $password
      phone: $phone
    ) {
      id
      full_name
      email
      phone
      created_at
    }
  }
`

const UPDATE_USER = `
  mutation UpdateUser(
    $id: ID!
    $full_name: String!
    $email: String!
    $phone: String
  ) {
    updateUser(
      id: $id
      full_name: $full_name
      email: $email
      phone: $phone
    ) {
      id
      full_name
      email
      phone
      created_at
    }
  }
`

const DELETE_USER = `
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`

const resetForm = () => {
  form.value = { id: null, name: '', email: '', phone: '', password: '' }
  isEditing.value = false
}

const openCreate = () => {
  resetForm()
  showForm.value = true
}

const openEdit = (user) => {
  form.value = {
    id: user.id,
    name: user.full_name,
    email: user.email,
    phone: user.phone || '',
    password: ''
  }
  isEditing.value = true
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
}

const submitUser = async () => {
  try {
    if (isEditing.value && form.value.id != null) {

      const res = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: UPDATE_USER,
          variables: {
            id: form.value.id,
            full_name: form.value.name,
            email: form.value.email,
            phone: form.value.phone || null
          }
        })
      })

      if (!res.ok) {
        alert('HTTP error ' + res.status)
        return
      }

      const { data, errors } = await res.json()

      if (errors && errors.length) {
        console.error(errors)
        alert(errors[0].message || 'Update user failed')
        return
      }

      alert('User updated successfully!')
      closeForm()
      window.location.reload()
    } else {
      // CREATE
      const res = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: CREATE_USER,
          variables: {
            full_name: form.value.name,
            email: form.value.email,
            password: form.value.password,
            phone: form.value.phone || null
          }
        })
      })

      if (!res.ok) {
        alert('HTTP error ' + res.status)
        return
      }

      const { data, errors } = await res.json()

      if (errors && errors.length) {
        console.error(errors)
        alert(errors[0].message || 'Create user failed')
        return
      }

      alert('User created successfully!')
      closeForm()
      window.location.reload()
    }
  } catch (err) {
    console.error('Network error:', err)
    alert('Network error')
  }
}

const deleteUser = async (user) => {
  if (!confirm(`Delete user "${user.full_name}"?`)) return

  try {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: DELETE_USER,
        variables: { id: user.id }
      })
    })

    if (!res.ok) {
      alert('HTTP error ' + res.status)
      return
    }

    const { data, errors } = await res.json()

    if (errors && errors.length) {
      console.error(errors)
      alert(errors[0].message || 'Delete user failed')
      return
    }

    alert('User deleted successfully!')
    window.location.reload()
  } catch (err) {
    console.error('Network error:', err)
    alert('Network error')
  }
}

const loadUsers = async () => {
  try {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: USERS_QUERY })
    })

    if (!res.ok) {
      alert(`HTTP error ${res.status}: ${res.statusText}`)
      return
    }

    const { data, errors } = await res.json()

    if (errors && errors.length) {
      alert(errors[0].message || 'Failed to load users')
      return
    }

    users.value = data?.users || []

    await nextTick()
    dataTable = $('#users-table').DataTable()
  } catch (err) {
    alert(`Failed to load users: ${err.message}`)
  }
}

onMounted(async () => {
  await loadUsers()
})
</script>