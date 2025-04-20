<script setup lang="ts">
import { onMounted } from 'vue'

import { useMenuStore } from '@/modules/menu/stores/menu.store'
import { useOrdersStore } from '@/modules/orders/stores/orders.store'
import OrderItemPreviewCard from '@/modules/orders/components/OrderItemPreviewCard.vue'
import OrderMenuItemCard from '@/modules/orders/components/OrderMenuItemCard.vue'

const menuStore = useMenuStore()
const ordersStore = useOrdersStore()

onMounted(async () => {
  await menuStore.getMenuItems()
})
</script>

<template>
  <h1 class="text-3xl text-center font-bold">New Order</h1>

  <div class="mt-10">
    <h2 class="text-xl font-bold">Order Preview</h2>

    <p v-if="ordersStore.isEmptyOrder" class="text-gray-700 text-lg text-center mt-5">
      The order is empty
    </p>

    <div class="flex flex-col gap-3 mt-5" v-else>
      <OrderItemPreviewCard
        v-for="orderItem in ordersStore.orderItems"
        :key="orderItem.menuItemId"
        :order-item="orderItem"
        @remove-order-item="ordersStore.removeOrderItem"
        @increase-quantity="ordersStore.increaseQuantity"
        @decrease-quantity="ordersStore.decreaseQuantity"
      />
    </div>
  </div>

  <div class="mt-10">
    <h2 class="text-xl font-bold">Menu</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-5">
      <OrderMenuItemCard
        v-for="menuItem in menuStore.menuItems"
        :key="menuItem.id"
        :menu-item="menuItem"
        @add-order-item="ordersStore.addOrderItem"
      />
    </div>
  </div>
</template>
