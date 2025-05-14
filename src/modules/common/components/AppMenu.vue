<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  BookOpenIcon,
  ChartBarIcon,
  HomeIcon,
  ReceiptPercentIcon,
  Squares2X2Icon,
} from '@heroicons/vue/16/solid'

import { useAuthStore } from '@/modules/auth/stores/auth.store'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.replace({ name: 'login' })
}

onMounted(async () => {
  await authStore.checkAuthStatus()
})
</script>

<template>
  <div class="text-right">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="flex w-full items-center gap-2 rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          <Bars3Icon class="size-6" />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          <MenuItem v-slot="{ active }" v-if="authStore.isAdmin">
            <RouterLink
              :class="[
                active ? 'bg-orange-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2',
              ]"
              :to="{ name: 'admin-dashboard' }"
            >
              <ChartBarIcon class="size-4" />
              Dashboard
            </RouterLink>
          </MenuItem>

          <MenuItem v-slot="{ active }">
            <RouterLink
              :class="[
                active ? 'bg-orange-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2',
              ]"
              :to="{ name: 'home' }"
            >
              <HomeIcon class="size-4" />
              Home
            </RouterLink>
          </MenuItem>

          <MenuItem v-slot="{ active }">
            <RouterLink
              :class="[
                active ? 'bg-orange-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2',
              ]"
              :to="{ name: 'menu' }"
            >
              <BookOpenIcon class="size-4" />
              Menu
            </RouterLink>
          </MenuItem>

          <MenuItem v-slot="{ active }" v-if="authStore.isAdmin">
            <RouterLink
              :class="[
                active ? 'bg-orange-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2',
              ]"
              :to="{ name: 'menu-management' }"
            >
              <Squares2X2Icon class="size-4" />
              Manage Menu
            </RouterLink>
          </MenuItem>

          <MenuItem v-slot="{ active }" v-if="authStore.isWaiter">
            <RouterLink
              :class="[
                active ? 'bg-orange-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2',
              ]"
              :to="{ name: 'waiter-orders' }"
            >
              <ReceiptPercentIcon class="size-4" />
              Orders
            </RouterLink>
          </MenuItem>

          <MenuItem v-slot="{ active }" v-if="authStore.isAuthenticated">
            <button
              :class="[
                active ? 'bg-orange-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2',
              ]"
              @click="handleLogout"
            >
              <ArrowRightStartOnRectangleIcon class="size-4" />
              Logout
            </button>
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
