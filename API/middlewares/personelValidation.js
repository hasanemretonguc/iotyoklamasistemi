//VALIDATION
const Joi = require('@hapi/joi');
const Personel = require('../model/Personel');

const registerValidation = async (req, res, next) => {

    try {
        const personelExist = await Personel.findOne({
            cardNo: req.body.cardNo
        });
        if (personelExist) {
            return res.status(400).send('Personel bilgileri kullanımda!');
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }

    const schema = Joi.object().keys({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        no: Joi.string().min(3).required(),
        cardNo: Joi.string().required()
    });

    validation(req, res, next, schema);

}

const updateValidation = async (req, res, next) => {

    try {
        const personelExist = await Personel.findById(req.body.id);
        if (!personelExist) {
            return res.status(400).send('Personel bulunamadı!');
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }

    const schema = Joi.object().keys({
        id: Joi.string().min(6).required(),
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        no: Joi.string().required(),
        cardNo: Joi.string().required()
    });

    validation(req, res, next, schema);
}

function validation(req, res, next, schema) {

    const { error } = schema.validate(req.body);
    if (error) {
        const errMessage = error.details[0].message;
        return res.status(400).send(errMessage);
    }

    next();
}

module.exports = {
    registerValidation,
    updateValidation
};