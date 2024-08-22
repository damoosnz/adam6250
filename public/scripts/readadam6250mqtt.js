document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const dataDisplay = document.getElementById('dataDisplay');

    let client;

    startBtn.addEventListener('click', () => {
        if (!client) {
            client = mqtt.connect('wss://test.mosquitto.org:8080/mqtt'); // Use WebSocket for browser

            client.on('connect', () => {
                console.log('Connected to MQTT broker');
                client.subscribe('Advantech/74FE489353F9/data'); // Replace with your topic
            });

            client.on('message', (topic, message) => {
                const data = message.toString();
                console.log(`Received message: ${data}`);
                dataDisplay.innerText = `Received message: ${data}`;
            });
        }
    });

    stopBtn.addEventListener('click', () => {
        if (client) {
            client.end();
            console.log('Disconnected from MQTT broker');
            client = null;
        }
    });
});
