import { useMutation } from '@tanstack/react-query';
import * as fetchers from './FetchAccessCode';

export const useAccessCode = ()=>{
    const mutation= useMutation({
        mutationFn: fetchers.fetchAccessCode,
    })
    return mutation;
}
