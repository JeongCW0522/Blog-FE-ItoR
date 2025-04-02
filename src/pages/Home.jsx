import { useState } from 'react';
import styled from 'styled-components';
import { Header, SideBar } from '@/components';
import AppExample from '@/AppExample';

const Main = styled.div`
  display: flex;
  margin-top: 100px;
`;

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Header onClick={toggleSidebar} />
      <SideBar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <Main>
        <AppExample />
      </Main>
    </div>
  );
}

export default Home;
