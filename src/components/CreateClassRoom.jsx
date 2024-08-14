import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { RxCross2 } from 'react-icons/rx';

const CreateClassRoom = ({ setRoomStatus, setRooms }) => {
    const [roomDetails, setRoomDetails] = useState({ name: "", startTime: "", endTime: "", days: [] });

    const handleChange = (e) => {
        if (e.target.name === 'day') {
            if (e.target.checked) {
                setRoomDetails({ ...roomDetails, days: [...roomDetails.days, e.target.value] });
            } else {
                setRoomDetails({ ...roomDetails, days: roomDetails.days.filter(day => day !== e.target.value) });
            }
        } else {
            setRoomDetails({ ...roomDetails, [e.target.name]: e.target.value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://h-backend-three.vercel.app/api/v1/createRoom", roomDetails);
            if (res.data.success) {
                setRoomStatus(prev => !prev);
                setRooms(prev => [...prev, res.data.room]);
                toast.success("ClassRoom Created Successfully");
            }
        } catch (err) {
            toast.error("Internal Server Error");
        }
    }
    return (
        <>
            <div className='w-[100vw] h-[100vh] absolute top-0 flex justify-center items-center backdrop-blur-[1px]'>
                <form className="mx-auto bg-white shadow-[0_0px_3px_rgba(0,0,0,0.3)] p-5 rounded-md relative" onSubmit={handleSubmit}>
                    <button className=' absolute top-2 right-2' onClick={() => setRoomStatus(prev => !prev)}><RxCross2 className='text-red-500 text-2xl' /></button>
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 dark:text-white mt-2 mb-5">Create Class Room</h1>
                    <div className='mb-2'>
                        <label htmlFor="helper-text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter room name" name='name' onChange={handleChange} value={roomDetails.name} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start time:</label>
                        <div className="flex">
                            <input type="time" id="time" className="rounded-none rounded-s-lg bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="12:00" max="18:00" required onChange={handleChange} name='startTime' value={roomDetails.startTime} />
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-s-0 border-s-0 border-gray-300 rounded-e-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End time:</label>
                        <div className="flex">
                            <input type="time" id="time" className="rounded-none rounded-s-lg bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="12:00" max="18:00" required onChange={handleChange} name='endTime' value={roomDetails.endTime} />
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-s-0 border-s-0 border-gray-300 rounded-e-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div className='flex gap-2 mb-5'>
                        <div className="flex items-center">
                            <input id="default-checkbox" type="checkbox" value="Monday" name='day' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} />
                            <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mon</label>
                        </div>
                        <div className="flex items-center">
                            <input id="checked-checkbox" type="checkbox" value="Tuesday" name='day' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} />
                            <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tue</label>
                        </div>
                        <div className="flex items-center">
                            <input id="checked-checkbox" type="checkbox" value="Wednesday" name='day' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} />
                            <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Wed</label>
                        </div>
                        <div className="flex items-center">
                            <input id="checked-checkbox" type="checkbox" value="Thursday" name='day' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} />
                            <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Thu</label>
                        </div>
                        <div className="flex items-center">
                            <input value="Friday" name='day' id="checked-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} />
                            <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fri</label>
                        </div>
                        <div className="flex items-center">
                            <input value="Saturday" name='day' id="checked-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} />
                            <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sat</label>
                        </div>
                    </div>
                    <button className="text-white block mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
                </form>
            </div>
        </>
    )
}

export default CreateClassRoom