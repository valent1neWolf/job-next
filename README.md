This is a [Next.js](https://nextjs.org/) project using Clerk for authentication, Supabase for storing resumes, Stripe for payments and MongoDB Atlas for storing the rest of the data.

## Getting Started

First, run `npm install` or `npm i`. Since this project is using MongoDB Atlas, you will need to create a new cluster. After that, you will need to connect the database with your project. [Here](https://www.mongodb.com/docs/atlas/connect-to-database-deployment/) is how to do that.

If you have your connection string, paste it into your `.env` file with the name:

```
DATABASE_URL=mongodb+srv://<admin>:<password>@cluster0.fegkdgg.mongodb.net/
```

You will also need configurations for [Clerk](https://clerk.com/). You will have to set up a new project and under Developers/API keys you can find the required keys. The other two keys (SIGN_IN & SIGN_UP) are for clerk to know where these functions should be called:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk...
CLERK_SECRET_KEY=sk...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

For [Supabase](https://supabase.com/) you will also need to create a new project and a bucket, which can be found on the sidebar. The bucket should have the name `job-board-public` and should have a folder named `public` in it.
This is where the resumes will be saved based on the user's email address.

In the Home page you can find the connect button where you should choose the App Frameworks option, which has the `NEXT_PUBLIC_SUPABASE_URL` and the `NEXT_PUBLIC_SUPABASE_ANON_KEY`. You will also have to paste these into your .env file.

Finally, you will need to create a [Stripe](https://dashboard.stripe.com/login) account for the payment (only the test version). On the `test/apikeys` you can find your `Publishable` and `Secret Keys` (recommended to use these at first in the test mode):

```
STRIPE_SECRET_KEY=sk_test...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test...
```

After that, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
