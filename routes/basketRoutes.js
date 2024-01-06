const Router = require('express')
const basketController = require('../controllers/basketController')
const checkRole = require('../middleware/CheckRoleMiddleware')

const router = new Router()

router.post('/', basketController.createOrder)
router.get('/', checkRole('ADMIN'), basketController.getAllOrders)
router.put('/', checkRole('ADMIN'), basketController.changeOrder)
router.delete('/', basketController.delete)




module.exports = router