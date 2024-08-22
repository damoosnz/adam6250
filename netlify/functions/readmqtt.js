const mqtt = require('mqtt');

exports.handler = async function (event, context) {
    const client = mqtt.connect('mqtt://test.mosquitto.org:1883');

    return new Promise((resolve, reject) => {
        client.on('connect', () => {
            console.log('Connected to MQTT broker');
            client.subscribe('Advantech/74FE489353F9/data', (err) => {
                if (err) {
                    reject({
                        statusCode: 500,
                        body: 'Subscription failed',
                    });
                } else {
                    client.on('message', (topic, message) => {
                        console.log(`Received message: ${message.toString()}`);
                        resolve({
                            statusCode: 200,
                            body: JSON.stringify({ topic, message: message.toString() }),
                        });
                        client.end();
                    });
                }
            });
        });

        client.on('error', (err) => {
            console.error('Connection error:', err);
            reject({
                statusCode: 500,
                body: 'Connection failed',
            });
        });
    });
};
