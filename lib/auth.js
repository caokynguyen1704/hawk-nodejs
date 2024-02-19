const jwt = require('jsonwebtoken')

require('dotenv').config()
ACCESS_TOKEN_SECRET="enish@123"
function checkToken(token) {
    return true
}
function checkJwt(jwt) {
    try {
        jwt.verify(jwt, ACCESS_TOKEN_SECRET);
        return true;
    } catch (error) {
        return false;
    }
}
function getJwt(adminId) {
    try {
        const accessToken = jwt.sign({
            uuid: adminId
        },ACCESS_TOKEN_SECRET, {
            expiresIn: '24h'
        })
        return accessToken
    } catch (e) {
        console.log(e);
        return null;
    }
}
module.exports = {
    checkJwt,
    checkToken,
    getJwt
}