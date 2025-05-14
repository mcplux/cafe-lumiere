<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import TitlePage from '@/modules/common/components/TitlePage.vue'
import { useMenuStore } from '../stores/menu.store'
import CreateEditMenuItemForm from '../components/CreateEditMenuItemForm.vue'
import LoadingSpinner from '@/modules/common/components/LoadingSpinner.vue'

const formData = ref<{
  id: string
  name: string
  price: number
  description: string
}>({
  id: '',
  name: '',
  price: 0,
  description: '',
})

const route = useRoute()
const router = useRouter()
const toast = useToast()

const menuStore = useMenuStore()

const id = route.params.id as string

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

onMounted(async () => {
  const [ok, menuItem, msg] = await menuStore.getMenuItem(id)

  if (!ok) {
    toast.error(msg)
    router.replace({ name: 'menu-management' })
    return
  }

  formData.value.id = menuItem.id
  formData.value.description = menuItem.description
  formData.value.name = menuItem.name
  formData.value.price = menuItem.price
})
</script>

<template>
  <TitlePage title="Edit Item" />

  <CreateEditMenuItemForm
    :form-data="formData"
    @update-form-data="updateFormData"
    v-if="menuStore.isSuccess"
  />

  <LoadingSpinner v-if="menuStore.isLoading" />
</template>
