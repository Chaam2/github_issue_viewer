import React, { useEffect, useState } from 'react';
import { GoCalendar, GoComment, GoPerson } from 'react-icons/go';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { getIssueDetail } from '../api/issue';
import { IIssueDetail } from '../types/issueDetailType';

const IssueDetailPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const issueNumber = currentPath.split('/')[2];

  const [issueDetail, setIssueDetail] = useState<IIssueDetail>();

  const getIssueDetailData = async () => {
    //@ts-ignore
    const IssueDetailData: IIssueDetail = await getIssueDetail(issueNumber);
    setIssueDetail(IssueDetailData);
  };
  useEffect(() => {
    getIssueDetailData();
  }, []);

  return (
    <IssueContainer>
      <IssueHeader>
        <h2># {issueDetail?.number}</h2>
        <h1>{issueDetail?.title}</h1>
        <div>
          <span>
            <GoPerson />
            {issueDetail?.user.login}
          </span>
          <span>
            <GoCalendar />
            {issueDetail?.created_at}
          </span>
          <span>
            <GoComment />
            {issueDetail?.comments}
          </span>
        </div>
      </IssueHeader>
      <IssueBodyContainer>
        <Profile src={issueDetail?.user.avatar_url} alt="user image" />
        <IssueBody>
          <div>{issueDetail?.user.login}</div>
          {issueDetail?.body}
        </IssueBody>
      </IssueBodyContainer>
    </IssueContainer>
  );
};

export default IssueDetailPage;

const IssueContainer = styled.div`
  max-width: 1200px;
  padding: 24px;
  margin: 0 auto;
`;

const IssueHeader = styled.div`
  border-bottom: 1px solid #d0d7deaa;
  h2 {
    font-size: 1.2rem;
    font-weight: 400;
    color: #888888;
    margin-bottom: 8px;
  }
  h1 {
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 8px;
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
    margin-bottom: 16px;
  }
`;
const IssueBodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-top: 24px;
`;
const IssueBody = styled.div`
  border: 1px solid #d0d7de;
  border-radius: 6px;
  position: relative;

  div {
    border-radius: 6px 6px 0 0;
    background-color: #f6f8fa;
    border-bottom: 1px solid #d0d7de;
    padding: 8px;
    font-weight: bold;
  }
  ::before {
    content: '';
    position: absolute;
    top: 8px;
    left: -10px;
    border-right: 10px solid #d0d7de88;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }
`;

const Profile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 100px;
  border: 1px solid #d0d7de;
`;
