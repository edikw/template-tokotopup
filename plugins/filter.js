import Vue from 'vue'
Vue.filter(
  'rupiah', (v) => {
    const val = (v / 1).toFixed(0).replace('.', ',')
    return "Rp" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }
)

Vue.filter(
  'currency', (v) => {
    const val = (v / 1).toFixed(0).replace('.', ',')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }
)
