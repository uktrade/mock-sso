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

  test('response send argument should be "OK"', () => {
    expect(this.responseMock.send.mock.calls[0][0]).toEqual({
      active: true,
      exp: 1000000000,
      scope: this.mockScope,
    })
  })
})
