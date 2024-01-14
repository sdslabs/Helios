import axiosInstance from "./AxiosInstance";

export const fetchGetResponse = async (quizId : string, questionId : string) => {
    try {
      const response = await axiosInstance.get(`/giveQuiz/response/getResponse/${quizId}/${questionId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching response:', error);
    }
   };

   export const fetchCreateUpdateResponse= async ({
    quizId,
    questionId,
    responseData
  }: any) => {
    try {
        const res =await axiosInstance.post(`/giveQuiz/response/createResponse/${quizId}/${questionId}/`, responseData)
      return res.data
    } catch (error) {
     console.error('Error creating/updating response:', error);
    }
  }

   export const fetchDeleteResponse = async ({quizId, questionId} : any) => {
    try {
      const response = await axiosInstance.delete(`/giveQuiz/response/deleteResponse/${quizId}/${questionId}/`);
      return response.data;
    } catch (error) {
      console.error('Error deleting response:', error);
    }
   };