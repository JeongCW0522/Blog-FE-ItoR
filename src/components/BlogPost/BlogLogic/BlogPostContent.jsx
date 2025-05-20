import { useState } from 'react';
import { Content, ContentText, ImageWrapper, DeleteBox } from '@/styles/BlogStyles';
import { DeleteIcon } from '@/assets';
import { Image } from '@/components';

const BlogPostContent = ({ contents, setContents }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleTextChange = (index, value) => {
    const updated = contents.map((item, idx) =>
      idx === index ? { ...item, content: value } : item,
    );
    setContents(updated);
  };

  //이미지만 삭제
  const handleDeleteImage = (index) => {
    const updatedContents = contents.filter((_, i) => i !== index);
    setContents(updatedContents);
    setSelectedImage(null);
  };

  const resize = (obj) => {
    if (obj) {
      obj.style.height = 'auto';
      obj.style.height = `${obj.scrollHeight}px`;
    }
  };

  return (
    <Content>
      {contents
        .sort((a, b) => a.contentOrder - b.contentOrder)
        .map((item, index) => {
          if (item.contentType === 'TEXT') {
            return (
              <ContentText
                key={index}
                placeholder='어떠한 것을 깨달았나요?'
                value={item.content}
                onChange={(e) => handleTextChange(index, e.target.value)}
                onInput={(e) => resize(e.target)}
              />
            );
          } else if (item.contentType === 'IMAGE') {
            return (
              <ImageWrapper key={index} selected={selectedImage === index}>
                <Image
                  src={item.content}
                  alt='업로드 이미지'
                  width='700px'
                  height='700px'
                  radius='8px'
                  onClick={() => setSelectedImage((prev) => (prev === index ? null : index))}
                />
                {selectedImage === index && (
                  <DeleteBox onClick={() => handleDeleteImage(index)}>
                    <DeleteIcon />
                  </DeleteBox>
                )}
              </ImageWrapper>
            );
          }
          return null;
        })}
    </Content>
  );
};

export default BlogPostContent;
