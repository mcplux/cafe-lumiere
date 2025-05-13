<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { useMenuStore } from '../stores/menu.store'

const props = defineProps<{
  formData: {
    name: string
    price: number
    description: string
  }
}>()

const emit = defineEmits<{
  updateFormData: [event: Event]
}>()

const toast = useToast()
const router = useRouter()

const menuStore = useMenuStore()

const handleSubmit = async () => {
  if (Object.values(props.formData).includes('')) {
    toast.error('All fields are required')
    return
  }

  if (props.formData.price <= 0) {
    toast.error('Price must be positive')
    return
  }

  const [ok, msg] = await menuStore.createMenuItem(props.formData)

  if (!ok) {
    toast.error(msg)
    return
  }

  toast.success(msg)
  router.push({ name: 'menu-management' })
}
</script>

<template>
  <form
    class="mt-5 w-full sm:w-2/3 mx-auto px-3 flex flex-col gap-3"
    @submit.prevent="handleSubmit"
  >
    <div class="flex flex-col gap-1">
      <label for="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        class="border border-gray-700 rounded px-2 py-1 w-full"
        :value="formData.name"
        @input="(e) => emit('updateFormData', e)"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label for="price">Price:</label>
      <input
        type="number"
        id="price"
        name="price"
        class="border border-gray-700 rounded px-2 py-1 w-full"
        :value="formData.price"
        @input="(e) => emit('updateFormData', e)"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label for="description">Description:</label>
      <textarea
        id="description"
        name="description"
        class="border border-gray-700 rounded px-2 py-1 w-full"
        :value="formData.description"
        @input="(e) => emit('updateFormData', e)"
      />
    </div>

    <button class="bg-blue-600 py-1 rounded text-white mt-2" type="submit">Create New Item</button>
  </form>
</template>
