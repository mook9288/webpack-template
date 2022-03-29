# How to get polyfills with Babel 7 and Webpack

- [youtube - How to get polyfills with Babel 7 and Webpack](https://youtu.be/YXtQms2msZQ)

## 프로젝트의 개요

javascript bundler `babel`을 사용하여 오래된 구형 브라우저 지원 \
`@babel/polyfill`은 더이상 사용하지 않기 때문에 `core-js` 사용 권장

> Babel 7에서는 더 이상 polyfill이 지원되지 않으므로 core-js에서 직접 Import해서 제어하는 것이 좋다.
>
> ```js
> // e.g.
> import 'core-js/stable';
> import 'regenerator-runtime/runtime';
> ```

기본 브라우저보다 오래된 브라우저를 지원하는 설정 예시와 함께 `.browserlistrc`도 있다.

## 프로젝트 설정

### 프로젝트 시작

###### package.json 생성

```bash
npm init -y
```

<br />

### 폴더 directory

```
- dist
  - index.html
- src
  - index.js
- package.json
- .babelrc
- .browserslistrc
- webpack.config.js
```

_NOTE: 일반적으로 dist 또는 public 폴더는 git에서 업로드하지 않지만, 데모 목적으로 업로드됐다._

###### webpack install

```bash
npm i -D webpack webpack-cli webpack-dev-server
```

###### babel install

```bash
npm i -D babel-loader @babel/core @babel/preset-env
```

<!--
### 대상
### IE 11의 첫 번째 번들 빌드 오류
### 브라우저 목록 파일 추가
### 폴리필이 필요한 방법 추가
### 폴리필을 얻기 위해 core-js 추가
### 비동기 취득 대기 동작
### Babel 'use Built''엔트리'가 있는 인사
### 폐지된 @babel/polyfill 패키지 문서
### 치트 코드: '빌트'의 '사용' 값인스'
### 정리
 -->
