import { useState } from 'react';
import styled from 'styled-components';
import { Header, SideBar } from '@/components';
import AppExample from '@/AppExample';
import LogoutModal from '@/components/Modal/LogoutModal';

const Main = styled.div`
  display: flex;
  margin-top: 100px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 200;
`;

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  return (
    <>
      <Header openSidebar={toggleSidebar} />
      <SideBar isOpen={isSidebarOpen} onClose={toggleSidebar} onLogoutClick={openLogoutModal} />
      <Main>
        <AppExample />
      </Main>
      <ModalOverlay isVisible={isLogoutModalOpen}>
        <LogoutModal isOpen={isLogoutModalOpen} onClose={closeLogoutModal} />
      </ModalOverlay>
    </>
  );
}

export default Home;
