<template>
  <div>
    <div
      v-if="$nuxt.isOffline"
      class="fixed top-0 w-full text-white text-center bg-red-500 py-2 text-xs"
    >
      Tidak terhubung, Periksa Jaringan Anda.
    </div>
    <div class="flex">
      <sidebar :data="fullBars" />
      <div
        class="w-full"
        :class="fullBars ? 'ml-0' : 'margin-bar'"
      >
        <div class="w-full fixed top-0 left-0 z-10 h-14 bg-white shadow flex items-center px-4 justify-between">
          <div
            :class="!fullBars ? 'bars__' : ''"
            class="text-gray-500 cursor-pointer"
            @click.prevent="fullBar()"
          >
            <i
              :class="fullBars ? 'fas fa-times' : 'fas fa-bars'"
              class="text-primary-dark text-xl"
            ></i>
          </div>
          <div
            v-if="user.nama"
            class="flex items-center gap-3"
          >
            <div class="text-right hidden md:block lg:block">
              <div class="text-sm font-bold">{{ user.nama }}</div>
              <div class="text-xs">{{ user.email }}</div>
            </div>
            <button
              class="focus:outline-none"
              @click="showMenu()"
            >
              <img
                id="btn"
                class="h-8 w-8 object-cover rounded-full"
                :src="'https://ui-avatars.com/api/?name=' + user.nama"
                :alt="user.nama_sales"
              />
            </button>
          </div>
          <div
            v-if="isShowMenu"
            class="border bg-white shadow absolute rounded-md w-40 h-auto top-14 right-0 z-40"
          >
            <ul>
              <li class="py-3 px-6 hover:bg-primary-light">
                <button
                  class="text-gray-500 hover:text-primary-dark"
                  @click.prevent="logout()"
                >
                  <i class="fas fa-sign-out-alt"></i>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="md:p-6 lg:p-6 p-0 mt-14">
          <Nuxt />
          <div class="h-14"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/sidebar.vue'
export default {
  name: 'DefaultLayout',
  components: { Sidebar },
  middleware: 'auth',
  data() {
    return {
      isShowMenu: false,
      fullBars: true,
      width: '',
    }
  },
  head: {
    title: 'Member Toko Voucher',
  },
  computed: {
    user() {
      return this.$cookies.get('_vus_m')
    },
  },
  watch: {
    $route(to, from) {
      this.checkVersion(to)
    },
  },
  mounted() {
    // this.auth()
    this.checkVersion(this.$route)
    this.width = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    )
    this.width > 480 ? (this.fullBars = false) : (this.fullBars = true)

    const self = this
    window.addEventListener('click', function (e) {
      if (self.isShowMenu) {
        self.isShowMenu = false
      }
      if (e.target.id === 'btn') {
        self.showMenu()
      }
      if (self.width < 480) {
        if (e.target.id === 'menu') {
          self.fullBars = true
        }
      }
    })
  },

  methods: {
    auth() {
      const isLogin = this.$cookies.get('_x')
      const token = this.$cookies.get('_t')
      const menus = this.$store.state.menu.menu
      if (!isLogin || !token) {
        this.$router.push('/login')
      } else {
        let checkUrl = ''
        if (this.$route.matched[0].path.includes(':')) {
          checkUrl = this.$route.matched[0].path
        } else {
          checkUrl = this.$route.fullPath
        }

        const link = []
        menus.forEach((element) => {
          link.push(element.menu_parent.link)
          if (element.menu_client_child !== null) {
            element.menu_client_child.forEach((data) => {
              link.push(data.link)
            })
          }
        })

        const isMenu = link.find((m) => {
          return m === checkUrl
        })

        if (!isMenu) {
          this.$router.push('/error/401')
        }
      }
    },
    showMenu() {
      return this.isShowMenu
        ? (this.isShowMenu = false)
        : (this.isShowMenu = true)
    },
    fullBar() {
      return this.fullBars ? (this.fullBars = false) : (this.fullBars = true)
    },
    logout() {
      this.$cookies.removeAll()
      this.$router.push('/login')
    },
    checkVersion(to) {
      const version = this.$cookies.get('appVersion')
      this.$axios.get('/version').then((res) => {
        if (version) {
          if (res.data.version !== version) {
            this.$cookies.set('appVersion', res.data.version)
            location = location.origin + to.fullPath
          } else {
            // jika versi sama
          }
        } else {
          this.$cookies.set('appVersion', res.data.version, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
          })
        }
      })
    },
  },
}
</script>

<style>
html,
body {
  background: #fdfdfd;
}

body::-webkit-scrollbar,
.scroll__::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
body::-webkit-scrollbar-track,
.scroll__::-webkit-scrollbar-track {
  background: #c8d0d4;
}
body::-webkit-scrollbar-thumb,
.scroll__::-webkit-scrollbar-thumb {
  background-color: #e63b2c;
  border-radius: 20px;
  border: 3px solid #e63b2c;
}

.bars__ {
  position: relative;
  left: 230px;
  transition: width 1s ease-in-out;
}

/* mobile */
@media only screen and (max-width: 480px) {
  .margin-bar {
    margin-left: 0px;
  }
}

/* desktop */
@media only screen and (min-width: 1200px) {
  .margin-bar {
    margin-left: 230px;
  }
}
</style>
