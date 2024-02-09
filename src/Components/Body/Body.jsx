import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Body = ({reload}) => {
    const [togle,setTogle]=useState(false)
    const [data,setData]=useState([])
    const [count,setCount]=useState(0)
    const [editId,setEditId]=useState('')
    const [newData,setNewData]=useState({
        "task":"",
        "date":"",
        "status":false
    })
    const getData=async()=>{
        const res=await axios.get('http://localhost:3003/api/get')
        console.log(res.data);
        setData(res.data)
    }
    const deleteTask=async(id)=>{
        const res = await axios.delete(`http://localhost:3003/api/remove/${id}`)
        if(res.status==200){
            setCount(count+1)
        }
    }
    const editTask=async(id)=>{
        console.log(id);
        setEditId(id)
        setTogle(true)
    }
    const submit=async()=>{
        console.log(editId);
        console.log(newData);
        const res=await axios.patch(`http://localhost:3003/api/edit/${editId}`,newData)
        if(res.status==200){
            setTogle(false)
            setCount(count+1)
        }
    }
    const handleChange=(e)=>{
        setNewData((pre)=>{
            return {...pre,[e.target.name]:e.target.value}
        })
    }
    useEffect(()=>{
        getData()
    },[reload,count])
  return (
    <>
    <div className='relative'>



<div className={`${!togle?'hidden':'flex'} w-full justify-between`}>
    <input name='task' onChange={handleChange}  type="text" className='w-[70%] h-[40px] outline-none' placeholder='Update here...'required/>
    <div>
    <input name='date' onChange={handleChange}   className='mx-4' type="date" required/>
    <button onClick={()=>submit()} className='bg-blue-500 text-white py-2 rounded-xl px-3'>Submit</button>
    </div>
    </div>

        
    <div className='flex justify-end my-3'>
    <span className='me-2'>Filter</span>
    <select name="" id="">
        <option>All</option>
        <option>Completed</option>
        <option>Active</option>
        <option>Has due date</option>


    </select>
    <span className='me-2 ms-5'>Sort</span>
    <select name="" id="">
        <option>All</option>
    </select>
    </div>
    <div>
    {
        data.map((dt)=>{
            return <div key={dt._id} className='flex justify-between'>
            <div className='flex gap-4'>
            <input type="checkbox" />
            <h3>{dt.task}</h3>
            </div>
            <div className='flex gap-4'> 
            <button onClick={()=>editTask(dt._id)}><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M14 4.2a4.1 4.1 0 0 1 5.8 0 4 4 0 0 1 0 5.7l-1.3 1.3-5.8-5.7L14 4.2Zm-2.7 2.7-5.1 5.2 2.2 2.2 5-5.2-2.1-2.2ZM5 14l-2 5.8c0 .3 0 .7.3 1 .3.3.7.4 1 .2l6-1.9L5 13.8Zm7 4 5-5.2-2.1-2.2-5.1 5.2 2.2 2.1Z" clipRule="evenodd"/>
  </svg>edite
  </button>
            <button onClick={()=>deleteTask(dt._id)}><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
  </svg>delete</button>
            </div>
          </div>
        })
    }
    </div>

    </div>
    </>
  )
}

export default Body
