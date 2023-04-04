import "./App.css"
import axios from "axios"
import { useEffect, useState } from "react"

function App() {
	const [myData, setMyData] = useState([])
	const [isError, setIsError] = useState("")
	// //Using Promises to fectching api
	// useEffect(() => {
	// 	axios
	// 		.get("https://jsonplaceholder.typicode.com/posts")
	// 		.then((res) => {
	// 			// console.log(res) //to get all data from api
	// 			// console.log(res.config)
	// 			// console.log(res.data)
	// 			// console.log(res.headers)
	// 			setMyData(res.data)
	// 		})
	// 		.catch((error) => {
	// 			// console.log(error)
	// 			setIsError(error.message)
	// 		})
	// }, [])

	//Using Async and Await to api by using axios

	const getApiData = async () => {
		try {
			const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
			setMyData(res.data)
		} catch (error) {
			setIsError(error.message)
		}
	}

	useEffect(() => {
		getApiData()
	}, [])

	return (
		<>
			<div className="App">
				<h1>Axios Tutorial</h1>
				{isError !== "" && <h2>{isError}</h2>}
				<div className="grid">
					{myData.slice(0, 12).map((post) => {
						const { id, title, body } = post
						return (
							<>
								<div className="card" key={id}>
									<h2>{title.slice(0, 20).toUpperCase()}</h2>
									<p>{body.slice(0, 100)}</p>
								</div>
							</>
						)
					})}
				</div>
			</div>
		</>
	)
}

export default App
