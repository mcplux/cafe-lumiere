<script setup lang="ts">
import TitlePage from '@/modules/common/components/TitlePage.vue'
import CreateEditMenuItemForm from '../components/CreateEditMenuItemForm.vue'
import { ref } from 'vue'

const formData = ref<{
  name: string
  price: number
  description: string
}>({
  name: '',
  price: 0,
  description: '',
})

const updateFormData = (e: Event) => {
  const name = (e.target as HTMLInputElement).name
  const value = (e.target as HTMLInputElement).value

  if (name === 'price') {
    formData.value[name] = isNaN(+value) ? 0 : +value
  }

  if (name === 'name' || name === 'description') {
    formData.value[name] = value
  }
}
</script>

<template>
  <TitlePage title="Create Menu Item" />

  <CreateEditMenuItemForm :form-data="formData" @update-form-data="updateFormData" />
</template>
