const axios = require('axios');
const config = require('../config');

const BASE_URL = config.githubURL;

const getCommitDetail = async (params) => {
  const { owner, repository, oid } = params;

  try {
    const response = await axios.get(
      `${BASE_URL}/${owner}/${repository}/commits/${oid}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching weather data');
  }
};

module.exports = { getCommitDetail };
