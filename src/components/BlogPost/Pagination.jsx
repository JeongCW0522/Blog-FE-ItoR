import styled from 'styled-components';
import { LeftIcon, RightIcon } from '@/assets';

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

const Pagination = ({ currentPage, totalPage, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPage) {
      onPageChange(page);
    }
  };

  return (
    <PaginationWrapper>
      <PageButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        <LeftIcon />
      </PageButton>
      {Array.from({ length: totalPage }, (_, i) => (
        <PageButton
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          $active={currentPage === i + 1}
        >
          {i + 1}
        </PageButton>
      ))}
      <PageButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
      >
        <RightIcon />
      </PageButton>
    </PaginationWrapper>
  );
};

export default Pagination;
