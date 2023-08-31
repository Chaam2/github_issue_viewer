import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { getIssueDetail } from '../api/issue';
import { IIssueDetail } from '../types/issueDetailType';
import IssueHeader from '../components/IssueHeader';
import MarkdownPreview from '@uiw/react-markdown-preview';

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
          <IssueHeaderContainer>
            <IssueHeader issue={issueDetail} />
          </IssueHeaderContainer>
          <IssueBodyContainer>
            <Profile src={issueDetail.user.avatar_url} alt="user image" />
            <IssueBody>
              <span>{issueDetail.user.login}</span>
              <div>
                <MarkdownPreview source={issueDetail.body} />
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

const IssueHeaderContainer = styled.div`
  border-bottom: 1px solid #d0d7deaa;
  padding-bottom: 16px;
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
