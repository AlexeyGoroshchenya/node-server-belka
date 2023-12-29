
const { Device } = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')

class DeviceController {

    async create(req, res, next) {

        const getFileNames = async ()=>{

            let images = ''
           for (const key in req.files) {
                
                   let type = req.files[key].mimetype.slice(6)

// if(type !== 'webp' || type !== 'jpg') return 

                    let fileName = uuid.v4() + '.' + type
                    await req.files[key].mv(path.resolve(__dirname, '..', 'static', fileName))
                    
                    images = images.length===0? fileName : images + ',' + fileName
                     
            }

            return images
        }

        try {

            const { name, price, brandId, typeId, description } = req.body

            let images = await getFileNames()
            


            const device = await Device.create({ name, price, brandId, typeId, description, img: images })

            return res.json(device)

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {
        let {typeId, brandId, limit = 9, page = 1} = req.query

        // page = page || 1
        // limit = limit || 6

        let offset = page*limit - limit

        let devices

        if(!typeId && !brandId){
            devices = await Device.findAndCountAll({limit, offset})
        }

        if(!typeId && brandId){
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }

        if(typeId && !brandId){
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }

        if(typeId && brandId){
            devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
        }

        return res.json(devices)

    }

    async getById(req, res) {
        const {id} = req.params
        const device = await Device.findOne({where: {id}})

        return res.json(device)
    }

    async delete(req, res) {

    }


}
module.exports = new DeviceController()