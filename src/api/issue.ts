import { IGetIssueListParams, IIssueList } from '../types/issueListType';
import Api from './Api';

export const getIssueList = async (perPage: number, page: number): Promise<IIssueList> => {
  const params: IGetIssueListParams = {
    sort: 'comments',
    per_page: perPage,
    page: page,
  };
  return await Api.get('', { params: params });
};

export const getIssueDetail = async (issueNumber: number) => {
  return await Api.get(`/${issueNumber}`);
};
