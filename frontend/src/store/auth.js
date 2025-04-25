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
    postSendVerifyOtp: async()=>{
        try{
            const res = await fetch('/api/auth/send-verify-otp',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                }
            })
            const data = await res.json()
            if(!res.ok || !data.success){
                return {success: false,message: data.message}
            }
            return {success: true,message: data.message}
        }catch(err){
            console.log(`Send verify otp error : ${err.message}`)
            return {success: false,message: data.message}
        }
    },
    postVerifyOTP: async(otp)=>{
        try{
            const res = await fetch('/api/auth/verify-account',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({otp})
            })
            const data = await res.json()
            if(!res.ok || !data.success){
                return {success: false,message: data.message}
            }
            return {success: true,message: data.message}
        }catch(err){
            console.log(`verify otp error : ${err.message}`)
            return {success: false,message: data.message}
        }
    },
    postSendResetVerifyOtp: async(email)=>{
        try{
            const res = await fetch('/api/auth/send-reset-otp',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({email})
            })
            const data = await res.json()
            if(!res.ok || !data.success){
                return {success: false,message: data.message}
            }
            return {success: true,message: data.message}
        }catch(err){
            console.log(`Send reset verify otp error : ${err.message}`)
            return {success: false,message: data.message}
        }
    },
    postResetVerifyOTP: async(resetPassword)=>{
        try{
            const res = await fetch('/api/auth/reset-password',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(resetPassword)
            })
            const data = await res.json()
            if(!res.ok || !data.success){
                return {success: false,message: data.message}
            }
            return {success: true,message: data.message}
        }catch(err){
            console.log(`Reset verify otp error : ${err.message}`)
            return {success: false,message: data.message}
        }
    }
}))

export default useAuthStore;