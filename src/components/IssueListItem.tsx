import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { IIssueList } from '../types/issueType';
import IssueHeader from './IssueHeader';

interface IIssueListProps {
  issueList: IIssueList[];
}

const IssueListItem: React.FC<IIssueListProps> = ({ issueList }) => {
  return (
    <>
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
                  <IssueHeader issue={issue} />
                </Link>
              </IssueLi>
            </Fragment>
          );
        })}
    </>
  );
};

export default IssueListItem;

const Ad = styled.li`
  border-bottom: 1px solid #d0d7deaa;
  padding: 24px;
  display: flex;
  justify-content: center;
`;
const IssueLi = styled.li`
  border-bottom: 1px solid #d0d7deaa;
  padding: 24px;
`;
