const ApiError = require('../error/ApiError.js');
const {Application, Users} = require('../models/models.js');

class ApplicationController {
    async getAll(req, res, next) {
        try {
            const application = await Application.findAll();
            return res.json({application}); 
        } catch(e) {
            return next(ApiError.internal(e));
        }
    }

    async getByUser(req, res, next) {
        try {
            const {id} = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан идентификатор пользователя'));
            }
            const user = await Users.findOne({where: {id}});
            if (!user) {
                return next(ApiError.internal('Пользователь не найден'));       
            }

            const application = await Application.findAll({where: {userId: user.id}});
            
            return res.json({application});
        } catch(e) {
            return next(ApiError.internal(e));
        }
    }

    async createApplication(req, res, next) {
        try {
            const {carNumber, description, userId} = req.body;

            if (!carNumber || !description) {
                return next(ApiError.badRequest('Не заполнены обязательные поля'));
            }

            // const checkCar = await Users.findOne({where: {email}});
            // if (checkCar) {
            //     return next(ApiError.badRequest('Такая машина уже зарегестрирововна'));
            // }

            const application = await Application.create({carNumber, description, status: 'В ожидании', userId})

            return res.json({application}); 
        } catch(e) {
            return next(ApiError.internal(e));
        }
    }

    async updateStatusApplication(req, res, next) {
        try {
            const {carNumber, isAccepted} = req.body;
            if (!carNumber) {
                return next(ApiError.badRequest('Не указан номер машины'));
            }

            const application = await Application.update({status: isAccepted ? 'Принят' : 'Отклонен'}, {where: {carNumber}})

            return res.json({application})
        } catch(e) {
            return next(ApiError.internal(e));
        }
    }
}

module.exports = new ApplicationController();