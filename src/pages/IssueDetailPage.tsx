import React, { useEffect, useState } from 'react';
import { GoCalendar, GoComment, GoPerson } from 'react-icons/go';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { getIssueDetail } from '../api/issue';
import { IIssueDetail } from '../types/issueDetailType';
import { formatDate } from '../utils/formatDate';

const IssueDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const issueNumber = currentPath.split('/')[2];
  const [issueDetail, setIssueDetail] = useState<IIssueDetail>();

  const getIssueDetailData = async () => {
    try {
      //@ts-ignore
      const IssueDetailData: IIssueDetail = await getIssueDetail(issueNumber);
      setIssueDetail(IssueDetailData);
    } catch (error) {
      navigate('/404');
    }
  };
  useEffect(() => {
    getIssueDetailData();
  }, []);

  return (
    <IssueContainer>
      {issueDetail && (
        <>
          <IssueHeader>
            <h2># {issueDetail.number}</h2>
            <h1>{issueDetail.title}</h1>
            <div>
              <span>
                <GoPerson />
                {issueDetail.user.login}
              </span>
              <span>
                <GoCalendar />
                {formatDate(issueDetail.created_at)}
              </span>
              <span>
                <GoComment />
                {issueDetail.comments}
              </span>
            </div>
          </IssueHeader>
          <IssueBodyContainer>
            <Profile src={issueDetail.user.avatar_url} alt="user image" />
            <IssueBody>
              <span>{issueDetail?.user.login}</span>
              <div>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{issueDetail.body}</ReactMarkdown>
              </div>
            </IssueBody>
          </IssueBodyContainer>
        </>
      )}
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
    margin: 0 0 8px 0;
  }
  h1 {
    font-size: 2rem;
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

  span {
    display: block;
    border-radius: 6px 6px 0 0;
    background-color: #f6f8fa;
    border-bottom: 1px solid #d0d7de;
    padding: 8px 16px;
    font-weight: bold;
  }
  div {
    padding: 8px 16px;
  }
  ::before {
    content: '';
    position: absolute;
    top: 8px;
    left: -8px;
    border-right: 8px solid #d0d7de88;
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
