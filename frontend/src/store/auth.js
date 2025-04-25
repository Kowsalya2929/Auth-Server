import { create } from 'zustand'

const useAuthStore = create((set)=>({
    auths: [],
    setAuths: ((auths)=>set({auths})),
    postRegister: async(newUser)=>{
        try{
            const {name,email,password} = newUser;
            const res = await fetch('/api/auth/register',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            const data = await res.json()
            if(!name || !email || !password || !res.ok || !data.success){
                return {success: false,message: data.message}
            }
            set((state)=> ({auths: [...state.auths, data.data]}))
            return {success: true,message: data.message}
        }catch(err){
            console.log(`Register error : ${err.message}`)
            return {success: false,message: err.message}
        }
    },
    postLogin: async(oldUser)=>{
        try{
            const {email,password} = oldUser;
            const res = await fetch('/api/auth/login',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(oldUser)
            })
            const data = await res.json()
            if(!email || !password || !res.ok || !data.success){
                return {success: false,message: data.message}
            }
            return {success: true,message: data.message}
        }catch(err){
            console.log(`Login error : ${err.message}`)
            return {success: false,message: err.message}
        }
    },
    postLogout: async()=>{
        try{
            const res = await fetch('/api/auth/logout',{
                method: 'POST',
                headers: {
                    'Content-Type':'application'
                }
            })
            const data = await res.json()
            if(!res.ok || !data.success){
                return {success: false,message: data.message}
            }
            return {success: true,message: data.message}
        }catch(err){
            console.log(`Logout error : ${err.message}`)
            return {success: false,message: data.message}
        }
    },
}))

export default useAuthStore;