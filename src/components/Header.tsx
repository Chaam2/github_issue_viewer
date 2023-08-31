import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { getRepository } from '../api/repository';
import { IRepository } from '../types/repositoryType';
import { GoIssueOpened } from 'react-icons/go';

const Header = () => {
  const [repository, setRepository] = useState<IRepository>();

  useEffect(() => {
    getRepositoryData();
  }, []);

  const getRepositoryData = async () => {
    const repositoryData: IRepository = await getRepository();
    setRepository(repositoryData);
  };

  return (
    <Nav>
      <StyledLink to="/">
        <Logo src={repository?.owner.avatar_url} alt="repository image" />
        <span>{repository?.owner.login}</span> / <strong>{repository?.name}</strong>
      </StyledLink>
      <Div>
        <GoIssueOpened />
        {repository?.open_issues_count.toLocaleString()} Open
      </Div>
    </Nav>
  );
};

export default Header;

const Nav = styled.nav`
  background-color: #f6f8fa;
  border-bottom: 1px solid #d0d7de;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;
const StyledLink = styled(Link)`
  color: black;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  strong {
    font-weight: bold;
  }
`;
const Logo = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 100px;
  border: 1px solid #d0d7de;
`;
const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
