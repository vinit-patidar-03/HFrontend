import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import EditDetails from './EditDetails';
import { useLocation } from 'react-router-dom';
import { Context } from '../context/AppContext';
import toast from 'react-hot-toast';

const TableUsers = ({ type, users, setAllTeachers, setAllStudents, setRooms }) => {
    const [editUser, setEditUser] = useState(null);
    const { user } = useContext(Context)
    const location = useLocation();

    useEffect(() => {
    }, [location])


    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`https://h-backend-three.vercel.app/api/v1/deleteUser/${id}`)
            if (res.data.success) {
                if (type === "Teachers") {
                    setAllTeachers(prev => prev.filter(user => user._id !== id));
                    setRooms(prev => prev.map(room => room.teacher?._id === id ? { ...room, teacher: null } : room));
                } else {
                    setAllStudents(prev => prev.filter(user => user._id !== id));
                }
                toast.success("User Deleted Successfully");
            }
        } catch (error) {
            toast.error("Internal Server Error");
        }

    }

    const handleRemove = async (elem) => {
        try {
            const res = await axios.put(`https://h-backend-three.vercel.app/api/v1/removeUser`, { userId: elem._id, id: elem?.classRoom })
            if (res.data.success) {
                setAllStudents(prev => prev.filter(student => student._id !== elem._id));
                toast.success("User Removed Successfully")
            }
        } catch (error) {
            toast.error("Internal Server Error");
        }

    }

    return (
        <>
            <div className="relative overflow-x-auto shadow-[0_0px_3px_rgba(0,0,0,0.2)] rounded-lg mx-3 my-2 bg-sky-500">
                <h2 className='font-bold text-white pl-2'>{type}</h2>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                email
                            </th>
                            {
                                (user.role === "P" && location.pathname === "/") &&
                                <th scope="col" className="px-6 py-3">
                                    classroom
                                </th>
                            }
                            {user.role !== "S" &&
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {user &&
                            users.map(elem => (
                                <tr className="odd:bg-white odd:dark:bg-gray-900 text-center even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={elem._id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {elem.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {elem.email}
                                    </td>
                                    {
                                        (user.role === "P" && location.pathname === "/") &&
                                        <td className="px-6 py-4">
                                            {elem.classRoom && elem.classRoom.name}
                                            {!elem.classRoom && "NA"}
                                        </td>
                                    }
                                    {user.role !== "S" &&
                                        <td className="px-6 py-4 flex gap-3 justify-center">
                                            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => setEditUser(elem)}>Edit</button>
                                            <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => { (location.pathname === "/" && user.role === "P") ? handleDelete(elem._id) : handleRemove(elem) }}>{(location.pathname === "/" && user.role === "P") ? "Delete" : "Remove"}</button>
                                        </td>
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {editUser && <EditDetails edituser={editUser} setEditUser={setEditUser} setAllStudents={setAllStudents} setAllTeachers={setAllTeachers} />}
        </>
    )
}

export default TableUsers