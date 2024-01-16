import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";
import { useMutation} from "@tanstack/react-query";

const createLog = async ({ log }: any) => {
  try {
    const response = await axiosInstance.post("/log", log);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
}

const useLog = () => {
  const mutation = useMutation({
    mutationFn: createLog,
  });
  return mutation;
}

export default useLog;