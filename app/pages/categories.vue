<template>
  <div>
    <!-- LIST VIEW -->
    <div :class="showForm ? 'hidden' : 'block'">
      <div class="flex justify-between items-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-slate-50">
          Categories Management
        </h1>
        <button
          class="px-8 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 font-semibold"
          @click="openCreate"
        >
          + Add Category
        </button>
      </div>

      <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-200 dark:border-slate-700">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-slate-50">
            Tour Categories
          </h2>
        </div>

        <div class="overflow-x-auto p-6">
          <table
            id="categories-table"
            class="display min-w-full border-collapse text-gray-900 dark:text-slate-100"
          >
            <thead>
              <tr class="bg-gray-50 dark:bg-slate-800">
                <th class="border-b border-gray-200 dark:border-slate-700 p-3">S.No.</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-3">Image</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-3">Category</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-3">Description</th>
                <th class="border-b border-gray-200 dark:border-slate-700 p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(cat, index) in categories"
                :key="cat.id"
                class="hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                <td class="border-b border-gray-200 dark:border-slate-700 p-3">
                  {{ index + 1 }}
                </td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-3">
                  <div v-if="cat.images && cat.images.length > 0" class="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-700">
                    <img
                      :src="cat.images[0].file_url"
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div v-else class="w-12 h-12 rounded-lg bg-gray-200 dark:bg-slate-600 flex items-center justify-center">
                    <span class="text-xs text-gray-500 dark:text-slate-400">No Image</span>
                  </div>
                </td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-3 font-medium">
                  {{ cat.category_name }}
                </td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-3">
                  {{ cat.description }}
                </td>
                <td class="border-b border-gray-200 dark:border-slate-700 p-3">
                  <div class="flex gap-2">
                    <button
                      class="px-3 py-1 text-blue-600 border border-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:hover:bg-slate-700 rounded-lg text-sm"
                      @click="openEdit(cat)"
                    >
                      Edit
                    </button>
                    <button
                      class="px-3 py-1 text-red-600 border border-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-slate-700 rounded-lg text-sm"
                      @click="deleteCategory(cat)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="categories.length === 0">
                <td colspan="5" class="border-b border-gray-200 dark:border-slate-700 p-12 text-center text-gray-500 dark:text-slate-400">
                  No categories found. Create your first category!
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
              {{ isEditing ? 'Edit Category' : 'Add New Category' }}
            </h3>
            <button
              class="text-2xl text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 transition-colors"
              @click="closeForm"
            >
              ✕
            </button>
          </div>

          <form @submit.prevent="submitCategory" class="space-y-6">
            <div>
              <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
                Category Name *
              </label>
              <input
                v-model="form.category_name"
                type="text"
                required
                class="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
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
              ></textarea>
            </div>

            <!-- Images Section (same as Tours/Packages) -->
            <div>
              <label class="block text-sm font-medium mb-4 text-gray-700 dark:text-slate-300">
                Category Images {{ isEditing ? '(Optional - will replace existing)' : '' }}
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
                  @click="$refs.imageInput?.click()"
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
                    class="relative group bg-gray-50 dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700 hover:border-indigo-300 transition-all"
                  >
                    <div class="relative mb-3">
                      <img
                        :src="image.preview"
                        :alt="'Category image preview'"
                        class="w-full h-24 object-cover rounded-lg border shadow-sm"
                        loading="lazy"
                      />
                      <button
                        type="button"
                        @click="removeNewImage(index)"
                        class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shadow-lg hover:bg-red-600 transition-all z-10"
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
                :disabled="isSubmitting || !form.category_name"
                class="px-6 py-3 text-sm bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium transition-colors"
              >
                <span v-if="isSubmitting">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
                <span v-else>{{ isEditing ? 'Update Category' : 'Create Category' }}</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const { getAuthHeaders } = useGraphQL()
const showForm = ref(false)
const isEditing = ref(false)
const isSubmitting = ref(false)

const imageInput = ref(null)
let dataTable = null

const form = ref({
  id: null,
  category_name: '',
  description: '',
  existingImages: [],
  newImages: []
})

const categories = ref([])

