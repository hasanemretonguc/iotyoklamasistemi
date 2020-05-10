const jwt = require('jsonwebtoken');
const User = require('../model/User');
const Iot = require('../model/Iot');

async function iotAuth(req, res, next) {
    const iotInfo = {
        name: req.body.iotName,
        key: req.body.key
    }
    const userID = req.body.User;
    await verifyIot(res, next, iotInfo, userID);
}

async function iotAuthGet(req, res, next) {
    const iotInfo = {
        name: req.query.iotName,
        key: req.query.key
    }
    const userID = req.query.User;
    await verifyIot(res, next, iotInfo, userID);
}

async function onlyIotAuth(req, res, next) {
    try {
        const foundIot = await Iot.findOne({
            name: req.query.iotName,
            key: req.query.key
        });
        if (foundIot) next();
        else res.status(400).send("Doğrulanamadı!");
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

async function verifyIot(res, next, iotInfo, userID) {
    try {
        const foundUser = await User.findById(userID);
        const foundIot = await Iot.findOne(iotInfo);
        if (foundIot && foundUser) {
            next();
        }
        else {
            res.status(400).send("Doğrulanamadı!");
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

async function auth(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Yetkili biri lazım!');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send(error);
    }
}

async function moderatorAuth(req, res, next) {
    await powerAuth(req, res, next, 'moderator');
}

async function adminAuth(req, res, next) {
    await powerAuth(req, res, next, 'admin');
}

async function powerAuth(req, res, next, permission) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Çok yetkili biri lazım!');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (verified) {
            const user = await User.findOne({ _id: verified._id });
            if (user.role == permission || user.role == 'admin') {
                req.user = user;
                next();
            }
            else {
                res.status(401).send('Buraya erişmek için yetkin yok!');
            }
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    auth,
    adminAuth,
    moderatorAuth,
    iotAuth,
    iotAuthGet,
    onlyIotAuth
};
