import React, { useEffect, useState } from 'react'
import NavBar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import axios from 'axios'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import api from '../lib/axios'


const HomePage = () => {

const [isRateLimited, setIsRateLimited] = useState(false)
const [notes, setNotes] = useState([])
const [isLoading, setIsloading]  = useState(true)

useEffect(()=>{
    const fetchNotes = async ()=>{

        try {
            const res = await api.get("/notes");
            console.log(res.data)
            setNotes(res.data)
        } catch (error) {
            console.log("Error fetching notes",error)

            if(error.response.status === 429){
                setIsRateLimited(true);
            }else{
                toast.error("Failed to load notes")
            }

        } finally{
            setIsloading(false)
        }

    }

    fetchNotes();

},[]);

  return (
    <div className='min-h-screen'>
     <NavBar/>
      {isRateLimited  && <RateLimitedUI/>}
      <div className='max-w-7xl mx-auto p-6 mt-6' >
            {isLoading && <div> Notes are loading...</div>}
            {notes.length > 0 && !isRateLimited && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

                    {notes.map( note => {
                        return (<NoteCard key={note._id} note={note} setNotes={setNotes}></NoteCard>)
                    })}

                </div>
            )}
      </div>
    </div>
  )
}

export default HomePage

