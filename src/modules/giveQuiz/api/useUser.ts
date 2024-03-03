import { useMutation } from "@tanstack/react-query";
import * as fetchers from "./userFetcher";

export const useAccessCode = ()=>{
    const mutation= useMutation({
        mutationFn: fetchers.fetchAccessCode,
    })
    return mutation;
}

export const useSubmitQuiz = ()=>{
    const mutation = useMutation({
        mutationFn:fetchers.submitQuiz
    });
    return mutation;
}

export const useRegisterUser = ()=>{
    const mutation= useMutation({
        mutationFn: fetchers.fetchRegisterUser,
    })
    return mutation;
}
