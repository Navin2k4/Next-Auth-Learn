## Project UU

# Created the Login Page and the Register page and set up the routes for those pages
 - Using ShadCn UI , How to use the fonts and Reusable components  
  - Two folders are there 
    - one is actions - server actions
    - another is the normal api routes defined in the app api

# Setting up the data base using the Prosma ORM
 - npm i -D prisma 
 - npm i @prisma/client
 - - Create the prisma util file
 - - lib folder db.ts
 after setting up db.ts add .env to gitignore
 - npz prisma init

 https://console.neon.tech/app/projects/green-forest-98431117/quickstart

-  after creating an User model
 npx prisma generate 
 npx prisma db push

 https://authjs.dev/getting-started/adapters/prisma

https://authjs.dev/getting-started/installation?framework=Next.js
npm install next-auth@beta
set up handler middleware and route file 

 npm i @auth/prisma-adapter
 
- Extending the sessions in the auth.ts file using the callbacks added the token.sub to the session user id

callbacks:{
    async session({token , session}){
      console.log({
        sessionToke:token,
        session,
      });
      if(token.sub && session.user){
        session.user.id = token.sub;
      }
      return session;
    } ,

    async jwt({token}){
      return token
    },

- Added the user Role in the user Schema so resetting the database

 npx prisma migrate reset
npx prisma db push



 TODO: Try to change the server actions to the api routes after finishing 