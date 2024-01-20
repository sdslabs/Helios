import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { FetchCheckResponse } from "./getCheckResponse";

const useCheckResponse = (responseId: string) => {
    const mutation = useMutation({
        mutationKey: ['checkResponse', responseId],
        mutationFn: FetchCheckResponse,
      })
    return mutation;
    }

export default useCheckResponse