const app = require('express')()
const fs = require('fs')
const bodyParser = require('body-parser')
const axios = require('axios')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  return res.json({
    status: 1,
    rc: 200,
    message: "Welcome to API tokovoucher !"
  })
})


app.post('/login', async (req, res) => {
  try {
    const API_URL = process.env.URL_API
    const SECRET = process.env.CAPTCHA_SECRET_KEY

    // check captcha
    const check = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET}&response=${req.body.token}`, {}
    )

    if (check.data.success) {
      const login = await axios.post(API_URL + '/auth/login', {
        email: req.body.email,
        password: req.body.password
      }, {
        headers: {
          common: {
            'Api-Key': process.env.PUBLIC_KEY,
          }
        }
      })

      return res.json(login.data)
    } else {
      return res.json({
        status: 0,
        rc: 403,
        error_msg: 'Captcha tidak valid'
      })
    }
  } catch (error) {
    return res.json(error)
  }
})

app.post('/register', async (req, res) => {
  try {
      const API_URL = process.env.URL_API
      const register = await axios.post(API_URL + '/auth/register', {
        nama: req.body.nama,
        hp: req.body.hp,
        confirm_pass: req.body.confirm_pass,
        email: req.body.email,
        password: req.body.password
      }, {
        headers: {
          common: {
            'Api-Key': process.env.PUBLIC_KEY,
          }
        }
      })
      return res.json(register.data)
  } catch (error) {
    return res.json(error)
  }
})

module.exports = app
