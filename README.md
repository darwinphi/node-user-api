# 📒 User Management API
A demo project using Node.js and MySQL

## 📦 Get Started
Clone the repo
```
git clone git@github.com:darwinphi/node-user-api.git
```
Install the dependencies
```
npm install
```
Run MySQL

```
docker-compose up
```
Wait for a moment to load. Check docker logs to make sure it's up and running.

To start and see the demo app...
```
npm start
```
...Then go to `http://localhost:5000`

## 👨‍💻 Available APIs
Get all users
```
GET /users
```
Create a user
```
GET /users/create
```
Edit a user
```
POST /users/edit
```
Delete a user
```
DELETE /users/delete/:id
```
Delete multiple users
```
POST /users/delete
```
Login
```
POST /auth/login
```

## 📈 Testing
To  run tests
```
npm run test
```
`./tests/user.test.js`
`./tests/auth.test.js`

## 🌱 Seed
To seed some data
```
npm run seed
```

or
```
npx prisma db seed
```
`./prisma/seed.js`

## Optional
View data of your database
```
npx prisma studio
```
Build client
```
cd client && npm run build
```

Run front-end separately
```
cd client && npm run dev
```


## ⚒️ Tools
Back-end: Node.js, Express, Prisma ORM, MySQL, Docker

Front-end: React.js

Testing: Jest, Supertest

