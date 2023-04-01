import "./App.css"
import { useEffect, useState } from "react"

function App() {
	const [data, setData] = useState([])
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [mobNo, setMobNo] = useState("")
	const [password, setPassword] = useState("")
	const [accept, setAccept] = useState(false)

	useEffect(() => {
		getData()
	}, [])

	async function getData() {
		let result = await fetch("http://localhost:5000")
		let data = await result.json()
		console.log(data)
		setData(data)
	}

	const collectionData = async () => {
		let result = await fetch("http://localhost:5000", {
			method: "POST",
			body: JSON.stringify({ name, email, mobNo, password }),
			headers: { "Content-Type": "application/json" },
		})
		const data = await result.json()
		getData()
		console.log(data)
	}

	return (
		<div className="App">
			<div className="form-Style">
				<form>
					<h1>Login Form</h1>
					<input
						type="text"
						placeholder="Enter Your Name"
						value={name}
						name="name"
						onChange={(e) => setName(e.target.value)}
						required
					/>
					<br />
					<br />
					<input
						type="number"
						placeholder="Enter Your Mobile Number"
						value={mobNo}
						name="MobNo"
						onChange={(e) => setMobNo(e.target.value)}
						required
					/>
					<br />
					<br />
					<input
						type="email"
						placeholder="Enter Your Email "
						value={email}
						name="email"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<br />
					<br />
					<input
						type="password"
						placeholder="Enter Password "
						name="password"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<br />
					<br />
					<span>
						<input
							type="checkbox"
							name="termsConditions"
							checked={accept}
							onChange={(e) => setAccept(e.target.checked)}
						/>
					</span>
					<span>Agree to all terms and Conditions.</span>
					<span style={{ color: "red", fontSize: "20px" }}>*</span>
					<br />
					<br />
					{accept ? (
						<button type="submit" onClick={collectionData}>
							Submit
						</button>
					) : (
						<button>submit</button>
					)}
				</form>
			</div>
			<h1>User Details</h1>
			<table>
				<tbody>
					<tr>
						<td>ID</td>
						<td>FullName</td>
						<td>Email</td>
						<td>Number</td>
						<td>Password</td>
					</tr>
					{data.map((user, i) => {
						return (
							<>
								<tr key={i}>
									<td>{i + 1}</td>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>{user.mobNo}</td>
									<td>{user.password}</td>
								</tr>
							</>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default App
