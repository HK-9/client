import React from 'react'
import {Row,Col,Divider,DatePicker, Checkbox, Button, Switch} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCars } from '../../redux/actions/carsActions';
import DefaultLayout from '../../components/DefaultLayout/DefaultLayout';
import { useEffect, useState } from 'react';
import {Spinner,NavBar} from '../../components/index'
import { Spin } from 'antd';
import './bookingcar.css'
import moment from 'moment'
import { bookCar } from '../../redux/actions/bookingActions';
const {RangePicker} = DatePicker;



function BookingCar({match}) { 
  const user = localStorage.getItem('user');
  const {cars} = useSelector(state=>state.carsReducer);
  const {loading} = useSelector(state=>state.alertsReducer);
  console.log('loading::',loading);
  const [car, setCar] = useState({});
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const dispatch = useDispatch();
  const  {id}  = useParams();
  // console.log(id);
  useEffect(()=>{
    dispatch(getAllCars())
  },[])
  
  useEffect(()=>{

     if(cars.length>0){
      setCar(cars.find(o=>o._id===id))
     }
     
  },[cars])

  useEffect(()=>{
    setTotalAmount(totalHours * car.rentPerHour);
    console.log(totalHours);
    if(driver){
      setTotalAmount(totalAmount + (30 * totalHours)); 
    }

  },[driver, totalHours])
    //================= F U N C T I O N S =================
  
    //time slotes(datepicker)  
  function selectTimeSlotes(values){
    console.log();
    console.log(moment(values[1].$d).format('MMM DD yyyy hh:mm'));
    setFrom(moment(values[0].$d).format('MMM DD yyyy hh:mm'));
    setTo(moment(values[1].$d).format('MMM DD yyyy hh:mm'));
    setTotalHours(values[1].diff(values[0], 'hours'))
  }

  //booknow button
  function bookNow(){
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.data.user._id;
    const transactionId = 1234;
    const reqObj ={
      user : userId,
      car : car._id,
      totalHours,
      totalAmount,
      transactionId,
      driverRequired :  driver,
      bookedTimeSlots : {
        from,
        to
      }
    }
    
    dispatch(bookCar(reqObj));
  }

  return ( 
    <div>
      {user? <DefaultLayout /> : <NavBar/> }
      {loading === true  && <Spinner/>}
      <Row justify='center' className='d-flex align-items-center' style={{minHeight:'90vh'}}>
        <Col lg={10} sm={24} xs={24}>
      <img src={car.image} className="carimg2 bs1" alt="carimage" />
        </Col>
        <Col lg={10} sm={24} xs={24} className='text-right'>
          <Divider className='fw-bold' dashed >Car Info</Divider>
          <div style={{textAlign: 'right'}} className='fs-6'>
            <p className='' style={{textTransform:'capitalize'}}>{car.name}</p>
            <p >Fuel Type: {car.fuelType}</p>
            <p >Max Persons: {car.capacity}</p>
          <Divider className='fw-bold' dashed>Select Time Slots</Divider>
            <RangePicker showTime={{format: 'HH:mm'}} format='MMM DD YYYY hh:mm' onChange={selectTimeSlotes}/>
             <div>
              <p>Total hours: {totalHours}</p>
            <p>Rent/hr: {car.rentPerHour}</p>
            <Checkbox onChange={(e)=>{
              if(e.target.checked){
                setDriver(true);
              }else{
                setDriver(false); 
              }
              // e.target.checked ? setDriver(true) : setDriver(false);

            }}> <p>driver required</p> </Checkbox>
             <h3> Total Amount : {totalAmount} </h3>
             <Button style={{backgroundColor:'orange',color:'white',width:'40%'}} onClick={bookNow}> <b>Book Now </b>  </Button>
             </div>
             
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default BookingCar

