import { PenSquare, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const NoteCard = ({note, setNotes}) => {

 const haddleDelete = async (e, id)=>{
    e.preventDefault();

    if(!window.confirm("are you sure you want to delete this note?")) return;

    try {
        await api.delete(`/notes/${id}`);
        toast.success("Note deleted successfully")
        setNotes((prev)=> prev.filter(note => note._id !== id)) // get rid of the delted note in the array
    } catch (error) {
        console.log("Error in handleDelete", error);
        toast.error("Failed to delete note");
    }

    
 }
  return (
      <Link to= {`/note/${note._id}`}
      className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]'>

        <div className='card-body'>
            <h3 className='card-title text-base-content'>{note.title}</h3>
            <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
            <div className='card-actions justify-between items-center mt-4'>
                <span className='text-sm text-base-content/60'>
                {note.createdAt}
                </span>
                <div className='flex items-center gap-1'>
                    <PenSquare className='size-4'></PenSquare>
                    <button className='btn btn-ghost btn-xs'>
                        <Trash2Icon  onClick={(e)=>{haddleDelete(e, note._id)}} className='size-4'></Trash2Icon>
                    </button>
                </div>
            </div>
        </div>
      </Link>
  )
}

export default NoteCard

