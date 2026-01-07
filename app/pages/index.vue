<template>
  <div class="min-h-screen bg-slate-950 flex items-center justify-center text-slate-100">
    <div class="w-full max-w-md px-6">
      <div class="bg-slate-900/70 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl shadow-slate-900/70 p-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <p class="text-xs tracking-[0.25em] uppercase text-sky-400/70">Infinite Horizons Travel Studio</p>
            <h1 class="mt-1 text-2xl font-semibold tracking-tight">Admin Console</h1>
          </div>
        </div>

        <div v-if="status.message" :class="statusClasses" class="mb-4 text-xs rounded-lg px-3 py-2">{{ status.message }}</div>

        <form class="space-y-4" @submit.prevent="handleLogin">
          <div>
            <label class="block text-sm mb-1" for="email">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full rounded-xl bg-slate-900/60 border border-slate-700/80 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500
                     placeholder:text-slate-500"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label class="block text-sm mb-1" for="password">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="w-full rounded-xl bg-slate-900/60 border border-slate-700/80 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500
                     placeholder:text-slate-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            class="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl
                   bg-gradient-to-r from-sky-500 to-emerald-400 px-4 py-2.5 text-sm font-semibold
                   text-slate-950 shadow-lg shadow-sky-500/30 hover:shadow-emerald-400/30
                   hover:from-sky-400 hover:to-emerald-300 transition"
          >
            <span>Login as Admin</span>
            <span class="text-xs uppercase tracking-widest">Secure</span>
          </button>
        </form>
      </div>

      <p class="mt-4 text-center text-[11px] text-slate-500">Only authorized administrators may access this panel. All access is monitored.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from '#app'

definePageMeta({
  layout: 'auth'
})

const email = ref('')
const password = ref('')
const status = reactive({
  type: '',
  message: ''
})

const statusClasses = computed(() => {
  if (status.type === 'success') {
    return 'border border-emerald-400/70 bg-emerald-500/10 text-emerald-200'
  }
  if (status.type === 'error') {
    return 'border border-rose-500/70 bg-rose-500/10 text-rose-200'
  }
  return ''
})

// GraphQL login mutation
const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        full_name
        email
        role_id
      }
    }
  }
`

const handleLogin = async () => {
  status.type = ''
  status.message = ''

  try {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: LOGIN_MUTATION,
        variables: {
          email: email.value,
          password: password.value
        }
      })
    })

    if (!res.ok) {
      status.type = 'error'
      status.message = 'HTTP error ' + res.status
      return
    }

    const { data, errors } = await res.json()

    if (errors && errors.length) {
      status.type = 'error'
      status.message = errors[0].message || 'Login failed'
      return
    }

    const { token, user } = data.login
    console.log('token from API:', token)
    console.log('user from API:', user)

    const roleId = user.role_id
    if (roleId !== '1') {
      status.type = 'error'
      status.message = 'Access denied. You are not an admin.'
      return
    }

    status.type = 'success'
    status.message = 'Access granted. Redirecting to dashboard...'

    await navigateTo('/dashboard')
  } catch (err) {
    console.error('Network error:', err)
    status.type = 'error'
    status.message = 'Network error. Please try again.'
  }
}
</script>

