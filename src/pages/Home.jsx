import { useState } from 'react';
import styled from 'styled-components';
import { Header, SideBar, BlogPostList } from '@/components';
import LogoutModal from '@/components/Modal/LogoutModal';
import LoginModal from '@/components/Modal/LoginModal';

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 200;
`;

const Content = styled.div`
  margin-top: 150px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModal, setIsLogoutModal] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isLoginState, setIsLoginState] = useState(false); // 로그인 여부

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const openLogoutModal = () => setIsLogoutModal(true);
  const closeLogoutModal = () => setIsLogoutModal(false);
  const openLoginModal = () => setIsLoginModal(true);
  const closeLoginModal = () => setIsLoginModal(false);

  return (
    <>
      <Header openSidebar={toggleSidebar} />
      <SideBar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        openLogoutModal={openLogoutModal}
        isLogin={true}
        openLoginModal={openLoginModal}
      />
      <Content>
        <BlogPostList />
      </Content>
      <ModalOverlay>
        {isLogoutModal && <LogoutModal isOpen={isLogoutModal} onClose={closeLogoutModal} />}
        {isLoginModal && <LoginModal isOpen={isLoginModal} onClose={closeLoginModal} />}
      </ModalOverlay>
    </>
  );
}

export default Home;
