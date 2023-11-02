import useAuthStore from '@auth/store/authStore'


export const Dashboard=()=>{
    const authStore = useAuthStore();
    console.log(authStore)
    return(
        <div> hello {authStore.user.emailAdd}</div> 

    )
}