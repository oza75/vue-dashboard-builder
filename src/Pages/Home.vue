<template>
  <main class="min-h-screen min-w-full text-center px-8 py-8 min-w-full min-h-screen flex justify-center items-center">
    <div class="bg-white rounded px-8 py-8">
      <h1 class="text-2xl font-bold">Welcome to Vue Dashboard Generator</h1>
      <a class="font-bold text-blue-600" href="">See documentation</a>
      <p class="mt-4">You can overwrite this default page by create a <code
        class="px-3 py-1 rounded text-red-600 bg-gray-400 font-bold">dashboard-home</code> component and add it globally
      </p>
    </div>
  </main>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class DashboardHome extends Vue {
    name: string = 'Home';

    mounted () {
      // @ts-ignore
    }
  }
</script>
