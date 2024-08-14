import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { RxCross2 } from 'react-icons/rx'

const AssignRoom = ({ allusers, setStatus, role, id, setRoomDetails, setAllTeachers, setRoomStudents }) => {
    const handleAssign = async (userId) => {
        setStatus(prev => !prev);
        try {
            const res = await axios.put(`https://h-backend-three.vercel.app/api/v1/assignUser`, { userId, id })
            if (res.data.success) {
                if (role === "T") {
                    setRoomDetails(prev => ({ ...prev, teacher: res.data.user }))
                    setAllTeachers(prev => prev.filter(teacher => teacher._id !== res.data.user._id))
                } else {
                    setRoomStudents(prev => [...prev, res.data.user])
                }
                toast.success("ClassRoom  Assigned Successfully");
            }
        } catch (err) {
            toast.error("Internal Server Error");
        }
    }
    return (
        <>
            <div className='w-[100vw] h-[100vh] absolute top-0 flex justify-center items-center backdrop-blur-[1px]'>
                <div className='bg-white shadow-[0_0px_3px_rgba(0,0,0,0.3)] w-[300px] p-2 relative'>
                    <button className=' absolute top-2 right-2' onClick={() => setStatus(prev => !prev)}><RxCross2 className='text-red-500 text-2xl' /></button>
                    {
                        allusers.map(user => (
                            <div key={user._id} className='flex gap-2 items-center mb-2 cursor-pointer' onClick={() => handleAssign(user._id)}>
                                <img className='h-8' src={user.picture} alt="img" />
                                <h2>{user.name}</h2>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default AssignRoom