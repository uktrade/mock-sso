const token = require('../../../app/oauth/token')

describe('#token', () => {
  beforeEach(() => {
    this.nextMock = jest.fn()
    this.requestMock = { fields: {} }
    this.responseMock = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }
  })

  describe('when expected body params are passed', () => {
    beforeEach(() => {
      this.mockCode = 'mock-code'

      this.requestMock.fields = { code: this.mockCode }

      token()(this.requestMock, this.responseMock, this.nextMock)
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
        access_token: this.mockCode,
        token_type: 'Bearer',
      })
    })
  })

  describe('when expected body params are not passed', () => {
    beforeEach(() => {
      token()(this.requestMock, this.responseMock, this.nextMock)
    })

    test('next should be called', () => {
      expect(this.nextMock).toHaveBeenCalled()
    })

    test('next argument should be an error', () => {
      expect(this.nextMock.mock.calls[0][0]).toBeInstanceOf(Error)
    })

    test('error message should be as expected', () => {
      expect(this.nextMock.mock.calls[0][0].message).toEqual(
        expect.stringMatching('Please provide code param')
      )
    })
  })
})
