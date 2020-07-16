# React Bolier-Plate

> **보일러 플레이트(boiler-plate)**
> SignUp이나 Login 기능과 같은 자주 쓰는 기능들을 재사용할 수 있게 만들어놓는 것



해당 프로젝트는 React에서 자주 사용되는 로그인, 회원가입, 로그아웃, 유저 인증 기능을 재사용 할 수 있게 만들어 놓은 프로젝트입니다.



## Server

### [작업 순서]

1. `npm init`으로 package.json 생성
2. Node.js 사용을 위해 Express.js를 설치 후 index.js 생성 (`npm i express --save`)
3. MongoDB 사용을 위해 mongoose 설치 (`npm i mongoose --save`)
   - MongoDB Clusters(Free) 생성 후 connect
   - mongoose를 활용해 Schema 생성 및 model 호출
4. 코드 수정 시 자동 실행을 위한 nodemon 설치 (`npm i nodemon --save-dev`) 후 package.json script 추가
5. bodyParser middleware 설치 (`npm i body-parser --save `) 및 필요 코드 작성
6. bcrypt middleware 설치(`npm i bcrypt --save`) 및 필요 코드 작성
7. 개발 환경 및 비밀정보 분리 (config 폴더 내  dev.js, prod.js 생성 후 코드 작성 key.js로 환경 분리)
8. cookie-parder 설치(`npm i cookie-parser`)
9. 토큰 생성을 위해 jsonwebtoken 설치(`npm i jsonwebtoken`)
10. 로그인 기능 만들기

11. Auth 기능 만들기(로그인 된 유저만 이용, 누구나 이용할 수 있는 페이지를 체크해 구분하기 위해)
    - 토큰을 만들고 유저 정보에 넣는다. 서버의 토큰과 클라이언트의 토큰을 계속 체크한다.

12. 로그아웃 기능 만들기
    - 해당 유저의 토큰을 찾아서 그 유저의 토큰을 지워준다.



---

### [학습 내용 정리]

#### Node.js란?

- Node.js가 나온 뒤, JavaScript가 브라우저가 아닌 Server-side에서도 사용이 가능해짐



#### Express.js란?

- Node.js를 쉽게 이용할 수 있게 도와주는 프레임워크



#### MongoDB 활용

