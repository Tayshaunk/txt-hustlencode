
// server url for production
const prod = {
  API_URL: 'https://ronjovi-server.herokuapp.com',
};

// server url for local development
const dev = {
  API_URL: 'http://localhost:3000',
};

// if env variable is development load dev url
const url = process.env.NODE_ENV === 'development' ? dev : prod;

export default url;
