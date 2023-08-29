export interface IIssueDetail {
  number: number;
  title: string;
  user: User;
  created_at: string;
  comments: number;
  body: string;
}

type User = {
  login: string;
  avatar_url: string;
};
