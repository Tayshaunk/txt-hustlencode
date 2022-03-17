const prod = {
  API_URL: 'https://ronjovi-server.herokuapp.com/',
};

const dev = {
  API_URL: 'http://localhost:3000/',
   //API_URL: "https://ronjovi-server.herokuapp.com/"
};

const url = process.env.NODE_ENV === 'development' ? dev : prod;

export default url;
