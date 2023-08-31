export interface IGetIssueListParams {
  sort: string;
  per_page: number;
  page: number;
}

export interface IIssueList {
  title: string;
  user: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  comments: number;
  number: number;
}

export interface IIssueDetail extends IIssueList {
  body: string;
}
