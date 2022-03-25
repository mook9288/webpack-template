# Webpack 5 Full Project Setup

- [youtube- Webpack 5 Full Project Setup](https://youtu.be/TOb1c39m64A)

## 초기설정

### package.json 생성

```bash
npm init -y
```

###### package.json

```json
{
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

- 불필요한 것들 제거하고 script만 있으면 된다.
- `"private": true`: 패키지 비공개 여부

###### `private`이 없을 때, `npm i`

![private이 없을 때, npm i](./readmeImg/1.npm_i.png)

###### `private`이 있을 때, `npm i`

![private이 있을 때, npm i](./readmeImg/1.npm_i_add_private.png)

warnning이 없어진걸 확인할 수 있다.

### webpack install

- webpack, webpack-cli, webpack-dev-server, html-webpack-plugin 설치

```bash
npm i -D webpack webpack-cli webpack-dev-server
```

###### package.json

```json
{
  "private": true,
  "scripts": {
    "start": "webpack serve",
    "watch": "webpack --watch",
    "build": "webpack"
  },
  "devDependencies": {
    "webpack": "^5.65.0",
    "webpack-cli": "^4.9.1",
    "webpack-dev-server": "^4.6.0"
  }
}
```

###### `npm run build`

![npm run build](./readmeImg/1.npm_i_add_private.png)

### webpack.config 파일 생성

###### webpack.config.js

```js
module.exports = {
  mode: 'development',
  devtool: false,
  devServer: {
    static: './dist',
  },
};
```

`devtool`옵션은 개발의 편의성을 위해 제공되는 소스맵(Source Map) 옵션이다.

## babel

```bash
npm i -D babel-loader @babel/core @babel/preset-env
```

### babel config 설정

###### webpack.config.js 수정

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  // ...
};
```

###### babel.config.js 생성

```js
module.exports = {
  presets: ['@babel/preset-env'],
};
```

![babel 설정 후 npm run build](./readmeImg/2.babel_setting_build.png)

### Source Maps, 개발용과 배포용 분기

###### webpack.config.js

```js
let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}
module.exports = {
  mode: mode,
  // ...
  devtool: 'source-map',
  // ...
};
```

###### package.json

```json
// ...
  "scripts": {
    // ...
    "build": "NODE_ENV=production webpack",
    "build-dev": "webpack"
  },
// ...
```

- `"build": "NODE_ENV=production webpack",`으로만 작성할 경우 Window에서 제대로 build가 되지 않는다. \
  `cross-env`를 사용하면 운영체제나 플랫폼에 종속되지 않고 동일한 방법으로 env 변수를 주입하기 때문에 MAC과 Window에서 동일하게 사용할 수 있다.

```bash
npm install -D cross-env
```

###### package.json

```json
// ...
  "scripts": {
    // ...
    "build": "cross-env NODE_ENV=production webpack",
  },
// ...
```

## CSS, SASS, PostCSS, HMR

### CSS

```bash
npm i -D css-loader mini-css-extract-plugin
```

###### webpack.config.js

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
  // ...
};
```

```bash
npm i -D css-loader mini-css-extract-plugin
```

### SASS

- sass와 sass-loader를 설치해준다.

```bash
npm i -D sass sass-loader
```

###### webpack.config.js

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  // ...
};
```

### PostCSS

- postcss와 postcss-preset-env, postcss-loader를 설치해준다.

```bash
npm i -D postcss postcss-preset-env postcss-loader
```

###### postcss.config.js

```js
module.exports = {
  plugins: ['postcss-preset-env'],
};
```

###### webpack.config.js

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.s?css$/i,
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
      },
    ],
  },
  // ...
};
```

## browserslistrc

- 지원 브라우저의 버전 정의

###### .browserslistrc

```
last 2 versions
> 0.5%
IE 10
```

###### webpack.config.js

```js
// ...
let target = 'web';

if (process.env.NODE_ENV === 'production') {
  // ...
  target = 'browserslist';
}
module.exports = {
  mode: mode,
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      // ...
    ],
  },
};
// ...
```
