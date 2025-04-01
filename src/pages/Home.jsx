import { useState } from 'react';
import styled from 'styled-components';
import Header from '@/components/layout/Header';
import SideBar from '@/components/layout/SideBar';
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
