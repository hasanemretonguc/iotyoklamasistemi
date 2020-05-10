const express = require('express');
const router = express.Router();
const List = require('../../model/List');
const User = require('../../model/User');
const validation = require('../../middlewares/listValidation');
const verify = require('../../middlewares/verifyToken');

router.post('/register',
    verify.iotAuth,
    validation.registerValidation, async (req, res) => {

        const addToList = new List({
            User: req.body.User,
            Personel: req.body.Personel,
            listName: req.body.listName,
            className: req.body.className
        });

        await registerList(req, res, addToList);
    });

router.get('/register',
    verify.iotAuthGet,
    validation.registerValidationGet,
    async (req, res) => {

        const addToList = new List({
            User: req.query.User,
            Personel: req.query.Personel,
            listName: req.query.listName,
            className: req.query.className
        });

        await registerList(req, res, addToList);

    });

async function registerList(req, res, addToList) {
    try {
        const savedToList = await addToList.save();
        res.status(200).send(req.Personel.name);
    } catch (error) {
        res.status(200).send(false);
    }
}

router.post('/update',
    verify.auth,
    validation.updateValidation,
    async (req, res) => {

        const infoList = {
            User: req.body.User,
            Personel: req.body.Personel,
            listName: req.body.listName,
            className: req.body.className
        }

        try {
            const updatedList = await List.findByIdAndUpdate(req.body.id, infoList);
            res.status(200).send(updatedList);
        } catch (error) {
            res.status(400).send(error);
        }
    });

router.post('/remove',
    verify.auth,
    async (req, res) => {
        try {
            const removedList = await List.findByIdAndRemove(req.body.id);
            res.status(200).send(removedList);
        } catch (error) {
            res.status(400).send(error);
        }
    });

router.get('/listOfLists',
    verify.auth,
    async (req, res) => {
        try {
            const allList = await List.find({})
                .populate({
                    path: 'User',
                    select: 'name'
                })
                .populate({
                    path: 'Personel',
                    select: 'name'
                });

            res.status(200).send(allList);
        } catch (error) {
            res.status(400).send(error);
        }
    });

router.get('/',
    verify.auth,
    async (req, res) => {
        try {
            const userID = req.user._id;
            const listForUser = await List.find({ User: userID })
                .populate({
                    path: 'User',
                    select: 'name'
                })
                .populate({
                    path: 'Personel',
                    select: 'name'
                });
            console.log(listForUser);
            res.status(200).send(listForUser);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

router.get('/generateListName',
    verify.iotAuthGet,
    async (req, res) => {
        try {
            const iotName = req.query.iotName;
            const userID = req.query.User;
            const date = Date.now();
            const listName = `${iotName}_${date}_${userID}`
            console.log(listName);
            res.status(200).send(listName);
        } catch (error) {
            res.status(400).send(false);
        }
    });

router.get('/getuserinfo',
    verify.onlyIotAuth,
    async (req, res) => {
        try {
            const foundUser = await User.findOne({ cardNo: req.query.cardNo })
                .select('id className name');
            if (!foundUser) {
                res.status(400).send(false);
            }
            else {
                res.status(200).send(foundUser);
            }
        } catch (error) {
            res.status(400).send(false);
        }
    });

module.exports = router;