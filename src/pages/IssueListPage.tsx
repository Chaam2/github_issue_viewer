import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getIssueList } from '../api/issue';
import { IIssueList } from '../types/issueType';
import IssueListItem from '../components/IssueListItem';

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
      <IssueListItem issueList={issueList} />
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

const Spinner = styled.img`
  display: block;
  margin: 16px auto;
  opacity: 30%;
`;
