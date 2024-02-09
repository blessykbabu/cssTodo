import axios from 'axios';
import React, { useState } from 'react'
import Body from '../Body/Body';

const Input = () => {
    const [load,setLoad]=useState(0)
    const [tasks,setTasks]=useState({
        "task":"",
        "date":"",
        "status":false
    })
    const handleChange=(e)=>{
        console.log(e.target.name);
        setTasks((pre)=>{
            return {...pre,[e.target.name]:e.target.value}
        })            
    }
    const submit=async()=>{
        console.log('clicked');
        console.log(tasks);
        const res=await axios.post('http://localhost:3003/api/add',tasks)
        if(res.status==201){
            alert('added')
            setLoad(load+1)
        }
    }
  return (
    <div className='border-b-[4px] '> 
    <div className="my-5 flex justify-center items-center head text-blue-500 text-[40px] font-[bold] underline">
    <svg className="w-10 rounded-md h-10 me-2 text-white bg-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 12 4.7 4.5 9.3-9"/>
  </svg>
        <h1 >My Todo-s</h1>
    </div>
    <div className="w-[90%] px-5 mx-auto border-[2px] py-5 my-5 flex justify-between items-center text-blue-500 ">
    <input name='task' onChange={handleChange} type="text" className='w-[70%] h-[40px] outline-none' placeholder='Add task name'/>
    <div>
    <input name='date' onChange={handleChange} className='mx-4' type="date"/>
    <button onClick={submit} className='bg-blue-500 text-white py-2 rounded-xl px-3'>Add</button>
    </div>
    </div>
    <div className='w-[80%] mx-auto my-10'>

    <Body reload={load}/>
    </div>
    </div>
    
  )
}

export default Input
