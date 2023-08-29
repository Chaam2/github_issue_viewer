import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
    <>
      {issueDetail?.number}
      <br />
      {issueDetail?.title}
      <br />
      {issueDetail?.user.login}
      <br />
      {issueDetail?.user.avatar_url}
      <br />
      {issueDetail?.created_at}
      <br />
      {issueDetail?.comments}
      <br />
      {issueDetail?.body}
      <br />
    </>
  );
};

export default IssueDetailPage;
