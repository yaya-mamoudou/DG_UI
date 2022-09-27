import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import axios from 'axios';

export default function Home() {
	const [message, setMessage] = useState('')
	const [updateId, setUpdateId] = useState(null)
	const [todoList, setTodoList] = useState([])

	useEffect(() => {
		getTodos()
	}, [])

	const handleChange = (e) => {
		setMessage(e.target.value)
	}

	const getTodos = async () => {
		const todos = await axios.get(`http://localhost:4000/get-todos`)
		setTodoList(todos.data)
	}

	const submit = async () => {
		const todo = await axios.post(`http://localhost:4000/add-todo`, { message })
		setTodoList([todo.data, ...todoList,])
	}

	const deleteTodo = async (id) => {
		const todo = await axios.delete(`http://localhost:4000/delete-todo/${id}`)
		const newList = todoList.filter(todo => todo._id !== id)
		setTodoList(newList)
	}

	const editTodo = (id, message) => {
		console.log(id, message);
		setMessage(message)
		setUpdateId(id)
	}

	const submitUpdate = async () => {
		console.log(message);
		const todo = await axios.put(`http://localhost:4000/update-todo/${updateId}`, { message })
		getTodos()
	}

	return <div className={styles.container}>

		<input value={message} onChange={handleChange} name="todo" type="text" />

		{updateId ? <button onClick={submitUpdate} >Update</button> : <button onClick={submit} >Add todo</button>}

		<br />
		{todoList.map((todo, index) => {
			return (
				<div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
					<h3>{todo.message}</h3>

					<button onClick={() => editTodo(todo._id, todo.message)}>Edit</button>
					<button onClick={() => deleteTodo(todo._id)}>delete</button>
				</div>
			)
		})}
	</div>;
}
