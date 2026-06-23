This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Basic file structure of drizzle ORM

[Drizzle Document](https://orm.drizzle.team/docs/get-started/postgresql-new)
📦 <project root>
├ 📂 drizzle
├ 📂 src
│ ├ 📂 db
│ │ └ 📜 schema.ts
│ └ 📜 index.ts
├ 📜 .env
├ 📜 drizzle.config.ts
├ 📜 package.json
└ 📜 tsconfig.json

## Integrate with DB

- install and create file index.ts on folder db
  npm install drizzle-orm pg dotenv
  npm install -D drizzle-kit @types/pg
- create file drizzle.config.ts write connect to database URL
- Below for run generate and migrate
  npm run db:generate
  npm run db:migrate
  ###Run database on terminal
  psql -U postgres -d ums_dashboard

### Responsive for display gride-cols-4

grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4

### After updated on db have to run

npx drizzle-kit generate
npx drizzle-kit migrate

### Show alert message using sonner

For Install => npx shadcn@latest add sonner
After install add <Toaster /> on default Layout

### Phone number field

Install

```bash
npm install react-phone-number-input

```

### For display flag icon

```bash
npm install libphonenumber-js react-country-flag

```

### Config Prettier

```bash
npm i prettier-plugin-tailwindcss

```
