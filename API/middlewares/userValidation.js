const Joi = require('@hapi/joi');
const User = require('../model/User');
const Reset = require('../model/PasswordRecovery');

const passwordResetDelay = 60;

const registerValidation = async (req, res, next) => {

    try {
        const userExist = await User.findOne({
            email: req.body.email,
            cardNo: req.body.cardNo
        });
        if (userExist) {
            return res.status(400).send('Kullanıcı bilgilerı kullanımda!');
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }

    const schema = Joi.object().keys({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        className: Joi.string().min(4).required(),
        cardNo: Joi.string().min(4).required(),
        role: Joi.string().min(4).required(),
    });

    validation(req, res, next, schema);
}

const updateValidation = async (req, res, next) => {

    try {
        const userExist = await User.findById(req.body.id);
        if (!userExist) {
            return res.status(400).send('Kullanıcı bulunamadı!');
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }

    const schema = Joi.object().keys({
        id: Joi.string().min(6).required(),
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        className: Joi.string().min(4).required(),
        cardNo: Joi.string().min(4).required(),
        role: Joi.string().min(4).required(),
    });

    validation(req, res, next, schema);
}

const loginValidation = async (req, res, next) => {

    try {
        const userExist = await User.findOne({ email: req.body.email });
        if (!userExist) {
            return res.status(400).send('Kullanıcı bulunamadı!');
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }

    const schema = Joi.object().keys({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    validation(req, res, next, schema);
}

const resetCodeValidation = async (req, res, next) => {

    const code = req.params.code;

    const foundCode = await Reset.findOne({ code });
    if (!foundCode) return res.status(400).send("Bu kod ile sıfırlayamazsın!");
    if (foundCode.used) return res.status(400).send("Bu kod kullanılmış!");

    const foundUser = await User.findById(foundCode.User);
    if (!foundUser) return res.status(400).send("Kullanıcı bulunamadı!");

    req.code = foundCode;
    req.user = foundUser;

    next();
}

const resetValidation = async (req, res, next) => {
    const findUser = await User.findOne({ email: req.body.email });
    if (findUser) {
        if (await resetDelay(findUser)) {
            return res.status(400).send(`Resetlemek için mail gönderdik galiba biraz beklemelisin! : ${passwordResetDelay}`);
        }
    }
    else {
        return res.status(400).send("Böyle bir kullanıcı varsa emailine baksın.");
    }
    req.user = findUser;
    next();
}

async function resetDelay(User) {
    const date = new Date();
    const findDelayed = await Reset.findOne({
        User,
        createdAt: {
            $gte: new Date(date.getTime() - 1000 * 60 * passwordResetDelay)
        }
    });
    return findDelayed;
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
    loginValidation,
    updateValidation,
    resetValidation,
    resetCodeValidation
};
