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
        <h1 class="text-2xl font-bold">Register</h1>
        <form @submit.prevent="register()">
          <div class="mb-4 md:mt-8 lg:mt-8 mt-4">
            <label for="" class="text-sm text-gray-500">Nama</label>
            <input
              v-model="user.nama"
              required
              class="
                block
                md:w-96
                lg:w-96
                w-full
                border
                py-2
                rounded-lg
                focus:border-primary-dark focus:outline-none
                px-3
              "
              placeholder="Masukkan Nama Anda"
            />
          </div>
          <div class="mb-4">
            <label for="" class="text-sm text-gray-500">Handphone</label>
            <input
              v-model="user.hp"
              required
              class="
                block
                md:w-96
                lg:w-96
                w-full
                border
                py-2
                rounded-lg
                focus:border-primary-dark focus:outline-none
                px-3
              "
              placeholder="Masukan No Handphone"
            />
          </div>
          <div class="mb-4">
            <label for="" class="text-sm text-gray-500">Email</label>
            <input
              v-model="user.email"
              required
              type="email"
              class="
                block
                md:w-96
                lg:w-96
                w-full
                border
                py-2
                rounded-lg
                focus:border-primary-dark focus:outline-none
                px-3
              "
              placeholder="Masukkan Email"
            />
          </div>
          <div class="mb-4">
            <label for="" class="text-sm text-gray-500">Password</label>
            <input
              v-model="user.password"
              required
              type="password"
              class="
                block
                md:w-96
                lg:w-96
                w-full
                border
                py-2
                rounded-lg
                focus:border-primary-dark focus:outline-none
                px-3
              "
              placeholder="Masukkan Password"
            />
          </div>
          <div class="mb-4">
            <label for="" class="text-sm text-gray-500"
              >Konfirmasi Password</label
            >
            <input
              v-model="user.confirm_pass"
              required
              type="password"
              :class="user.confirm_pass === user.password ? '' : 'text-red-500'"
              class="
                block
                md:w-96
                lg:w-96
                w-full
                border
                py-2
                rounded-lg
                focus:border-primary-dark focus:outline-none
                px-3
              "
              placeholder="Konfirmasi Password"
            />
          </div>
          <div>
            <div class="text-sm mb-4">
              <span>Sudah Punya Akun ?</span>
              <nuxt-link
                to="/login"
                class="font-bold text-primary-dark underline"
                >Login</nuxt-link
              >
            </div>
            <button
              :disabled="loading"
              type="submit"
              class="
                py-3
                md:py-2
                lg:py-2
                w-full
                md:w-32
                lg:w-32
                bg-primary-default
                rounded-lg
                text-white text-sm
              "
            >
              <i v-if="loading" class="fas fa-spinner animate animate-spin"></i>
              <span v-else>Register</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  layout: 'no-auth',
  data() {
    return {
      user: {
        email: '',
        password: '',
        confirm_pass: '',
        nama: '',
        hp: '',
      },
      loading: false,
    }
  },
  methods: {
    async register() {
      if (this.user.confirm_pass === this.user.password) {
        this.loading = true
        const res = await this.$axios('POST', '/v1/register', this.user)
        this.loading = false
        if (res.status) {
          this.$cookies.set('_vtk_m', res.data.jwt.token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
          })
          this.$cookies.set('_vrf_m', res.data.jwt.token_refresh, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
          })
          this.$cookies.set('_vus_m', res.data.data, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
          })
          this.$toast.success(res.message)
          window.location = '/'
        } else {
          this.$toast.error(res.error_msg)
        }
      } else {
        this.$toast.error('Konfirmasi password salah !')
      }
    },
  },
}
</script>
