# Ithuba assessment

This serves as an assessment to extract data from report files. It is a desktop app that is platform agnostic

![image info](./src/assets/demo/Screenshot1.png)
![image info](./src/assets/demo/Screenshot2.png)
![image info](./src/assets/demo/Screenshot3.png)
![image info](./src/assets/demo/Screenshot4.png)

## Prerequisites
- nodejs
- npm 
- internet


## To run 
```javascript

1. npm i 
2. npm run dev
```

## Technologies used
- nodejs
- react
- electron
- any OS
## Folder structures
- src/components/:
  contains the user interface layouts and react code
- src/index.css:
 contains the user interface styling fyle
- src/utils/index 
 houses the main functions for logic
- src/utils/types 
  has the typescript interfaces and classes
- src/assets/test 
  has the test files used to test the app



English | [简体中文](README.zh-CN.md)

## 👀 Boilerplate code below: no worries

📦 Ready out of the box  
🎯 Based on the official [template-react-ts](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts), project structure will be familiar to you  
🌱 Easily extendable and customizable  
💪 Supports Node.js API in the renderer process  
🔩 Supports C/C++ native addons  
🐞 Debugger configuration included  
🖥 Easy to implement multiple windows  

## 🛫 Quick Setup

```sh
# clone the project
git clone https://github.com/electron-vite/electron-vite-react.git

# enter the project directory
cd electron-vite-react

# install dependency
npm install

# develop
npm run dev
```

## 🐞 Debug

![electron-vite-react-debug.gif](/electron-vite-react-debug.gif)

## 📂 Directory structure

Familiar React application structure, just with `electron` folder on the top :wink:  
*Files in this folder will be separated from your React application and built into `dist-electron`*  

```tree
├── electron                                 Electron-related code
│   ├── main                                 Main-process source code
│   └── preload                              Preload-scripts source code
│
├── release                                  Generated after production build, contains executables
│   └── {version}
│       ├── {os}-{os_arch}                   Contains unpacked application executable
│       └── {app_name}_{version}.{ext}       Installer for the application
│
├── public                                   Static assets
└── src                                      Renderer source code, your React application
```

<!--
## 🚨 Be aware

This template integrates Node.js API to the renderer process by default. If you want to follow **Electron Security Concerns** you might want to disable this feature. You will have to expose needed API by yourself.  

To get started, remove the option as shown below. This will [modify the Vite configuration and disable this feature](https://github.com/electron-vite/vite-plugin-electron-renderer#config-presets-opinionated).

```diff
# vite.config.ts

export default {
  plugins: [
    ...
-   // Use Node.js API in the Renderer-process
-   renderer({
-     nodeIntegration: true,
-   }),
    ...
  ],
}
```
-->

## 🔧 Additional features

1. electron-updater 👉 [see docs](src/components/update/README.md)
1. playwright

## ❔ FAQ

- [C/C++ addons, Node.js modules - Pre-Bundling](https://github.com/electron-vite/vite-plugin-electron-renderer#dependency-pre-bundling)
- [dependencies vs devDependencies](https://github.com/electron-vite/vite-plugin-electron-renderer#dependencies-vs-devdependencies)
