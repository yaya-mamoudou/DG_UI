import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import axios from 'axios';

export default function Home() {
	const [message, setMessage] = useState('')
	const [age, setAge] = useState()

	const [todoList, setTodoList] = useState([])
	const baseURL = "http://localhost:4000"

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

	return <div className={styles.container}>
		<input onChange={handleChange} name="todo" type="text" />
		<button onClick={submit} >Add todo</button>
		<button onClick={getTodos}>Fetch to list</button>
		<br />
		{todoList.map((todo, index) => {
			return (
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
					<h3>{todo.message}</h3>
					<button onClick={() => deleteTodo(todo._id)}>delete</button>
				</div>
			)
		})}
	</div>;
}