const CATEGORIES_QUERY = `
  query {
    categories {
      id
      category_name
      description
      images { id file_url alt_text }
    }
  }
`

const CREATE_CATEGORY = `
  mutation CreateCategory(
    $category_name: String!
    $description: String
    $images: [CategoryImageInput!]
  ) {
    createCategory(
      category_name: $category_name
      description: $description
      images: $images
    ) {
      id
      category_name
      description
      images { id file_url alt_text }
    }
  }
`

const UPDATE_CATEGORY = `
  mutation UpdateCategory(
    $id: UUID!
    $category_name: String
    $description: String
    $images: [CategoryImageInput!]
  ) {
    updateCategory(
      id: $id
      category_name: $category_name
      description: $description
      images: $images
    ) {
      id
      category_name
      description
      images { id file_url alt_text }
    }
  }
`

const DELETE_CATEGORY = `
  mutation DeleteCategory($id: UUID!) {
    deleteCategory(id: $id) { id }
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
        folder: 'categories',
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

// form logic
const resetForm = () => {
  form.value = {
    id: null,
    category_name: '',
    description: '',
    newImages: []
  }
  isEditing.value = false
}

const openCreate = () => {
  resetForm()
  showForm.value = true
}

const openEdit = async (category) => {
  try {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        query: `
          query GetCategory($id: UUID!) {
            category(id: $id) {
              id
              category_name
              description
              images { id file_url alt_text }
            }
          }
        `,
        variables: { id: category.id }
      })
    })

    const { data, errors } = await res.json()
    
    if (!res.ok || errors?.length || !data?.category) {
      alert('Failed to load category details')
      return
    }

    form.value = {
      id: data.category.id,
      category_name: data.category.category_name,
      description: data.category.description || '',
      existingImages: data.category.images || [],
      newImages: []
    }
    
  } catch (err) {
    console.error('Error loading category:', err)
    alert('Failed to load category')
  }

  isEditing.value = true
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
}

const handleImageSelect = (event) => {
  const files = Array.from(event.target.files || [])
  const maxImages = 10
  const availableSlots = maxImages - form.value.newImages.length
  
  if (availableSlots <= 0) {
    alert('Maximum 10 images allowed!')
    return
  }
  
  files.slice(0, availableSlots).forEach(file => {
    const reader = new FileReader()
    
    reader.onload = e => {
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
const submitCategory = async () => {
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
        query: isUpdate ? UPDATE_CATEGORY : CREATE_CATEGORY,
        variables: isUpdate
          ? {
              id: form.value.id,
              category_name: form.value.category_name || undefined,
              description: form.value.description || undefined,
              images: imagesInput
            }
          : {
              category_name: form.value.category_name,
              description: form.value.description || null,
              images: imagesInput
            }
      })
    })

    alert(isUpdate ? 'Category updated successfully!' : 'Category created successfully!')
    closeForm()
    window.location.reload()
  } catch (err) {
    console.error('Error:', err)
    alert(err.message || 'Operation failed')
  } finally {
    isSubmitting.value = false
  }
}

// Delete
const deleteCategory = async (category) => {
  if (!confirm(`Delete category "${category.category_name}"?`)) return

  try {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        query: DELETE_CATEGORY,
        variables: { id: category.id }
      })
    })

    if (!res.ok) throw new Error(`HTTP error ${res.status}`)

    const { errors } = await res.json()
    if (errors && errors.length) {
      throw new Error(errors[0].message || 'Delete failed')
    }

    alert('Category deleted successfully!')
    window.location.reload()
  } catch (err) {
    console.error('Error:', err)
    alert(err.message || 'Delete failed')
  }
}

// load
const loadCategories = async () => {
  try {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ query: CATEGORIES_QUERY })
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)

    const { data, errors } = await res.json()
    if (errors && errors.length) {
      throw new Error(errors[0].message || 'Failed to load categories')
    }

    categories.value = data?.categories || []

    await nextTick()
    if (dataTable) dataTable.destroy()
    dataTable = $('#categories-table').DataTable()
  } catch (err) {
    console.error('Load error:', err)
    alert(`Failed to load categories: ${err.message}`)
  }
}

onMounted(loadCategories)
</script>
