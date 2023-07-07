import React, { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { axiosAPI } from '../config/axios.interceptors'
import { useNavigate } from 'react-router-dom'





const Createcategory = () => {
const [loading, setLoading] = useState(false)
const navigate = useNavigate()






  function onSubmit(data) {
    setLoading(true)
    axiosAPI
      .post("api/categories", data)
      .then(res => {
        message.success('Category added successfull!')
        navigate('/categories', {replace: true})
      })
      .catch(err => {
      message.error("Error , place try again !")
      })
      .finally(() => {
      setLoading(false)
    })
  }





  return (
    <div>
      <h1 className='heading'>Create category</h1>

      <Form layout='vertical' onFinish={onSubmit}>
        <Form.Item label="Enter category name "  name='name'>
          <Input required/>
        </Form.Item>
        <Button  htmlType='submit' type='primary' className='bg-blue-500'>Submit</Button>


      </Form>
    </div>
  )
}

export default Createcategory