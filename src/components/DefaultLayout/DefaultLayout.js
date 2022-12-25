import React from 'react';
import logo1 from '../../assets/logo1.png';
import './defaultlayout.css'
import { Button, Dropdown, Space, Row, Col } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import{Person} from 'react-bootstrap-icons'
import { useState } from 'react';
import axios from 'axios';

function DefaultLayout(props){
    const [data,setData] = useState(null);

    //-----logout-----
    const logoutCall = async () => {
      try {
        const response = await axios.get('/api/users/logout')
        setData(response.data);
      } catch (error) {
        
      }
    }

    const user = JSON.parse(localStorage.getItem('user'));
    console.log('userrrrrr',user.data.user);
    const username = user.data.user.username;
    let items = [
        {
          key: '1',
          label: (
            <a href="">
              Home
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a href="">
              Bookings
            </a>
          ),

        },
        {
          key: '3',
          label: (
            <a href="">
              Profile
            </a>
          ),
        },{
            
            key: '3',
            label: (
                <li onClick={()=>{
                  localStorage.removeItem('user');
                  logoutCall();
                  window.location.href='/login';
                }}>Logout</li>
            ),
          }
    ];
    return(
        <>
            <div className='header bs1'>
              <Row gutter={16}>
                <Col  lg={20} sm={24} xs={24}>
                <div className='d-flex justify-content-between'>
                <div className='retx__nabar-logo'>
                <img className='navbar_logo' src={logo1} alt="logo" />
                </div>
                <div className='rentx__navbar-links_container'>
                    {/* <p><a href="#Home">Home</a></p> */}
                </div>

                <div className='rentx__navbar-user'>
                <Space direction="vertical">
                    <Space wrap>
                    <Dropdown 
                        menu={{
                        items,
                        }}
                        placement="bottom"
                    >
                        <Button className='navbar_user_btn p-0 m-0'><Person className='ml-4 mr-2 mt-2'/> <span className="mt-1 mr-2 ">{username}</span></Button>
                    </Dropdown>
                    </Space>
                </Space>
                </div>
               </div>
                </Col>
              </Row>
              
            </div>
            <div className='content'>
                {props.childern}
            </div>
        </>
    )
}

export default DefaultLayout;