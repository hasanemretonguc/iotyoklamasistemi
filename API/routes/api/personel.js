const express = require('express');
const router = express.Router();
const verify = require('../../middlewares/verifyToken');
const Personel = require('../../model/Personel');
const validation = require('../../middlewares/personelValidation');

router.post('/register',
    verify.auth,
    validation.registerValidation, async (req, res) => {

        const newPersonel = new Personel({
            name: req.body.name,
            email: req.body.email,
            no: req.body.no,
            cardNo: req.body.cardNo
        });


        try {
            const savedPersonel = await newPersonel.save();
            res.status(200).send({ name: savedPersonel.name, no: savedPersonel.no });
        } catch (error) {
            res.status(400).send(error);
        }

    });

router.post('/update',
    verify.auth,
    validation.updateValidation, async (req, res) => {

        const filterID = req.body.id;

        const personelInfo = {
            name: req.body.name,
            email: req.body.email,
            no: req.body.no,
            cardNo: req.body.cardNo
        };

        try {
            const updatedPersonel = await Personel.findByIdAndUpdate(filterID, personelInfo);
            res.status(200).send({ name: updatedPersonel.name, no: updatedPersonel.no });
        } catch (error) {
            res.status(400).send(error);
        }

    });

router.post('/remove',
    verify.auth,
    async (req, res) => {

        const filterID = req.body.id;

        try {
            const removedPersonel = await Personel.findByIdAndRemove(filterID);
            res.status(200).send({ name: removedPersonel.name, cardNo: removedPersonel.cardNo });
        } catch (error) {
            res.status(400).send(error);
        }

    });

router.get('/list',
    verify.auth,
    async (req, res) => {
        try {
            const personels = await Personel.find({});
            res.status(200).send(personels);
        } catch (error) {
            res.status(400).send(error);
        }
    });


module.exports = router;