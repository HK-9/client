import axios from 'axios'
import {message} from 'antd'

export const bookCar =(reqObj)=>async dispatch=>{
    dispatch({type: 'LOADING' , payload:true})

try {
    const response = await axios.post('/api/bookings/bookcar',reqObj);
    dispatch({type: 'LOADING' , payload:false});  
    message.success('Your car booked successfully');
} catch (error) {
    console.log('catch block @bookingActions',error);
    dispatch({type: 'LOADING' , payload:false});
    message.error('OOPS, Something went wrong, please try later')
    }
}   