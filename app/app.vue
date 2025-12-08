<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  link: [
    { rel: 'stylesheet', href: 'https://cdn.datatables.net/2.3.5/css/dataTables.dataTables.min.css' }
  ],
  script: [
    { src: 'https://code.jquery.com/jquery-3.7.1.min.js', body: true },
    { src: 'https://cdn.datatables.net/2.3.5/js/dataTables.min.js', body: true }
  ]
})
</script>

