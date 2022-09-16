import { useEffect, useState } from "react"
import { getAllNotes } from "../getAllNotes"
import { db } from "../firebase"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { getAllLists } from "../getAllLists"

export default function NotesArea(props){
    const [notes, changeNotes] = useState([])
    const [read, changeRead] = useState(true)
    const [tagData, changeTagData] = useState({
        done: 'Feito',
        undone: 'Fazer',
        doing: 'Fazendo',
        none: 'Nenhum'
    })

    const getTagColor = (tag) => {
        const tags = {
            done: 'green',
            undone: 'red',
            doing: 'orange',
            none: 'gray'
        }

        return tags[tag]
    }

    useEffect(() => {
        if(read){
            var ns = []

            if(props.listID != 'none'){
                var notes = []
                const notesRef = collection(db, "notes")
                const q = query(notesRef, where("list", "==", props.listID))
                getDocs(q)
                    .then((snap) => {
                        snap.forEach((doc) => {
                            ns.push({id: doc.id, data: doc.data()})
                        })
                        changeNotes(ns)
                        changeRead(false)
                    })
            } else{
                getAllNotes(props.owner)
                    .then((ns) => {
                        changeNotes(ns)
                        changeRead(false)
                    })
            }
        }
    })

    return (
        props.listID != 'none' ? <>
            {notes.map((note) => <a
                                    class="block p-4 border border-gray-100 bg-white shadow-sm rounded-xl focus:outline-none focus:ring hover:border-gray-200 hover:ring-1 hover:ring-gray-200"
                                    href={"/e/"+note.id}
                                    style={{minHeight: '10rem'}}
                                    >
                                        {<span class={`bg-${getTagColor(note.data.tag)}-100 text-${getTagColor(note.data.tag)}-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-${getTagColor(note.data.tag)}-200 dark:text-${getTagColor(note.data.tag)}-900`}>{tagData[note.data.tag]}</span>}
                                        <h6 class="mt-2 font-bold">{note.data.title}</h6>

                                        <p class="sm:mt-1 sm:text-sm sm:text-gray-600 sm:block">
                                            {note.data.content.slice(0, 20)}...
                                        </p>
                                    </a>)}
            </>
            :
            <>
                {notes.map((note) => note.data.list == 'none' ? <a
                                    class="block p-4 border border-gray-100 bg-white shadow-sm rounded-xl focus:outline-none focus:ring hover:border-gray-200 hover:ring-1 hover:ring-gray-200"
                                    href={"/e/"+note.id}
                                    style={{minHeight: '10rem'}}
                                    >
                                        {<span class={`bg-${getTagColor(note.data.tag)}-100 text-${getTagColor(note.data.tag)}-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-${getTagColor(note.data.tag)}-200 dark:text-${getTagColor(note.data.tag)}-900`}>{tagData[note.data.tag]}</span>}
                                        <h6 class="mt-2 font-bold">{note.data.title}</h6>

                                        <p class="sm:mt-1 sm:text-sm sm:text-gray-600 sm:block">
                                            {note.data.content.slice(0, 20)}...
                                        </p>
                                    </a> : <></>)}
            </> 
    )
}