- 클러스터 만들기 ([참고 블로그](https://www.a-mean-blog.com/ko/blog/%EB%8B%A8%ED%8E%B8%EA%B0%95%EC%A2%8C/_/mongoDB-Atlas-%EA%B0%80%EC%9E%85-%EB%B0%A9%EB%B2%95-%EB%AC%B4%EB%A3%8C-mongo-DB-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%84%9C%EB%B9%84%EC%8A%A4))

- **mongoose**는 <u>App과 mongoDB와 연결해주는 역할</u> ([mongoose 추가 정보](https://www.zerocho.com/category/MongoDB/post/59a1870210b942001853e250))
- mongoose의 Schema는 사용자가 작성한 스키마를 기준으로 데이터를 DB에 넣기 전 먼저 검사하는 역할을 수행한다. 테이블이 없는 MongoDB의 단점을 Schema를 활용해 해결하기 위함이다.

- `mongoose.model('User', userSchema);`에서 **model**은 <u>Schema를 감싸주는 역할</u>이다.
- mongoose.model()을 호출할 때 스키마가 등록된다.

```javascript
const productSchema = mongoose.Schema({
	writer: {
		type: String,
        maxlength: 10,
        // unique: 1,
        // default: 0,
        // trim: true
        // required: true
        // lowercase: true
	}
})
```

- 스키마를 만들었다면 꼭 서버 실행하는 부분에서 require를 해줘야한다.

```
require('./경로/userSchema'); // 이렇게 DB 연결 부분에 적어주기
```



> **GIT**
>
> git은 툴이고 github는 클라우드 서비스
>
> ```
> $ git rm --cached node_modules -r
> ```



> **SSH 생성**
>
> 1. ssh key를 만든다. ([참고](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent))
> 2. ssh agent를 background에 킨다. `eval \$(ssh-agent -s)`
> 3. ssh private key를 ssh-agent에 넣는다.
> 4. 생성된 ssh public key를 3rd Party에 준다.



#### nodemon이란?

- 소스코드를 수정하면 서버를 내린 뒤 다시 실행해야하는 번거로움이 있는데  nodemon을 이용하면 소스의 변화를 감지해 자동으로 재실행시켜준다.



#### body-parser(express middleware)

Client는 Server에게 Request with Body 전달한다. (JSON, buffer, string, URL, data)

body-parser를 사용하면 Body 데이터를 분석해서 req.body로부터 파라미터를 편리하게 추출할 수 있다.

단, express에는 built-in middleware function으로 body-parder 기능이 내장되어 있기 때문에, bodyParder를 import 하지 않고도 `app.use(express.json())`으로 사용할 수 있다.

- `.use(bodyParser.urlencoded({ extended: true or false }));` 
  - extended 는 중첩된 객체표현을 허용할지 말지를 정하는 것이다. 객체 안에 객체를 파싱할 수 있게하려면 true를 사용한다.
- `.use(bodyParser.json())`
  - json만 구문 분석하고 Content-Type 헤더가 type 옵션과 일치하지 보는 미들웨어를 리턴한다.



#### bcrypt

- Bcrypt(라이브러리)로 비밀번호 암호화하기
- Bcrypt를 이용하여 비밀번호를 암호화해줘서 데이터베이스에 저장해줘야함

- salt를 활용하는데 saltRounds는 salt가 몇글자인지 나타내는 것
- salt를 먼저 생성하고 salt를 이용해서 비밀번호를 암호화해야함

```javascript
bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});
```



#### 개발환경 분리

개발 시 2가지 환경에서 가능

1. 로컬 환경 (비밀정보 보호하기위해 별도의 파일을 생성해 해당 파일은 숨기고 타 파일에서 읽도록 처리)
2. 배포 후 개발 (heroku 등을 활용해 비밀정보를 가져갈 수 있도록 작업해야함)



## Client

### [작업 순서]

1. CRA를 활용하여 리액트 환경 구성
2. `npm i react-router-dom --save`
3. `npm i axios --save`



### [학습 내용 정리]



#### 리액트란?

1. 페이스북에서 2013년도에 발표되었고, 라이브러리이다. 
2. 컴포넌트로 구성되어있다. (모듈과 비슷하게 컴포넌트로 이루어져있어 재사용성이 뛰어남)
3. 가장 큰 특징으로는 Virtual-DOM (리얼 돔을 가볍게 복사한 것)



#### 리액트 설치하기 (CRA)

CRA를 사용하면 Babel과 Webpack이 자동 설치된다.

- Babel : 최신 자바스크립트 문법을 지원하지 않는 브라우저들을 위해 최신 자바스크립트 문법을 구형 브라우저에서도 돌 수 있게 변환해주는 것
- Webpack : 많은 모듈을 합해 간단하게 만들어 줌, src에 들어있는 폴더만 관리 public은 관리 안함



#### npm과 npx

**npm** : 저장소 역할을한다. 라이브러리를 담고 있는 역할, package.json에 적혀있음
`-g` 하지 않으면 로컬에 다운받게되고 node_module에 다운받아지고, `-g` 하면 컴퓨터 저장소에 저장됨

**npx** : npm registry에서 create-react-app을 찾아서 다운로드 없이 실행시켜준다.
Disk Space를 낭비하지 않고, 항상 최신 버전을 사용할 수 있다.



> VSCODE 확장 프로그램  `ES7 React/Redux/GraphQL/React-Native snippets` 다운로드
> 코드 편집기에 아래 키워드로 구조를 만들어버릴수 있는 snippets을 제공합니다.
>
> - rce : class componet 생성
> - rafce : allow function component 생성
> - rfce : function component 생성



#### React Router Dom

유저가 로그인을 하고 싶어 id, pw를 입력하고 로그인 버튼 클릭
그 요청이 서버에 가서 DB에서 정보를 찾고 일치하는지 체크
맞으면 맞다 틀리면 틀리다 클라이언트에 전달



#### AXIOS

두개의 다른 포트를 가지고 있는 서버는 아무 설정없이 Request를 보낼 수 없다.
Cors정책: Cross-Origin Resource Sharing (CORS)
Proxy 설정
npm i http-proxy-middleware --save
보안을 위해

proxy안쓰고 back에서 직접 cors 해결하기

0.  npm install cors --save로 설치하기

1.  cors 불러오기

let express = require("express");

// Express의 middleware 불러오기

let bodyParser = require("body-parser"),

    cors = require("cors"),

// Express의 객체 생성

let app = express();

2.cors_origin 선언하기

복수로도 추가가 가능합니다.

// 로컬 개발용 기본 cors origin (front3000 )

let cors_origin = [`http://localhost:3000`];

3.cors 옵션 추가하기

app.use(

    cors({
    
        origin: cors_origin, // 허락하고자 하는 요청 주소
    
        credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
    
    })

);

4. 끝- 사용하시면 됩니다.

아이피를 proxy server에서 임의로 바꿔버릴 수 있다.
그래서 인터넷에서는 접근하는 사람의 IP를 모르게 된다.
보내는 데이터도 임의로 바꿀 수 있다.

1. 방화벽 기능 2. 웹 필터 기능 3. 캐쉬 데이터, 공유 데이터 제공 기능

사용 이유

1. 회사에서 직원들이나 집안에서 아이들 인터넷 사용 제어
2. 캐쉬를 이용해 더 빠른 인터넷 이용 제공
3. 더 나은 보안 제공
4. 이용 제한된 사이트 접근 가능

Concurrently를 활용해 프론트, 백 서버 한번에 켜기
npm i concurrently --save

CSS Framework ANT Design

CSS Framework를 쓰는 이유는? 기능을 만드는데 더욱 집중하기 위해

React JS를 위한 CSS FRAMEWORK

- Material UI
- React Bootstrap
- Semantic UI
- Ant Design
- Materialize



#### Redux

- 상태 관리 라이브러리

리액트 props/ state

props - properties의 줄임말, 컴포넌트간 주고 받을 때 사용, 부모->자식 컴포넌트로만 보낼 수 있다. props는 변하지 않는다. 다시 부모 컴포넌트에서 값을 내려줘야 바뀜

state - 부모 컴포넌트에서 주는 것이 아닌 컴포넌트 내에서도 값이 변경되고, state가 변하면 re-render 된다.

redux store에 저장해놓으면
타고 올라가지 않고 직접 접근을 통해 편하게 상태 관리를 할 수 있다.

redux data flow (한방향으로만 흐름
action -> reducer -> store -> (subscribe) -> React Component -> dispatch(action) -> action

action은 무엇이 일어났는지 설명하는 객체이다.
{type: 'LIKE_ARTICLE'. article: 42} // 42번에 좋아요 발생
{type: 'FETCH_USER_SUCCESS', response: {id:3, name : 'Mary'}) // id가 3이고 이름이 마리인 유저의 정보를 가져오는 것을 성공함
{type: 'ADD_TODO', text: 'Reaxt the Redux docs'} // 이 텍스트를 투두리스트에 add 했다고 알려줌

action을 함으로 인해 원래 x 였던 state가 y로 변했다.
(previousState, action) => nextState
이전 State와 action object를 받은 후에 next state를 return 한다.

리듀서는 순수함수이기 때문에 리듀서 내부에서는
순수 함수가 아닌 것을 호출(Date.now(), Math.random())하거나 API 호출과 라우팅 등 부가적인 걸 하면 안된다.

Store는
state를 감싸주는 역할
내부 여러 메소드를 이용해 state를 다룰 수 있다.

Redux Up!

1. redux
2. react-redux
   3,4번은 redux를 잘 사용할 수 있게 도와주는 middleware이다.
3. redux-promise
4. redux-thunk

Redux store에서 state를 변경하려면 dispatch의 action을 이용해 변경할 수 있다.
근데 언제나 객체형식으로 받을 수 있는게 아니라, promise 형식으로 받을 때도 있고, 함수 형태로 받을 때도 있다.

redux-thunk는 dispatch한테 function을 받는 방법을 알려주고,
redux-promise는 dispatch한테 promise로 왔을 때 어떻게 대처해야하는지 알려준다.

combineReducers로는 Reducer는 어떻게 state가 변하는지 보여준 다음에 변한 그 값을 리턴해주는 것이 바로 리듀서이다. 여러 state가 있어 여러 reducer가 있을 수 있기 때문에 나누어져있는 combineReducer를 사용해 rootReducer를 이용해 하나로 합쳐주는 것이다.

클래스 컴포넌트는 더 많은 기능을 사용할 수 있지만, 코드가 길어지고 좀 더 복잡하고, 성능이 좀 느려짐
함수형 컴포넌트는 제공하는 기능이 한정적이지만 코드가 짧아지고, 성능이 좋아짐

근데 16.8버전에서 hook이라는게 나옴
그래서 함수형 컴포넌트로도 쓸 수 있게됨

---

유효성 체크 : Formik Yup 라이브러리를 사용

React와 React Hook

---

회원가입 기능 만들기, 로그아웃 기능 만들기

---

auth 만들기

인증이 이루어져야만 들어갈 수 있는 페이지

HOC라는 것을 써야함
다른 컴포넌트를 받아 새로운 컴포넌트를 리턴하는 방식

Auth(HOC)에서 해당 유저가 해당 페이지에 접근할 자격이 있는지 알아낸 후 자격이 된다면 해당 페이지로 이동하게 해주고, 아니라면 다른 페이지로 보내버린다.

> https://github.com/jaewonhimnae/boiler-plate-ko/blob/master/client/src/hoc/auth.js
