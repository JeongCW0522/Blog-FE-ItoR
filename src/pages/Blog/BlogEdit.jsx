import styled from 'styled-components';
import { Header, Toast, dummyData } from '@/components';
import { useState } from 'react';
import { AddPhoto } from '@/assets';
import GlobalStyle from '@/styles/global';
import { useNavigate, useParams } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;
`;

const AddPhotoButton = styled.button`
  display: flex;
  align-items: center;
  color: #909090;
  gap: 4px;
  padding: 10px;
  margin-top: 5px;
  font-size: 14px;
  background-color: white;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const Line = styled.div`
  width: 100vw;
  height: 1px;
  background-color: #f5f5f5;
  margin-top: 5px;
`;

const TitleWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 70px auto 50px;

  @media screen {
    padding-left: 20px;
  }
`;

const TitleInput = styled.input`
  width: 100%;
  height: 50px;
  font-size: 24px;
  color: black;
  font-weight: 500;
  line-height: 160%;
  letter-spacing: -0.25%;
  border: none;
  outline: none;

  &::placeholder {
    color: #909090;
    font-size: 18px;
    font-weight: 600;
  }
`;

const Content = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 60px auto;

  @media screen {
    padding-left: 20px;
  }
`;

const ContentText = styled.textarea`
  min-height: 70px;
  width: 100%;
  font-size: 14px;
  color: #696969;
  font-weight: 300;
  line-height: 160%;
  letter-spacing: -0.5%;
  word-break: keep-all;
  border: none;
  resize: none;
  outline: none;

  &::placeholder {
    color: #b3b3b3;
  }
`;

const BlogEdit = () => {
  const { id } = useParams();
  const post = dummyData.find((p) => p.id === Number(id));

  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');

  const [toastData, setToastData] = useState({ show: false, type: 'error', message: '' });
  const navigate = useNavigate();

  const onToast = () => {
    if (!content.trim()) {
      setToastData({
        show: true,
        type: 'error',
        message: '내용을 입력해주세요',
      });
      setTimeout(() => setToastData((prev) => ({ ...prev, show: false })), 2000);
    } else {
      navigate(-1, {
        state: {
          toastData: {
            show: true,
            type: 'positive',
            message: '저장되었습니다!',
          },
        },
      });
    }
  };

  return (
    <>
      <GlobalStyle />
      <Header onToast={onToast} />
      <Container>
        <Line />
        <AddPhotoButton>
          <AddPhoto />
          사진 추가하기
        </AddPhotoButton>
        <TitleWrapper>
          <TitleInput placeholder='제목' value={title} onChange={(e) => setTitle(e.target.value)} />
        </TitleWrapper>
        <Line />
        <Content>
          <ContentText
            placeholder='어떠한 것을 깨달았나요?'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Content>
        <Toast show={toastData.show} text={toastData.message} type={toastData.type} />
      </Container>
    </>
  );
};

export default BlogEdit;
