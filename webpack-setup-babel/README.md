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

### polyfills ?

Babel을 사용해 ES6+ 코드를 ES5 이하로 트랜스파일링한다 해도 브라우저가 지원하지 않는 코드가 남을 수 있다. \
ES5 이하로 트랜스파일링할 때 대체할 ES5 기능이 없기 때문에 그대로 남게 된다. (ES6에서 추가된 Promise, Object.assign, Array.from 등) \
polyfill은 그런 코드들을 오래된 브라우저에서도 ES6+의 새로운 객체와 메소드를 사용 가능하게 처리해준다.

###### polyfill library 설치

```bash
npm i -S core-js
```

바벨 7.4 이상 버전과 core-js@3를 같이 사용해야 동작한다.

`@babel/polyfill`은 제너레이터 폴리필인 regenerator-runtime과 core-js를 합쳐서 만들어졌고, 여러 단점들로 인해 7.4버전에서 depeciated 되었다. \
**`@babel/polyfill`의 단점** \
전역공간에 폴리필을 채워 넣는 방식이기 때문에 전역공간이 오염되어 **폴리필 충돌 가능성**이 있다. \
브라우저에서 이미 구현된 필요하지 않은 폴리필까지 전부 번들에 포함되어 **번들 크기가 커진다**. \
반면에, 실행될 때는 브라우저에서 구현되지 않은 문법만 실행하기 때문에 **빠르다**. (최신 브라우저일수록 더 빠름)

`@babel/plugin-transform-runtime` 바벨이 es6+의 문법들을 자체 구현한 함수로 트랜스파일링 한다. \
**`@babel/plugin-transform-runtime`의 단점** \
번들 크기가 작아지는 장점이 있으나, [1,2,3].includes와 같이 인스턴스의 메소드는 제대로 트랜스파일링 되지 않는 이슈가 있다.
axios는 전역공간에 선언된 Promise가 있어야 제대로 동작하는데 트랜스파일링 과정에서 자체 구현된 함수로 변경되기 때문에 전역공간에 Promise를 채우지 않는다. axios가 런타임에 트랜스파일 될 수 있도록 웹팩 설정을 커스텀해줘야 한다. 이렇게 외부 모듈이 전역공간에 선언된 최신 객체를 필요로 할 경우 매번 webpack의 include 옵션에 포함시켜줘야 한다는 단점이 있다.

```js
include: [
  /src\/js/,
  /node_modules\/axios/
],
```

이 런타임 폴리필 방식은 제한사항있다.

`@babel/polyfill`의 전역공간 오염 문제와, `@babel/plugin-transform-runtime`의 인스턴스 메소드 문제를 모두 해결한게 `core-js@3`이라고 생각하면 된다.

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
