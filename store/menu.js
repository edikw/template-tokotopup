export const state = () => ({
  menu: []
})

export const mutations = {
  setMenu(state, data) {
    state.menu = data
  },
}
