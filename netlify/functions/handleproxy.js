exports.handler = async function(event) {
  const fetch = (await import('node-fetch')).default;

  // const proxyUrl = "http://90.54.44.103:8081/digitalinput/all/value"; // livebox home
  const proxyUrl = "http://92.184.108.23:8081/digitalinput/all/value"; // tplink router 92.184.108.23 temp ip
  const username = "root";
  const password = "00000000";
  const credentials = Buffer.from(username + ":" + password).toString('base64');

  try {
    const response = await fetch(proxyUrl, {
      method: "GET",
      headers: {
        "Authorization": "Basic " + credentials,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.text();
    return { statusCode: 200, body: data };
  } catch (error) {
    return { statusCode: 500, body: error.message };
  }
};
