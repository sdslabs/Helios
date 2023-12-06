import { create } from 'zustand'

interface User {
    userId:number,
    emailAdd:string,
    role:string
}


interface authStore {
    user:User
    onboarded:boolean,
    setUser:(to:User)=>void,
    setOnboarded:(to:boolean)=>void,
}

const useAuthStore = create<authStore>()(
        set=>({
            user:{
                userId:0,
                emailAdd:"",
                role:""
            },
            onboarded:false,
            setUser:(to:User)=>set({user:to}),
            setOnboarded:(to:boolean)=>set({onboarded:to}),
    }),
)

export default useAuthStore;

