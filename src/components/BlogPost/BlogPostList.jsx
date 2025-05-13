import styled from 'styled-components';
import { useState, useEffect } from 'react';
import BlogPostItem from './BlogPostItem';
import Pagination from './Pagination';
import { getPostList } from '@/api/post';
import { useQuery } from '@tanstack/react-query';

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const BlogPostList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const postsPerPage = 5;

  const {
    data: res,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['postList', currentPage],
    queryFn: () => getPostList(postsPerPage, currentPage - 1),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });

  const postList = res?.data?.post;
  useEffect(() => {
    if (res?.data?.pageMax) {
      setTotalPage(res.data.pageMax);
    }
  }, [res]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;
  return (
    <>
      <List>
        {postList.map((post) => (
          <BlogPostItem key={post.postId} post={post} />
        ))}
      </List>
      <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={setCurrentPage} />
    </>
  );
};

export default BlogPostList;
