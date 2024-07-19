// document.getElementById("testRequest").addEventListener("click", () => {
//     fetch('https://adam6250.netlify.app/.netlify/functions/handleproxy')
//       .then(response => response.text())
//       .then(text => {
//         document.getElementById("response").textContent = text;
//       })
//       .catch(error => {
//         console.error("Fetch error:", error.message);
//         document.getElementById("response").textContent = `Fetch error: ${error.message}`;
//       });
//   });

document.getElementById("testRequest").addEventListener("click", async () => {
  try {
      // Fetch data from the Netlify function
      const response = await fetch('https://adam6250.netlify.app/.netlify/functions/handleproxy');
      
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      
      const text = await response.text();

      // Parse and display the XML
      const table = parseXmlAndGenerateTable(text);
      document.getElementById("response").innerHTML = table;
  } catch (error) {
      console.error("Fetch error:", error.message);
      document.getElementById("response").textContent = `Fetch error: ${error.message}`;
  }
});

/**
* Parses XML text and generates an HTML table.
* @param {string} xmlText - The XML text to parse.
* @returns {string} - The HTML table as a string.
*/
function parseXmlAndGenerateTable(xmlText) {
  // Parse XML
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "text/xml");

  // Create table
  let table = '<table border="1"><thead><tr><th>DI ID</th><th>Value</th></tr></thead><tbody>';

  // Extract data
  const diElements = xmlDoc.getElementsByTagName("DI");
  for (let di of diElements) {
      const id = di.getElementsByTagName("ID")[0].textContent;
      const value = di.getElementsByTagName("VALUE")[0].textContent;
      table += `<tr><td>${id}</td><td>${value}</td></tr>`;
  }
  table += '</tbody></table>';

  return table;
}
