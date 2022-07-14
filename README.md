# A full stack demo with **NextJS** **Next-Auth** **Prisma** **RBAC** **Yup**
## setup db
* install mysql
* config .env.DATABASE_URL

## setup prisma

```
# init
npx prisma
npx prisma init
npm install @prisma/client

# clear migration
rm -rf ./prisma/migrations

# migration
npx prisma migrate dev --name init
```

## init db

* execute ./sql/init.sql on mysql server

## start project

```
yar install
yar dev
```

* user info

```
admin 5678 with all menus
admin 5678 with only with dash and dev link
```

