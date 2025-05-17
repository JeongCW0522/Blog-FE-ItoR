import { Axios } from './auth';
import axios from 'axios';

export const getPresignedUrl = async (fileName) => {
  try {
    const response = await Axios.get('/images/presigned-url', { params: { fileName } });
    return response.data.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || '이미지 변환에 실패했습니다.',
    };
  }
};

export const uploadImage = async (presignedUrl, file) => {
  try {
    await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
    return presignedUrl.split('?')[0];
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || '이미지 업로드에 실패했습니다.',
    };
  }
};
