import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EachBox from './EachBox'

function App() {
    const [box, setBox] = useState(() => {
        const savedBoxes = localStorage.getItem("notebox")
        return savedBoxes ? JSON.parse(savedBoxes) : []
    })
    const [boxForm, setBoxForm] = useState({
        boxName: "",
        key: 0
    })
    const [newBoxForm, setNewBoxForm] = useState(false)

    const addBox = (e) => {
        setNewBoxForm(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setBoxForm(prevState => ({ ...prevState, [name]: value }))
    }

    const handleCancel = (e) => {
        e.preventDefault()
        setBoxForm({
            boxName: "",
            key: ""
        })
        setNewBoxForm(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newBox = {
            ...boxForm,
            key: box.length + 1,
            notes: []
        }
        setBox(prevBox => [...prevBox, newBox])
        setBoxForm({
            boxName: "",
            key: ""
        })
        setNewBoxForm(false)
    }

    useEffect(() => {
        localStorage.setItem("notebox", JSON.stringify(box))
    }, [box])


  return (
    <div style={{height:"100%", maxWidth:"100%", display:"flex", flexDirection:"column", justifyContent:"flex-start", gap:"10rem"}}>
        <nav style={{width:"100%", display:'flex', justifyContent:"center"}}>
            <button onClick={addBox}>+</button>
        </nav>
        <div style={{display:"flex", gap:"2rem", width:"100%", overflow:"auto", flexWrap:"nowrap"}}>
            {box.map((boxData) => {
                const key = boxData.key
                const name = boxData.boxName
                const notes = boxData.notes
                return(
                    <div className="box" key={key} id={key} style={{border:"1px solid white", borderRadius: "20px", minWidth:"300px", boxSizing:"border-box", padding:"1rem", display:"flex", flexDirection:"column", gap:"1rem"}}>
                        <EachBox
                        box={box}
                        setBox={setBox}
                        name={name}
                        keyid={key}
                        notes={notes}
                        />
                    </div>
                )
            })}
        </div>
        {newBoxForm && <div style={{height:"100%", width:"100%", position:"absolute", top:"0px", left:"0px", zIndex:"999", display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:"gray"}}>
                <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", gap:"2rem"}}>
                    <input
                    type="text"
                    name="boxName"
                    placeholder='box name'
                    required
                    value={boxForm.boxName}
                    onChange={handleChange}
                    style={{height:"30px", boxSizing:"border-box", padding:"2px"}}
                    />
                    <button onClick={handleCancel}>Cancel</button>
                    <button type='submit'>Save</button>
                </form>
            </div>}
    </div>
  )
}

export default App
