const prod = {
  API_URL: 'https://ronjovi-server.herokuapp.com/',
};

const dev = {
  API_URL: 'http://41a3-76-175-119-129.ngrok.io',
  // API_URL: "https://ronjovi-server.herokuapp.com/"
};

const url = process.env.NODE_ENV === 'development' ? dev : prod;

export default url;
