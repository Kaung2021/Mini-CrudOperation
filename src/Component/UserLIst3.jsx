/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { DeleteFilled, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Table,Input } from 'antd';
import React, { useEffect, useState } from 'react';

const UserLIst3 = ({showModal,setVisible,visible}) => {
    //  useState is used for storing state management 
     const [users,setUsers] = useState([]);
     const [form] = Form.useForm();
    //  useEffect is used for fetch data from users when the component mounts
     useEffect(()=>{
         const storedUsers = JSON.parse(localStorage.getItem('users'))||[];
         setUsers(storedUsers)
     },[])
   
    //   this is about data sources for table columns
     const columns = [
        {
            title:'Name',
            dataIndex:"name",
            key:'name'
        },
        {
            title:'Email',
            dataIndex:"email",
            key:'email'
        },
        {
            title:'Action',
            dataIndex:"Action",
           render : (text,record)=>(
            <Button type='primary'onClick={()=>handleDelete(record.id)} danger ><DeleteFilled/></Button>
           )
        },
     ];
    //  function to delete the input from users
      const handleDelete=(userid)=>{
         const filterItems = users.filter((user)=>user.id!==userid);
         setUsers(filterItems);
        localStorage.setItem('users',JSON.stringify(filterItems))
      };
    //   function to add input from users
     const addUsers = (user)=>{
         const newItems = [...users,{...user,id:Date.now()}];
         setUsers(newItems);
         localStorage.setItem('users',JSON.stringify(newItems))
     };
    //  This section is about handle Ok and Cancel from the modal 
      const handleOK = ()=>{
          form.validateFields().then((values)=>{
            form.resetFields();
            setVisible(false);
            addUsers(values)
          }).catch((errorInfo)=>{
            console.log("Validation Fields : ",errorInfo)
          })
      }
        const handleCancel = ()=>{
            form.resetFields();
            setVisible(false)
        }
    return (
       
            <div className='container'>
<div className="table-container">

                 <Table dataSource={users} columns={columns} rowKey="id"/>
 </div>
                 <Modal onOk={handleOK} onCancel={handleCancel} visible={visible} title="modal">
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

export default UserLIst3;
