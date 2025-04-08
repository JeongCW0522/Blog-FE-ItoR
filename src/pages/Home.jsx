import styled from 'styled-components';
import { Header, BlogPostList } from '@/components';

const Content = styled.div`
  margin-top: 150px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

function Home() {
  return (
    <>
      <Header />
      <Content>
        <BlogPostList />
      </Content>
    </>
  );
}

export default Home;
