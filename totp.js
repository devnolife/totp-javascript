const { encrypt, decrypt } = require('vigenere-cipher');
const crypto = require('crypto');


const numberToAscii = (number) => {
    let _number = parseInt(number) + 97;
    return String.fromCharCode(_number);
}

const generateTOTP = (secret) => {
    let encryptedTOTP = '';
    const time = Math.floor(Date.now() / 1000 / 50);
    const buffer = Buffer.alloc(8);
    buffer.writeBigInt64BE(BigInt(time));
    const hmac = crypto.createHmac('sha1', secret).update(buffer).digest();
    const offset = hmac[hmac.length - 1] & 0xf;
    let code = ((hmac[offset] & 0x7f) << 24)
        | ((hmac[offset + 1] & 0xff) << 16)
        | ((hmac[offset + 2] & 0xff) << 8)
        | (hmac[offset + 3] & 0xff);
    code = code.toString()
    for (let i = 0; i < code.length; i++) {
        encryptedTOTP += numberToAscii(code[i]);
    }
    return { encryptedTOTP: encrypt(encryptedTOTP, secret) };
}

const validateTOTP = (secret, encryptedTOTP) => {
    const decryptedTOTP = decrypt(encryptedTOTP, secret);
    const { encryptedTOTP: newEncryptedTOTP } = generateTOTP(secret);
    const newDecryptedTOTP = decrypt(newEncryptedTOTP, secret);
    return decryptedTOTP === newDecryptedTOTP;
}

module.exports = { generateTOTP, validateTOTP };

