import React from 'react';
import { GoPerson, GoCalendar, GoComment } from 'react-icons/go';
import styled from 'styled-components';
import { IIssueList } from '../types/issueListType';
import { formatDate } from '../utils/formatDate';

interface IIssueHeaderProps {
  issue: IIssueList;
}
const IssueHeader: React.FC<IIssueHeaderProps> = ({ issue }) => {
  return (
    <>
      {issue && (
        <IssueHeaderDiv>
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
        </IssueHeaderDiv>
      )}
    </>
  );
};

export default IssueHeader;

const IssueHeaderDiv = styled.div`
  h2 {
    font-size: 1rem;
    font-weight: 400;
    color: #888888;
    margin: 0 0 8px 0;
  }
  h1 {
    font-size: 1.6rem;
    font-weight: 500;
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
