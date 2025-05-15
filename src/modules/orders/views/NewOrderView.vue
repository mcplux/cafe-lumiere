<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import TitlePage from '@/modules/common/components/TitlePage.vue'
import OrderMenu from '../components/OrderMenu.vue'
import OrderPreview from '../components/OrderPreview.vue'

const tabNames = ['Menu', 'Preview Order']
</script>

<template>
  <TitlePage title="New Order" />

  <div class="mt-10">
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
</template>
