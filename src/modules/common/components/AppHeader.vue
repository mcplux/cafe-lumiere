<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

interface Props {
  routes: {
    to: { name: string }
    title: string
  }[]
}

defineProps<Props>()
</script>

<template>
  <header class="sticky top-0 z-10">
    <div class="bg-amber-500 text-white px-5 py-7 flex items-center justify-between shadow-lg">
      <RouterLink class="text-3xl md:text-4xl font-bold text-gray-50" :to="'/'">
        Café Lumière
      </RouterLink>

      <div class="text-right">
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton
              class="flex w-full items-center gap-2 rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
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
              <MenuItem v-slot="{ active }" v-for="route in routes" :key="route.title">
                <RouterLink
                  :class="[
                    active ? 'bg-orange-500 text-white' : 'text-gray-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                  :to="route.to"
                >
                  {{ route.title }}
                </RouterLink>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </header>
</template>
