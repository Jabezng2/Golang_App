import React, { useState, useEffect } from 'react'
import { API_URL } from '../../config';
import TaskCard from './TaskCard';
import axios from "axios"
import { Link, useSearchParams, useNavigate } from "react-router-dom";

export default function TaskList() {
    const [tasks, setTasks] = useState([])
    const [pages, setPages] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams();
    let navigate = useNavigate();

    const openModal = () => {
        document.getElementById('new-modal').classList.remove("hidden");
    }
    const closeModal = () => {
        document.getElementById('new-modal').classList.add("hidden");
    }

    // Pagination
    const fetchData = async () => {
        const page = searchParams.get("page") ? "&page=" + searchParams.get("page") : '';
        try {
            const response = await fetch(`${API_URL}/tasks?sort=id&size=5${page}`); // sort in ascending order
            const json = await response.json();
            setTasks(json.data.items);
            setPages(json.data.total_pages)
        } catch (error) {
            console.log("error", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [searchParams]);

    const completeForm = (form) => {
        closeModal()
        form.reset()
        fetchData();
        navigate("/")
    }

    const storeTask = (e) => {
        e.preventDefault()
        let form = document.getElementById('newform');
        let formData = new FormData(form);
        axios.post(`${API_URL}/tasks`, formData)
            .then(res => completeForm(form))
            .catch(error => console.log(error.response))
    }

    let myPage = searchParams.get("page") ? searchParams.get("page") : 0;
    console.log('mypage:', myPage)
    return (
        <div className="">
            <div className="flex justify-center">
                <div className="lg:w-1/3 w-full">
                    <div className="p-10">
                        <div className="mb-10 flex items-center justify-between">
                            <h1 className="font-bold">Jabez Task Manager</h1>
                            <button className="bg-blue-700 text-white px-3 py-1.5 rounded" onClick={openModal}>Add Task</button>
                        </div>
                        <div className="">
                            {tasks.length > 0 ? tasks.map((task, key) => <TaskCard key={key} task={task} fetchData={fetchData} />) : ''}
                        </div>

                        <div className="mt-10">
                            {Array.from({ length: pages }, (_, index) => index + 1).map((pg, key) =>
                                <Link className={`border px-3 py-1 mr-3 ${myPage == key ? 'bg-blue-600 text-blue-100' : ''}`} to={`?page=${key}`} key={key}>{key + 1}</Link>)}
                        </div>

                        {/* Start modal */}
                        <div className="relative z-10 hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true" id="new-modal">
                            <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"></div>

                            <div className="fixed z-10 inset-0 overflow-y-auto">
                                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                                    <div className="relative inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full">
                                        <form id="newform" onSubmit={storeTask} method="post">
                                            <div className="bg-white">
                                                <div className="flex justify-between px-8 py-4 border-b">
                                                    <h1 className="font-medium">Create New Task</h1>
                                                    <button className="bg-red-700 text-white px-3 py-1.5 rounded" type="button" onClick={closeModal}>Close</button>
                                                </div>
                                                <div className="px-8 py-8">
                                                    <div className="mb-5">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                                        <input type="text" name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                                                    </div>
                                                    <div className="mb-5">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                                        <input type="text" name="description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                                                    </div>
                                                    <div className="mb-5">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                                                        <input type="date" name="date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                                                    </div>
                                                    <div className="mb-5">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2">Priority</label>
                                                        <input type="text" name="priority" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                                                    </div>
                                                    <div className="mb-10">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                                                        <input type="text" name="status" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <button className="bg-blue-500 text-white py-1.5 px-4 rounded" type="submit">Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End modal */}
                    </div>
                </div>
            </div>
        </div>

    )
}