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
