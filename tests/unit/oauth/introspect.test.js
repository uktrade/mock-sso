const introspect = require('../../../app/oauth/introspect.js')

describe('#ping', () => {
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

  describe('with scope and username', () => {
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
