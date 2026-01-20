const net = require('net');
const Crypto = require('./cryptoService');
const TimeSeries = require('./models/TimeSeries');


module.exports = (io) => {
    const server = net.createServer(socket => {
        socket.on('data', async data => {
            const messages = data.toString().split('|');


            for (const msg of messages) {
                try {
                    const decrypted = Crypto.decrypt(msg);
                    const payload = JSON.parse(decrypted);
                    if (!Crypto.isValid(payload)) continue;


                    const minute = new Date();
                    minute.setSeconds(0, 0);


                    const doc = await TimeSeries.findOneAndUpdate(
                        { minuteBucket: minute },
                        { $push: { records: { ...payload, timestamp: new Date() } } },
                        { upsert: true, new: true }
                    );


                    let total = messages.length;
                    let success = 0;

                    for (const msg of messages) {
                        try {
                            const decrypted = Crypto.decrypt(msg);
                            const payload = JSON.parse(decrypted);
                            if (!Crypto.isValid(payload)) continue;

                            success++;

                            const minute = new Date();
                            minute.setSeconds(0, 0);

                            await TimeSeries.findOneAndUpdate(
                                { minuteBucket: minute },
                                { $push: { records: { ...payload, timestamp: new Date() } } },
                                { upsert: true }
                            );

                            io.emit('record', payload);
                        } catch (e) {}
                    }

                    io.emit('stats', {
                        total,
                        success
                    });

                } catch (e) {}
            }
        });
    });


    server.listen(4000, () => console.log('TCP Listener on 4000'));
};