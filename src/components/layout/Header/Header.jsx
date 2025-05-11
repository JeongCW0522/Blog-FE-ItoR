import { useState } from 'react';
import styled from 'styled-components';
import { SideBarIcon, GITLOGO } from '@/assets';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreateLog, ChatandMore, DeleteandLog, EditLog } from '@/components/layout/Header';
import { LoginModal, SideBar, Modal } from '@/components';
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

const Header = ({ onSave, onToast, onPost }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModal, setIsLogoutModal] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const openLogoutModal = () => setIsLogoutModal(true);
  const openLoginModal = () => setIsLoginModal(true);
  const closeLogoutModal = () => setIsLogoutModal(false);
  const closeLoginModal = () => setIsLoginModal(false);

  const { isLogin, logout } = useLogin();
  const navigate = useNavigate();

  const location = useLocation(); // 현재 주소정보 가져옴
  const isWritePage = location.pathname.startsWith('/write');
  const isEditPage = location.pathname.endsWith('/edit'); // 주소가 edit으로 끝나는지 확인
  const isDetailPage = location.pathname.startsWith('/detail/') && !isEditPage; //현재 주소가 detail로 시작하는지 확인
  const isMypage = location.pathname.startsWith('/mypage');
  const signupPaths = ['/signUp', '/signUp/Email', '/signUp/Kakao'];
  const isSignupPage = signupPaths.includes(location.pathname);

  let headerContent = null;

  if (isDetailPage) {
    headerContent = <ChatandMore />;
  } else if (isWritePage) {
    headerContent = <DeleteandLog onToast={onToast} onPost={onPost} />;
  } else if (isMypage || isEditPage) {
    headerContent = <EditLog onSave={onSave} onToast={onToast} />;
  } else if (!isSignupPage) {
    headerContent = <CreateLog />;
  }

  const handleLogout = () => {
    logout();
    closeLogoutModal();
    navigate('/');
  };

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
      {isLogoutModal && (
        <Modal
          isOpen={isLogoutModal}
          title='로그아웃을 진행할게요'
          confirmText='로그아웃'
          closeText='취소'
          onConfirm={handleLogout}
          onClose={closeLogoutModal}
          bgColor='#00A1FF'
        />
      )}
      {isLoginModal && <LoginModal isOpen={isLoginModal} onClose={closeLoginModal} />}
    </>
  );
};

export default Header;
