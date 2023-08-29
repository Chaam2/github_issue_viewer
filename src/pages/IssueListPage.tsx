import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getIssueList } from '../api/issue';
import { IIssueList } from '../types/issueListType';

const IssueListPage = () => {
  const [issueList, setIssueList] = useState<IIssueList[]>([]);

  const getIssueListData = async () => {
    const perPage = 20;
    const page = 1;
    //@ts-ignore
    const IssueListData: IIssueList[] = await getIssueList(perPage, page);
    setIssueList(IssueListData);
  };

  useEffect(() => {
    getIssueListData();
  }, []);

  return (
    <ul>
      {issueList
        ? issueList.map((issue, index) => {
            return (
              <Fragment key={issue.number}>
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
          })
        : null}
      <div style={{ backgroundColor: 'yellow' }}>end</div>
    </ul>
  );
};

export default IssueListPage;
