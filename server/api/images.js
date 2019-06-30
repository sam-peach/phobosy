const router = require('express').Router()
const path = require('path')
module.exports = router

router.get('/col', async (req, res, next) => {
  res.sendFile(path.join(__dirname, '/assets/marsTile-small-col.jpg'))
})

router.get('/', async (req, res, next) => {
  res.sendFile(path.join(__dirname, '/assets/marsTile-small-bw.jpg'))
})
