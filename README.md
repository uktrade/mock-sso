# Mock SSO

A simple app for testing the cogs involved with SSO integration. Simply replies back with the Bearer you send.

[![Build Status](https://travis-ci.org/uktrade/mock-sso.svg?branch=master)](https://travis-ci.org/uktrade/mock-sso)

## Table of contents
- [Kudos](#kudos)
- [Environment variables](#environment-variables)
- [Development](#development)
  - [Setup](#setup)
  - [Running](#running)
  - [Tests](#tests)
  - [Linting](#linting)
- [Endpoints](#endpoints)
  - [/o/introspect](#get-introspect)
  - [/o/authorize](#get-oauthorize)
    - [Query parameters](#query-parameters)
  - [/o/token](#post-otoken)
    - [Body parameters](#body-parameters)
  - [/healthcheck](#get-healthcheck)
- [Docker](#docker)
  - [Automated build](#automated-build)

## Kudos
Thanks for the thoughts and influence from [r4vi/fakesso](https://github.com/r4vi/fakesso)

## Environment variables
| Name                |  Description                                  |
|:--------------------|:----------------------------------------------|
| MOCK_SSO_PORT       | The applications port, defaults to `8080`     |
| MOCK_SSO_USERNAME   | The SSO username to create an SSO token for   |
| MOCK_SSO_SCOPE      | The required introspect scope                 |

## Development
### Setup
Recommended setup
- [Node.js](https://nodejs.org/en/) >= 8.5.0
- [npm](https://www.npmjs.com/) >= 5.6.0 

To install multiple versions of Node.js, you may find it easier to use a node version manager
- [nvm](https://github.com/creationix/nvm)
- [n](https://github.com/tj/n)

To install dependencies
```
$ npm i
```

## Running
To start the application
```
$ npm start
```

### Tests
To run tests
```
$ npm test
```

### Linting
To run linting
```
$ npm run lint
```

## Endpoints
### /o/introspect
Introspect uses the [rfc7662](https://tools.ietf.org/html/rfc7662) specification.

A `POST` request to `/o/introspect` will reply back with a 200 and the following the response
```
{
  "active": true,
  "exp": 2524608000,
  "scope": <MOCK_SSO_SCOPE>
}
```
If you wish to create an SSO token you can provide the username that you wish to associate the token with via the
environment variable `MOCK_SSO_USERNAME`. This will then return the following response:
```
{
  "active": true,
  "exp": 2524608000,
  "scope": <MOCK_SSO_SCOPE>,
  "username": <MOCK_SSO_USERNAME>
}
```

### /o/authorize
A `GET` request to `/o/authorize` will redirect you back to `redirect_uri?state=<state>&code=<code>`

#### Query parameters
| Name          | Description                                 |
|:--------------|:--------------------------------------------|
|`redirect_uri` | Your applications OAuth callback url        |
|`state`        | Your applications stateId                   |
|`code`         | The token you wish to be sent back from SSO |

### /o/token
A `POST` request to `/o/token` will reply with you back to you with a JSON response of 
```
{
  access_token: <code>,
  token_type: 'Bearer',
}
```

### /healthcheck
A `GET` request to `/healthcheck` will reply with you back to you with a 200 and "OK"

#### Body parameters
| Name          | Description                                 |
|:--------------|:--------------------------------------------|
|`code`         | The token you wish to be sent back from SSO |


## Docker
To build a docker image
```
$ docker build -t sso-mock .
```

To run locally
```
$ docker run -p 8080:8080 -d sso-mock
```

### Automated build
There is also a docker automated build setup for this repository. This can be found at https://hub.docker.com/r/ukti/mock-sso
