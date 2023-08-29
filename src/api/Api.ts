import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react/issues',
});

Api.interceptors.request.use(async config => {
  const Token = process.env.REACT_APP_GITHUB_TOKEN;
  config.headers.Authorization = `Bearer ${Token}`;
  config.headers['X-GitHub-Api-Version'] = '2022-11-28';
  return config;
});

Api.interceptors.response.use(
  response => {
    return response.data;
  },

  async error => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default Api;
