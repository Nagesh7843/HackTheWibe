const http = require('http');

function testLoginAPI() {
  const data = JSON.stringify({
    phoneNumber: '9876543210',
    password: 'student123'
  });

  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/students/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = http.request(options, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      console.log('Status Code:', res.statusCode);
      console.log('Response Headers:', res.headers);
      console.log('Response Body:', responseData);
      
      try {
        const parsedData = JSON.parse(responseData);
        if (parsedData.token) {
          console.log('\n✅ Login successful!');
          console.log('Token received:', parsedData.token.substring(0, 30) + '...');
        } else {
          console.log('\n❌ Login failed');
          console.log('Error:', parsedData.message);
        }
      } catch (e) {
        console.log('\n❌ Failed to parse response:', e.message);
      }
      process.exit(0);
    });
  });

  req.on('error', (error) => {
    console.error('❌ API Request Error:', error.message);
    process.exit(1);
  });

  req.write(data);
  req.end();
}

console.log('🔄 Testing student login API...');
setTimeout(testLoginAPI, 1000);
