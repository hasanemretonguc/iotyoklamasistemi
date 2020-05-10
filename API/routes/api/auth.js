const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../../utils/nodemailer');
const User = require('../../model/User');
const PasswordRecovery = require('../../model/PasswordRecovery');
const validation = require('../../middlewares/userValidation');
const verifyToken = require('../../middlewares/verifyToken');

router.post('/register',
    verifyToken.adminAuth,
    validation.registerValidation,
    async (req, res) => {

        //Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);

        //Create a new user 
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            className: req.body.className,
            cardNo: req.body.cardNo,
            role: req.body.role
        });


        try {
            const savedUser = await user.save();
            res.status(200).send({ id: user._id, name: user.name });
        } catch (error) {
            res.status(400).send(error);
        }

    });

router.post('/login',
    validation.loginValidation,
    async (req, res) => {

        const user = await User.findOne({ email: req.body.email });

        // Check password
        const validPass = await bcryptjs.compare(req.body.password, user.password);
        if (!validPass) {
            return res.status(400).send('Hatalı bilgi girdiniz!');
        }

        // Create and assign a token
        const token = jwt.sign({
            _id: user._id,
            role: user.role
        }, process.env.TOKEN_SECRET, {
            expiresIn: '30d'
        });

        res.status(200).header('auth-token', token).send(token);

    });

router.post('/delete',
    verifyToken.adminAuth,
    async (req, res) => {
        try {
            const removedUser = await User.findByIdAndRemove(req.body.id);
            res.status(200).send({ message: "Kullanıcı yok artık", status: "200" });
        } catch (error) {
            res.status(400).send(error);
        }
    });

router.post('/update',
    verifyToken.adminAuth,
    validation.updateValidation,
    async (req, res) => {

        const infoUser = {
            name: req.body.name,
            email: req.body.email,
            className: req.body.className,
            cardNo: req.body.cardNo,
            role: req.body.role
        };

        try {
            const updatedUser = await User.findByIdAndUpdate(req.body.id, infoUser);
            res.status(200).send({ name: updatedUser.name, id: updatedUser._id });
        } catch (error) {
            res.status(400).send(error);
        }

    });

router.post('/updatepassword',
    verifyToken.auth,
    async (req, res) => {

        try {
            //  GET 
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;
            const { password } = await User.findById(req.body.id);
            // CHECK FOR OLD PASSWORD WITH DATABASE
            const validPass = await bcryptjs.compare(oldPassword, password);
            if (!validPass) {
                return res.status(400).send('Hatalı bilgi girdiniz!');
            }
            // HASH THE NEW PASSWORD
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(newPassword, salt);
            // UPDATE DATABASE
            const updatedUser = await User.findByIdAndUpdate(req.body.id, {
                password: hashedPassword
            });

            res.status(200).send('Şifreniz güncellendi!');
        } catch (error) {
            res.status(400).send(error.message);
        }


    });

router.post('/resetpassword',
    validation.resetValidation,
    async (req, res) => {

        const findUser = req.user;
        const code = require('../../utils/random').makeString(10);
        const newReset = new PasswordRecovery({
            User: findUser,
            code,
            used: false
        });

        try {
            const savedReset = await newReset.save();
            const stat = await mailer(req.body.email, code);
            res.status(200).send("Mail gönderildi!");
        } catch (error) {
            if (savedReset) {
                PasswordRecovery.findOneAndRemove(savedReset);
            }
            res.status(500).send(error.message);
        }

    });

router.post('/resetpassword/:code',
    validation.resetCodeValidation,
    async (req, res) => {
        const user = req.user;
        const code = req.code;
        const newPassword = req.body.newPassword;

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        user.password = hashedPassword;
        code.used = true;

        try {
            await user.save();
            await code.save();
            res.status(200).send("Şifre başarıyla sıfırlandı. :)");
        } catch (error) {
            res.status(400).send(error.message);
        }

    });

router.get('/list',
    verifyToken.auth,
    async (req, res) => {
        try {
            const users = await User.find({})
                .select('role id name email className cardNo');

            res.status(200).send(users);
        } catch (error) {
            res.status(400).send(error);
        }

    });

module.exports = router;