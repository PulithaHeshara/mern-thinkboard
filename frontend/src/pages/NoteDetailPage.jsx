import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const NoteDetailPage = () => {

    const [loading, setLoading] = useState(true)
    const [note, setNote] = useState(null)
    const [saving, setSaving] = useState(false)

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(()=>{
        const fetchNotes = async()=>{
            try {
                const res = await api.get(`/notes/${id}`);
                setNote(res.data)
            } catch (error) {
                console.log("error in fething note ", note);
                toast.error("failed to fecth the note")
            }finally{
                setLoading(false)
            }
        }

        fetchNotes();

    },[id])

    console.log(note);

  return (
    <div>
      NoteDetailPage
    </div>
  )
}

export default NoteDetailPage
