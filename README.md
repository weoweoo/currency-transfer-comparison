
A simple web application to compare international money transfer providers and find the best exchange rates and lowest fees using the Wise API. Built with Next.js, React, TypeScript, TailwindCSS, and Material UI. Try it here: https://currency-transfer-comparison.vercel.app/

# Setting up
Install the dependencies:

``bash
npm install
```
Next, create a .env.local file and add your Wise API key:

```bash
WISE_API_TOKEN = {Your API key}
```

Finally, run the development server:

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

# Usage

1. Enter the amount you want to send.

2. Select the source and target currencies.

3. Click Compare.

View a list of providers showing fees, exchange rate, and estimated arrival time.

The best deal is highlighted at the top.

# Technologies Used

Next.js

React

TypeScript

Tailwind CSS

Material UI