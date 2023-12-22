import axiosInstance from "./AxiosInstance";

export const fetchAccessCode= async ({
    quizId,
    body}: any) => {
    try {
        console.log(body)
        const res =await axiosInstance.post(`/giveQuiz/user/start/${quizId}`, body)
      return res.data
    } catch (error) {
        console.error('Error starting the quiz:', error);
    }
  }
