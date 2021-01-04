const {body} = require('express-validator')
const User = require('../models/user')

exports.registerValidators = [
    body('email')
        .isEmail()
        .withMessage('Введите корректный email')
        .custom(async (value, {req}) => {
            try {
                const user = await User.findOne({email: value})
                if (user) {
                    return Promise.reject('Такой email уже занят')
                }
            } catch (e) {
                console.log(e)
            }
        })
        .normalizeEmail(),
    body('password', 'Пароль должен быть более 6 символов')
        .isLength({min: 6, max: 56})
        .isAlphanumeric(),
    body('confirm')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Пароли должны совпадать')
            }
            return true
        }),
    body('name', 'Имя должно быть более 3 символов')
        .isLength({min: 3})
        .trim()
]

exports.loginValidators = [
    body('email')
        .isEmail()
        .withMessage('Введите корректный email')
        .normalizeEmail(),
    body('password', 'Пароль должен быть более 6 символов')
        .isLength({min: 6, max: 56})
        .isAlphanumeric()
]

exports.courseValidators = [
    body('title')
        .isLength({min: 3})
        .withMessage('Минимальная длинна названия 3 символа')
        .trim(),
    body('price')
        .isNumeric()
        .withMessage('Введите корректную цену'),
    body('img', 'Введите корректный Url картинки')
        .isURL()

]
