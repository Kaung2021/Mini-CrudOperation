/* eslint-disable no-unused-vars */
import { Button, Form, Table,Modal, Input } from 'antd';
import React, { useEffect, useState } from 'react';

const UserList = () => {
     const [users,setUsers] = useState([]);
     const [visible,setVisible] = useState(false);
     const [form] = Form.useForm();
    //  useEffect
     useEffect(()=>{
        const storedUsers = JSON.parse(localStorage.getItem('users'))||[];
         setUsers(storedUsers)
     },[])
    //  showModal
     const showModal = ()=>{
        setVisible(true)
     };
    //  handleOk is the main key of whole procession
     const handleOk =()=>{
        form.validateFields().then((values)=>{
            form.resetFields();
            setVisible(false);
            addNewUser(values)
        }).catch((errorInfo)=>{
            console.log('Validation failed : ',errorInfo)
        })
     };
      const handleCancel = ()=>{
        form.resetFields();
        setVisible(false)
      };
       const handleDelete = (userID)=>{
         const filteredUsers = users.filter((user)=>user.id!==userID);
         setUsers(filteredUsers);
         localStorage.setItem('users',JSON.stringify(filteredUsers))
       }
    //   create columns
     const columns = [
        {
            title:"Name",
            dataIndex:"name",
            key:"name"
        },
        {
            title:"Email",
            dataIndex:"email",
            key:"email"
        },
        {
            title:'Action',
            key:'action',
            render:(text,record)=>(
                <Button type='link' danger onClick={()=>handleDelete(record.id)}>
                    Delete
                </Button>
            )
        }

     ];

    //  this is about Addition
     const addNewUser = (user)=>{
        const newUsers = [...users,{...user,id:Date.now()}];
        // update the Users 
         setUsers(newUsers);
         localStorage.setItem('users',JSON.stringify(newUsers))
     }
    return (
        <div>
            <Button type='primary' onClick={showModal}>ADD USER</Button>
             <Table dataSource={users} columns={columns} rowKey='id'/>
             {/* create a modal */}
             <Modal title="Basic Modal" visible={visible} onOk={handleOk} onCancel={handleCancel}>
     
      {/* start creating a form validation */}
 <Form form={form} layout='vertical'>
 <Form.Item name="name" label="Name" rules={[{required:true,message:'Please enter the name'}]}>
<Input/>
 </Form.Item>
 <Form.Item name="email" label="Email" rules={[{required:true,message:'Please enter the email'},{
     type:'email',message:'Please enter a valid email'
    }]}>
<Input/>
 </Form.Item>
       </Form>
     </Modal>
        </div>
    );
}

export default UserList;
