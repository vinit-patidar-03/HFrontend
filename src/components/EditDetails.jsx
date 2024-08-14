import axios from 'axios';
import React, { useContext, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { Context } from '../context/AppContext';
import toast from 'react-hot-toast';

const EditDetails = ({ edituser, setEditUser, setAllStudents, setAllTeachers }) => {
    const [userDetails, setUserDetails] = useState({ ...edituser, password: "" });
    const { user } = useContext(Context);

    const handleChange = (e) => setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`https://h-backend-three.vercel.app/api/v1/updateUser/${edituser._id}`, userDetails);
            if (res.data.success) {
                setEditUser(null);
                if (res.data.user.role === "T") {
                    setAllTeachers(prev => prev.map(user => user._id === res.data.user._id ? res.data.user : user));
                } else {
                    setAllStudents(prev => prev.map(user => user._id === res.data.user._id ? res.data.user : user));
                }
                toast.success("User Updated Successfully");
            }
        }
        catch (err) {
            toast.error("Internal Server Error");
        }
    }
    return (
        <>
            <div className='w-[100vw] h-[100vh] z-10 absolute top-0 flex items-center backdrop-blur-[1px]'>
                <form className="w-[400px] mx-auto bg-white shadow-[0_0px_2px_1px_rgba(0,0,0,0.3)] p-10 relative rounded-md" onSubmit={handleSubmit}>
                    <button className=' absolute top-2 right-2' onClick={() => setEditUser(null)}><RxCross2 className='text-red-500 text-2xl' /></button>
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 dark:text-white mt-2 mb-5">{user.role === "P" ? "Update User Details" : "Update Student Details"}</h1>
                    <div className="mb-5">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John doe" value={userDetails.name} required autoComplete='off' onChange={handleChange} name='name' />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" value={userDetails.email} required autoComplete='off' onChange={handleChange} name='email' />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required autoComplete='off' value={userDetails.password} placeholder='••••••••' onChange={handleChange} name='password' />
                    </div>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                </form>
            </div>
        </>
    )
}

export default EditDetails