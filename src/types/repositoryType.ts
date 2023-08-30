export interface IRepository {
  name: string;
  owner: Owner;
  html_url: string;
  open_issues_count: number;
}

type Owner = {
  login: string;
  avatar_url: string;
};
