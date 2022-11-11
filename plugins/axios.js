
// import Vue from 'vue'
import axios from 'axios'
// import Cookie from 'cookie-universal'
// const cookies = Cookie()

export default ({
  store
}, inject) => {
  const instance = axios.create({
    baseURL: process.env.URL_API,
    headers: {
      // 'Authorization': cookies.get('_t'),
      common: {
        'Api-Key': process.env.PUBLIC_KEY,
      },
    },
    timeout: 120000,
  });

  instance.interceptors.response.use((response) => {
    store.commit('error/setError', {
      isError: false,
      message: ""
    })

    if (response.data.rc === 800) {
      store.commit('error/setError', {
        isError: true,
        message: response.data.message
      })
    }
    return response
  })

  inject('axios', instance)
}
