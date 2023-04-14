<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
A nest websocket example with auth.

实现了websocket连接鉴权、心跳保活、私聊和系统主动推送通知等逻辑

## Installation

```bash
# install
$ pnpm up -latest

# .env
$ cp .env.example .env # modify the config with yours

# run migration
$ pnpm typeorm:run-migrations
```

## Running the app

```bash
# development
$ pnpm start

# watch mode
$ pnpm start:dev
```

## Test
1. login to get jwt
*the test users Jim and John are auto generated on nest start, look at [OnApplicationBootstrap](https://github.com/tashuo/nest-websocket/blob/master/src/modules/user/user.module.ts)*
```bash
$ curl -X POST \
  '127.0.0.1:3000/user/login' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "username": "Jim",
  "password": "123456"
}'

$ curl -X POST \
  '127.0.0.1:3000/user/login' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "username": "John",
  "password": "123456"
}'
```

2. test with Postman
  1. connect to ws server with jwt token
  [![ixBr6Q.md.png](https://i.328888.xyz/2023/04/14/ixBr6Q.md.png)](https://imgloc.com/i/ixBr6Q)

  2. add chat event listener
  [![ixBGld.md.png](https://i.328888.xyz/2023/04/14/ixBGld.md.png)](https://imgloc.com/i/ixBGld)

  3. send message directly with ws
  [![ixBYc5.md.png](https://i.328888.xyz/2023/04/14/ixBYc5.md.png)](https://imgloc.com/i/ixBYc5)
  [![ixXVGH.md.png](https://i.328888.xyz/2023/04/14/ixXVGH.md.png)](https://imgloc.com/i/ixXVGH)

  4. send message with http api
  [![ixXO7d.md.png](https://i.328888.xyz/2023/04/14/ixXO7d.md.png)](https://imgloc.com/i/ixXO7d)
  [![ixXev5.md.png](https://i.328888.xyz/2023/04/14/ixXev5.md.png)](https://imgloc.com/i/ixXev5)

3. test heartbeat
  1. normal
  [![ixgprJ.md.png](https://i.328888.xyz/2023/04/14/ixgprJ.md.png)](https://imgloc.com/i/ixgprJ)

  2. timeout
  [![ixgdDz.md.png](https://i.328888.xyz/2023/04/14/ixgdDz.md.png)](https://imgloc.com/i/ixgdDz)

## License

Nest is [MIT licensed](LICENSE).
