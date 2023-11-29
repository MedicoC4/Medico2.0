import React, { useState } from 'react'
import OrderList from './OrderList.jsx'
import OrderGrid from './OrderGrid.jsx'

const Orders = () => {
  const [velInput,setValInput] = useState("")
  return (
    <div>
      
       <OrderList/> 
    </div>
  )
}

export default Orders