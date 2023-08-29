import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ErrorPage from './pages/ErrorPage';
import IssueDetailPage from './pages/IssueDetailPage';
import IssueListPage from './pages/IssueListPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<IssueListPage />} />
        <Route path="issue/:id" element={<IssueDetailPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
