import { useQuery, useMutation } from '@tanstack/react-query';
import * as fetchers from './FetchResponse';

export const useGetResponse = (quizId: string, questionId: string)=>{
    const query= useQuery({
        queryKey: ['response',quizId, questionId],
        queryFn: () => fetchers.fetchGetResponse(quizId, questionId),
    })
    return query;
}

export const useCreateUpdateResponse = ()=>{
    const mutation = useMutation({
        mutationFn:  fetchers.fetchCreateUpdateResponse,
    });
    return mutation;
}

export const useDeleteResponse = ()=>{
    const mutation = useMutation({
        mutationFn: fetchers.fetchDeleteResponse,
    });
    return mutation;
}



