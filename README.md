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


## Icon License Information
1. **[scarlab](https://www.svgrepo.com/author/scarlab/)**
    - **Icons**
      - [Home](https://www.svgrepo.com/svg/507739/home-alt)
      - [Search](https://www.svgrepo.com/svg/507850/search-alt)
      - [Globe](https://www.svgrepo.com/svg/507722/globe-alt)
      - [Download](https://www.svgrepo.com/svg/507665/download)
      - [Upload](http://svgrepo.com/svg/507878/upload)
      - [Edit](https://www.svgrepo.com/svg/507668/edit)
    - **License**: [MIT License](https://www.svgrepo.com/page/licensing#MIT)
    - **Modifications**: Changed the color and resized the icon.

2. **[krystonschwarze](https://www.svgrepo.com/author/krystonschwarze/)**
    - **Icons**
      - [User](https://www.svgrepo.com/svg/511185/user-02)
      - [Gear](https://www.svgrepo.com/svg/511122/settings)
      - [Bell](https://www.svgrepo.com/svg/510846/bell)
      - [Credit Card](http://svgrepo.com/svg/510942/credit-card-01?edit=true)
    - **License**: [CC Attribution License](https://www.svgrepo.com/page/licensing#CC%20Attribution)
    - **Modifications**: Changed the color and resized the icon.

3. **[Amir Baqian](https://www.svgrepo.com/author/Amir%20Baqian/)**
    - **Icons**
      - [Setting](https://www.svgrepo.com/svg/417812/setting-2)
   - **License**: [CC Attribution License](https://www.svgrepo.com/page/licensing#CC%20Attribution)
   - **Modifications**: Changed the color and resized the icon.

4. **[Element Plus](https://www.svgrepo.com/author/element-plus/)**
    - **Icons**
        - [Close](https://www.svgrepo.com/svg/500512/close-bold)
   - **License**: [MIT License](https://www.svgrepo.com/page/licensing#MIT)
    - **Modifications**: Changed the color and resized the icon.
    - 
4. **[Gabriele Malaspina](https://www.svgrepo.com/author/Gabriele%20Malaspina/)**
    - **Icons**
        - [Lock](https://www.svgrepo.com/svg/489031/lock)
        - [UnLock](https://www.svgrepo.com/svg/489034/lock-open)
        - [Refresh](https://www.svgrepo.com/svg/489105/refresh)
    - **License**: [PD License.](https://www.svgrepo.com/page/licensing#PD)
    - **Modifications**: Changed the color and resized the icon.

5. **[Dazzle UI](https://www.svgrepo.com/author/Dazzle%20UI/)**
   - **Icons**
      - [Heart](https://www.svgrepo.com/svg/532468/heart-alt)
      - [Cloud](https://www.svgrepo.com/svg/532033/cloud)
      - [Cart](https://www.svgrepo.com/svg/533043/cart-shopping)
      - [AddCart](https://www.svgrepo.com/svg/533036/cart-arrow-down)
      - [RemoveCart](https://www.svgrepo.com/svg/533039/cart-arrow-up)
      - [File](http://svgrepo.com/svg/532747/file-alt)
      - [Folder](http://svgrepo.com/svg/532810/folder)
      - [Camera](https://www.svgrepo.com/svg/533059/camera)
      - [Video](https://www.svgrepo.com/svg/532727/video)
      - [Image](https://www.svgrepo.com/svg/532576/image-square)
   - **License**: [CC Attribution License](https://www.svgrepo.com/page/licensing#CC%20Attribution)
   - **Modifications**: Changed the color and resized the icon.

6. **[Solar Icons](https://www.svgrepo.com/author/Solar%20Icons/)**
   - **Icons**
      - [Star](https://www.svgrepo.com/svg/523056/star)
   - **License**: [CC Attribution License](https://www.svgrepo.com/page/licensing#CC%20Attribution)
   - **Modifications**: Changed the color and resized the icon.

7. **[afnizarnur](https://www.svgrepo.com/author/afnizarnur/)**
   - **Icons**
      - [Minus](https://www.svgrepo.com/svg/509380/minus)
      - [Plus](https://www.svgrepo.com/svg/509386/plus)
   - **License**: [MIT License](https://www.svgrepo.com/page/licensing#MIT)
   - **Modifications**: Changed the color and resized the icon.

