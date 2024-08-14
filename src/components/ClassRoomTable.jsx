import React from 'react'
import { useNavigate } from 'react-router-dom';

const ClassRoomTable = ({ type, rooms }) => {

    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/classroom/${id}`)
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
                                start time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                end time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                teacher
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rooms.map(user => (
                                <tr className="odd:bg-white odd:dark:bg-gray-900 text-center even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700  cursor-pointer hover:bg-gray-200" key={user._id} onClick={() => handleClick(user._id)}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.startTime}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.endTime}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.teacher ? user.teacher.name : "NA"}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ClassRoomTable