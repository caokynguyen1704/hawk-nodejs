function s7Encrypt(text) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i) + 7;
        result += String.fromCharCode(charCode);
    }
    return result;
}

function s7Decrypt(encryptedText) {
    let result = '';
    for (let i = 0; i < encryptedText.length; i++) {
        let charCode = encryptedText.charCodeAt(i) - 7;
        result += String.fromCharCode(charCode);
    }
    return result;
}
module.exports={
    s7Decrypt,
    s7Encrypt
}