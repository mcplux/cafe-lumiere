<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import { useMenuStore } from '@/modules/menu/stores/menu.store'
import { useOrdersStore } from '@/modules/orders/stores/orders.store'
import OrderItemPreviewCard from '@/modules/orders/components/OrderItemPreviewCard.vue'
import OrderMenuItemCard from '@/modules/orders/components/OrderMenuItemCard.vue'
import { formatCurrency } from '@/modules/common/helpers'

const menuStore = useMenuStore()
const ordersStore = useOrdersStore()

const orderTotal = ref(0)

onMounted(async () => {
  await menuStore.getMenuItems()
})

watch(ordersStore, () => {
  orderTotal.value = ordersStore.orderItems.reduce((total, orderItem) => {
    const menuItem = menuStore.menuItems.find((item) => item.id === orderItem.menuItemId)

    if (!menuItem) return total

    return orderItem.quantity * menuItem.price + total
  }, 0)
})
</script>

<template>
  <h1 class="text-3xl text-center font-bold">New Order</h1>

  <div class="mt-10">
    <h2 class="text-xl font-bold">Order Preview</h2>

    <p v-if="ordersStore.isEmptyOrder" class="text-gray-700 text-lg text-center mt-5">
      The order is empty
    </p>

    <div v-else>
      <div class="flex flex-col gap-3 mt-5">
        <OrderItemPreviewCard
          v-for="orderItem in ordersStore.orderItems"
          :key="orderItem.menuItemId"
          :order-item="orderItem"
          @remove-order-item="ordersStore.removeOrderItem"
          @increase-quantity="ordersStore.increaseQuantity"
          @decrease-quantity="ordersStore.decreaseQuantity"
        />
      </div>

      <p class="text-lg text-right mt-5">
        Total: <span class="font-bold">{{ formatCurrency(orderTotal) }}</span>
      </p>

      <div class="flex justify-end mt-5">
        <button class="text-white bg-orange-400 px-3 py-2 rounded w-full sm:w-auto">
          Preview Order
        </button>
      </div>
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
