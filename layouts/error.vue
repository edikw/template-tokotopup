<template>
  <div>
    <div v-if="error.statusCode === 404" class="w-full h-screen justify-center">
      <!-- <div class="w-full text-center">
        <img src="/img/err.svg" class="h-96 mx-auto pl-12" alt="" />
      </div> -->
      <div class="w-full text-center">
        <h1 class="mb-4 text-lg font-bold">Laman tidak ditemukan</h1>
        <button
          class="px-4 py-2 bg-primary-default text-white rounded-md"
          @click.prevent="$router.go(-1)"
        >
          Kembali
        </button>
      </div>
    </div>
    <div v-else class="w-full h-screen justify-center">
      <!-- <div class="w-full text-center">
        <img src="/img/err.svg" class="h-96 mx-auto pl-12" alt="" />
      </div> -->
      <div class="w-full text-center">
        <h1 class="mb-4 text-lg font-bold">Ada kesalahan</h1>
        <button
          class="px-4 py-2 bg-primary-default text-white rounded-md"
          @click.prevent="$router.go(-1)"
        >
          Kembali
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  layout: 'error',
  props: ['error'], // you can set a custom layout for the error page
}
</script>
