# customer-service
Based on https://github.com/a7ul/blog-graphql-auth-example


<!-- RUN COMMAND -->
Add this to .env file and change accordingly

PG_USERNAME: "username"
PG_PASSWORD: "password"
PG_DATABASE: "Mula"
PG_HOST: "localhost"
PG_PORT: "5432"
SERVER_PORT: 5000
JWT_SECRET: "Mula_Secrets"

FRONTEND_ORIGINS: 'http://localhost:3000'

npm run build-ts
npm run start:dev

<!-- First User -->
Endpoints can only be accessed by logged in users and new users can only be created by the admin
You'll have to add first user manually in table Admin_users with following details:

uuid: 33efb893-807d-4cc1-8550-25720a2cb895
username: (Any of your choice)
name: (Optional)
password: $2b$12$EeKSiQhSz6ZHmyHi4/gcLe2oDM12GVFiBDPtELJszEEpUJv5zghmi
role: admin

The password is hashed form of 123456 <- use this for login

<!-- For Migrations Generation-->

npx ts-node ./node_modules/.bin/typeorm migration:generate ./src/migrations/migrate -d ./src/datastore.ts

