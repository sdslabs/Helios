import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { FetchCheckResponse } from "./getCheckResponse";

const useCheckResponse = ({ quizId, responseId }: { quizId: string; responseId: string }) => {
    const mutation = useMutation({
        mutationKey: ['checkResponse', responseId],
        mutationFn: () => FetchCheckResponse(quizId, responseId),
      })
    return mutation;
    }

export default useCheckResponse