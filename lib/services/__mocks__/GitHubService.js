// eslint-disable-next-line no-unused-vars
const getGithubToken = async (code) => {
  return 'MOCK TOKEN FOR CODE';
};
// eslint-disable-next-line no-unused-vars
const getGitHubProfile = async (token) => {
  return {
    login: 'fake_github_user',
    avatar_url: 'any string',
    email: 'not-real@example.com',
  };
};

module.exports = { getGitHubProfile, getGithubToken };
