<template>
  <div>
    <!-- LIST VIEW -->
    <div :class="showForm ? 'hidden' : 'block'">
      <div class="flex justify-between items-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-slate-50">
          Tours Management
        </h1>
        <button
          class="px-8 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 font-semibold"
          @click="openCreate"
        >
          + New Tour
        </button>
      </div>

      <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-200 dark:border-slate-700">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-slate-50">
            All Tours ({{ tours.length }})
          </h2>
        </div>

        <div class="overflow-x-auto p-6">
          <table id="tours-table" class="display min-w-full border-collapse text-gray-900 dark:text-slate-100">
            <thead>
              <tr class="bg-gray-50 dark:bg-slate-800">
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">ID</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Title</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Description</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Category</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">City</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Duration</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Status</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(tour, index) in tours"
                :key="tour.id"
                class="hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">
                  {{ index + 1 }}
                </td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4 font-semibold">
                  {{ tour.title }}
                </td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4 max-w-xs truncate">
                  {{ tour.description }}
                </td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">
                  {{ tour.category?.category_name || 'N/A' }}
                </td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">
                  {{ tour.city?.name || 'N/A' }}
                </td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">
                  {{ tour.duration_days }} days
                </td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">
                  <span
                    :class="tour.status === 'published'
                      ? 'px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full'
                      : 'px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full dark:bg-slate-700 dark:text-slate-200'"
                  >
                    {{ tour.status }}
                  </span>
                </td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">
                  <div class="flex gap-2">
                    <button
                      class="px-3 py-1 text-blue-600 border border-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors"
                      @click="openEdit(tour)"
                    >
                      Edit
                    </button>
                    <button
                      class="px-3 py-1 text-red-600 border border-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors"
                      @click="deleteTour(tour)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="tours.length === 0">
                <td colspan="8" class="border-b border-gray-200 dark:border-slate-700 p-12 text-center text-gray-500 dark:text-slate-400">
                  No tours found. Create your first tour!
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- FORM VIEW -->
    <div
      :class="showForm ? 'block' : 'hidden'"
      class="min-h-screen bg-gray-50 dark:bg-slate-800 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-4xl mx-auto">
        <div class="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-slate-50">
              {{ isEditing ? 'Edit Tour' : 'Add New Tour' }}
            </h3>
            <button
              class="text-2xl text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 transition-colors"
              @click="closeForm"
            >
              ✕
            </button>
          </div>

          <form @submit.prevent="submitTour" class="space-y-6">
            <div>
              <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
                Title *
              </label>
              <input
                v-model="form.title"
                type="text"
                required
                class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="Enter tour title"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
                Description
              </label>
              <textarea
                v-model="form.description"
                rows="3"
                class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="Enter tour description"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  class="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300"
                >
                  Category *
                </label>
                <select
                  v-model="form.category_id"
                  required
                  class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  <option value="" disabled>Select a category</option>
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.category_name }}
                  </option>
                </select>
              </div>

              <div>
                <label
                  class="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300"
                >
                  City *
                </label>
                <select
                  v-model="form.city_id"
                  required
                  class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  <option value="" disabled>Select a city</option>
                  <option
                    v-for="city in cities"
                    :key="city.id"
                    :value="city.id"
                  >
                    {{ city.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
                  Duration (days) *
                </label>
                <input
                  v-model.number="form.duration_days"
                  type="number"
                  min="1"
                  required
                  class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
                  Status
                </label>
                <select
                  v-model="form.status"
                  class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
                Created By
              </label>

              <input
                v-model="form.created_by"
                type="text"
                :required="!isEditing"
                :disabled="isEditing"
                class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
                placeholder="User ID (e.g., 1)"
              />
            </div>


            <!-- Images Section -->
            <div>
              <label class="block text-sm font-medium mb-4 text-gray-700 dark:text-slate-300">
                Tour Images {{ isEditing ? '(Optional - will replace existing)' : '' }}
              </label>
              
              <!-- Upload Area -->
              <div class="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-2 hover:border-indigo-400 transition-all bg-gray-50 dark:bg-slate-800/50">
                <input
                  ref="imageInput"
                  type="file"
                  multiple
                  accept="image/*"
                  @change="handleImageSelect"
                  class="hidden"
                />
                <button
                  type="button"
                  @click="imageInput?.click()"
                  class="flex flex-col items-center justify-center w-full text-center py-8 cursor-pointer"
                  :disabled="form.newImages.length >= 10"
                >
                  <svg class="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m0 0l9 9m-9-9l9-9M20 20v16m0 0H4m16 0h16"/>
                  </svg>
                  <p class="text-lg font-medium text-gray-900 dark:text-slate-50 mb-1">
                    {{ form.newImages.length === 0 ? 'Choose images or skip' : `${form.newImages.length}/10 image(s) selected` }}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-slate-400">
                    Click to select multiple images (Max 10)
                  </p>
                </button>
              </div>

              <!-- Selected Images Preview with Alt Text -->
              <div v-if="form.newImages.length > 0" class="mt-6">
                <h4 class="text-sm font-medium text-gray-900 dark:text-slate-50 mb-4">
                  Selected Images ({{ form.newImages.length }}/10)
                </h4>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  <div
                    v-for="(image, index) in form.newImages"
                    :key="index"
                    class="relative group bg-gray-50 dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700 hover:border-indigo-300 transition-all"
                  >
                    <!-- Image Preview -->
                    <div class="relative mb-3">
                      <img
                        :src="image.preview"
                        :alt="image.altText || 'Tour image preview'"
                        class="w-full h-24 object-cover rounded-lg border shadow-sm"
                        loading="lazy"
                      />
                      <!-- Remove Button -->
                      <button
                        type="button"
                        @click="removeNewImage(index)"
                        class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shadow-lg hover:bg-red-600 transition-all z-10"
                        title="Remove image"
                      >
                        ×
                      </button>
                    </div>

                    <!-- Replace the Alt Text Input section with this fixed version -->
                    <div class="space-y-2">
                      <label class="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">
                        Alt Text (for accessibility)
                      </label>
                      <div class="relative">
                        <input
                          v-model="image.altText"
                          @input="updateNewImageAlt(index, $event.target.value)"
                          :maxlength="100"
                          placeholder="Describe this image (e.g., 'Mountain view at sunset')"
                          class="w-full px-3 py-2 pr-16 text-xs border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                        <!-- ✅ Fixed: Added padding-right + smaller counter -->
                        <div class="absolute right-1 top-1/2 -translate-y-1/2 text-xs text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-1 rounded">
                          {{ image.altText.length }}/100
                        </div>
                      </div>
                      <p v-if="image.altText" class="text-xs text-gray-500 dark:text-slate-400 mt-1 break-words max-w-full">
                        Preview: <span class="font-normal">{{ image.altText }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                class="px-6 py-3 text-sm border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                @click="closeForm"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isSubmitting || !form.title || !form.category_id || !form.city_id"
                class="px-6 py-3 text-sm bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium transition-colors"
              >
                <span v-if="isSubmitting">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
                <span v-else>{{ isEditing ? 'Update Tour' : 'Create Tour' }}</span>
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
const isEditing = ref(false)
const isSubmitting = ref(false)

const tours = ref([])
const categories = ref([])
const cities = ref([])

const imageInput = ref(null)

let dataTable = null

const form = ref({
  id: null,
  title: '',
  description: '',
  category_id: '',
  city_id: '',
  duration_days: 1,
  status: 'draft',
  created_by: '1',
  newImages: []
})

const TOURS_QUERY = `
  query {
    tours {
      id
      title
      description
      category_id
      city_id
      duration_days
      created_by
      status
      images { id file_url alt_text }
      category { category_name }
      city { name }
    }
    categories { id category_name }
    cities { id name }
  }
`

const CREATE_TOUR = `
  mutation CreateTour(
    $title: String!
    $description: String
    $category_id: UUID!
    $city_id: UUID!
    $duration_days: Int!
    $created_by: UUID!
    $status: String!
    $images: [TourImageInput!]
  ) {
    createTour(
      title: $title
      description: $description
      category_id: $category_id
      city_id: $city_id
      duration_days: $duration_days
      created_by: $created_by
      status: $status
      images: $images
    ) {
      id
      title
      description
      category_id
      city_id
      duration_days
      status
    }
  }
`

const UPDATE_TOUR = `
  mutation UpdateTour(
    $id: UUID!
    $title: String
    $description: String
    $category_id: UUID
    $city_id: UUID
    $duration_days: Int
    $status: String
    $images: [TourImageInput!]
  ) {
    updateTour(
      id: $id
      title: $title
      description: $description
      category_id: $category_id
      city_id: $city_id
      duration_days: $duration_days
      status: $status
      images: $images
    ) {
      id
      title
      description
      category_id
      city_id
      duration_days
      status
    }
  }
`

const DELETE_TOUR = `
  mutation DeleteTour($id: UUID!) {
    deleteTour(id: $id) {
      id
    }
  }
`

const GET_TOUR = `
  query GetTour($id: UUID!) {
    tour(id: $id) {
      id
      title
      description
      category_id
      city_id
      duration_days
      status
      created_by
      images { id file_url alt_text }
      category { category_name }
      city { name }
    }
  }
`

/* NEW — presigned upload mutation */
const GET_UPLOAD_URL = `
mutation GetUploadUrl($folder:String!, $fileName:String!, $contentType:String!){
  getUploadUrl(folder:$folder, fileName:$fileName, contentType:$contentType){
    uploadUrl
    publicUrl
  }
}
`

// S3 upload logic
const uploadFileToS3 = async (file) => {
  const res = await fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_UPLOAD_URL,
      variables: {
        folder: 'tours',
        fileName: file.name,
        contentType: file.type
      }
    })
  })

  const { data } = await res.json()

  const uploadUrl = data.getUploadUrl.uploadUrl
  const publicUrl = data.getUploadUrl.publicUrl

  await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file
  })

  return publicUrl
}

