const fs = require('fs')
const app = require('express')()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/', (req,res)=>{
  fs.readFile('./.version', 'utf8' , (err, data) => {
  if (err) {
     res.status(500).json({
    status: 0,
    rc: 500,
    error_msg: "Gagal"
  })
    return
  }
   res.status(200).json({
    status: 1,
    rc: 200,
    version: data
  })
})

 
})

module.exports = app
