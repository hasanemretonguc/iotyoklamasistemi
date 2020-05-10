const Joi = require('@hapi/joi');
const Arduino = require('../model/Iot');

const registerValidation = async (req, res, next) => {

    try {
        const arduinoExist = await Arduino.findOne({ key: req.body.key });
        if (arduinoExist) {
            return res.status(400).send('Iot adı kullanımda!');
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }

    const schema = Joi.object().keys({
        name: Joi.string().min(6).required(),
        key: Joi.string().min(10).required()
    });

    validation(req, res, next, schema);

}

const updateValidation = async (req, res, next) => {

    try {
        const arduinoExist = await Arduino.findById(req.body.id);
        if (!arduinoExist) {
            return res.status(400).send('Iot bulunamadı!');
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }

    const schema = Joi.object().keys({
        name: Joi.string().min(6).required(),
        key: Joi.string().min(10).required()
    });

    validation(req, res, next, schema);
}

function validation(req, res, next, schema) {

    const { error } = schema.validate({ name: req.body.name, key: req.body.key });
    if (error) {
        const errMessage = error.details[0].message;
        return res.status(400).send(errMessage);
    }

    next();
}

module.exports = {
    updateValidation,
    registerValidation
}