import React, { useState, useEffect } from "react"
import "./App.css"
import { v4 as uuidv4 } from "uuid"
import { randomColor } from "randomcolor"
import Draggable from "react-draggable"

function App() {
	const [item1, setItem] = useState("")
	const [items, setItems] = useState(
		JSON.parse(localStorage.getItem("items")) || []
	)
	useEffect(() => {
		localStorage.setItem("items", JSON.stringify(items))
	}, [items])

	const newItem = () => {
		if (item1.trim() !== "") {
			const newTodo = {
				id: uuidv4(),
				item: item1,
				color: randomColor({
					luminosity: "light",
				}),
				defaultPos: {
					x: 400,
					y: -500,
				},
			}
			setItems(items => [...items, newTodo])
			setItem("")
		} else {
			alert("enter something..")
			setItem("")
		}
	}

	const delateNode = id => {
		setItems(items.filter(item => item.id !== id))
	}
	const dragStop = (data, index) => {
		let newArray = [...items]
		newArray[index].defaultPos = {
			x: data.x,
			y: data.y,
		}
		setItems(newArray)
	}
	const keyPress = e => {
		const code = e.keyCode || e.which
		if (code === 13) {
			newItem()
		}
	}

	return (
		<div className='App'>
			<input
				type='text'
				placeholder='создать заметку'
				onChange={e => setItem(e.target.value)}
				value={item1}
				onKeyPress={e => keyPress(e)}
			/>
			<button className='buttonInput' onClick={newItem}>
				create
			</button>
			<div className='wrapper'>
				<div>
					<h1>делаю</h1>
				</div>
				<div>
					<h1>сделал</h1>
				</div>
				<div>
					<h1>время</h1>{" "}
				</div>
				<div>
					<h1>p/s</h1>{" "}
				</div>
			</div>

			{items.map((i, index) => {
				return (
					<Draggable
						key={index}
						defaultPosition={i.defaultPos}
						onStop={(_, data) => {
							dragStop(data, index)
						}}
					>
						<div className='todo_item' style={{ background: i.color }}>
							{`${i.item}`}
							<button onClick={() => delateNode(i.id)} className='delate'>
								X
							</button>
						</div>
					</Draggable>
				)
			})}
		</div>
	)
}

export default App
