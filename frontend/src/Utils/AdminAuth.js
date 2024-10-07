import {jwtDecode} from 'jwt-decode'
import axios from '../axios'

const createNewToken = async () =>{
    const refreshToken = JSON.parse(localStorage.getItem('refresh'))
    console.log('admin refresh:',refreshToken)
    try{
        const res = await axios.post('token/refresh/', 
        {
          "refresh":refreshToken
        })
        if(res.status === 200){
          localStorage.setItem('access', JSON.stringify(res.data.access))
          localStorage.setItem('refresh', JSON.stringify(res.data.refresh))
          console.log('admin access:',res.data.access)
          let decoded = jwtDecode(res.data.access);
          return {'name':decoded.first_name,
          isAuthenticated:true}
        }
    }catch(error){
        return false;
    }
}

const checkAdmin = async ()=>{
    const token = JSON.parse(localStorage.getItem('access'))
    try{
        const res = await axios.get('/',
        {headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json',
            'Accept':'application/json'
            }
        });
        return res.data.is_superuser;
    }catch(error){
        console.log(error)
        return false;
    }
}


const AdminAuth = async ()=>{
    const token = JSON.parse(localStorage.getItem('access'));

    if (!token){
        return {
            first_name:null,
            isAuthenticated:false,
            isAdmin:false
        }
    }
    const remainTime = Date.now() / 1000;
    let decode = jwtDecode(token);

    if (decode.exp > remainTime){
        let admin_status =await checkAdmin()
        console.log('admin access:',token)
        return{
            first_name:decode.first_name,
            isAuthenticated:true,
            isAdmin:admin_status
        }
    }else{
        const result =await createNewToken()
        if (result){
            const token = JSON.parse(localStorage.getItem('access'));
            let decode = jwtDecode(token);
            let admin_status =await checkAdmin()
            return{
                first_name:decode.first_name,
                isAuthenticated:true,
                isAdmin:admin_status
            }
        }else{
            return{
                first_name:null,
                isAuthenticated:false,
                isAdmin:false
            }
        }
    }
}

export default AdminAuth