This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
1. install dependencies:

```bash
npm install
# or
yarn install
```

2. create a `.env` file in the root of the project and add your Turso database URL and auth token. You can use the `.env.example` file as a reference.


3. not mandatory in local development but recommended : 
  
  run :
```bash
npm run db:migrate
# or
yarn db:migrate
```

4. run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