/* upload ALL images before mutation */
const prepareImagesForMutation = async () => {
  const result = []

  for (const img of form.value.newImages) {
    const url = await uploadFileToS3(img.file)

    result.push({
      file_url: url,
      alt_text: img.altText || null
    })
  }

  return result
}

const resetForm = () => {
  form.value = {
    id: null,
    title: '',
    description: '',
    category_id: '',
    city_id: '',
    duration_days: 1,
    status: 'draft',
    created_by: '1',
    newImages: []
  }
  isEditing.value = false
  if (imageInput.value) {
    imageInput.value.value = ''
  }
}

const openCreate = () => {
  resetForm()
  showForm.value = true
}

const openEdit = async (tour) => {
  try {
    // Sirf YE tour fetch karo
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: GET_TOUR,
        variables: { id: tour.id }
      })
    });

    const { data, errors } = await res.json();
    
    if (errors?.length || !data?.tour) {
      alert('Failed to load tour details');
      return;
    }

    // Sirf YE tour ka data form mein
    form.value = {
      id: data.tour.id,
      title: data.tour.title,
      description: data.tour.description || '',
      category_id: data.tour.category_id,
      city_id: data.tour.city_id,
      duration_days: data.tour.duration_days,
      status: data.tour.status,
      created_by: data.tour.created_by || '1',
      newImages: []
    };
    
  } catch (err) {
    console.error('Error loading tour:', err);
    alert('Failed to load tour');
  }

  isEditing.value = true;
  showForm.value = true;
}

