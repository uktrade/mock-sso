const ping = require('../../../app/healthcheck/ping')

describe('#ping', () => {
  beforeEach(() => {
    this.nextMock = jest.fn()
    this.requestMock = {}
    this.responseMock = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }
    ping(this.requestMock, this.responseMock, this.nextMock)
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
    expect(this.responseMock.send.mock.calls[0][0]).toEqual('OK')
  })
})
