# pluribus

> MERN stack, localized Twitter client

## Team

  - __Product Owner__: Mark Keith
  - __Scrum Master__: Todd Bontrager
  - __Development Team__: Nick Vinson

## Table of Contents

1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Usage <a id="usage"></a>

> Google Maps API allows us to channel Twitter data into a pleasant local UX
> [Passport](http://passportjs.org/) was integrated to satisfy client authentication standards.

## Requirements <a id="requirements"></a>

- Node 4.4.3
- React
- Redux
- Passport ^0.3.2
- Sequelize
- MySQL

- [Twitter](https://dev.twitter.com/rest/public)
  + Developer publish and subscribe [API keys](https://www.dev.twitter.com/docs): 
  ``` javascript
  var twitter_key = process.env.TWITTER_API_KEY;
  var facebook_key = process.env.FB_API_KEY;
  ```

## Development <a id="development"></a>

### Installing Dependencies <a id="installing-dependencies"></a>

From within the root directory:

```sh
npm install
```

### Tasks <a id="tasks"></a>

From within the root directory:

1. Create a bare `.env` file
1. Include your [publish/subscribe keys](#requirements) as key=value pairs

Finally,

```sh
npm run test:client
heroku local
```

## Team <a id="team"></a>

+ Mark Keith
  - Has a heart full of civic passion

+ Todd Bontrager
  - Is a father to us all

+ Nicolas Vinson
  - Keeps the spirit strong

### Roadmap <a id="roadmap"></a>

View the project roadmap [here](https://github.com/buergerhackers/pluribus/issues)


## Contributing <a id="contributing"></a>

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.