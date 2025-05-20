import { useEffect } from 'react';
import styled from 'styled-components';
import { Image, BlogComment } from '@/components';
import { getPostDetail } from '@/api/post';
import { useQuery } from '@tanstack/react-query';
import { Profile } from '@/assets';
import dayjs from 'dayjs';

const TitleContent = styled.div`
  max-width: 720px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
`;
const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: #222;
  margin: 60px 0px;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #909090;
  gap: 6px;
`;

const NameText = styled.span`
  color: #333;
`;

const Line = styled.div`
  width: 100vw;
  height: 1px;
  background-color: #f5f5f5;
  margin-top: 5px;
`;

const Content = styled.div`
  max-width: 720px;
  width: 100%;
  margin: 40px auto 60px auto;
  font-size: 16px;
  color: #333;
  font-weight: 300;
  line-height: 180%;
  word-break: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;

const BlogDetailField = ({ postId, setIsOwner }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['postId', postId],
    queryFn: () => getPostDetail(postId),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    if (data?.data?.isOwner !== undefined) {
      setIsOwner(data.data.isOwner);
    }
  }, [data, setIsOwner]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  const post = data?.data;
  const createdAt = dayjs(post.createdAt).format('YYYY.M.D');
  const postContent = post.contents
    .sort((a, b) => a.contentOrder - b.contentOrder)
    .map((item, index) => {
      if (item.contentType === 'TEXT') {
        return <p key={index}>{item.content}</p>;
      } else if (item.contentType === 'IMAGE') {
        return <img key={index} src={item.content} alt={`이미지 ${index + 1}`} />;
      }
      return null;
    });

  return (
    <>
      <TitleContent>
        <Title>{post.title}</Title>
        <InfoWrapper>
          <Image
            width='20px'
            height='20px'
            radius='50%'
            src={post.profileUrl || Profile}
            alt='프로필'
          />
          <NameText>{post.nickName}</NameText>
          <span>
            · {createdAt} · 댓글 {post.comments.length}
          </span>
        </InfoWrapper>
      </TitleContent>
      <Line />
      <Content>{postContent}</Content>
      <Line />
      <BlogComment post={post} />
    </>
  );
};

export default BlogDetailField;
