import Api from './Api';

export const getIssueList = async (perPage: number, page: number) => {
  const params: GetIssueListParams = {
    sort: 'comments',
    per_page: perPage,
    page: page,
  };
  return await Api.get('', { params: params }); // URL 문자열과 params 객체를 분리하여 전달
};

export const getIssueDetail = async (issueNumber: number) => {
  return await Api.get(`/${issueNumber}`);
};

interface GetIssueListParams {
  sort: string;
  per_page: number;
  page: number;
}
