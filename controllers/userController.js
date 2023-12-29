const ApiError = require('../error/ApiError')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../models/models')
const { json } = require('sequelize')

const generateGWT = (id, phone, role) => {
        return jwt.sign({ id: id, phone: phone, role: role },
                process.env.SECRET_KEY,
                { expiresIn: '24h' }
        )
}

class UserController {



        async registration(req, res, next) {

                const { name, phone, password, role } = req.body

                if (!name || !phone || !password) {
                        return next(ApiError.badRequest('check name or phone or password'))
                }

                const candidate = await User.findOne({ where: { phone } })
                if (candidate) {
                        return next(ApiError.badRequest('a user with this phone number is already registered'))
                }

                const hashPassword = await bcrypt.hash(password, 5)

                const user = await User.create({ name, phone, password: hashPassword })
                const basket = await Basket.create({ userId: user.id })

                const token = generateGWT(user.id, user.phone, user.role)

                return res.json({ token })
        }

        async login(req, res, next) {

                const { phone, password } = req.body
                const user = await User.findOne({ where: { phone } })
                if (!user) {
                        return next(ApiError.internal('user not find'))
                }

                let comparePassword = bcrypt.compareSync(password, user.password)
                if (!comparePassword) {
                        return next(ApiError.internal('wrong password'))
                }
                const token = generateGWT(user.id, user.phone, user.role)

                return res.json({ token })
        }

        async check(req, res, next) {

               const token = generateGWT(req.user.id, req.user.phone, req.user.role)

               console.log(token);
               return res.json(token)


            

        }


}
module.exports = new UserController()