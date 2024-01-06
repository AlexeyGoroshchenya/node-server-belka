const {Basket, BasketItem, Order, User} = require('../models/models')

class BasketController {

    async createOrder (req, res){
        const {phone, name, devices, auth, note} = req.body
        console.log(note + '-------------------------');

        if(!auth){
            const order = await Order.create({phone: phone, name: name, devices: devices, note: note})
                return res.json('ok')
        }

        let user = await User.findOne({ where: { phone } })

        console.log(auth + '--------------------------------');
        const order = await Order.create({phone: phone, name: user.name, devices: devices, note: note})
        return res.json('ok')
    }
    
    async getAllOrders (req, res){
        const orders = await Order.findAll()

        // const active = await Order.findAll({where: {active: true}})
        // console.log(active);


        return res.json(orders)
    }

    async changeOrder (req, res){
        const {orderId, adminNote, active, status} = req.body

        const order = await Order.update(
            {
                adminNote: adminNote,
                active: active,
                status: status
            },
            {
              where: {
                id: orderId,
              },
            }
          )


        
        return res.json(order)
    }
    
    async delete (req, res){
       
    }
    
    
    }
    module.exports = new BasketController()