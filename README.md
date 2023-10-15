# Git issue viewer Project

## 프로젝트 소개
<img width="1435" alt="project image" src="https://github.com/Chaam2/github_issue_viewer/assets/126763111/0d66037b-bf91-4c38-ad12-1ac5ed334ce8">

🌐 [**배포 사이트 바로가기**](https://github-issue-viewer-three.vercel.app/issue/13991)

facebook의 [react](https://github.com/facebook/react/issues) 레포지토리의 이슈 목록과 상세 내용을 확인하는 웹 사이트를 구축하였습니다.

## 개발 환경

### Development

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white"> <img src="https://img.shields.io/badge/markdown preview-FF6384?style=for-the-badge">

### Styling

<img src="https://img.shields.io/badge/styledComponents-DB7093?style=for-the-badge">

### Convention

<img src="https://img.shields.io/badge/husky-brown?style=for-the-badge&logo=npm"> <img src="https://img.shields.io/badge/lint staged-white?style=for-the-badge&logo=npm"> <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint"> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">

## 실행 방법
```
$ git clone https://github.com/Chaam2/github_issue_viewer.git

$ npm install

$ npm start
```
## 디렉토리 구조

```
📦src
 ┣ 📂api
 ┃ ┣ 📜Api.ts
 ┃ ┣ 📜issue.ts
 ┃ ┗ 📜repository.ts
 ┣ 📂components
 ┃ ┣ 📜Header.tsx
 ┃ ┣ 📜IssueHeader.tsx
 ┃ ┗ 📜IssueListItem.tsx
 ┣ 📂pages
 ┃ ┣ 📜ErrorPage.tsx
 ┃ ┣ 📜IssueDetailPage.tsx
 ┃ ┗ 📜IssueListPage.tsx
 ┣ 📂types
 ┃ ┣ 📜issueType.ts
 ┃ ┗ 📜repositoryType.ts
 ┣ 📂utils
 ┃ ┗ 📜formatDate.ts
 ┣ 📜App.tsx
 ┣ 📜globalStyle.css
 ┗ 📜index.tsx
```

## Assignment별 구현 방식
> 이슈 목록과 이슈 상세에서 github REST API의 [list-repository-issues](https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#list-repository-issues) API를 활용하였습니다.<br/>
> 헤더의 Organization, Repository name을 받아오기 위해 [get-a-repository](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository) API를 활용하였습니다.
### 이슈 목록 화면
- 받아온 이슈 목록 데이터를 map을 통해 화면에 렌더링 할 때 다섯번 째 셀마다 광고이미지를 출력하도록 구현하였습니다.
  ```jsx
  issueList.map((issue, index) => {
    return (
      <Fragment key={index + ':' + issue.number}>
        {index !== 0 && index % 4 === 0 && (
            <Ad></Ad>
        )}
        <IssueLi></IssueLi>
      </Fragment>
    );
  })
  ```
- 데이터 요청 중 로딩 스피너를 표시하고, 에러 발생 시 에러 페이지로 이동하도록 구현하였습니다.
  ```jsx
  const getIssueListData = async () => {
    setIsLoading(true);
    try {
      const perPage = 20;
      const IssueListData: IIssueList[] = await getIssueList(perPage, page);
      setIssueList(prev => [...prev, ...IssueListData]);
    } catch (error) {
      navigate('/404');
    } finally {
      setIsLoading(false);
    }
  };
  ```
- intersection observer api와 useRef를 통해 인피니티 스크롤을 구현하였습니다.
  ```jsx
  const IssueListPage = () => {
  const pageEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setPage(prev => prev + 1);
          }
        });
      },
      { threshold: 0.5, rootMargin: '80px' },
    );

    if (pageEndRef.current) {
      observer.observe(pageEndRef.current);
    }

    return () => {
      if (pageEndRef.current) {
        observer.unobserve(pageEndRef.current);
      }
    };
  }, [issueList]);

  return (
    {issueList.length > 0 && <div ref={pageEndRef} />}
  );
  ```
### 이슈 상세 화면
- 이슈 목록과 이슈 상세 화면에서 공통으로 쓰이는 타이틀 부분을 컴포넌트화 하여 재사용하였습니다.
  <div style="display: flex;">
    <img width="400" alt="image" src="https://github.com/Chaam2/github_issue_viewer/assets/126763111/6ea5da8a-0564-4988-81f5-3f37dcc6da44">
    <img width="400" alt="image" src="https://github.com/Chaam2/github_issue_viewer/assets/126763111/b30cddb2-28e6-47ab-adca-c0f8872c979a">
  </div>

- markdown preview 라이브러리를 활용하여 마크다운 형식의 데이터를 렌더링하였습니다.
  <img width="1281" alt="image" src="https://github.com/Chaam2/github_issue_viewer/assets/126763111/5293af27-8adc-4db9-baa6-0e12323e307a">
