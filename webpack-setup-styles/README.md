# Webpack 5 CSS Walkthrough: Sass, PostCSS and more!

- [youtube - Webpack 5 CSS Walkthrough: Sass, PostCSS and more!](https://youtu.be/SH6Y_MQzFVw)

## 프로젝트 개요

CSS, Sas/Scss, PostCSS 기능 제공\
preset-env, autoprefixer fallbacks, cross-browser 지원
또한 오래된 브라우저 지원 커스터마이즈를 위한 `.browserlistrc`도 포함

<br />

### 폴더 directory

```
- src
  - index.js
- dist
  - index.html
- package.json
- .babelrc
- webpack.config.js
```

_NOTE: 일반적으로 dist 또는 public 폴더는 git에서 업로드하지 않지만, 데모 목적으로 업로드됐다._

<br />

## 프로젝트 설정

### 프로젝트 시작과 Build 테스트

```bash
npm init -y
npm i -D webpack webpack-cli
```

###### src/index.js

```js
const headline = 'Welcome to the webpack';
```

###### 빌드 확인

```bash
npx webpack
```

###### src/index.js

```js
const headline = 'Welcome to the webpack';
document.querySelector('h1').innerHTML = headline;
```

###### 빌드 확인 dist/main.js

```js
document.querySelector('h1').innerHTML = 'Welcome to the webpack';
```

`production` build는 실제로 실행하는데 필요한 내용만 최종 파일에 build된다. \
따라사 위의 `src/index.js`파일의 처음 코드처럼 작성했을 경우, 빈 내용이 출력되고, \
실제로 실행하는 내용이 존재하도록 수정하면 실행에 필요한 코드가 출력된다.

### CSS Import 기능 추가

###### css-loader, style-loader install

```bash
npm i -D css-loader style-loader
```

###### src/index.js 수정

```js
import './style.css';
const headline = 'Welcome to the webpack';
document.querySelector('h1').innerHTML = headline;
```

###### src/style.css 생성

```css
body {
  background: yellow;
}
h1 {
  font-size: 60px;
  text-align: center;
}
```

###### dist/index.html 생성

```html
<body>
  <div class="container">
    <h1>Webpack CSS Example</h1>
  </div>
  <script src="./main.js"></script>
</body>
```

###### webpack.config.js 생성

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

### SASS/SCSS 지원 추가

css 파일을 scss파일로 변경해준다.

###### scss, sass-loader install

```bash
npm i -D sass sass-loader
```

###### webpack.config.js 수정

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
```

### CSS + SCSS + SASS 사용 가능

###### webpack.config.js 수정

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
```

### 인라인 css가 아닌 .css 파일로 출력

###### mini-css-extract-plugin install

```bash
npm i -D mini-css-extract-plugin
```

###### webpack.config.js 수정

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// ...
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
  // ...
};
```

### PostCSS (autoprefixer & fallbacks)

###### postcss, postcss-loader, postcss-preset-env install

```bash
npm i -D postcss postcss-loader postcss-preset-env
```

###### postcss.config.js 생성

```js
module.exports = {
  plugins: ['postcss-preset-env'],
};
```

###### webpack.config.js 수정

```js
// ...
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  // ...
};
```

### 크로스브라우징을 위한 브라우저의 버전 정의

###### .browserslistrc 생성

```
last 2 versions
> 0.5%
IE 10
```

### CSS 프레임워크 [Tailwind](https://tailwindcss.com/docs/installation)

###### install

```bash
npm install -D tailwindcss
npx tailwind init
```

###### postcss.config.js 수정

```js
module.exports = {
  plugins: [require('postcss-preset-env'), require('tailwindcss')],
};
```

###### src/style.scss 수정

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 정리

###### package.json

```json
{
  "name": "webpack-setup-styles",
  "version": "1.0.0",
  "description": "- [youtube - Webpack 5 CSS Walkthrough: Sass, PostCSS and more!](https://youtu.be/SH6Y_MQzFVw)",
  "main": "index.js",
  "scripts": {
    "start": "webpack serve",
    "watch": "webpack --watch",
    "build": "NODE_ENV=production webpack",
    "build-dev": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^6.7.1",
    "mini-css-extract-plugin": "^2.6.0",
    "postcss": "^8.4.12",
    "postcss-loader": "^6.2.1",
    "postcss-preset-env": "^7.4.3",
    "sass": "^1.49.9",
    "sass-loader": "^12.6.0",
    "style-loader": "^3.3.1",
    "webpack": "^5.70.0",
    "webpack-cli": "^4.9.2"
  }
}
```

###### webpack.config.js

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  mode: mode,
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
  devtool: 'source-map',
};
```

###### postcss.config.js

```js
module.exports = {
  plugins: [require('postcss-preset-env')],
};
```

###### .browserslistrc

```
last 2 versions
> 0.5%
IE 10

```
