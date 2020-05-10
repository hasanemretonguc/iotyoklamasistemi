const express = require('express');
const router = express();
const verify = require('../../middlewares/verifyToken');
const Iot = require('../../model/Iot');
const validation = require('../../middlewares/iotValidation');

router.post('/register',
    verify.moderatorAuth,
    validation.registerValidation,
    async (req, res) => {

        const newIot = new Iot({
            name: req.body.name,
            key: req.body.key
        });

        try {
            const savedIot = await newIot.save();
            res.status(200).send({ name: savedIot.name, id: savedIot._id });
        } catch (error) {
            res.status(400).send(error);
        }

    });

router.post('/remove',
    verify.adminAuth,
    async (req, res) => {
        const filterID = req.body.id;
        try {
            const removedIot = await Iot.findByIdAndRemove(filterID);
            res.status(200).send({ message: "Arduino yok artık", status: "200" });
        } catch (error) {
            res.status(400).send(error);
        }
    });

router.post('/update',
    verify.moderatorAuth,
    validation.updateValidation,
    async (req, res) => {

        const filterID = req.body.id;

        const infoIot = {
            name: req.body.name,
            key: req.body.key
        }

        try {
            const updatedIot = await Iot.findByIdAndUpdate(filterID, infoIot);
            res.status(200).send({ name: updatedIot.name, key: updatedIot.key });
        } catch (error) {
            res.status(400).send(error);
        }

    });

router.get('/list',
    verify.auth,
    async (req, res) => {
        try {
            const iots = await Iot.find({});
            res.status(200).send(iots);
        } catch (error) {
            res.status(400).send(error);
        }
    });


module.exports = router;

