import {Form, Link} from "react-router-dom";
import { API_URL } from "../../config"
import axios from "axios"
import moment from "moment"
import { useState } from 'react'

export default function TaskCard({task, fetchData}) {
    const [nameValue, setNameValue] = useState(task.name);
    const [descriptionValue, setDescriptionValue] = useState(task.description);
    const [dateValue, setDateValue] = useState(moment(task.date).format('YYYY-MM-DD'));
    const [priorityValue, setPriorityValue] = useState(task.priority)
    const [statusValue, setStatusValue] = useState(task.status)

    const openModal = () => {
        document.getElementById('new-modal-' + task.id).classList.remove("hidden")
    }

    const closeModal =  () => {
        document.getElementById('new-modal-' + task.id).classList.add("hidden")
    }

    const completeForm =  ()  => {
        closeModal()
        fetchData() // re-fetch data (update)
    }

    const updateTask = (e) => {
        e.preventDefault()
        var form = document.getElementById(`editform-${task.id}`);
        var formData = new FormData(form);
        axios.patch(`${API_URL}/tasks/${task.id}`, formData)
            .then(res => completeForm())
            .catch(error => console.log(error.response))
    }

    const deleteTask = () => {
        if (window.confirm("Please confirm that you want to delete this task") === true) {
            axios.delete(`${API_URL}/tasks/${task.id}`).then(res =>  fetchData()).catch(error => console.log(error.response))
        }
    }

    return (
        <div className="bg-slate-100 rounded-lg mb-4 p-4 hover:border hover:border-black hover:border-2">
            <div>
                <div>
                    <div className="font-medium">{task.name}</div>
                    <div className="text-slate-400">{task.description}</div>
                </div>
                <div className="text-sm flex space-x-4 mt-4">
                    <Link to={`/taskprofile/${task.id}`}>View</Link>
                    <button onClick={openModal} className="text-blue-600">Edit</button>
                    <button onClick={deleteTask} className="text-red-600">Delete</button>
                </div>
            </div>

            {/* Start Modal */}
            <div className="relative z-10 hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true"
                 id={`new-modal-${task.id}`}>
                <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"></div>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div
                        className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                              aria-hidden="true">&#8203;</span>

                        <div
                            className="relative inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full">
                            <form id={`editform-${task.id}`} onSubmit={updateTask} method="post">
                                <div className="bg-white">
                                    <div className="flex justify-between px-8 py-4 border-b">
                                        <h1 className="font-medium">Update Task</h1>
                                        <button type="button" onClick={closeModal}>Close</button>
                                    </div>
                                    <div className="px-8 py-8">
                                        <div className="mb-5">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                            <input type="text" name="name" value={nameValue}
                                                   onChange={(e) => setNameValue(e.target.value)}
                                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                   required/>
                                        </div>
                                        <div className="mb-5">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                            <input type="text" name="description" value={descriptionValue}
                                                   onChange={(e) => setDescriptionValue(e.target.value)}
                                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                   required/>
                                        </div>
                                        <div className="mb-5">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                                            <input type="date" name="date" value={dateValue}
                                                   onChange={(e) => setDateValue(e.target.value)}
                                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                   required/>
                                        </div>
                                        <div className="mb-5">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Priority</label>
                                            <input type="text" name="priority" value={priorityValue}
                                                   onChange={(e) => setPriorityValue(e.target.value)}
                                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                   required/>
                                        </div>
                                        <div className="mb-10">
                                            <label
                                                className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                                            <input type="text" name="status" value={statusValue}
                                                   onChange={(e) => setStatusValue(e.target.value)}
                                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                   required/>
                                        </div>
                                        <div className="flex justify-end">
                                            <button className="bg-blue-500 text-white py-1.5 px-4 rounded"
                                                    type="submit">Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Modal */}
        </div>
    )
}