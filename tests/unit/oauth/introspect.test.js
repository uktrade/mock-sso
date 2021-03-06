const introspect = require('../../../app/oauth/introspect.js')

describe('#introspect', () => {
  beforeEach(() => {
    this.mockScope = 'mock:scope'
    this.nextMock = jest.fn()
    this.requestMock = {}
    this.responseMock = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }
  })

  describe('with scope and without username', () => {
    beforeEach(() => {
      introspect(this.mockScope)(this.requestMock, this.responseMock, this.nextMock)
    })

    test('response status should be called', () => {
      expect(this.responseMock.status).toHaveBeenCalled()
    })

    test('response status argument should be 200', () => {
      expect(this.responseMock.status).toHaveBeenCalledWith(200)
    })

    test('response send should be called', () => {
      expect(this.responseMock.send).toHaveBeenCalled()
    })

    test('response send argument should be as expected', () => {
      expect(this.responseMock.send.mock.calls[0][0]).toEqual({
        active: true,
        exp: 2524608000,
        scope: this.mockScope,
      })
    })
  })

  describe('with scope and username, without email_user_id', () => {
    beforeEach(() => {
      this.mockUsername = 'murphy'
      introspect(this.mockScope, this.mockUsername)(this.requestMock, this.responseMock, this.nextMock)
    })

    test('response status should be called', () => {
      expect(this.responseMock.status).toHaveBeenCalled()
    })

    test('response status argument should be 200', () => {
      expect(this.responseMock.status).toHaveBeenCalledWith(200)
    })

    test('response send should be called', () => {
      expect(this.responseMock.send).toHaveBeenCalled()
    })

    test('response send argument should be as expected', () => {
      expect(this.responseMock.send.mock.calls[0][0]).toEqual({
        active: true,
        exp: 2524608000,
        scope: this.mockScope,
        username: this.mockUsername,
      })
    })
  })

  describe('with scope, username, and email_user_id', () => {
    beforeEach(() => {
      this.mockUsername = 'murphy'
      this.mockEmailUserId = 'murphy@id.mock-sso'
      introspect(this.mockScope, this.mockUsername, this.mockEmailUserId)(this.requestMock, this.responseMock, this.nextMock)
    })

    test('response status should be called', () => {
      expect(this.responseMock.status).toHaveBeenCalled()
    })

    test('response status argument should be 200', () => {
      expect(this.responseMock.status).toHaveBeenCalledWith(200)
    })

    test('response send should be called', () => {
      expect(this.responseMock.send).toHaveBeenCalled()
    })

    test('response send argument should be as expected', () => {
      expect(this.responseMock.send.mock.calls[0][0]).toEqual({
        active: true,
        email_user_id: this.mockEmailUserId,
        exp: 2524608000,
        scope: this.mockScope,
        username: this.mockUsername,
      })
    })
  })

  describe('without scope', () => {
    beforeEach(() => {
      introspect()(this.requestMock, this.responseMock, this.nextMock)
    })

    test('next should be called', () => {
      expect(this.nextMock).toHaveBeenCalled()
    })

    test('next argument should be an error', () => {
      expect(this.nextMock.mock.calls[0][0]).toBeInstanceOf(Error)
    })

    test('error message should be as expected', () => {
      expect(this.nextMock.mock.calls[0][0].message).toEqual(
        expect.stringMatching('Please provide scope')
      )
    })
  })
})
