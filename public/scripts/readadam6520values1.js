document.getElementById("testRequest").addEventListener("click", () => {
    fetch('https://adam6250.netlify.app/.netlify/functions/handleproxy')
      .then(response => response.text())
      .then(text => {
        document.getElementById("response").textContent = text;
      })
      .catch(error => {
        console.error("Fetch error:", error.message);
        document.getElementById("response").textContent = `Fetch error: ${error.message}`;
      });
  });