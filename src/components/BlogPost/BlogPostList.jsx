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

const BlogPostList = ({ isOwner = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const postsPerPage = 5;

  const {
    data: publicPostData,
    isLoading: isLoadingAll,
    isError: isErrorAll,
  } = useQuery({
    queryKey: ['postList', currentPage],
    queryFn: () => getPostList(postsPerPage, currentPage - 1), // 일반 게시글 조회
    enabled: !isOwner,
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });

  const {
    data: ownerPostData,
    isLoading: isLoadingOwner,
    isError: isErrorOwner,
  } = useQuery({
    queryKey: ['ownerPostList'],
    queryFn: () => getPostList(100, currentPage - 1), // 전체 게시글 조회
    enabled: isOwner,
    staleTime: 1000 * 60,
  });

  // 일반 게시글 리스트
  const postList = publicPostData?.data?.post || [];

  // 본인 게시글 리스트
  const filteredPostList = (ownerPostData?.data?.post || []).filter((post) => post.isOwner);
  const ownerPostList = filteredPostList.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  useEffect(() => {
    if (isOwner) {
      setTotalPage(Math.ceil(filteredPostList.length / postsPerPage) || 1);
    } else if (publicPostData?.data?.pageMax) {
      setTotalPage(publicPostData.data.pageMax);
    }
  }, [isOwner, publicPostData, filteredPostList]);

  if ((isOwner && isLoadingOwner) || (!isOwner && isLoadingAll)) {
    return <div>로딩 중...</div>;
  }
  if ((isOwner && isErrorOwner) || (!isOwner && isErrorAll)) {
    return <div>에러 발생</div>;
  }

  return (
    <>
      <List>
        {(isOwner ? ownerPostList : postList).map((post) => (
          <BlogPostItem key={post.postId} post={post} />
        ))}
      </List>
      <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={setCurrentPage} />
    </>
  );
};

export default BlogPostList;
