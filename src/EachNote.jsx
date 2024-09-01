import React from 'react'

const EachNote = ({ noteKey, noteName, noteText, box, setBox, boxid }) => {

    const deleteNote = (e) => {
        const boxCopy = [...box];
        const targetBox = { ...boxCopy[boxid - 1] };

        const updatedNotes = targetBox.notes.filter(note => note.key !== noteKey);

        updatedNotes.forEach((eachNote, i) => {
            eachNote.key = i + 1;
        });

        targetBox.notes = updatedNotes;
        boxCopy[boxid - 1] = targetBox;

        // Update the state with the new box data
        setBox(boxCopy);
    }

    return (
        <div style={{ boxSizing: "border-box", padding: "5px", border: "1px solid gray", display: "flex", justifyContent: "space-between" }}>
            <div>
                <div style={{ fontWeight: "800" }}>{noteName}</div>
                <div>{noteText}</div>
            </div>
            <div>
                <button onClick={deleteNote}>x</button>
            </div>
        </div>
    )
}

export default EachNote
