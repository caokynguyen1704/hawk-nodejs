const jwt = require('jsonwebtoken')

require('dotenv').config()
function checkToken(token) {
    return true
}
function checkJwt(jwt) {
    try {
        jwt.verify(jwt, process.env.ACCESS_TOKEN_SECRET);
        return true;
    } catch (error) {
        return false;
    }
}
function getJwt(adminId) {
    try {
        const accessToken = jwt.sign({
            uuid: adminId
        }, process.env.ACCESS_TOKEN_SECRET, {
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