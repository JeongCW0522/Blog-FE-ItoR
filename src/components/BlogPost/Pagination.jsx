import styled from 'styled-components';
import { LeftIcon, RightIcon } from '@/assets';
import { useState, useEffect } from 'react';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 30px 0 60px;
`;

const PageButton = styled.button`
  padding: 7px 12px;
  border: 1px solid #d9d9d9;
  background-color: ${({ $active }) => ($active ? '#e4e4e4' : 'white')};
  cursor: pointer;
  border-radius: 2px;

  &:hover {
    border: 1px solid #1890ff;
    color: #1890ff;
  }

  &:disabled {
    opacity: 0.6;
  }
`;

const Pagination = ({ data, onChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const totalPages = Math.ceil(data.length / postsPerPage);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const currentPosts = data.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
    onChange(currentPosts);
  }, [currentPage, data]);

  return (
    <PaginationWrapper>
      <PageButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <LeftIcon />
      </PageButton>
      {Array.from({ length: totalPages }, (_, i) => (
        <PageButton key={i + 1} onClick={() => onPageChange(i + 1)} $active={currentPage === i + 1}>
          {i + 1}
        </PageButton>
      ))}
      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <RightIcon />
      </PageButton>
    </PaginationWrapper>
  );
};

export default Pagination;
