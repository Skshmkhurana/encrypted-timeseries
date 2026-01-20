const crypto = require('crypto');


const ALGO = 'aes-256-ctr';
const KEY = crypto.createHash('sha256').update(process.env.ENCRYPTION_KEY).digest();


exports.decrypt = (encrypted) => {
    const iv = Buffer.from(encrypted.slice(0, 32), 'hex');
    const content = Buffer.from(encrypted.slice(32), 'hex');
    const decipher = crypto.createDecipheriv(ALGO, KEY, iv);
    return decipher.update(content) + decipher.final('utf8');
};


exports.isValid = (payload) => {
    const { name, origin, destination, secret_key } = payload;
    const hash = crypto.createHash('sha256').update(JSON.stringify({ name, origin, destination })).digest('hex');
    return hash === secret_key;
};