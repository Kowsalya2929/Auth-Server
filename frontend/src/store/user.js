import { create } from 'zustand'

const useUserStore = create((set)=>({
    users: [],
    setUsers: ((users)=>set({users})),
    getAllData : async()=>{
        try{
            const res = await fetch('/api/user/data')
            const data = await res.json()
            if(!res.ok || !data.success){
                return {success: false,message: data.message}
            }
            set({users: data.data})
            return {success: true,message: data.message}
        }catch(err){
            console.log(`Get all data in error : ${err.message}`)
            return {success: false,message: err.message}
        }
    },
    logoutData : ()=>set({users: {}})
}))

export default useUserStore;