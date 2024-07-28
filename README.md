### Setup: Client
Install node packages
```
cd client
npm install
```
Run react locally, view website at http://localhost:3000
```
npm start
```

### Setup: Server
Install node packages
```
cd server
npm install
```
Install and setup prisma
```
npm install prisma
cd lib/model
npx prisma generate
```
Run server locally, it will run at http://localhost:5000