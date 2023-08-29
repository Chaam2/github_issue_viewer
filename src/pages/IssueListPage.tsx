import React, { useEffect, useState } from 'react';
import { getIssueList } from '../api/issue';
import { IIssueList } from '../types/issueListType';

const IssueListPage = () => {
  const [issueList, setIssueList] = useState<IIssueList[]>([]);

  const getIssueListData = async () => {
    const perPage = 10;
    const page = 1;
    //@ts-ignore
    const IssueListData: IIssueList[] = await getIssueList(perPage, page);
    setIssueList(IssueListData);
  };

  useEffect(() => {
    getIssueListData();
  }, []);

  return (
    <>
      {issueList
        ? issueList.map(issue => {
            return (
              <div key={issue.number}>
                {issue.number}/{issue.title}/{issue.user.login}/{issue.created_at}/{issue.comments}
                🔚
              </div>
            );
          })
        : null}
    </>
  );
};

export default IssueListPage;
