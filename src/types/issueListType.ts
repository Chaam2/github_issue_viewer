export interface IGetIssueListParams {
  sort: string;
  per_page: number;
  page: number;
}

export interface IIssueList {
  title: string;
  user: User;
  created_at: string;
  comments: number;
  number: number;
}

type User = {
  login: string;
};
