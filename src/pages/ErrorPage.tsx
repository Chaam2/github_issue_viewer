import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <img src="./error.gif" alt="error image" />
      <span>요청하신 페이지를 찾을 수 없습니다.</span>
      <StyledLink to="/">메인으로 가기</StyledLink>
    </ErrorContainer>
  );
};

export default ErrorPage;

const ErrorContainer = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 48px;
  margin: 24px auto;
  border: 1px solid #d0d7deaa;
  border-radius: 6px;
  img {
    width: 48px;
  }
`;
const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  padding: 16px 60px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  font-weight: 600;
  &:hover {
    background-color: #d0d7de66;
  }
`;
