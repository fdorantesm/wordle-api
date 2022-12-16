### Description

A [NestJS](https://nestjs.com) API to play wordle

### Installation

```bash
$ yarn install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### References

|         |                                           |
| ------- | ----------------------------------------- |
| API     | https://wordle-api-v52u.onrender.com      |
| Swagger | https://wordle-api-v52u.onrender.com/docs |

### MongoDB Container

```bash
docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=secret -v /Users/$USER/.mongodb5:/data --name mongodb mongo:5
```

### Envpack

[📦 Envpack](https://www.npmjs.com/package/envpack) an utility to pack and unpack dotenv files.

```bash
npx envpack -i localhost.zip
```
