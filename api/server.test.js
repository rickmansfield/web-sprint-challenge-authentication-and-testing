const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')
const jokes = require('./jokes/jokes-data')

test('sanity', () => {
  expect(true).toBe(true)
})

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

afterAll(async () => {
  await db.destroy()
})
const newUser = {username: "test", password: "1234"};

describe('[POST] /api/auth/register', () => {
  it('returns a 201 created status on successful registration', async () => {
    const res = await request(server)
    .post('/api/auth/register')
    .send(newUser);
    expect(res.status).toBe(201);
  });
});

describe('[POST] /api/auth/login', () => {
  it('responds with a 200 OK status', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send(newUser)
    expect(res.status).toBe(200)
  })

  // it('responds with a 422 if no username or password in payload', async () => {
  //   let res = await request(server)
  //     .post('/api/auth/login')
  //     .send({ username: '', password: '1234' })
  //   expect(res.status).toBe(422)
  //   res = await request(server)
  //     .post('/api/auth/login')
  //     .send({ username: 'test3', password: '' })
  //   expect(res.status).toBe(422)
  // })
})
