import axios from 'axios'
import React, { useState } from 'react'

const baseURL = 'http://localhost:4000'


export default function TodoList() {
    const [todoItem, setTodoItem] = useState('')

    const [classes, setClasses] = useState([])

    const getListOfClasses = async () => {
        const classes = await fetch(`${baseURL}/classes`, {
            method: 'GET',
        })
        const data = await classes.json()

        setClasses(data)

        console.log(data);
    }

    const createClass = async () => {
        const body = { chairs: 200, tables: 200, students: 200 }

        const createdClass = await axios.post(`${baseURL}/login`, body)

        const data = await createdClass.data

        console.log(data);


    }

    const handleChange = (e) => {
        setTodoItem(e.target.value)
    }

    const handleSubmit = () => {
        // getListOfClasses()

        createClass()
    }
    return (
        <div>
            <input type="text" onChange={handleChange} style={{ border: 'solid 1px black' }} name="" id="" />
            <button type='button' onClick={handleSubmit}>Submit</button>
            <br />



            {classes.map((clas, index) => {
                return (
                    <h3>chairs: {clas.chairs} tables: {clas.tables} students: {clas.students}</h3>
                )
            })}
        </div>
    )
}
