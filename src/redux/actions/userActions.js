import axios from "axios";
import {message} from 'antd';

export const userLogin = (reqObj) => async dispatch=>{

    dispatch({type: 'LOADING' , payload:true})

    try { 
        await axios.post('/api/users/login', reqObj).then((res)=>{
           console.log('successfull',res.data)
           localStorage.setItem('user',JSON.stringify(res.data));

           message.success('Login Success')
           dispatch({type: 'LOADING' , payload:false}); 
  
           setTimeout(()=>{
              window.location.href="/home"
           },500)
           
        }).catch((e)=>{
            console.log("unsuccesfull",e)
            dispatch({type: 'LOADING' , payload:false});
            message.error('Something went wrong')
        });
      
        } catch (error) {
        console.log('catch block',error);
    }
     
} 

export const userRegister = (reqObj) => async dispatch=>{
    
    dispatch({type: 'LOADING' , payload:true})
    
    try {
        const response = await axios.post('/api/users/register', reqObj); 
        message.success('Registration Successfull')
        setTimeout(()=>{
            window.location.href='/login';
        },500);
        dispatch({type: 'LOADING' , payload:false});  
        
    } catch (error) {
        console.log('catch block',error);  
        dispatch({type: 'LOADING' , payload:false});
        message.error('Something went wrong')
    }

} 

export const checkUser = (reqObj) => async dispatch => {
    dispatch({type: 'LOADING', payload:true});

    try {
        await axios.get('/api/users/user',reqObj,{ withCredentials: true }).then((res)=>{
            console.log('getuser response data:',res.data.currentUser);
            localStorage.setItem('jwt',JSON.stringify(res.data.currentUser));
            dispatch({type: 'CHECK_USER',payload:res.data.currentUser});
        });

    } catch (error) {
        console.log('check user action catch block',error);
        dispatch({type: 'LOADING' , payload:false})
    }
}
