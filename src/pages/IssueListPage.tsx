import React, { Fragment, useEffect, useRef, useState } from 'react';
import { GoPerson, GoCalendar, GoComment } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { getIssueList } from '../api/issue';
import { IIssueList } from '../types/issueListType';
import { formatDate } from '../utils/formatDate';

const IssueListPage = () => {
  const navigate = useNavigate();
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
      const perPage = 20;
      //@ts-ignore
      const IssueListData: IIssueList[] = await getIssueList(perPage, page);
      //@ts-ignore
      setIssueList(prev => [...prev, ...IssueListData]);
    } catch (error) {
      navigate('/404');
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
    <IssueUl>
      {issueList.length > 0 &&
        issueList.map((issue, index) => {
          return (
            <Fragment key={index + ':' + issue.number}>
              {index !== 0 && index % 4 === 0 && (
                <Link to="https://www.wanted.co.kr/">
                  <Ad>
                    <img
                      src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100"
                      alt="광고 이미지"
                    />
                  </Ad>
                </Link>
              )}
              <IssueLi>
                <Link to={`/issue/${issue.number}`}>
                  <h2># {issue.number}</h2>
                  <h1>{issue.title}</h1>
                  <div>
                    <span>
                      <GoPerson />
                      {issue.user.login}
                    </span>
                    <span>
                      <GoCalendar />
                      {formatDate(issue.created_at)}
                    </span>
                    <span>
                      <GoComment />
                      {issue.comments}
                    </span>
                  </div>
                </Link>
              </IssueLi>
            </Fragment>
          );
        })}
      {isLoading && <Spinner src="/spinner.gif" alt="spinner" />}
      {issueList.length > 0 && <div ref={pageEndRef} />}
    </IssueUl>
  );
};

export default IssueListPage;

const IssueUl = styled.ul`
  list-style: none;
  max-width: 1200px;
  padding: 0;
  margin: 24px auto;
  border: 1px solid #d0d7deaa;
  border-radius: 6px;
  a {
    text-decoration: none;
    color: black;
  }
  li {
    cursor: pointer;
  }
  li:hover {
    background-color: #d0d7de22;
  }
`;
const Ad = styled.li`
  border-bottom: 1px solid #d0d7deaa;
  padding: 24px;
  display: flex;
  justify-content: center;
`;
const IssueLi = styled.li`
  border-bottom: 1px solid #d0d7deaa;
  padding: 24px;
  h2 {
    font-size: 1rem;
    font-weight: 400;
    color: #888888;
    margin: 0 0 8px 0;
  }
  h1 {
    font-size: 1.2rem;
    font-weight: 400;
    margin: 0 0 8px 0;
  }
  div {
    display: flex;
    gap: 8px;

    span {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.9rem;
      color: #888888;
    }
  }
`;

const Spinner = styled.img`
  display: block;
  margin: 16px auto;
  opacity: 30%;
`;
