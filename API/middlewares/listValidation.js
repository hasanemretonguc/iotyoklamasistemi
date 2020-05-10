const Joi = require('@hapi/joi');
const Personel = require('../model/Personel');
const List = require('../model/List');

const registerDelayTime = 30;

const registerValidation = async (req, res, next) => {

    try {
        const findPersonel = await Personel.findOne({
            cardNo: req.body.PersonelCardNo
        });
        if (!findPersonel) {
            return res.status(400).send('Kullanici bulunamadi!');
        }
        const findPersonelInList = await List.findOne({ listName: req.body.listName, Personel: findPersonel.id });
        if (findPersonelInList) {
            return res.status(200).send('Listede varsınız!');
        }
        req.body.Personel = findPersonel.id;
        if (await registerDelay(req.body.Personel)) {
            return res.status(200).send(`${registerDelayTime} dakika beklemelisiniz!`);
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }

    const schema = Joi.object().keys({
        User: Joi.string().min(4).required(),
        Personel: Joi.string().min(4).required(),
        listName: Joi.string().min(4).required(),
        className: Joi.string().min(4).required()
    });

    validation(req, res, next, schema);

}

const registerValidationGet = async (req, res, next) => {

    try {
        const findPersonel = await Personel.findOne({
            cardNo: req.query.PersonelCardNo
        });
        if (!findPersonel) {
            return res.status(400).send('Kullanici bulunamadi!');
        }
        const findPersonelInList = await List.findOne({
            listName: req.query.listName, Personel: findPersonel.id
        });
        if (findPersonelInList) {
            return res.status(200).send('Listede varsınız!');
        }
        req.query.Personel = findPersonel.id;
        if (await registerDelay(req.query.Personel)) {
            return res.status(200).send(`${registerDelayTime} dakika beklemelisiniz!`);
        }
        req.Personel = findPersonel;
    } catch (error) {
        return res.status(400).send(error.message);
    }
    const schema = Joi.object().keys({
        User: Joi.string().min(4).required(),
        Personel: Joi.string().min(4).required(),
        listName: Joi.string().min(4).required(),
        className: Joi.string().min(4).required()
    });

    validationGet(req, res, next, schema);

}

const updateValidation = async (req, res, next) => {
    try {
        const findList = await List.findById(req.body.id);
        if (!findList) {
            return res.status(400).send('Liste bulunamadı!');
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }

    const schema = Joi.object().keys({
        User: Joi.string().min(4).required(),
        Personel: Joi.string().min(4).required(),
        listName: Joi.string().min(4).required(),
        className: Joi.string().min(4).required()
    });

    validation(req, res, next, schema);
}

async function registerDelay(Personel) {
    const date = new Date();
    const findDelayed = await List.findOne({
        Personel,
        createdAt: {
            $gte: new Date(date.getTime() - 1000 * 60 * registerDelayTime)
        }
    });
    return findDelayed;
}

function validation(req, res, next, schema) {

    const { error } = schema.validate({
        User: req.body.User,
        Personel: req.body.Personel,
        listName: req.body.listName,
        className: req.body.className
    });

    if (error) {
        const errMessage = error.details[0].message;
        return res.status(400).send(errMessage);
    }
    next();
}

function validationGet(req, res, next, schema) {

    const { error } = schema.validate({
        User: req.query.User,
        Personel: req.query.Personel,
        listName: req.query.listName,
        className: req.query.className
    });

    if (error) {
        const errMessage = error.details[0].message;
        return res.status(400).send(errMessage);
    }
    next();
}

module.exports = {
    registerValidation,
    updateValidation,
    registerValidationGet
}