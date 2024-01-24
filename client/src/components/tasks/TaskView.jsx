import React, { useState, useEffect } from 'react'
import { API_URL } from '../../config';
import { useParams, Link } from "react-router-dom";


export default function TaskView() {
    let { id } = useParams();
    const [task, setTask] = useState({})
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        const fetchTask = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${API_URL}/tasks/${id}`);
                const json = await response.json();
                setTask(json.data);
                setLoading(false)
            } catch (error) {
                console.log("error", error);
                setLoading(false)
            }
        };

        fetchTask();
    }, [id]);

    return (
        <div>
            {!loading ?
                <div className="flex justify-center">
                    <div className="lg:w-1/3 w-full">
                        <div className="p-10">
                            <div className="mb-10 flex items-center justify-between">
                                <Link to="/">
                                    <button className="bg-blue-700 text-white px-3 py-1.5 rounded">
                                        Go Back
                                    </button>
                                </Link>
                            </div>
                            <div className="bg-slate-100 rounded-lg px-5">
                                <div className="flex border-b py-4">
                                    <div className="mr-4 text-slate-400">Name</div>
                                    <div className="text-slate-800 font-medium">{task.name}</div>
                                </div>
                                <div className="flex border-b py-4">
                                    <div className="mr-4 text-slate-400">Description</div>
                                    <div className="text-slate-800 font-medium">{task.description}</div>
                                </div>
                                <div className="flex border-b py-4">
                                    <div className="mr-4 text-slate-400">Date</div>
                                    <div className="text-slate-800 font-medium">{task.date}</div>
                                </div>
                                <div className="flex border-b py-4">
                                    <div className="mr-4 text-slate-400">Priority</div>
                                    <div className="text-slate-800 font-medium">{task.priority}</div>
                                </div>
                                <div className="flex py-4">
                                    <div className="mr-4 text-slate-400">Status</div>
                                    <div className="text-slate-800 font-medium">{task.status}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : ''}
        </div>
    )
}