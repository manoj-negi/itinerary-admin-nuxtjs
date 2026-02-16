<template>
  <div>
    <!-- LIST VIEW -->
    <div :class="showForm ? 'hidden' : 'block'">
      <div class="flex justify-between items-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-slate-50">
          Points of Interest
        </h1>
        <button
          class="px-8 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 font-semibold"
          @click="openCreate"
        >
          + Add POI
        </button>
      </div>

      <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-200 dark:border-slate-700">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-slate-50">
            All POIs
          </h2>
        </div>

        <div class="overflow-x-auto p-6">
          <table id="pois-table" class="display min-w-full border-collapse text-gray-900 dark:text-slate-100">
            <thead>
              <tr class="bg-gray-50 dark:bg-slate-800">
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">S.No.</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Image</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Name</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Description</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">City</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Type</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(poi, index) in pois"
                :key="poi.id"
                class="hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">{{ index + 1 }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">
                  <div
                    v-if="poi.images && poi.images.length > 0"
                    class="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-700"
                  >
                    <img
                      :src="poi.images[0].file_url"
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div
                    v-else
                    class="w-12 h-12 rounded-lg bg-gray-200 dark:bg-slate-600 flex items-center justify-center"
                  >
                    <span class="text-xs px-2 text-gray-500 dark:text-slate-400">No Image</span>
                  </div>
                </td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4 font-semibold">{{ poi.name }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4 max-w-xs truncate">{{ poi.description }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">{{ poi.city?.name || 'N/A' }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">{{ poi.type }}</td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-4">
                  <div class="flex gap-2">
                    <button
                      class="px-3 py-1 text-blue-600 border border-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors"
                      @click="openEdit(poi)"
                    >
                      Edit
                    </button>
                    <button
                      class="px-3 py-1 text-red-600 border border-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors"
                      @click="deletePoi(poi)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="pois.length === 0">
                <td colspan="7" class="border-b border-gray-200 dark:border-slate-700 p-12 text-center text-gray-500 dark:text-slate-400">
                  No POIs found. Create your first POI!
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
              {{ isEditing ? 'Edit POI' : 'Add New POI' }}
            </h3>

            <button
              class="text-2xl text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 transition-colors"
              @click="closeForm"
            >
              ✕
            </button>
          </div>

          <form @submit.prevent="submitPoi" class="space-y-6">
            <div>
              <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
                Name *
              </label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="Enter POI name"
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
                placeholder="Enter POI description"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
                  City *
                </label>
                <select
                  v-model="form.city_id"
                  required
                  class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  <option value="" disabled>Select a city</option>
                  <option v-for="c in cities" :key="c.id" :value="c.id">
                    {{ c.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
                  Type *
                </label>
                <select
                  v-model="form.type"
                  required
                  class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  <option value="landmark">landmark</option>
                  <option value="hotel">hotel</option>
                  <option value="restaurant">restaurant</option>
                  <option value="activity">activity</option>
                  <option value="transport">transport</option>
                </select>
              </div>
            </div>

            <!-- Images Section (same pattern as Tours - select + preview + alt text) -->
            <div>
              <label class="block text-sm font-medium mb-4 text-gray-700 dark:text-slate-300">
                POI Images {{ isEditing ? '(Optional - will replace existing)' : '' }}
              </label>

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

              <!-- ✅ Existing Images Preview (only in edit) -->
              <div v-if="isEditing && form.existingImages?.length" class="mt-4">
                <h4 class="text-sm font-medium text-gray-900 dark:text-slate-50 mb-3">
                  Existing Images ({{ form.existingImages.length }})
                </h4>

                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  <div
                    v-for="img in form.existingImages"
                    :key="img.id"
                    class="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700"
                  >
                    <img
                      :src="img.file_url"
                      :alt="img.alt_text || 'Category image'"
                      class="w-full h-24 object-cover rounded-lg border shadow-sm"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div v-if="form.newImages.length > 0" class="mt-6">
                <h4 class="text-sm font-medium text-gray-900 dark:text-slate-50 mb-4">
                  New Images ({{ form.newImages.length }}/10)
                </h4>

                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  <div
                    v-for="(image, index) in form.newImages"
                    :key="index"
                    class="relative group bg-gray-50 dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700"
                  >
                    <div class="relative mb-3">
                      <img
                        :src="image.preview"
                        :alt="'POI image preview'"
                        class="w-full h-24 object-cover rounded-lg border shadow-sm"
                        loading="lazy"
                      />
                      <button
                        type="button"
                        @click="removeNewImage(index)"
                        class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shadow-lg hover:bg-red-600"
                        title="Remove image"
                      >
                        ×
                      </button>
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
                :disabled="isSubmitting || !form.name || !form.city_id || !form.type"
                class="px-6 py-3 text-sm bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium transition-colors"
              >
                <span v-if="isSubmitting">Saving...</span>
                <span v-else>{{ isEditing ? 'Update POI' : 'Create POI' }}</span>
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

const { getAuthHeaders } = useGraphQL()
const showForm = ref(false)
const isEditing = ref(false)
const isSubmitting = ref(false)

const pois = ref([])
const cities = ref([])
const imageInput = ref(null)

let dataTable = null

const form = ref({
  id: null,
  name: '',
  description: '',
  city_id: '',
  type: 'landmark',
  existingImages: [],
  newImages: [] // [{ file, preview, altText }]
})

const POIS_QUERY = `
  query {
    pois {
      id
      name
      description
      city_id
      type
      images { id file_url alt_text }
      city { name }
    }
    cities {
      id
      name
    }
  }
`

const CREATE_POI = `
  mutation CreatePoi(
    $name: String!
    $description: String
    $city_id: UUID!
    $type: String!
    $images: [POIImageInput!]
  ) {
    createPOI(
      name: $name
      description: $description
      city_id: $city_id
      type: $type
      images: $images
    ) {
      id
      name
      description
      city_id
      type
    }
  }
`

const UPDATE_POI = `
  mutation UpdatePoi(
    $id: UUID!
    $name: String
    $description: String
    $city_id: UUID
    $type: String
    $images: [POIImageInput!]
  ) {
    updatePOI(
      id: $id
      name: $name
      description: $description
      city_id: $city_id
      type: $type
      images: $images
    ) {
      id
      name
      description
      city_id
      type
    }
  }
`

const DELETE_POI = `
  mutation DeletePoi($id: UUID!) {
    deletePOI(id: $id) {
      id
    }
  }
`

const GET_POI = `
  query GetPoi($id: UUID!) {
    poi(id: $id) {
      id 
      name 
      description 
      city_id 
      type
      images { id file_url alt_text }
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
    headers: getAuthHeaders(),
    body: JSON.stringify({
      query: GET_UPLOAD_URL,
      variables: {
        folder: 'pois',
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
      file_url: url
    })
  }

  return result
}

const resetForm = () => {
  form.value = {
    id: null,
    name: '',
    description: '',
    city_id: '',
    type: 'landmark',
    newImages: []
  }
  isEditing.value = false
  if (imageInput.value) imageInput.value.value = ''
}

const openCreate = () => {
  resetForm()
  showForm.value = true
}

const openEdit = async (poi) => {
  try {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        query: GET_POI,
        variables: { id: poi.id }
      })
    })

    const { data, errors } = await res.json()
    if (!res.ok || errors?.length || !data?.poi) {
      alert('Failed to load POI')
      return
    }

    form.value = {
      id: data.poi.id,
      name: data.poi.name,
      description: data.poi.description || '',
      city_id: data.poi.city_id,
      type: data.poi.type || 'landmark',
      existingImages: data.poi.images || [],
      newImages: []
    }
  } catch (err) {
    alert('Failed to load POI')
  }

  isEditing.value = true
  showForm.value = true
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
        preview: e.target.result
      })
    }
    reader.readAsDataURL(file)
  })
}

const removeNewImage = (index) => {
  form.value.newImages.splice(index, 1)
}

// Create and Update
const submitPoi = async () => {
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
      headers: getAuthHeaders(),
      body: JSON.stringify({
        query: isUpdate ? UPDATE_POI : CREATE_POI,
        variables: isUpdate
          ? {
              id: form.value.id,
              name: form.value.name || undefined,
              description: form.value.description || undefined,
              city_id: form.value.city_id || undefined,
              type: form.value.type || undefined,
              images: imagesInput
            }
          : {
              name: form.value.name,
              description: form.value.description || null,
              city_id: form.value.city_id,
              type: form.value.type,
              images: imagesInput
            }
      })
    })

    alert(isUpdate ? 'POI updated successfully!' : 'POI created successfully!')
    closeForm()
    window.location.reload()
  } catch (err) {
    console.error('Error:', err)
    alert(err.message || 'Operation failed')
  } finally {
    isSubmitting.value = false
  }
}

const deletePoi = async (poi) => {
  if (!confirm(`Delete POI "${poi.name}"?`)) return

  try {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        query: DELETE_POI,
        variables: { id: poi.id }
      })
    })

    if (!res.ok) throw new Error(`HTTP error ${res.status}`)

    const { errors } = await res.json()
    if (errors && errors.length) throw new Error(errors[0].message || 'Delete failed')

    alert('POI deleted successfully!')
    window.location.reload()
  } catch (err) {
    console.error('Error:', err)
    alert(err.message || 'Delete failed')
  }
}

const loadPois = async () => {
  try {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ query: POIS_QUERY })
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)

    const { data, errors } = await res.json()
    if (errors && errors.length) throw new Error(errors[0].message || 'Failed to load POIs')

    pois.value = data?.pois || []
    cities.value = data?.cities || []

    await nextTick()
    if (dataTable) dataTable.destroy()
    dataTable = $('#pois-table').DataTable()
  } catch (err) {
    console.error('Load error:', err)
    alert(`Failed to load POIs: ${err.message}`)
  }
}

onMounted(async () => {
  await loadPois()
})
</script>

