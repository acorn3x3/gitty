const getGithubToken = async (code) => {
  console.log(`CALLING MOCK getGitHubToken! ${code}`);
  return 'MOCK TOKEN FOR CODE';
};

const getGitHubProfile = async (token) => {
  console.log(`CALLING token getGitHubProfile! ${token}`);
  return {
    login: 'fake_github_user',
    avatar_url: 'any string',
    email: 'not-real@example.com',
  };
};

module.exports = { getGitHubProfile, getGithubToken };
