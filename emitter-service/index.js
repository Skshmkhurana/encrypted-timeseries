const net = require('net');
const crypto = require('crypto');
const fs = require('fs');

const ALGO = 'aes-256-ctr';
const KEY = crypto.createHash('sha256').update('supersecretkey123').digest();
const data = JSON.parse(fs.readFileSync('data.json'));

const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGO, KEY, iv);
  return (
    iv.toString('hex') +
    Buffer.concat([cipher.update(text), cipher.final()]).toString('hex')
  );
};

const client = new net.Socket();
client.connect(4000, '127.0.0.1');

setInterval(() => {
  const messages = Array.from(
    { length: Math.floor(Math.random() * 450) + 49 },
    () => {
      const payload = {
        name: data.names[Math.floor(Math.random() * data.names.length)],
        origin: data.cities[Math.floor(Math.random() * data.cities.length)],
        destination: data.cities[Math.floor(Math.random() * data.cities.length)]
      };

      const hashPayload = {
        name: payload.name,
        origin: payload.origin,
        destination: payload.destination
      };

      payload.secret_key = crypto
        .createHash('sha256')
        .update(JSON.stringify(hashPayload))
        .digest('hex');

      return encrypt(JSON.stringify(payload));
    }
  );

  client.write(messages.join('|'));
}, 10000);
