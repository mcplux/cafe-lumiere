<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { useOrdersStore } from '../stores/orders.store'
import OrderCard from '../components/OrderCard.vue'
import OrderFilters from '../components/OrderFilters.vue'
import TitlePage from '@/modules/common/components/TitlePage.vue'
import LoadingSpinner from '@/modules/common/components/LoadingSpinner.vue'
import AppPagination from '@/modules/common/components/AppPagination.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const ordersStore = useOrdersStore()

const LIMIT = isNaN(+import.meta.env.VITE_LIMIT) ? 50 : +import.meta.env.VITE_LIMIT

const currentPage = ref(route.query.page ? +route.query.page : 1)
const totalPages = ref(0)

const goToPage = async (page: number) => {
  currentPage.value = page
  await ordersStore.getOrders(currentPage.value)
}

onMounted(async () => {
  const now = new Date()

  ordersStore.dates.startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  ordersStore.dates.endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)

  const [ok, msg] = await ordersStore.getOrders(currentPage.value)
  if (!ok) {
    toast.error(msg)
  }
})

watch(currentPage, async (newPage) => {
  router.replace({ query: { ...route.query, page: newPage } })
})

watch(
  () => ordersStore.orders,
  () => {
    if (ordersStore.orders.length === 0 && currentPage.value !== 1) {
      currentPage.value = 1
      ordersStore.getOrders()
    }

    totalPages.value = Math.ceil(ordersStore.totalOrders / LIMIT)
  },
)
</script>

<template>
  <TitlePage title="Orders" />

  <div v-if="ordersStore.isSuccess">
    <div class="flex justify-end">
      <RouterLink
        :to="{ name: 'new-order' }"
        class="bg-orange-500 p-2 rounded text-white font-bold w-full sm:w-auto mt-5 text-center"
      >
        Add Order
      </RouterLink>
    </div>

    <OrderFilters />

    <p v-if="ordersStore.noOrders" class="text-center mt-10 text-gray-700 text-lg">No orders yet</p>

    <div v-else>
      <AppPagination
        :current-page="+currentPage"
        :total-pages="totalPages"
        :limit="LIMIT"
        :total-items="ordersStore.totalOrders"
        @go-to-page="goToPage"
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-10 gap-3">
        <OrderCard v-for="order in ordersStore.orders" :key="order.id" :order="order" />
      </div>

      <AppPagination
        :current-page="+currentPage"
        :total-pages="totalPages"
        :limit="LIMIT"
        :total-items="ordersStore.totalOrders"
        @go-to-page="goToPage"
      />
    </div>
  </div>

  <LoadingSpinner v-if="ordersStore.isLoading" />
</template>
