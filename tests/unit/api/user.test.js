const controller = require('../../../app/api/user')
const users = require('../../../app/api/user-list.json')

describe('User API', () => {
  beforeEach(() => {
    const end = jest.fn()

    this.requestMock = { query: {} }
    this.responseMock = {
      json: jest.fn(),
      status: jest.fn(() => ({ end })),
      end,
    }
  })

  describe('#search', () => {
    describe('Without any query text', () => {
      it('Returns all the results', () => {
        controller.search(this.requestMock, this.responseMock)

        expect(this.responseMock.json).toHaveBeenCalledWith({
          count: users.length,
          results: users,
        })
      })
    })

    describe('With query text', () => {
      describe('When the query matches', () => {
        it('Returns the correct results', () => {
          const text = 'John'
          const list = users.filter(({ first_name: fname, last_name: lname }) => (fname.includes(text) || lname.includes(text)))

          this.requestMock.query.autocomplete = text
          controller.search(this.requestMock, this.responseMock)

          expect(this.responseMock.json).toHaveBeenCalledWith({
            count: list.length,
            results: list,
          })
        })
      })

      describe('When the query does not match', () => {
        it('Returns the correct results', () => {
          const text = 'abc-123'
          const list = []

          this.requestMock.query.autocomplete = text
          controller.search(this.requestMock, this.responseMock)

          expect(this.responseMock.json).toHaveBeenCalledWith({
            count: list.length,
            results: list,
          })
        })
      })
    })
  })

  describe('#introspect', () => {
    describe('When the user cannot be found', () => {
      it('Returns 404', () => {
        controller.introspect(this.requestMock, this.responseMock)

        expect(this.responseMock.status).toHaveBeenCalledWith(404)
        expect(this.responseMock.end).toHaveBeenCalled()
      })
    })

    describe('When the user can be found', () => {
      describe('When the user id matches', () => {
        it('Returns the user', () => {
          const user = users[ 1 ]

          this.requestMock.query.user_id = user.user_id
          controller.introspect(this.requestMock, this.responseMock)

          expect(this.responseMock.json).toHaveBeenCalledWith(user)
        })
      })

      describe('When the user email matches', () => {
        it('Returns the user', () => {
          const user = users[ 2 ]

          this.requestMock.query.email = user.email
          controller.introspect(this.requestMock, this.responseMock)

          expect(this.responseMock.json).toHaveBeenCalledWith(user)
        })
      })
    })
  })
})
