import styled from 'styled-components';
import SideLogout from './SideLogout';
import SideLogin from './SideLogin';

const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
  z-index: 50;
`;

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #e6e6e6;
  display: flex;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.5s ease-in-out;
  z-index: 100;
`;

const SideBar = ({ isOpen, onClose }) => {
  return (
    <SidebarOverlay $isOpen={isOpen} onClick={onClose}>
      <SidebarContainer $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <SideLogin />
      </SidebarContainer>
    </SidebarOverlay>
  );
};

export default SideBar;
