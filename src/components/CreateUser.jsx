import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx";

const CreateUser = ({ setStatus, user, setAllStudents, setAllTeachers }) => {
    const [userDetails, setUserDetails] = useState({ name: "", email: "", password: "", role: "S" });

    const handleChange = (e) => setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://h-backend-three.vercel.app/api/v1/create", userDetails);
            if (res.data.success) {
                setStatus(prev => !prev);
                if (user.role === "P") {
                    if (res.data.user.role === "T") {
                        setAllTeachers(prev => [...prev, res.data.user]);
                    } else {
                        setAllStudents(prev => [...prev, res.data.user]);
                    }
                } else {
                    setAllStudents(prev => [...prev, res.data.user]);
                }
                toast.success("User Created Successfully");
            }
        } catch (err) {
            toast.success("Internal Server Error");
        }

    }
    return (
        <>
            <div className='w-[100vw] h-[100vh] z-10 absolute top-0 flex items-center backdrop-blur-[1px]'>
                <form className="w-[400px] mx-auto bg-white shadow-[0_0px_2px_1px_rgba(0,0,0,0.3)] p-10 relative rounded-md" onSubmit={handleSubmit}>
                    <button className=' absolute top-2 right-2' onClick={() => setStatus(prev => !prev)}><RxCross2 className='text-red-500 text-2xl' /></button>
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 dark:text-white mt-2 mb-5">{user.role === "P" ? "Create User" : "Create Student"}</h1>
                    <div className="mb-5">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John doe" required autoComplete='off' onChange={handleChange} name='name' />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required autoComplete='off' onChange={handleChange} name='email' />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required autoComplete='off' placeholder='••••••••' onChange={handleChange} name='password' />
                    </div>

                    {user.role === "P" && <div className='flex gap-3 items-center mb-5'>
                        <div className="flex items-center">
                            <input id="default-radio-1" type="radio" value="T" name="role" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} required />
                            <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Teacher</label>
                        </div>
                        <div className="flex items-center">
                            <input id="default-radio-2" type="radio" value="S" name="role" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} required />
                            <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Student</label>
                        </div>
                    </div>}
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </>
    )
}

export default CreateUser