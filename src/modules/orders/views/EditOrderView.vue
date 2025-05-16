<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

import type { Order } from '../interfaces'
import { useOrdersStore } from '../stores/orders.store'
import TitlePage from '@/modules/common/components/TitlePage.vue'
import OrderMenu from '../components/OrderMenu.vue'
import OrderPreview from '../components/OrderPreview.vue'
import LoadingSpinner from '@/modules/common/components/LoadingSpinner.vue'
import { onUnmounted } from 'vue'

const router = useRouter()
const route = useRoute()
const toast = useToast()

const ordersStore = useOrdersStore()

const id = route.params.id as string
const tabNames = ['Menu', 'Preview Order']

const order = ref<Order | null>(null)

onMounted(async () => {
  const [ok, orderReq, msg] = await ordersStore.getOrder(id)
  if (!ok) {
    toast.error(msg)
    return router.replace({ name: 'orders' })
  }

  order.value = orderReq
  if (!order.value) return

  //Map order
  ordersStore.order.client = order.value.client
  ordersStore.order.id = order.value.id
  ordersStore.order.notes = order.value.notes ?? ''
  ordersStore.order.orderStatus = order.value.orderStatus

  //Map items
  ordersStore.orderItems = order.value.orderItems
})

onUnmounted(() => {
  ordersStore.resetState()
})
</script>

<template>
  <TitlePage title="Edit Order" />

  <div class="mt-10" v-if="ordersStore.isSuccess">
    <TabGroup>
      <TabList class="flex gap-2 rounded-xl bg-orange-200 p-1">
        <Tab as="template" v-slot="{ selected }" v-for="tabName in tabNames" :key="tabName">
          <button
            :class="[
              'w-full rounded-lg text-sm font-bold py-2.5',
              'ring-none focus:outline-none text-white transition-colors',
              selected ? 'bg-orange-400' : 'hover:bg-orange-100',
            ]"
          >
            {{ tabName }}
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-2">
        <TabPanel>
          <OrderMenu />
        </TabPanel>
        <TabPanel>
          <OrderPreview />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>

  <LoadingSpinner v-if="ordersStore.isLoading" />
</template>
