<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-900 flex">
    <aside class="w-72 bg-slate-800 dark:bg-slate-950 text-white flex flex-col sticky top-0 h-screen">
      <div class="px-6 py-5 border-b border-slate-700 dark:border-slate-600">
        <h1 class="text-2xl font-bold">
          Tours & Travel
          <span class="block text-xl font-normal text-slate-300">
            Admin Panel
          </span>
        </h1>
      </div>

      <nav class="px-4 py-6 space-y-2 text-md">
        <NuxtLink to="/dashboard" class="block px-3 py-2 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 font-medium">
          Dashboard
        </NuxtLink>
        <NuxtLink to="/users" class="block px-3 py-2 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600">
          Users
        </NuxtLink>
        <NuxtLink to="/categories" class="block px-3 py-2 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600">
          Categories
        </NuxtLink>
        <NuxtLink to="/tours" class="block px-3 py-2 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600">
          Tours
        </NuxtLink>
        <NuxtLink to="/packages" class="block px-3 py-2 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600">
          Packages
        </NuxtLink>
        <NuxtLink to="/booking" class="block px-3 py-2 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600">
          Bookings
        </NuxtLink>
        <NuxtLink to="/point_of_interest" class="block px-3 py-2 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600">
          POIs
        </NuxtLink>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col">
      <header class="h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-slate-100">Infinite Horizons Travel Studio</h2>

        <div class="flex items-center gap-3">
          <button
            class="px-3 py-1 rounded-full text-sm border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-100 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition"
            @click="toggleTheme"
          >
            {{ colorMode.value === 'dark' ? 'Light Mode' : 'Dark Mode' }}
          </button>
          <button
            class="px-4 py-2 rounded-lg text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700 transition"
            @click="handleLogout"
          >
            Logout
          </button>
        </div>
      </header>

      <main class="flex-1 px-8 py-6 pb-12 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const LOGOUT_MUTATION = `
  mutation Logout {
    logout
  }
`

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const { getAuthHeaders } = useGraphQL()

const handleLogout = async () => {
  try {
    await $fetch('/api/graphql', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ query: LOGOUT_MUTATION })
    })
  } catch (_) {
    // Still clear token and redirect if backend is unreachable
  }
  if (import.meta.client) {
    localStorage.removeItem('admin_token')
  }
  await navigateTo('/')
}
</script>

