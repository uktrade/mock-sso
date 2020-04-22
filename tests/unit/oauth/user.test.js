const user = require('../../../app/oauth/user.js')

describe('#user', () => {
  beforeEach(() => {
    this.mockToken = 'abc-123-def-456'
    this.nextMock = jest.fn()
    this.requestMock = {
      headers: {},
    }
    this.responseMock = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    }

    this.validUserResponse = {
      access_profiles: [],
      email: 'vyvyan.holland@email.com',
      contact_email: 'vyvyan.holland@contact-email.com',
      email_user_id: 'vyvyan.holland-20a0353f@id.mock-sso',
      first_name: 'Vyvyan',
      groups: [],
      last_name: 'Holland',
      permitted_applications: [{ key: 'datahub-crm' }, { key: 'datahub-mi' }, { key: 'market-access' }],
      related_emails: [],
      user_id: '20a0353f-a7d1-4851-9af8-1bcaff152b60',
    }
  })

  describe('without a configToken', () => {
    beforeEach(() => {
      user()(this.requestMock, this.responseMock, this.nextMock)
    })

    test('next should be called', () => {
      expect(this.nextMock).toHaveBeenCalled()
    })

    test('next argument should be an error', () => {
      expect(this.nextMock.mock.calls[0][0]).toBeInstanceOf(Error)
    })

    test('error message should be as expected', () => {
      expect(this.nextMock.mock.calls[0][0].message).toEqual(
        expect.stringMatching('Please provide configToken')
      )
    })
  })

  describe('with an missing header', () => {
    beforeEach(() => {
      this.middleware = user(this.mockToken)(this.requestMock, this.responseMock, this.nextMock)
    })

    test('next should not be called', () => {
      expect(this.nextMock).not.toHaveBeenCalled()
    })

    test('a 400 with an error should be returned', () => {
      expect(this.responseMock.status).toHaveBeenCalledWith(400)
      expect(this.responseMock.json).toHaveBeenCalledWith({ error: 'invalid_request' })
    })
  })

  describe('with an invalid header', () => {
    beforeEach(() => {
      this.requestMock.headers.authorization = 'abc'
      this.middleware = user(this.mockToken)(this.requestMock, this.responseMock, this.nextMock)
    })

    test('next should not be called', () => {
      expect(this.nextMock).not.toHaveBeenCalled()
    })

    test('a 400 with an error should be returned', () => {
      expect(this.responseMock.status).toHaveBeenCalledWith(400)
      expect(this.responseMock.json).toHaveBeenCalledWith({ error: 'invalid_request' })
    })
  })

  describe('with an invalid token', () => {
    beforeEach(() => {
      this.requestMock.headers.authorization = 'Bearer abc'
    })

    describe('With validateToken set to true', () => {
      beforeEach(() => {
        this.middleware = user(this.mockToken, true)(this.requestMock, this.responseMock, this.nextMock)
      })

      test('next should not be called', () => {
        expect(this.nextMock).not.toHaveBeenCalled()
      })

      test('a 400 with an error should be returned', () => {
        expect(this.responseMock.status).toHaveBeenCalledWith(400)
        expect(this.responseMock.json).toHaveBeenCalledWith({ error: 'invalid_request' })
      })
    })

    describe('With validateToken set to false', () => {
      beforeEach(() => {
        this.middleware = user(this.mockToken, false)(this.requestMock, this.responseMock, this.nextMock)
      })

      test('next should not be called', () => {
        expect(this.nextMock).not.toHaveBeenCalled()
      })

      test('a 200 with a valid response shoulld be returned', () => {
        expect(this.responseMock.status).toHaveBeenCalledWith(200)
        expect(this.responseMock.send).toHaveBeenCalledWith(this.validUserResponse)
      })
    })
  })

  describe('with an valid token', () => {
    beforeEach(() => {
      this.requestMock.headers.authorization = 'Bearer ' + this.mockToken
      this.middleware = user(this.mockToken)(this.requestMock, this.responseMock, this.nextMock)
    })

    test('next should not be called', () => {
      expect(this.nextMock).not.toHaveBeenCalled()
    })

    test('a 200 with a valid response shoulld be returned', () => {
      expect(this.responseMock.status).toHaveBeenCalledWith(200)
      expect(this.responseMock.send).toHaveBeenCalledWith(this.validUserResponse)
    })
  })

  describe('with a LEP valid token', () => {
    beforeEach(() => {
      this.validLepUserResponse = {
        access_profiles: [],
        email: 'LEP.STAFF@email.com',
        contact_email: 'LEP.STAFF@contact-email.com',
        email_user_id: 'LEP.STAFF-20a0353f@id.mock-sso',
        first_name: 'LEP',
        groups: [],
        last_name: 'STAFF',
        permitted_applications: [{ key: 'datahub-crm' }],
        related_emails: [],
        user_id: '20a0353f-a7d1-4851-9af8-1bcaff152b61',
      }
      this.mockToken = 'lepStaffToken'

      this.requestMock.headers.authorization = `Bearer ${this.mockToken}`
      this.middleware = user(this.mockToken)(this.requestMock, this.responseMock, this.nextMock)
    })

    test('next should not be called', () => {
      expect(this.nextMock).not.toHaveBeenCalled()
    })

    test('a 200 with a valid response shoulld be returned', () => {
      expect(this.responseMock.status).toHaveBeenCalledWith(200)
      expect(this.responseMock.send).toHaveBeenCalledWith(this.validLepUserResponse)
    })
  })
})
