const querystring = require('querystring')

const authorize = require('../../../app/oauth/authorize')

describe('#authorize', () => {
  beforeEach(() => {
    this.nextMock = jest.fn()
    this.requestMock = { query: {} }
    this.responseMock = {
      redirect: jest.fn(),
    }
  })

  describe('when expected params are passed', () => {
    beforeEach(() => {
      this.mockRedirectUri = 'mock-redirect-uri'
      this.mockState = 'mock-state'
      this.mockCode = 'mock-code'

      this.requestMock.query = {
        redirect_uri: this.mockRedirectUri,
        state: this.mockState,
        code: this.mockCode,
      }

      authorize()(this.requestMock, this.responseMock, this.nextMock)
    })

    test('redirect should be called', () => {
      expect(this.responseMock.redirect).toHaveBeenCalled()
    })

    test('redirect argument should match expected url', () => {
      expect(this.responseMock.redirect).toHaveBeenCalledWith(
        `${this.mockRedirectUri}?${querystring.stringify({
          state: this.mockState,
          code: this.mockCode,
        })}`
      )
    })
  })

  describe('when expected query params are not passed', () => {
    beforeEach(() => {
      authorize()(this.requestMock, this.responseMock, this.nextMock)
    })

    test('next should be called', () => {
      expect(this.nextMock).toHaveBeenCalled()
    })

    test('next argument should be an error', () => {
      expect(this.nextMock.mock.calls[0][0]).toBeInstanceOf(Error)
    })

    test('error message should be as expected', () => {
      expect(this.nextMock.mock.calls[0][0].message).toEqual(
        expect.stringMatching(
          'Please provide code via param or environment variable'
        )
      )
    })
  })
})
