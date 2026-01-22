<template>
  <div>
    <!-- LIST VIEW -->
    <div :class="showForm ? 'hidden' : 'block'">
      <div class="flex justify-between items-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-slate-50">Bookings Management</h1>
        <button class="px-8 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 font-semibold">
          View Reports
        </button>
      </div>

      <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-200 dark:border-slate-700">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-slate-50">
            All Bookings ({{ bookings.length }})
          </h2>
        </div>

        <div class="overflow-x-auto p-6">
          <table id="bookings-table" class="display min-w-full border-collapse text-gray-900 dark:text-slate-100">
            <thead>
              <tr class="bg-gray-50 dark:bg-slate-800">
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">ID</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Customer ID</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Package ID</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Price</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Status</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Booking Date</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Travel Start Date</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Travel End Date</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(booking, index) in bookings" :key="booking.id" class="hover:bg-gray-50 dark:hover:bg-slate-800">
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">{{ index + 1 }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4 font-semibold">User #{{ booking.user_id }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">Pkg #{{ booking.package_id }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4 font-semibold text-green-600">
                  {{ booking.total_price }}
                </td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">
                  <span :class="getStatusClass(booking.status)">
                    {{ booking.status.charAt(0).toUpperCase() + booking.status.slice(1) }}
                  </span>
                </td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">
                  {{ booking.booking_date }}
                </td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">
                  {{ booking.travel_start_date }}
                </td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">
                  {{ booking.travel_end_date }}
                </td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">
                  <div class="flex gap-2">
                    <button
                      class="px-3 py-1 text-blue-600 border border-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:hover:bg-slate-700 rounded-lg"
                      @click="openEdit(booking)"
                    >
                      Edit
                    </button>

                    <button
                      class="px-3 py-1 text-red-600 border border-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-slate-700 rounded-lg"
                      @click="deleteBooking(booking)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="bookings.length === 0">
                <td colspan="7" class="border-b border-gray-200 dark:border-slate-700 p-12 text-center text-gray-500 dark:text-slate-400">
                  No bookings found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- FORM VIEW (EDIT) -->
    <div
      :class="showForm ? 'block' : 'hidden'"
      class="min-h-screen bg-gray-50 dark:bg-slate-800 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-3xl mx-auto">
        <div class="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-slate-50">Edit Booking</h3>
            <button
              class="text-2xl text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 transition-colors"
              @click="closeForm"
            >
              ✕
            </button>
          </div>

          <form @submit.prevent="submitBooking" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">Status *</label>
                <select
                  v-model="form.status"
                  required
                  class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">Total Price</label>
                <input
                  v-model="form.total_price"
                  type="text"
                  class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"
                  placeholder="e.g. 19999"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">Travel Start Date</label>
                <input
                  v-model="form.travel_start_date"
                  type="date"
                  class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">Travel End Date</label>
                <input
                  v-model="form.travel_end_date"
                  type="date"
                  class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div class="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                class="px-6 py-3 text-sm border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                @click="closeForm"
              >
                Cancel
              </button>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="px-6 py-3 text-sm bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium transition-colors"
              >
                <span v-if="isSubmitting">Saving...</span>
                <span v-else>Update Booking</span>
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

const bookings = ref([])
let dataTable = null

const showForm = ref(false)
const isSubmitting = ref(false)

const form = ref({
  id: null,
  status: 'pending',
  total_price: '',
  travel_start_date: '',
  travel_end_date: ''
})

const BOOKINGS_QUERY = `
  query {
    bookings {
      id
      user_id
      package_id
      total_price
      status
      booking_date
      travel_start_date
      travel_end_date
    }
  }
`

// IMPORTANT: Backend must have updateBooking for this to work.
const UPDATE_BOOKING = `
  mutation UpdateBooking(
    $id: UUID!
    $status: String
    $total_price: String
    $travel_start_date: String
    $travel_end_date: String
  ) {
    updateBooking(
      id: $id
      status: $status
      total_price: $total_price
      travel_start_date: $travel_start_date
      travel_end_date: $travel_end_date
    ) {
      id
      status
      total_price
      travel_start_date
      travel_end_date
    }
  }
`

const DELETE_BOOKING = `
  mutation DeleteBooking($id: UUID!) {
    deleteBooking(id: $id) { id }
  }
`

const GET_BOOKING = `
  query GetBooking($id: UUID!) {
    booking(id: $id) {
      id
      user_id
      package_id
      total_price
      status
      booking_date
      travel_start_date
      travel_end_date
    }
  }
`

const getStatusClass = (status) => {
  switch (status) {
    case 'pending': return 'px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs'
    case 'confirmed': return 'px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs'
    case 'cancelled': return 'px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs'
    case 'completed': return 'px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs'
    default: return 'px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs'
  }
}

const closeForm = () => {
  showForm.value = false
}

const openEdit = async (booking) => {
  try {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: GET_BOOKING,
        variables: { id: booking.id }
      })
    })

    const { data, errors } = await res.json()
    if (!res.ok) throw new Error(`HTTP error ${res.status}`)
    if (errors?.length) throw new Error(errors[0].message || 'Failed to load booking')
    if (!data?.booking) throw new Error('Booking not found')

    const b = data.booking
    form.value = {
      id: b.id,
      status: b.status || 'pending',
      total_price: b.total_price != null ? String(b.total_price) : '',
      travel_start_date: b.travel_start_date || '',
      travel_end_date: b.travel_end_date || ''
    }

    showForm.value = true
  } catch (err) {
    console.error('Load booking error:', err)
    alert(err.message || 'Failed to load booking')
  }
}

const loadBookings = async () => {
  try {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: BOOKINGS_QUERY })
    })

    if (!res.ok) throw new Error(`HTTP error ${res.status}: ${res.statusText}`)

    const { data, errors } = await res.json()
    if (errors && errors.length) throw new Error(errors[0].message || 'Failed to load bookings')

    bookings.value = data?.bookings || []

    await nextTick()
    if (dataTable) dataTable.destroy()
    dataTable = $('#bookings-table').DataTable()
  } catch (err) {
    console.error('Load error:', err)
    alert(`Failed to load bookings: ${err.message}`)
  }
}

const submitBooking = async () => {
  if (!form.value.id) return

  isSubmitting.value = true
  try {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: UPDATE_BOOKING,
        variables: {
          id: form.value.id,
          status: form.value.status || undefined,
          total_price: form.value.total_price || undefined,
          travel_start_date: form.value.travel_start_date || undefined,
          travel_end_date: form.value.travel_end_date || undefined
        }
      })
    })

    if (!res.ok) throw new Error(`HTTP error ${res.status}`)

    const json = await res.json()
    if (json.errors && json.errors.length) throw new Error(json.errors[0].message || 'Update failed')

    alert('Booking updated successfully!')
    closeForm()
    window.location.reload()
  } catch (err) {
    console.error('Update error:', err)
    alert(err.message || 'Update failed')
  } finally {
    isSubmitting.value = false
  }
}

const deleteBooking = async (booking) => {
  if (!confirm(`Delete booking #${booking.id} (User #${booking.user_id})?`)) return

  try {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: DELETE_BOOKING, variables: { id: booking.id } })
    })

    if (!res.ok) throw new Error(`HTTP error ${res.status}`)

    const json = await res.json()
    if (json.errors && json.errors.length) throw new Error(json.errors[0].message || 'Delete failed')

    alert('Booking deleted successfully!')
    window.location.reload()
  } catch (err) {
    console.error('Delete error:', err)
    alert(err.message || 'Delete failed')
  }
}

onMounted(async () => {
  await loadBookings()
})
</script>
