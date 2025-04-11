import styled from 'styled-components';
import { Header, BlogPostList } from '@/components';

const Content = styled.div`
  margin: 150px auto 0;
  max-width: 700px;
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
