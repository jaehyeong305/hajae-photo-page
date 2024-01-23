# Unsplash API를 이용한 프로젝트
[Unsplash API](https://unsplash.com/developers)

### 목적
Next.js에 익숙해지기 위해

- App Router 익숙해지기
- Data fetch 등 Next.js Document를 보고 어떤식으로 작성하는지
- React hook 익숙해지기
- 대용량 데이터를 받아올 수 있는 API이기 때문에 퍼포먼스를 고려해보기

### 개발환경
- Next.js (14.0.4)
    - React (^18)
    - Typescript

### 실행 방법
1. unsplash [개발자 페이지](https://unsplash.com/developers)에 접속하여 Application 등록을 한다.
2. 해당 Repository를 clone 후, 발급받은 Access Key를 아래 파일의 `${process.env.NEXT_PUBLIC_API_CLIENT_ID}`에 덮어쓴다.
    - src/api/photos/[id]/route.ts
    - src/api/search/[searchTerm]/route.ts
    - src/api/search/[searchTerm]/[page]/route.ts
    - src/api/unsplash/[page]/route.ts
3. 그 후 실행
```
$ npm install
$ npm run dev
or
$ npm install
$ npm run build
$ npm run start
```

### Test
**jest**
```
$ npm run test
```

### 실행 화면
메인화면
<img width="1512" alt="image" src="https://github.com/jaehyeong305/hajae-photo-page/assets/131584557/10d4d912-b75b-4eed-acd9-e1c4073e8811">
<img width="1512" alt="image" src="https://github.com/jaehyeong305/hajae-photo-page/assets/131584557/3e3ef0ec-6ea9-450a-9112-5143729a179e">

북마크
<img width="1512" alt="image" src="https://github.com/jaehyeong305/hajae-photo-page/assets/131584557/da75c824-7c4e-4c25-aa1c-6faee72d8dd2">

상세 모달
<img width="1512" alt="image" src="https://github.com/jaehyeong305/hajae-photo-page/assets/131584557/aaec2064-e123-44d1-9f09-d4f5057c26b1">
