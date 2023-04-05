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
  - [/api/v1/user/me/](#/api/v1/user/me/)
    - [Body parameters](#body-parameters)
  - [/api/v1/user/search](#/api/v1/user/search/)
  - [/api/v1/user/introspect](#/api/v1/user/introspect/)

  - [/healthcheck](#get-healthcheck)
- [Docker](#docker)
  - [Automated build](#automated-build)

## Kudos
Thanks for the thoughts and influence from [r4vi/fakesso](https://github.com/r4vi/fakesso)

## Environment variables
| Name                    |  Description                                    |
|:------------------------|:------------------------------------------------|
| MOCK_SSO_PORT           | The applications port, defaults to `8080`       |
| MOCK_SSO_USERNAME       | The SSO username to create an SSO token for.    |
| MOCK_SSO_EMAIL_USER_ID  | The required SSO email user id.                 |
| MOCK_SSO_SCOPE          | The required introspect scope                   |
| MOCK_SSO_CODE           | The code passed to the source application       |
| MOCK_SSO_TOKEN          | The required user token for optional validation |
| MOCK_SSO_VALIDATE_TOKEN | Whether to validate the token for the user      |

## Development
### Setup
Recommended setup
- [Node.js](https://nodejs.org/en/) >= 10.16.0
- [npm](https://www.npmjs.com/) >= 6.9.0

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
  "username": <MOCK_SSO_USERNAME>,
  "email_user_id": <MOCK_SSO_EMAIL_USER_ID>,
}
```

### /o/authorize
A `GET` request to `/o/authorize` will redirect you back to `redirect_uri?state=<state>&code=<code>`

#### Query parameters
| Name          | Description                                 |
|:--------------|:--------------------------------------------|
|`redirect_uri` | Your applications OAuth callback url        |
|`state`        | Your applications stateId                   |
|`code`         | The token you wish to be sent back from SSO. Alternatively, use the MOCK_SSO_CODE environment variable |

### /o/token
A `POST` request to `/o/token` will reply with you back to you with a JSON response of
```
{
  access_token: <code>,
  token_type: 'Bearer',
}
```

### /api/v1/user/me/
A `GET` request to `/api/v1/user/me/` will reply back to you with:

#### Without an Authorization header or missing Bearer prefix

A `statusCode` of 400 and a JSON response of
```
{ error: 'invalid_request' }
```

#### With the correct header

A `statusCode` of 200 and a JSON response of
```
{
    email: <email>,
    email_user_id: <string>,
    user_id: <id>,
    first_name: <string>,
    last_name: <string>,
    related_emails: [],
    groups: [],
    permitted_applications: [
        {
            key: <key>,
            url: <url>,
            name: <string>
        },
        ...
    ],
    access_profiles: [
      <string>,
      ...
    ]
}
```

### /api/v1/user/search/
A `GET` request to `/api/v1/user/search/` will reply back to you with a `statusCode` of 200 and a JSON response of a list of all users, filtered so that either `first_name` or `last_name` includes the search string passed with as the `autocomplete` parameter.

```
[
  {
    "user_id": <id>,
    "first_name": <string>,
    "last_name": <string>,
    "email": <email>,
    "email_user_id": <string>
  }
  ...
]
```

#### Body parameters
| Name          | Description                                 |
|:--------------|:--------------------------------------------|
|`autocomplete`         | The search string you wish to use to find a user |

### /api/v1/user/introspect/
A `GET` request to `/api/v1/user/instrospect/` will reply back to you with:

#### Without `user_id`, `email_user_id` or `email` query parameters matching an existing user
A `statusCode` of 404

#### With `user_id`, `email_user_id` or `email` query parameters
A JSON response containing information about the matching user

```
{
    "user_id": <id>,
    "first_name": <string>,
    "last_name": <string>,
    "email": <email>,
    "email_user_id": <string>
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

## Docker Compose

To run this project under docker-compose, do the following:

1.  Create a `.env` file

    ```shell
    cp sample.env .env
    ```

2.  Set the environment variables within your `.env` file as appropriate.

3.  Run `docker-compose up`

### Automated build
There is also a docker automated build setup for this repository. This can be found at https://hub.docker.com/r/ukti/mock-sso
