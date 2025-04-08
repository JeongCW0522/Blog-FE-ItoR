import { useState } from 'react';
import styled from 'styled-components';
import { SideBarIcon, GITLOGO } from '@/assets';
import { useLocation } from 'react-router-dom';
import { CreateLog, ChatandMore, DeleteandLog } from '@/components/layout/Header';
import { useLogin } from '@/context/LoginContext';
import { SideBar } from '@/components';

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

const Header = ({ setMypage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const openLogoutModal = () => setIsLogoutModal(true);
  const openLoginModal = () => setIsLoginModal(true);

  const { isLogin } = useLogin();

  const location = useLocation(); // 현재 주소정보 가져옴
  const isDetailPage = location.pathname.startsWith('/detail/'); //현재 주소가 detail로 시작하는지 확인

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
          <SideBarIcon onClick={setIsSidebarOpen} />
          <GITLOGO />
        </IconWrapper>
        {isDetailPage ? <ChatandMore /> : (setMypage ?? <CreateLog />)}
      </HeaderContainer>
    </>
  );
};

export default Header;
