const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/GitHubService');

describe('github auth', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/api/v1/github/login should redirect to the github oauth page', async () => {
    const resp = await request(app).get('/api/v1/github/login');
    expect(resp.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/callback/i
    );
  });
});

it('/api/v1/github/callback should login users to the dashboard', async () => {
  const resp = await request
    .agent(app)
    .get('/api/v1/github/callback?code=42')
    .redirects(1);
  console.log(resp.body);
  expect(resp.body).toEqual({
    id: expect.any(String),
    login: 'fake_github_user',
    email: 'not-real@example.com',
    avatar: expect.any(String),
    iat: expect.any(Number),
    exp: expect.any(Number),
  });
});
afterAll(() => {
  pool.end();
});
