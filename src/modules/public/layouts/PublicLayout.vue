<script setup lang="ts"></script>

<template>
  <header class="sticky top-0">
    <div class="bg-amber-500 text-white px-5 py-7 flex items-center justify-between shadow-lg">
      <RouterLink class="text-3xl md:text-4xl font-bold text-gray-50" :to="'/'"
        >Café Lumière</RouterLink
      >

      <div class="flex gap-5">
        <RouterLink :to="'/'" class="text-white md:text-lg">Home</RouterLink>
        <RouterLink :to="{ name: 'public-menu' }" class="text-white md:text-lg">Menu</RouterLink>
      </div>
    </div>
  </header>

  <main class="max-w-4xl mx-auto mt-5 md:mt-10">
    <RouterView />
  </main>

  <footer class="text-center text-gray-400 text-sm mt-10 mb-5">
    &copy; Café Lumière. All rights reserved {{ new Date().getFullYear() }}
  </footer>
</template>
