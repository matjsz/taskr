import { useEffect, useState } from "react"
import { getAllNotes } from "../getAllNotes"

export default function NotesArea(props){
    const [notes, changeNotes] = useState([])
    const [read, changeRead] = useState(true)

    useEffect(() => {
        if(read){
            getAllNotes(props.owner)
                .then((n) => {
                    changeNotes(n)
                    changeRead(false)
                })
        }
    })

    return (
        <>
            {notes.map((note) => <a
                                    class="block p-4 border border-gray-100 bg-white shadow-sm rounded-xl focus:outline-none focus:ring hover:border-gray-200 hover:ring-1 hover:ring-gray-200"
                                    href={"/e/"+note.id}
                                    style={{minHeight: '10rem'}}
                                    >
                                        <h6 class="mt-2 font-bold">{note.data.title}</h6>

                                        <p class="sm:mt-1 sm:text-sm sm:text-gray-600 sm:block">
                                            {note.data.content.slice(0, 20)}...
                                        </p>
                                    </a>)}
        </>
    )
}