const closeForm = () => {
  showForm.value = false
}

const handleImageSelect = (event) => {
  const files = Array.from(event.target.files)
  const maxImages = 10
  const availableSlots = maxImages - form.value.newImages.length
  if (availableSlots <= 0) {
    alert('Maximum 10 images allowed!')
    return
  }
  
  files.slice(0, availableSlots).forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.value.newImages.push({
        file,
        preview: e.target.result,
        altText: ''
      })
    }
    reader.readAsDataURL(file)
  })
}

const removeNewImage = (index) => {
  form.value.newImages.splice(index, 1)
}

const updateNewImageAlt = (index, altText) => {
  form.value.newImages[index].altText = altText.trim().slice(0, 100)
}

// Create and Update
const submitTour = async () => {
  const hasImagesWithoutAlt = form.value.newImages.some(img => !img.altText)
  if (hasImagesWithoutAlt && !confirm('Some images lack alt text. Continue anyway?')) {
    return
  }

  isSubmitting.value = true

  try {
    /* upload images FIRST */
    const imagesInput =
      form.value.newImages.length > 0
        ? await prepareImagesForMutation()
        : []

    const isUpdate = isEditing.value && form.value.id

    await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: isUpdate ? UPDATE_TOUR : CREATE_TOUR,
        variables: isUpdate
          ? {
              id: form.value.id,
              title: form.value.title || undefined,
              description: form.value.description || undefined,
              category_id: form.value.category_id || undefined,
              city_id: form.value.city_id || undefined,
              duration_days: Number(form.value.duration_days),
              status: form.value.status || undefined,
              images: imagesInput
            }
          : {
              title: form.value.title,
              description: form.value.description || null,
              category_id: form.value.category_id,
              city_id: form.value.city_id,
              duration_days: Number(form.value.duration_days),
              created_by: form.value.created_by,
              status: form.value.status,
              images: imagesInput
            }
      })
    })

    alert(isUpdate ? 'Tour updated successfully!' : 'Tour created successfully!')
    closeForm()
    window.location.reload()
  } catch (err) {
    console.error('Error:', err)
    alert(err.message || 'Operation failed')
  } finally {
    isSubmitting.value = false
  }
}

const deleteTour = async (tour) => {
  if (!confirm(`Delete tour "${tour.title}"?`)) return

  try {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: DELETE_TOUR,
        variables: { id: tour.id }
      })
    })

    if (!res.ok) throw new Error(`HTTP error ${res.status}`)

    const { errors } = await res.json()
    if (errors && errors.length) {
      throw new Error(errors[0].message || 'Delete failed')
    }

    alert('Tour deleted successfully!')
    window.location.reload()
  } catch (err) {
    console.error('Error:', err)
    alert(err.message || 'Delete failed')
  }
}

const loadTours = async () => {
  try {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: TOURS_QUERY })
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)

    const { data, errors } = await res.json()
    if (errors && errors.length) {
      throw new Error(errors[0].message || 'Failed to load tours')
    }

    tours.value = data?.tours || []
    categories.value = data?.categories || []
    cities.value = data?.cities || []

    await nextTick()
    if (dataTable) dataTable.destroy()
    dataTable = $('#tours-table').DataTable()
  } catch (err) {
    console.error('Load error:', err)
    alert(`Failed to load tours: ${err.message}`)
  }
}

onMounted(async () => {
  await loadTours()
})
</script>

