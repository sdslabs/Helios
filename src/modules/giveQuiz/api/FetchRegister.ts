import axiosInstance from "./AxiosInstance";

export const fetchRegisterUser= async ({
    quizId,
    body}: any) => {
    try {
        const res =await axiosInstance.post(`/giveQuiz/user/register/${quizId}`, body)
      return res.data
    } catch (error) {
        console.error('Error registering user:', error);
    }
  }


