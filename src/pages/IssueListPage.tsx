import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getIssueList } from '../api/issue';
import { IIssueList } from '../types/issueListType';

const IssueListPage = () => {
  const [issueList, setIssueList] = useState<IIssueList[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getIssueListData();
  }, [page]);

  const getIssueListData = async () => {
    setIsLoading(true);
    try {
      const perPage = 40;
      //@ts-ignore
      const IssueListData: IIssueList[] = await getIssueList(perPage, page);
      //@ts-ignore
      setIssueList(prev => [...prev, ...IssueListData]);
    } finally {
      setIsLoading(false);
    }
  };

  //infinity scroll
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
    <ul>
      {issueList.length > 0 &&
        issueList.map((issue, index) => {
          return (
            <Fragment key={index + ':' + issue.number}>
              {index !== 0 && index % 4 === 0 && (
                <li>
                  <Link to="https://www.wanted.co.kr/">
                    <img
                      src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100"
                      alt="광고 이미지"
                    />
                  </Link>
                </li>
              )}
              <li>
                <Link to={`/issue/${issue.number}`}>
                  {issue.number}
                  <br />
                  {issue.title}
                  <br />
                  {issue.user.login}
                  <br />
                  {issue.created_at}
                  <br />
                  {issue.comments}
                  <br />
                  🔚
                </Link>
              </li>
            </Fragment>
          );
        })}
      {isLoading && <div>데이터 로딩중...</div>}
      {issueList.length > 0 && <div ref={pageEndRef} />}
    </ul>
  );
};

export default IssueListPage;
