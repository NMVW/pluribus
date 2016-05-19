# [Pluribus](https://pluribus-app.herokouapp.com)

A socal media platform built with the MERN stack: MySQL, Express, React/Redux, Node

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
    1. [Launching App](#launching-app)
1. [Team](#team)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Usage <a id="usage"></a>

[Pluribus](https://pluribus-app.herokouapp.com) was developed to empower citizens to engage in local community issues. This is accomplished by providing users with a map-driven social media platform.

## Requirements <a id="requirements"></a>

 Make sure you have installed all of the following prerequisites on your development machine:

* Node 4.4.3
* Express 4.13.4
* React 15.0.2
* Redux 3.5.2
* Sequelize 3.22.0
* MySQL 2.10.x
* OAuth 2.0

## Development <a id="development"></a>

### Installing Dependencies <a id="installing-dependencies"></a>

From within the root directory:

```sh
npm install
```

### Tasks <a id="tasks"></a>

From within the /server directory:

1. Create a bare `.env` file
2. Include the secret Google OAuth Client ID, Secret and Express Session Secret like this:

```sh
GOOGLE_CID=987654321randomsomethinghere
GOOGLE_CSECRET=itsasecret
SESSION_SECRET="somethinghere"
```

### Launching App

Launch the MySQL server by running:

```
mysql.server start
```

Then create a MySQl table called `pluribus`.

In the root folder, run:
```
webpack -w
``` 

In the /server folder, run:

```
npm server.js
```

Finally, navigate to `http://localhost:3000` on your web browser.

## Team <a id="team"></a>

+ Mark Keith
+ Todd Bontrager
+ Nicolas Vinson


### Roadmap <a id="roadmap"></a>

View the project roadmap [here](https://github.com/buergerhackers/pluribus/issues)


## Contributing <a id="contributing"></a>

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
