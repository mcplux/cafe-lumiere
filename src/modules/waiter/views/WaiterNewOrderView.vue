<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

import { useMenuStore } from '@/modules/menu/stores/menu.store'
import { useOrdersStore } from '@/modules/orders/stores/orders.store'
import OrderMenu from '@/modules/orders/components/OrderMenu.vue'
import OrderPreview from '@/modules/orders/components/OrderPreview.vue'

const menuStore = useMenuStore()
const ordersStore = useOrdersStore()

const tabNames = ['Menu', 'Preview Order']

const orderTotal = ref(0)

onMounted(async () => {
  await menuStore.getMenuItems()
})

onUnmounted(() => {
  ordersStore.orderItems = []
})

watch(ordersStore, () => {
  orderTotal.value = ordersStore.orderItems.reduce((total, orderItem) => {
    return orderItem.quantity * orderItem.menuItem.price + total
  }, 0)
})
</script>

<template>
  <h1 class="text-3xl text-center font-bold">New Order</h1>

  <div class="w-full mt-10">
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
          <OrderMenu :menu-items="menuStore.menuItems" @add-order-item="ordersStore.addOrderItem" />
        </TabPanel>

        <TabPanel>
          <OrderPreview :order-total="orderTotal" />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
