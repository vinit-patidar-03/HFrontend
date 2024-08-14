import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Context } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import AssignRoom from '../components/AssignRoom'
import TableUsers from '../components/TableUsers'
import { RxCross2 } from 'react-icons/rx'
import toast from 'react-hot-toast'

const ClassRoom = () => {
    const { user } = useContext(Context)
    let { id } = useParams()
    const [teacher, setTeacher] = useState(false)
    const [student, setStudent] = useState(false)
    const [roomDetails, setRoomDetails] = useState(null)
    const [allTeachers, setAllTeachers] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [roomStudents, setRoomStudents] = useState([]);

    useEffect(() => {
        if ((localStorage.getItem("HeliverseToken") && user?.role === "P") || user?.classRoom !== null) {
            fetchClassRoom()
            fetchUsers()
        }
    }, [])



    const fetchClassRoom = async () => {
        if (!id) {
            id = user?.classRoom;
        }
        const res = await axios.get(`https://h-backend-three.vercel.app/api/v1/getRoomDetails/${id}`)
        if (res.data.success) {
            setRoomDetails(res.data.room)
            setRoomStudents(res.data.room.students)
        }
    }

    const fetchUsers = async () => {
        const res = await axios.get("https://h-backend-three.vercel.app/api/v1/allusers", {
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem("HeliverseToken")
            }
        })
        if (res.data.success) {
            setAllTeachers(res.data.users.filter(user => user.role === "T"));
            setAllStudents(res.data.users.filter(user => user.role === "S"));
        }
    }

    const handleRemove = async (userId) => {
        try {
            const res = await axios.put(`https://h-backend-three.vercel.app/api/v1/removeUser`, { userId, id: roomDetails._id })
            if (res.data.success) {
                setRoomDetails(prev => ({ ...prev, teacher: null }))
                setAllTeachers(prev => [...prev, res.data.user])
                toast.success("User Removed Successfully")
            }
        } catch (error) {
            toast.error("Internal Server Error");
        }

    }

    const handleTeacher = async () => {
        setAllTeachers(prev => prev.filter(teacher => teacher.classRoom === null))
        setTeacher(prev => !prev)
    }

    const handleStudent = async () => {
        setAllStudents(prev => prev.filter(student => student.classRoom === null))
        setStudent(prev => !prev)
    }

    return (
        <>
            {user.role === "P" && <Navbar user={user} />}
            {(!user?.classRoom && user.role !== "P") && <h1 className='text-center text-2xl mt-5'>You are not assigned to any ClassRoom. Please Contact Principal</h1>}
            {(roomDetails && user) &&
                <div>
                    <div className="bg-white overflow-hidden shadow rounded-lg border mx-3 mt-3">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Room Information
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                This is some information about the Room.
                            </p>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <dl className="sm:divide-y sm:divide-gray-200">
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Room Name
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {roomDetails.name}
                                    </dd>
                                </div>
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Teacher
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {(roomDetails.teacher && user.role === "P") &&
                                            <span className='bg-gray-200 relative'>
                                                <span className='px-5 py-2'>{roomDetails.teacher.name}</span>
                                                <RxCross2 className='absolute top-0 right-0 text-red-500 cursor-pointer' onClick={() => handleRemove(roomDetails.teacher._id)} />
                                            </span>
                                        }
                                        {(!roomDetails.teacher && user?.role === "P") && <button className='p-2 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-400 transition-all hover:transition-all' onClick={handleTeacher}>Assign Teacher</button>
                                        }
                                        {(roomDetails.teacher && user.role !== "P") && roomDetails.teacher.name}
                                        {(!roomDetails.teacher && user.role === "S") && "NA"}
                                    </dd>
                                </div>
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Timings
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {roomDetails.startTime} - {roomDetails.endTime}
                                    </dd>
                                </div>
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Days
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-wrap gap-2">
                                        {roomDetails.days.length > 0 &&
                                            roomDetails.days.map(day => <span key={day} className='p-1 sm:mr-2 bg-gray-200 rounded-lg'>{day}</span>)
                                        }
                                    </dd>
                                </div>
                                {user?.role === "P" &&
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Add Students
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <button className='p-2 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-400 transition-all hover:transition-all' onClick={handleStudent}>Add Student</button>
                                        </dd>
                                    </div>
                                }
                            </dl>
                        </div>
                    </div>
                    {roomStudents?.length > 0 && <TableUsers type='Students' users={roomStudents} setAllStudents={setRoomStudents} setAllTeachers={setAllTeachers} setRoomDetails={setRoomDetails} />}
                </div>
            }
            {teacher && <AssignRoom allusers={allTeachers} setAllTeachers={setAllTeachers} setRoomStudents={setRoomStudents} setStatus={setTeacher} role={"T"} id={id} setRoomDetails={setRoomDetails} />}
            {student && <AssignRoom allusers={allStudents} setAllTeachers={setAllTeachers} setRoomStudents={setRoomStudents} setStatus={setStudent} role={"S"} id={id} setRoomDetails={setRoomDetails} />}
        </>
    )
}

export default ClassRoom