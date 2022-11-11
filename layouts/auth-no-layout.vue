<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'AuthNoLayout',
  // middleware: 'auth',
  mounted() {
    this.auth()
  },
  methods: {
    auth() {
      const isLogin = this.$cookies.get('_x')
      const token = this.$cookies.get('_t')
      if (!isLogin || !token) {
        this.$router.push('/login')
      }
    },
  },
}
</script>
