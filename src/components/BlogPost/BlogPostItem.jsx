import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Image } from '@/components';

const PostContainer = styled(Link)`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: opacity 0.2s ease;
  border-bottom: 1px solid #f5f5f5;
  padding: 10px 0 20px 0;

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
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #909090;
  gap: 6px;
  margin-top: 50px;
  margin-left: 10px;
`;

const NameText = styled.span`
  color: #333;
`;

const BlogPostItem = ({ post }) => {
  return (
    <PostContainer to={`/detail/${post.id}`} style={{ textDecoration: 'none' }}>
      <PostContent>
        <TitleContent>
          <Title>{post.title}</Title>
          <Content>{post.content}</Content>
        </TitleContent>
        <InfoWrapper>
          <Image width='18px' height='18px' src={post.profileImg} alt='프로필' />
          <NameText>{post.nickname}</NameText>
          <span>·</span>
          <span>{post.date}</span>
          <span>·</span>
          <span>댓글 {post.comments}</span>
        </InfoWrapper>
      </PostContent>
      <Image width='90px' height='90px' src={post.thumbnail} alt='썸네일' />
    </PostContainer>
  );
};

export default BlogPostItem;
