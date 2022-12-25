import React from 'react';
import{useEffect,useState} from 'react';
import {Row,Col, DatePicker, ConfigProvider,Button} from 'antd';
import {DefaultLayout, Cartypetab} from '../../components/index';
import {Link} from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux';
import { getAllCars } from '../../redux/actions/carsActions';
import {Spinner} from '../../components/index';
import './home.css';
import NavBar from '../../components/NavBar/NavBar';
import moment from 'moment';
const {RangePicker} = DatePicker;

// import classes from './home.module.css';
function Home() {
  const {cars} = useSelector(state=>state.carsReducer);
  const {loading} = useSelector(state=>state.alertsReducer);
  const user = localStorage.getItem('user');
  const [totalCars,setTotalCars] = useState([]);
  const dispatch = useDispatch();




  useEffect(()=>{
    dispatch(getAllCars());
  },[])

  useEffect(()=>{
    setTotalCars(cars);
  },[cars])

  function setFilter(values){

    let selectedFrom = moment(values[0].$d,'MMM DD yyyy hh:mm');
    let selectedTo = moment(values[1].$d, 'MMM DD yyyy hh:mm');  

    let temp = [];

    for(var car of cars){

      if(car.bookedTimeSlotes.length === 0){ 
        temp.push(car);        
      }
      else{
        for(var booking of car.bookedTimeSlotes){
          if(selectedFrom.isBetween(booking.from , booking.to) ||
            selectedTo.isBetween(booking.from , booking.to) ||
            moment(booking.from).isBetween(selectedFrom , selectedTo) ||
            moment(booking.to).isBetween(selectedFrom , selectedTo)

          ){ }else{
            temp.push(cars);
          }
        }
      }
    }
      setTotalCars(temp);
  }

    return (
  <>
    {user? <DefaultLayout /> : <NavBar/> }
      <Row cla justify='center'  className='sub_header_row ' style={{}}>
        <Col style={{}} lg={12} sm={24} className='d-flex justify-content-center'>
          <div className=' ms-5'>
 
        <Cartypetab />
          </div>
        </Col>
        <Col style={{}} lg={12} sm={24}  className='d-flex justify-content-center'>
          <div className='mt-5'>
          <RangePicker className='rangepicker bs1' style={{ border:'3px solid orange',color:'black'}} showTime={{format: 'HH:mm'}} format='MMM DD YYYY HH:mm' onChange={setFilter} />
          </div>
        </Col>
      </Row>

       {loading == true && (<Spinner />)}
    <Row justify='center' className=''>
      
      {totalCars.map(car=>{
        return  <Col lg={5} sm={24} xs={24} className='mx-3'>
            <div className='cars p-2 bs1 mt-3'>
              <img src={car.image} className='carimg' alt="carimage" />
              <div className='car-content d-flex align-items-center justify-content-between' id='push'>
                  <div>
                    <p className='car-txt'>{car.name}</p>
                    <p className='rent-txt'>{car.rentPerHour} Rent Per Hour /-</p>
                  </div>
                  <div>
                  <button class="bn632-hover bn19"><Link to={`/booking/${car._id}`}><span className='bookNow-txt'>Book Now</span></Link></button>
                  </div>                  
              </div>
            </div>
          </Col> 

      })}
    </Row>
  </> 
  )
}

export default Home;