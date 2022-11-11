<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 min-h-screen gap-8"
  >
    <div
      class="
        hidden
        md:block
        lg:block
        md:bg-primary-default
        lg:bg-primary-default
      "
    >
      <div class="relative w-7/12">
        <!-- <img src="/apigames.png" class="absolute top-40 left-40" alt="" /> -->
      </div>
    </div>
    <div class="flex items-center min-h-screen w-full px-4 md:px-0 lg:px-0">
      <div class="w-full">
        <h1 class="text-2xl font-bold">Login</h1>
        <form class="w-96" @submit.prevent="login()">
          <form-input
            v-model="user.email"
            :required="true"
            type="email"
            label="Email"
            placeholder="Masukkan Email"
          />
          <form-input
            v-model="user.email"
            :required="true"
            type="number"
            label="ini nomor"
            placeholder="Masukkan Email"
          />
          <form-input
            v-model="user.password"
            :required="true"
            type="password"
            label="Password"
            placeholder="Masukkan Password"
          />
          <div>
            <div class="text-sm mb-4">
              <span>Belum Punya Akun ?</span>
              <nuxt-link
                to="/register"
                class="font-bold text-primary-dark underline"
                >Register</nuxt-link
              >
            </div>
            <div class="text-sm mb-4">
              <nuxt-link
                to="/forgot-password"
                class="font-bold text-primary-dark underline"
                >Lupa Password ?</nuxt-link
              >
            </div>

            <button :disabled="loading" type="submit" class="btn-primary">
              <i v-if="loading" class="fas fa-spinner animate animate-spin"></i>
              <span v-else>Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'no-auth',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      loading: false,
    }
  },
  async mounted() {
    try {
      await this.$recaptcha.init()
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    login() {
      console.log(this.user)
      // this.loading = true
      // const token = await this.$recaptcha.execute('login')
      // const res = await this.$axios('POST', '/v1/login', {
      //   ...this.user,
      //   token,
      // })
      // this.loading = false
      // if (res.status) {
      //   this.$cookies.set('_vtk_m', res.data.jwt.token, {
      //     path: '/',
      //     maxAge: 60 * 60 * 24 * 30,
      //   })
      //   this.$cookies.set('_vrf_m', res.data.jwt.token_refresh, {
      //     path: '/',
      //     maxAge: 60 * 60 * 24 * 30,
      //   })
      //   this.$cookies.set('_vus_m', res.data.data, {
      //     path: '/',
      //     maxAge: 60 * 60 * 24 * 30,
      //   })
      //   this.$toast.success(res.message)
      //   window.location = '/'
      // } else {
      //   this.$toast.error(res.error_msg)
      // }
    },
  },
}
</script>
