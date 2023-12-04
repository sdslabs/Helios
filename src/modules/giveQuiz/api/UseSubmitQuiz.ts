import { useMutation } from 'react-query';
import * as fetchers from './FetchSubmitQuiz';

export const useSubmitQuiz = ()=>{
    const mutation = useMutation({
        mutationFn:fetchers.submitQuiz
    });

    return mutation;
}