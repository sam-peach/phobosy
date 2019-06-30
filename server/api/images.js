const router = require('express').Router()
const path = require('path')
module.exports = router

router.get('/col', async (req, res, next) => {
  console.log('>>> ', path.join(__dirname, '/assets/marsTile.png'))
  res.sendFile(path.join(__dirname, '/assets/marsTile.png'))
})

router.get('/', async (req, res, next) => {
  console.log('>>> ', path.join(__dirname, '/assets/comp.jpg'))
  res.sendFile(path.join(__dirname, '/assets/comp.jpg'))
})
