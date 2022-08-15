import axios from 'axios'
import {baseUrl} from "../config"
const GET = (url,params)=>{
   return axios({
        method: "GET",
        url:`${baseUrl}/${url}`,
        // headers:{
        //     'Autherization': `Token ${token}`
        // },
        ...params &&  {data :params}
    })
}


const POST = (url,params)=>{
   return axios({
        method: 'POST',
        url:`${baseUrl}/${url}`,
        // headers:{
        //     'Autherization': `Token ${token}`
        // },
        ...params &&  {data :params}
    })
}


const PUT = (url,params)=>{
    return axios({
         method: 'PUT',
         url:`${baseUrl}/${url}`,
         // headers:{
         //     'Autherization': `Token ${token}`
         // },
         ...params &&  {data :params}
     })
 }

const DELETE = (url)=>{
    return axios({
        method: 'DELETE',
        url:`${baseUrl}/${url}`,
        // headers:{
        //     'Autherization': `Token ${token}`
        // },
        // ...params &&  {data :params}
    })
}


const useAxios = {
    POST,GET, DELETE ,PUT
}




export default useAxios