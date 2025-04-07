import styled from 'styled-components';
import BlogPostItem from './BlogPostItem';
import { Profile } from '@/assets';

const dummyData = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  title: `16 Title one line`,
  content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
  thumbnail: Profile,
  profileImg: Profile,
  nickname: '닉네임',
  date: 'Feb 17, 2025',
  comments: 0,
}));

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const BlogPostList = () => {
  return (
    <List>
      {dummyData.map((post) => (
        <BlogPostItem key={post.id} post={post} />
      ))}
    </List>
  );
};

export default BlogPostList;
