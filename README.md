# jy-headless
A collection of headless UI components built with React, Tailwind CSS, and TypeScript. This library provides accessible,
unstyled components that can be easily customized and integrated into your projects.

## Installation
To install the library, run:
```bash
npm install jy-headless
#or
pnpm install jy-headless
#or
yarn add jy-headless
```

## Prerequisites
This library requires Tailwind CSS, PostCSS, and Autoprefixer for styling. If you haven't set these up in your project yet, follow the steps below:

1. Install Tailwind CSS and its dependencies:
```bash
npm install tailwindcss postcss autoprefixer

```
2. Initialize Tailwind CSS and PostCSS:
```bash
npx tailwindcss init
```

This will generate a tailwind.config.js file. You can modify it to fit your styling needs.

3. Create a postcss.config.js file in the root of your project if it doesn't exist:
```bash
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

4. Add the following to your src/index.css (or wherever you're importing your global styles):
```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```
5. Ensure that your bundler is set up to process PostCSS and Tailwind CSS files.