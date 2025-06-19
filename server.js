const os = require('os');
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
 
const app = express();
const PORT = 8080; // Gateway will run on port 8080
 
// Route to proxy requests to the authentication service (port 3000)
app.use(
  "/api/v2/user",
  createProxyMiddleware({
    target: `http://localhost:3000/api/v2/user`, // Target microservice URL
    changeOrigin: true, // Ensures the correct origin is set
    // router: (req) => {
    //   return `http://localhost:3000/api/v1/auth`; // This forwards the complete URL path
    // },
  })
);

app.use(
  "/api/v2/doctors",
  createProxyMiddleware({
    target: `http://localhost:3002/api/v2/doctors`, // Target microservice URL
    changeOrigin: true, // Ensures the correct origin is set
    // router: (req) => {
    //   return `http://localhost:3000/api/v1/auth`; // This forwards the complete URL path
    // },
  })
);

app.use(
  "/api/v1/slots",
  createProxyMiddleware({
    target: `http://localhost:3008/api/v1/slots`, // Target microservice URL
    changeOrigin: true, // Ensures the correct origin is set
    // router: (req) => {
    //   return `http://localhost:3000/api/v1/auth`; // This forwards the complete URL path
    // },
  })
);

app.use(
  "/api/v1/patients",
  createProxyMiddleware({
    target: `http://localhost:3001/api/v1/patients`, // Target microservice URL
    changeOrigin: true, // Ensures the correct origin is set
    // router: (req) => {
    //   return `http://localhost:3000/api/v1/auth`; // This forwards the complete URL path
    // },
  })
);

app.use(
  "/api/v1/questionnaire",
  createProxyMiddleware({
    target: `http://localhost:3003/api/v1/questionnaire`, // Target microservice URL
    changeOrigin: true, // Ensures the correct origin is set
    // router: (req) => {
    //   return `http://localhost:3000/api/v1/auth`; // This forwards the complete URL path
    // },
  })
);
 
app.use(
  "/api/v1/coupons",
  createProxyMiddleware({
    target: `http://localhost:3013/api/v1/coupons`, // Target microservice URL
    changeOrigin: true, // Ensures the correct origin is set
    // router: (req) => {
    //   return `http://localhost:3000/api/v1/auth`; // This forwards the complete URL path
    // },
  })
);

app.use(
  "/api/v1/payment",
  createProxyMiddleware({
    target: `http://localhost:3010/api/v1/payment`, // Target microservice URL
    changeOrigin: true, // Ensures the correct origin is set
    // router: (req) => {
    //   return `http://localhost:3000/api/v1/auth`; // This forwards the complete URL path
    // },
  })
);
 
app.use(
  "/api/v1/appointments",
  createProxyMiddleware({
    target: `http://localhost:3007/api/v1/appointments`, // Target microservice URL
    changeOrigin: true, // Ensures the correct origin is set
    // router: (req) => {
    //   return `http://localhost:3000/api/v1/auth`; // This forwards the complete URL path
    // },
  })
);
 
app.listen(PORT, () => {
  const networkInterfaces = os.networkInterfaces();
  let ipAddress;
 
  // Iterate through the network interfaces to find the local IP address
  for (let interfaceKey in networkInterfaces) {
    const interfaceDetails = networkInterfaces[interfaceKey];
    for (let i = 0; i < interfaceDetails.length; i++) {
      const details = interfaceDetails[i];
      if (details.family === 'IPv4' && !details.internal) {
        ipAddress = details.address;
        break;
      }
    }
    if (ipAddress) break;
  }
 
  console.log(`API Gateway is running on http://localhost:${PORT}`);
  if (ipAddress) {
    console.log(`API Gateway is also accessible at http://${ipAddress}:${PORT}`);
  }
});