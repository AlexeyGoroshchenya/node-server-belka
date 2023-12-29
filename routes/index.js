const Router = require('express')

const router = new Router()

const devicesRouter = require('./devicesRouter')
const brandsRouter = require('./brandsRouter')
const typesRouter = require('./typesRouter')
const usersRouter = require('./usersRouter')
const basketRoutes = require('./basketRoutes')

router.use('/user', usersRouter)
router.use('/type', typesRouter)
router.use('/brand', brandsRouter)
router.use('/device', devicesRouter)
router.use('/basket', basketRoutes)



module.exports = router