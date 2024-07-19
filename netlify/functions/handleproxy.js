


const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const targetUrl = 'http://90.54.44.103:8081/digitalinput/all/value';
  const username = 'root';
  const password = '00000000';
  const credentials = btoa(`${username}:${password}`);

  const response = await fetch(targetUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  const data = await response.text();
  return {
    statusCode: response.status,
    body: data
  };
};