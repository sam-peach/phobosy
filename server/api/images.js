const router = require('express').Router()
const path = require('path')
module.exports = router

router.get('/', async (req, res, next) => {
  console.log('>>> ', __dirname)
  res.sendFile(__dirname + '/assets/marsTile.png')
})
