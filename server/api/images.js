const router = require('express').Router()
module.exports = router

router.get('/', async (req, res, next) => {
  res.sendFile(
    '/Users/alysialouisepeach/Documents/Fullstack/marsMap/server/api/assets/marsTile.png'
  )
})
