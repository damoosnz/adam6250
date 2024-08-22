document.getElementById('startBtn').addEventListener('click', async () => {
    const response = await fetch('/.netlify/functions/mqtt-handler');
    const data = await response.json();
    document.getElementById('dataDisplay').innerText = `Received: ${data.message}`;
});
