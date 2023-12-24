/* eslint-disable no-unused-vars */
import React,{useState} from 'react';
import { Button } from 'antd';
import UserLIst3 from './UserLIst3';
import { PlusCircleOutlined } from '@ant-design/icons';
const AppUser = () => {
    const [visible,setVisible] = useState(false);
    //    This is for modal open or cancel
    const showModal = ()=>{
     setVisible(true)}
    return (
        <div>
            <div>
         
         <header className='Heading'>
           <h1 className='heading1'>CRUD Operation by <b>React</b></h1>
           <div className="button-container">
          <Button type='primary' onClick={showModal} className='button'>ADD USER<PlusCircleOutlined /> </Button>
           </div>
         </header>
          <main>
            <UserLIst3 showModal={showModal} setVisible={setVisible} visible={visible}/>
          </main>
         </div>
        </div>
    );
}

export default AppUser;
