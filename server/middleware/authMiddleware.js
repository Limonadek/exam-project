const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        if (!req.headers.authorization) {
          return next(
            ApiError.unauthorized('пользователь не авторизован')
          );
        }
    
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
        req.user = decoded;

        next();
      } catch (e) {
        next(ApiError.internal(e.message));
      }
};