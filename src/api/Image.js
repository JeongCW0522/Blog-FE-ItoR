import { Axios } from './auth';

export const getPresignedUrl = async (image) => {
  try {
    const response = await Axios.get('/images/presigned-url', {
      params: {
        fileName: image,
      },
    });
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || '이미지 변환에 실패했습니다.',
    };
  }
};

export const uploadImage = async (url, file) => {
  try {
    const response = await Axios.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || '이미지 업로드에 실패했습니다.',
    };
  }
};

export { getPresignedUrl, uploadImage };
