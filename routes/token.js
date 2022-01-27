const express = require('express');
const router = express.Router();

const {isExpired} = require("../utils/token")

const User = require('../services/users')

/*
* Send token to email adress
*
* Getting email from the body
* checking if that email exist already in the database
* if thats the case,
* getting the toke saved
* if the token is expired -> renex the token and save it to the database
* if not expired, send it by 'res'
*
* if the email is not present in the database, create a new 'USER' with a new token (24 hours valid)
* */
router.post('/', async (req, res, next) => {

    //getting email passed in body
        let {email} = req.body
        if (email) {
            User.getUserByMail(email, (err, user) => {
                if (err) {
                    res.status(406).json({message: err.message})
                }
                if (user) {
                    if (isExpired(user.token)) {
                        console.log("token expired")
                        User.updateUser(user)
                    }
                    res.json({token: user.token})
                } else {
                    User.createUser(email, (err, user) => {
                        if (err) {
                            res.status(406).json({message: err.message})
                        }
                        res.json(user)
                    })
                }
            })
        }
    }
)


module.exports = router;