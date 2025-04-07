<template>
  <header class="sticky top-0 items-center bg-gray-600 text-white p-5">
    <h1 class="text-4xl font-bold">Café Lumière</h1>
  </header>

  <main class="max-w-4xl mx-auto mt-10">
    <RouterView />
  </main>

  <footer class="text-center text-gray-400 text-sm mt-10 mb-5">
    &copy; Cafe Lumiere. All rights reserved {{ new Date().getFullYear() }}
  </footer>
</template>
