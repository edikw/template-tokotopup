module.exports = {
  apps: [{
    name: 'apigames-fe',
    exec_mode: 'cluster',
    instances: 'max', // sesuaikan dengan core atau bisa isi max untuk menggunakan semua core
    script: './node_modules/nuxt/bin/nuxt.js',
    args: 'start'
  }]
}
