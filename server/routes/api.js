//Third party packeges
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const Pets = require('../models/Pets')

router.use(bodyParser.json())

router.get('/pets', async (req, res) => {
    try {
        await Pets.find()
            .then(pets => {

                res.send(pets)
            })
    } catch (err) {
        res.send(err)
    }
})

router.post('/pet', async (req, res) => {
    let pets;
    try {
        const {
            name,
            created_at,
            type,
            color,
            age
        } = req.body;

        if (req.body !== undefined) {
            if (name.length > 25 || name.length === undefined) {
                return
            } else if (name.match(/^\s+$/) !== null || age.match(/^\s+$/) !== null || type.match(/^\s+$/) !== null) {
                return
            } else if (age === 0 || isNaN(age)) {
                return
            } else {
                pets = new Pets({
                    name,
                    created_at,
                    type,
                    color,
                    age
                })
                await pets.save();
                res.send({
                    success: true,
                })
            }
        }
    } catch (err) {
        res.send(err)
    }
})

module.exports = router;