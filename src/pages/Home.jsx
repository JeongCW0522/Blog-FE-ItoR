import { useState } from 'react';
import styled from 'styled-components';
import { Header, BlogPostList } from '@/components';
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
  const [isLogoutModal, setIsLogoutModal] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);

  const closeLogoutModal = () => setIsLogoutModal(false);
  const closeLoginModal = () => setIsLoginModal(false);

  return (
    <>
      <Header />
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
