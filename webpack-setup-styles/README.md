# Webpack 5 CSS Walkthrough: Sass, PostCSS and more!

- [youtube - Webpack 5 CSS Walkthrough: Sass, PostCSS and more!](https://youtu.be/SH6Y_MQzFVw)

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

## Webpack 설정

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

<!--
### CSS + SCSS + SAS용 Regex 브레드다운
### 인라인 css가 아닌 .css 파일 출력
### 디버깅용 소스 맵
### 자동 리픽서 및 폴백을 사용한 PostCSS
### 크로스 브라우저 제어를 위한 브라우저 목록
### 셋업의 유연성을 나타내는 순풍 추가
### 정리
 -->
