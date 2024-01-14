import { useMutation } from '@tanstack/react-query';
import * as fetchers from './FetchRegister';

export const useRegisterUser = ()=>{
    const mutation= useMutation({
        mutationFn: fetchers.fetchRegisterUser,
    })
    return mutation;
}
