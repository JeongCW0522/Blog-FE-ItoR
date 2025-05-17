import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Image } from '@/components';
import dayjs from 'dayjs';
import { Profile } from '@/assets';

const PostContainer = styled(Link)`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: opacity 0.2s ease;
  border-bottom: 1px solid #f5f5f5;
  padding: 10px 0 20px;

  &:hover {
    opacity: 0.7;
  }
`;

const PostContent = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const TitleContent = styled.div`
  @media screen {
    padding-left: 10px;
  }
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  color: black;
  margin: 0 0 10px;
`;

const Content = styled.p`
  font-size: 14px;
  color: #555;
  font-weight: 300;
  line-height: 160%;
  margin: 0 0 12px;
  display: -webkit-box; //최대 2줄까지 보이도록
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #909090;
  gap: 6px;
  margin: 50px 0 0 10px;
`;

const NameText = styled.span`
  color: #333;
`;

const BlogPostItem = ({ post }) => {
  const textContent = post.contents.find((c) => c.contentType === 'TEXT')?.content || '';
  const imageContent = post.contents.find((c) => c.contentType === 'IMAGE')?.content || null;
  const createdAt = dayjs(post.createdAt).format('YYYY.M.D');

  return (
    <PostContainer to={`/detail/${post.postId}`} style={{ textDecoration: 'none' }}>
      <PostContent>
        <TitleContent>
          <Title>{post.title}</Title>
          <Content>{textContent}</Content>
        </TitleContent>
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
      </PostContent>
      {imageContent && <Image width='90px' height='90px' src={imageContent} alt='썸네일' />}
    </PostContainer>
  );
};

export default BlogPostItem;
