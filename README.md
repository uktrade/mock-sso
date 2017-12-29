# Mock SSO

An simple app for testing the cogs involved with SSO integration. Simply replies back with the Bearer you send.

[![Build Status](https://travis-ci.org/uktrade/mock-sso.svg?branch=master)](https://travis-ci.org/uktrade/mock-sso)

## Table of contents
- [Environment variables](#environment-variables)
- [Development](#development)
  - [Setup](#setup)
  - [Running](#running)
  - [Tests](#tests)
  - [Linting](#linting)
- [Endpoints](#endpoints)
  - [/o/authorize](#get-oauthorize)
    - [Query parameters](#query-parameters)
  - [/o/token](#post-otoken)
    - [Body parameters](#body-parameters)
  - [/healthcheck](#get-healthcheck)
- [Docker](#docker)

## Environment variables
| Name          | Description                               |
|:--------------|:------------------------------------------|
| MOCK_SSO_PORT | The applications port, defaults to `8080` |

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
### GET: /o/authorize
A `GET` request to `/o/authorize` will redirect you back to `redirect_uri?state=<state>&code=<code>`

#### Query parameters
| Name          | Description                                 |
|:--------------|:--------------------------------------------|
|`redirect_uri` | Your applications OAuth callback url        |
|`state`        | Your applications stateId                   |
|`code`         | The token you wish to be sent back from SSO |

### POST: /o/token
A `POST` request to `/o/token` will reply with you back to you with a JSON response of 
```
{
  access_token: <code>,
  token_type: 'Bearer',
}
```

### GET: /healthcheck
A `GET` request to `/healthcheck` will reply with you back to you with a 200 and "OK"

#### Body parameters
| Name          | Description                                 |
|:--------------|:--------------------------------------------|
|`code`         | The token you wish to be sent back from SSO |

## Docker

