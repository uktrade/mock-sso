const supertest = require('supertest')
const server = require('../../../app')

describe('POST /o/token', () => {
  beforeEach(async () => {
    this.mockFieldContent = 'mock field content'
    this.response = await supertest(server)
      .post('/o/token')
      .field('code', this.mockFieldContent)
  })

  afterEach(() => {
    server.close()
  })

  it('respond with expected status code', () => {
    expect(this.response.statusCode).toBe(200)
  })

  it('respond with expected body', () => {
    expect(this.response.body).toEqual({
      access_token: this.mockFieldContent,
      token_type: 'Bearer',
    })
  })
})
