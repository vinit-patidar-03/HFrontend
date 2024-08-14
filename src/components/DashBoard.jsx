import React, { useEffect, useState } from 'react'
import CreateUser from './CreateUser'
import axios from 'axios';
import TableUsers from './TableUsers';
import CreateClassRoom from './CreateClassRoom';
import ClassRoomTable from './ClassRoomTable';
import ClassRoom from '../pages/ClassRoom';

const DashBoard = ({ user }) => {
    const [status, setStatus] = useState(false);
    const [roomStatus, setRoomStatus] = useState(false);
    const [allTeachers, setAllTeachers] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        if (user?.role === "P") {
            fetchUsers();
            getRooms();
        }
    }, [user])


    const fetchUsers = async () => {
        try {
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
        } catch (error) {
            throw new Error("Internal Server Error");
        }

    }

    const getRooms = async () => {
        try {
            const res = await axios.get("https://h-backend-three.vercel.app/api/v1/getRooms", {
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem("HeliverseToken")
                }
            })
            if (res.data.success) {
                setRooms(res.data.rooms);
            }
        } catch (error) {
            throw new Error("Internal Server Error");
        }

    }

    return (
        <>
            <div className='flex gap-3 my-3 mx-3'>
                {user?.role === "P" &&
                    <button className='p-2 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-400 transition-all hover:transition-all' onClick={() => setRoomStatus(prev => !prev)}>Create Classroom</button>
                }
                {(user?.role === "P" || user?.role === "T") &&
                    <button className='p-2 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-400 transition-all hover:transition-all' onClick={() => setStatus(prev => !prev)}>{user.role === "P" ? "Create User" : "Create Student"}</button>
                }
            </div>
            {status && <CreateUser setStatus={setStatus} user={user} setAllStudents={setAllStudents} setAllTeachers={setAllTeachers} />}
            {user?.role === "P" &&
                <div>
                    <div>{rooms.length > 0 && <ClassRoomTable type={"ClassRooms"} rooms={rooms} />}</div>
                    <div>{allTeachers.length > 0 && <TableUsers type={"Teachers"} users={allTeachers} setAllTeachers={setAllTeachers} setRooms={setRooms} />}</div>
                    <div>{allStudents.length > 0 && <TableUsers type={"Students"} users={allStudents} setAllStudents={setAllStudents} />}</div>
                    <div>{roomStatus && <CreateClassRoom setRoomStatus={setRoomStatus} setRooms={setRooms} />}</div>
                </div>
            }
            {user?.role === "T" &&
                <ClassRoom />
            }
            {
                user?.role === "S" &&
                <ClassRoom />
            }
        </>
    )
}

export default DashBoard