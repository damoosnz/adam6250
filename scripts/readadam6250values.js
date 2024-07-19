document.getElementById("testRequest").addEventListener("click", () => {
    // Proxy service URL
    // const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // CORS proxy service?
    const proxyUrl = "https://api.allorigins.win/get?url="
  
    // Target URL (replace with your endpoint URL)
    const targetUrl = "http://90.54.44.103:8081/digitalinput/all/value";
  
    // Full URL with proxy
    const url = proxyUrl + targetUrl;
  
    // Replace 'username' and 'password' with your actual credentials
    const username = "root";
    const password = "00000000";
    const credentials = btoa(username + ":" + password); // Encode credentials in Base64
  
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Basic " + credentials,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.text(); // Get response as text for XML parsing
      })
      .then((text) => {
        // Log the raw XML text to the console
        console.log("Raw XML Response:", text);
  
        // Optionally, parse and log XML for further debugging
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        console.log("Parsed XML Document:", xmlDoc);
        document.getElementById("response").textContent = text;
      })
      .catch((error) => {
        console.error("Fetch error:", error.message);
      });
  });
  