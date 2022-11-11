<template>
  <div
    id="sidebar"
    :class="data ? 'side_hide' : 'sidebar'"
    class="z-40 fixed min-h-screen border-r bg-white shadow-xl"
  >
    <div class="px-6 h-14 flex items-center">
      <!-- <img src="@/assets/png/logo.png" class="h-10" alt="" /> -->
    </div>
    <ul>
      <li
        v-for="(m, index) in menu"
        id="menu"
        :key="index"
        :class="
          m.link === $route.fullPath || includeRoute === m.subRoute
            ? 'bg-primary-light text-primary-dark font-bold'
            : 'text-gray-600'
        "
        class="py-4"
      >
        <div v-if="!m.child.length" id="menu" class="hover:text-primary-dark">
          <div id="menu" @click.prevent="dataIndex = ''">
            <nuxt-link :to="m.link" class="flex pl-6 items-center gap-3">
              <i :class="m.icon"></i>
              <span id="menu" class="text-sm">
                {{ m.label }}
              </span>
            </nuxt-link>
          </div>
        </div>
        <div v-else>
          <div
            id="menu"
            class="flex items-center justify-between cursor-pointer hover:text-primary-dark"
            @click.prevent="dataIndex = dataIndex === index ? '' : index"
          >
            <div class="flex pl-6 items-center gap-3">
              <i :class="m.icon"></i>
              <span id="menu" class="text-sm">
                {{ m.label }}
              </span>
            </div>
            <div v-if="m.child.length" class="pr-4">
              <i v-if="dataIndex !== index" class="fas fa-chevron-right"></i>
              <i v-else class="fas fa-chevron-down"></i>
            </div>
          </div>
          <ul :class="index === dataIndex ? 'block' : 'hidden'" class="mt-3">
            <li
              v-for="(c, j) in m.child"
              :key="j"
              :class="
                c.link === $route.fullPath || includeRoute === c.subRoute
                  ? 'bg-primary-light text-primary-dark font-bold'
                  : 'text-gray-600'
              "
              class="py-3 pl-4 hover:text-primary-dark"
            >
              <nuxt-link :to="c.link" class="flex pl-6 items-center gap-3">
                <i :class="c.icon"></i>
                <span id="menu" class="text-sm">
                  {{ c.label }}
                </span>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import menu from '@/lib/menu'
export default {
  name: 'SidebarLayout',
  props: ['data'],
  data() {
    return {
      menu,
      dataIndex: '',
    }
  },
  computed: {
    includeRoute() {
      return this.$route.fullPath.replace(/[0-9]/g, '')
    },
  },
  watch: {
    $route: {
      handler(v) {
        this.setActive()
      },
    },
  },
  mounted() {
    this.setActive()
  },
  methods: {
    setActive() {
      for (let index = 0; index < this.menu.length; index++) {
        if (this.menu[index].child.length) {
          for (let j = 0; j < this.menu[index].child.length; j++) {
            if (
              this.menu[index].child[j].link === this.$route.fullPath ||
              this.includeRoute === this.menu[index].child[j].subRoute
            ) {
              this.dataIndex = index
            }
          }
        }
      }
    },
  },
}
</script>

<style>
.sidebar {
  width: 235px;
  transition: width 1s ease-in;
}
.side_hide {
  width: 0px;
  display: none;
  transition: width 1s ease-in-out;
}
</style>
