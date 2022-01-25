const express = require('express');
const router = express.Router();

const justify = require('../utils/justify')
const {wordCount} = require('../utils/word')
/*
* Route to justify contents
*
* All the tests have been handled by the middle ware
* so this route justify the text given and return the result
* */
router.post('/', (req, res, next) => {

    let message;
    const text = req.body;

    if (text) {

        message = justify(text, 80)
        res.header('Content-type', 'text/plain')
        //other headers if necessary
        res.send(message)
    } else
        //bad request
        res.sendStatus(400)
})


module.exports = router;