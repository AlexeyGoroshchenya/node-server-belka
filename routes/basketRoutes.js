const Router = require('express')
const basketController = require('../controllers/basketController')

const router = new Router()

router.post('/', basketController.createOrder)
router.get('/', basketController.getAllOrders)
router.delete('/', basketController.delete)




module.exports = router