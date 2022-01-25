const jwt = require('jsonwebtoken')
require('dotenv').config()

/**
 * create a token using an email for a validy of 24hours
 *
 * @param email
 * @param expiresIn
 * @returns {token}
 */
const createToken = (email, expiresIn = '24h') => {
    return jwt.sign(
        {email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn}
    )
}

/**
 * Checks if a token is expired or not
 * @param token
 * @returns {boolean}
 */
const isExpired = (token) => {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
    const decoded = JSON.parse(decodedJson)
    const exp = decoded.exp;
    return (Date.now() >= exp * 1000)
}

/**
 * since the token is created by using email as the payload,
 * this function extracts the payload and return it
 * @param token
 * @returns {*}
 */
const getEmailFromToken=(token)=>{
    const payloadBase64 = token.split('.')[1];
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
    const decoded = JSON.parse(decodedJson)
    return decoded.email
}

//il est toujours mieux de créer un Refersh Token,
//But it is not asked and unnecessory in this case

// const createRefreshToken = (email) => {
//     return jwt.sign(
//         {email},
//         process.env.REFRESH_TOKEN_SECRET,
//         {expiresIn: '300s'}
//     )
// }

module.exports = {createToken,isExpired,getEmailFromToken}