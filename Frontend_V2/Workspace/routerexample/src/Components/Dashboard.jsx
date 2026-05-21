import React from 'react'
import {useParams} from 'react-router-dom'


const Dashboard = () => {
    const { name } = useParams();
  return (
    <div>        
        <h2>Dashboard</h2>
        <h3>Welcome {name} </h3>
    </div>
  )
}

export default Dashboard