const express = require("express");
const utils = require("../db/utils");
const {createToken, getEmailFromToken} = require("../utils/token");
express.Router();


/**
 *
 * @param email
 * @param callback
 *getUserByMail
 * helps to return a user from the database by using email
 */
const getUserByMail = (email, callback) => {
    const sql = "SELECT * FROM users WHERE users.email=$1"
    utils.executeQuery(sql, [email], (err, result) => {
        if (err) {
            callback(err)
        } else {
            callback(false, result.rows[0])
        }
    })
}

/**
 *
 * @param email
 * @param callback
 * create a new user with a new token of validyt 20hours
 */

const createUser = (email, callback) => {
    let user = {
        email,
        token: createToken(email, '24h'),
        wordCount: 0
    }
    const sql = "INSERT INTO users (email, token, wordCount) VALUES ($1, $2, $3)"

    utils.executeQuery(sql, [user.email, user.token, user.wordCount], (err, result) => {
        if (err) {
            callback(err)
        } else {
            callback(false, result.rows)
        }
    })
}

/**
 * delete a user by using his email adress
 * @param email
 */
const deleteUser = (email) => {
    const sql = "DELETE FROM users WHERE users.email=$1"
    utils.executeQuery(sql, [email], (err, r) => {
        if (err) {
            throw err
        }
    })

}

/*
its a funciton to just update the token,
if a token expired (one day) it creates a new token for the email which would be available for
next 24 hours
 */
/**
 * It is mal-nommé - it is used to update only the expired token of a user
 * two ways of doing it
 * by using sql or by using already defined functions
 * @param user
 */
const updateUser = (user) => {
    getUserByMail(user.email, (err, r) => {
        if (err) throw err
        else {
            deleteUser(user.email)
            createUser(user.email, (err, r) => {
                if (err) throw err
            })
        }
    })

    // const sql = "UPDATE users SET users.token=$1 WHERE users.email=$2"
    // utils.executeQuery(sql, [createToken(user.email, '24h'), user.email], (err, r) => {
    //     if (err) {
    //         callback(err)
    //     } else {
    //         callback(false, r.rows[0])
    //     }
    // })
}

/**
 * update the wordcount in the database ny using email adress
 * @param email
 * @param newCount
 * @param callback
 */
const updateWordCount = (email, newCount, callback) => {
    const sql = "UPDATE users SET wordcount=$1 WHERE users.email=$2"
    utils.executeQuery(sql, [newCount.toString(), email], (err, r) => {
        if (err) {
            callback(err)
        } else {
            callback(false, r.rows)
        }
    })
}

/**
 * get a use form the database by using token
 * it does not directly search the user by using the token
 * it uses a function to extract email from the token and call back the getUserByEmail function
 * @param token
 * @param callback
 */
const getUserByToken = (token, callback) => {
    const email = getEmailFromToken(token)
    getUserByMail(email,callback)

    // const sql = "SELECT * FROM users WHERE users.email=$1"
    // utils.executeQuery(sql, [email], (err, result) => {
    //     if (err) {
    //         callback(err)
    //     } else {
    //         callback(false, result.rows[0])
    //     }
    // })
}

module.exports = {
    getUserByMail,
    createUser,
    updateUser,
    deleteUser,
    updateWordCount,
    getUserByToken
}