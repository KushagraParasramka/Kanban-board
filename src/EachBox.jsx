import React, { useState } from 'react'
import EachNote from './EachNote'
import { Reorder } from 'framer-motion'

const EachBox = ({ box, setBox, name, keyid, notes }) => {
    const [newNote, setNewNote] = useState({
        noteName: "",
        noteText: ""
    })
    const [newNoteForm, setNewNoteForm] = useState(false)

    const deleteBox = (e) => {
        e.preventDefault()
        const boxCopy = [...box]
        boxCopy.splice(keyid - 1, 1)
        boxCopy.map((singleBox, i) => {
            singleBox.key = i + 1
        })
        setBox(boxCopy)
    }

    const addNote = () => {
        setNewNoteForm(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewNote({ ...newNote, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const boxCopy = [...box];
        const targetBox = { ...boxCopy[keyid - 1] };
        targetBox.notes = [...targetBox.notes, { ...newNote, key: targetBox.notes.length + 1 }];
        boxCopy[keyid - 1] = targetBox;

        setBox(boxCopy);
        setNewNoteForm(false);
        setNewNote({
            noteName: "",
            noteText: ""
        });
    }

    const handleCancel = (e) => {
        e.preventDefault()
        setNewNote({
            noteName: "",
            noteText: ""
        })
        setNewNoteForm(false)
    }

    const handleReorder = (newOrder) => {
        const boxCopy = [...box];
        boxCopy[keyid - 1].notes = newOrder;
        setBox(boxCopy);
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>{name}</div>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <button onClick={addNote}>+</button>
                    <button onClick={deleteBox}>x</button>
                </div>
            </div>
            <Reorder.Group axis="y" values={notes} onReorder={handleReorder}>
                {notes.map((eachNote) => {
                    const noteName = eachNote.noteName
                    const noteText = eachNote.noteText
                    const noteKey = eachNote.key
                    return (
                        <Reorder.Item key={noteKey} value={eachNote}>
                            <EachNote
                                noteKey={noteKey}
                                noteName={noteName}
                                noteText={noteText}
                                box={box}
                                setBox={setBox}
                                boxid={keyid}
                            />
                        </Reorder.Item>
                    )
                })}
            </Reorder.Group>

            {newNoteForm && <div style={{
                height: "100%", width: "100%", position: "absolute", top: "0px", left: "0px", zIndex: "999",
                display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "gray"
            }}>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    <input
                        type="text"
                        name="noteName"
                        placeholder='note name'
                        required
                        value={newNote.name}
                        onChange={handleChange}
                        style={{ height: "30px", boxSizing: "border-box", padding: "2px" }}
                    />
                    <textarea
                        name="noteText"
                        placeholder='note text'
                        required
                        value={newNote.noteText}
                        onChange={handleChange}
                        style={{ height: "30px", boxSizing: "border-box", padding: "2px" }}
                    />
                    <button onClick={handleCancel}>Cancel</button>
                    <button type='submit'>Save</button>
                </form>
            </div>}
        </>
    )
}

export default EachBox
