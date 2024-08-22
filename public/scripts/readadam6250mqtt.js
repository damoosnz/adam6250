document.getElementById('startBtn').addEventListener('click', async () => {
    const response = await fetch('https://adam6250.netlify.app/.netlify/functions/readmqtt');
    const data = await response.json();
    console.log(data)
    document.getElementById('dataDisplay').innerText = `Received: ${data.message}`;
});
