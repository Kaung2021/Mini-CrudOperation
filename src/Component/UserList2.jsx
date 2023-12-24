/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';

const UserList2 = () => {
    //  useState is for create state variables for managing State
     const [users,setUsers] = useState([]);
     const [visible,setVisible] = useState(false);
     const [form] = Form.useForm();
    //  useEffect to fetch data from users when the components mount
     useEffect(()=>{
        const storedUsers=JSON.parse(localStorage.getItem('users')||[]);
        setUsers(storedUsers)
     },[])
    //   this is for open modal
     const showModal = ()=>{
         setVisible(true)
     }
    //  start creating the adding and deleteing input
     const addUsers = (user)=>{
        const newUsers = [...users,{...user,id:Date.now()}];
        //update the user
         setUsers(newUsers);
        localStorage.setItem('users',JSON.stringify(newUsers))
     }
      const handleDelete = (userid) => {
        const fileterUsers = users.filter((user)=>user.id!==userid);
            setUsers(fileterUsers);
            localStorage.setItem('users',JSON.stringify (fileterUsers))
      }
    //  create a datas as a  columns 
     const columns = [
        {
            title:"Name",
            dataIndex:"name",
            key:'name'
        },
        {
            title:"Email",
            dataIndex:"email",
            key:'email'
        },
        {
            title:"Action",
            dataIndex:"action",
            render:(text,record)=>(
                <Button type='primary' danger onClick={()=>handleDelete(record.id)}><DeleteOutlined/></Button>
            )
        },
     ];
    //  function to handle Ok when the button was successfully clicked
     const handleOK = ()=>{
         form.validateFields().then((values)=>{
            form.resetFields();
            setVisible(false);
            addUsers(values)
         }).catch((errorInfo)=>{
            console.log('Valifation Fields : ',errorInfo)
         })
     }
    //  function to handle cancel when the button was clicked to cancel
     const handleCancel = ()=>{
        form.resetFields();
        setVisible(false)
     }
    return (
        <div>
            <Button onClick={showModal} type='primary'>Add Users</Button>
            <Table dataSource={users} columns={columns} />
             <Modal title="Basic Modal" visible={visible} onOk={handleOK} onCancel={handleCancel}>
                    {/* Form Validation */}
                     <Form form={form} layout='vetical'>
                        <Form.Item name='name' label="Name" rules={[{required:true,message:'Please enter your name'}]}>
                        <Input/>
                        </Form.Item>
                        <Form.Item name='email' label="Email" rules={
                            [{required:true,message:'Please enter your name'},
                            {type:'email',message:'Please enter a valid email'}]
                         
                            }>
                        <Input/>
                        </Form.Item>
                     </Form>
             </Modal>           
        </div>
    );
}

export default UserList2;
