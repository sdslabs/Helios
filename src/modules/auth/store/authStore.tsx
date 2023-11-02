import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

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
    // persist<authStore>(
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
    // {
    //     name:'auth-store',
    //     storage:createJSONStorage(()=>sessionStorage)
    // }
    // )
)

export default useAuthStore;

