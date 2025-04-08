import { useState } from 'react';
import styled from 'styled-components';
import { SideBarIcon, GITLOGO } from '@/assets';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreateLog, ChatandMore, DeleteandLog } from '@/components/layout/Header';
import { LogoutModal, LoginModal, SideBar } from '@/components';
import { useLogin } from '@/context/LoginContext';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  width: 100%;
  max-width: 100vw;
  height: 70px;
  position: fixed;
  margin: 0 auto;
  padding-left: 20px;
  box-sizing: border-box;
  background-color: white;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
`;

const SideBarIconClick = styled(SideBarIcon)`
  &:hover {
    opacity: 0.6;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 200;
`;

const Header = ({ setMypage, onToast }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModal, setIsLogoutModal] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const openLogoutModal = () => setIsLogoutModal(true);
  const openLoginModal = () => setIsLoginModal(true);
  const closeLogoutModal = () => setIsLogoutModal(false);
  const closeLoginModal = () => setIsLoginModal(false);

  const { isLogin } = useLogin();
  const navigate = useNavigate();

  const location = useLocation(); // 현재 주소정보 가져옴
  const isDetailPage = location.pathname.startsWith('/detail/');
  const isWritePage = location.pathname.startsWith('/write'); //현재 주소가 detail로 시작하는지 확인

  let headerContent = null;

  if (isDetailPage) {
    headerContent = <ChatandMore />;
  } else if (isWritePage) {
    headerContent = <DeleteandLog onToast={onToast} />;
  } else {
    headerContent = setMypage ?? <CreateLog />;
  }

  return (
    <>
      <SideBar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        openLogoutModal={openLogoutModal}
        isLogin={isLogin}
        openLoginModal={openLoginModal}
      />
      <HeaderContainer>
        <IconWrapper>
          <SideBarIconClick onClick={setIsSidebarOpen} />
          <GITLOGO onClick={() => navigate('/')} />
        </IconWrapper>
        {headerContent}
      </HeaderContainer>
      <ModalOverlay>
        {isLogoutModal && <LogoutModal isOpen={isLogoutModal} onClose={closeLogoutModal} />}
        {isLoginModal && <LoginModal isOpen={isLoginModal} onClose={closeLoginModal} />}
      </ModalOverlay>
    </>
  );
};

export default Header;
