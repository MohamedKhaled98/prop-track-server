# Node.js Server (TypeScript + Express)

This is a basic Node.js server built using **TypeScript** and **Express**.

## Features

- Express for HTTP server
- TypeScript for type safety
- Nodemon and ts-node for development

## Scripts

- `npm run dev` – Run in development mode with auto-reloading
- `npm run build` – Compile TypeScript to JavaScript
- `npm start` – Run the compiled server (`dist/server.js`)

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server in development mode:
   ```bash
   npm run dev
   ```

3. To build and run in production:
   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
.
├── src/
│   └── server.ts
├── dist/
│   └── server.js (compiled)
├── tsconfig.json
└── package.json
```
