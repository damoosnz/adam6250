document.getElementById('startBtn').addEventListener('click', async () => {
    const response = await fetch('https://adam6250.netlify.app/.netlify/functions/mqtt-handler');
    const data = await response.json();
    document.getElementById('dataDisplay').innerText = `Received: ${data.message}`;
});
