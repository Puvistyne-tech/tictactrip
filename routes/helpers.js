const jwt = require("jsonwebtoken");
const helpers = {};
require('../services/users');
const {getUserByToken, updateWordCount} = require("../services/users");
const {wordCount} = require("../utils/word");


// Middleware
helpers.limitAccessToAuthentificatedOnly = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.sendStatus(401)//invalid access //Unauthorized
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.sendStatus(403)
        } else {
            req.user = decoded
            next()
        }
    }, next)
};


helpers.limitAccess = (req, res, next) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const text = req.body

    getUserByToken(token, (err, user) => {
        if (err) {
            res.sendStatus(401)
        }
        let newCount = parseInt(user.wordcount) + wordCount(text)

        if (newCount >= 80000) {
            res.sendStatus(402)
        } else {
            updateWordCount(user.email, newCount, (err, result) => {
                if (err) res.sendStatus(500)
            })
            next()
        }
    })
}

module.exports = helpers;
