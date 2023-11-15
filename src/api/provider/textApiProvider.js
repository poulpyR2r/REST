const axios = require("axios");

const baseUrl = "https://loripsum.net/api";

exports.getLoremIpsum = async () => {
  const response = await axios.get(`${baseUrl}/1/short/plaintext` , {responseType: 'text'});
  return response.data;
};
