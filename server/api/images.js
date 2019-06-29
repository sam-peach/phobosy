const router = require('express').Router()
const path = require('path')
module.exports = router

router.get('/', async (req, res, next) => {
  console.log('>>> ', __dirname)
  res.sendFile(path.join(__dirname + '/assets/marsImage-crop-bw.jpg'))
})

router.get('/col', async (req, res, next) => {
  console.log('>>> ', __dirname)
  res.sendFile(path.join(__dirname + '/assets/marsImage-crop-col.jpg'))
})
