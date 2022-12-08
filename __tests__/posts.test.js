const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService.js');
jest.mock('../lib/services/GitHubService.js');

// Dummy user for testing
const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: '12345',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;
  const agent = request.agent(app);
  const user = await UserService.create({ ...mockUser, ...userProps });
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('post routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('GET /api/v1/posts should allow authenticated users to return a list of posts of all users', async () => {
    const [agent] = await registerAndLogin();
    const resp = await agent.get('/api/v1/posts').expect(200);
    expect(resp.body).toMatchInlineSnapshot('Array []');
    await request(app).get('/api/v1/posts').expect(401);
  });
  it('POST /api/v1/posts should allow authenticated users to create a new post', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/callback?code=42').redirects(1);

    const resp = await agent
      .post('/api/v1/posts')
      .send({
        title: 'look at me',
        content: 'im mr meeseeks',
      })
      .expect(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "content": "im mr meeseeks",
        "id": "1",
        "title": "look at me",
        "user_id": "1",
      }
    `);

    await request(app).get('/api/v1/posts');
  });
});
