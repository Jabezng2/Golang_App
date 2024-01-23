import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import EachTask from "./EachTask";

export default function List() {
    const [tasks, setTasks] = useState([])
    const [pages, setPages] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()
    let navigate = useNavigate();

    const fetchData = async () => {
        // for url
        const page = searchParams.get("page") ? "&page=" + searchParams.get("page") : ""
        try {
            // sort in desc order, tailwind default is 20 but change to 5
            const response = await fetch(`${API_URL}/tasks?sort=-id&size=5${page}`);
            const json = await response.json(); // data being fetched
            setTasks(json.data.items) // refer to json formatting
            setPages(json.data.total_pages)
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [searchParams])

    return (
        <div className="flex justify-center">
            <div className="lg:w-1/3 w-full">
                <div className="p-10">
                    <div className="mb-10 flex items-center justify-between">
                        <h1 className="font-bold">Task Manager App</h1>
                        <button className="bg-blue-700 text-white px-3 py-1.5 rounded"></button>
                    </div>
                    <div>
                        {tasks.length > 0 ? tasks.map((task, key) => <EachTask key={key} task={task} fetchData={fetchData}/>) : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}