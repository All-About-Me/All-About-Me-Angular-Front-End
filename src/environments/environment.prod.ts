export const environment = {
  production: true,
  withCredentials: true,
  baseUrl: "http://localhost:8080",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://aamfront-enddeploy.s3-website-us-east-1.amazonaws.com/',
  },
};
