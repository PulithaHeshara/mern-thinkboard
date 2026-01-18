import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios';
import api from '../lib/axios';


const CreatePage = () => {

    const [isLoading, setIsloading] = useState(false);
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate();

    const haddleSubmit = async (e)=>{
        e.preventDefault();
        if(!title.trim() || !content.trim()){
            toast.error("All fields are requried")
            return;
        }

        setIsloading(true);
        try {
            await api.post("/notes",{title, content})
            toast.success("Note created successfully")
            navigate("/")
        } catch (error) {
            console.log("Error creating the note", error)
            if(error.response.status === 429){
                toast.error("Slow down ...")
            }else{
                toast.error("Failed to create note")
            }
           
        }finally{
            setIsloading(false)
        }
    }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='mac-w-2xl mx-auto'>
            <Link to={"/"} className="btn btn-ghost mb-6">
              <ArrowLeftIcon className='size-5'> </ArrowLeftIcon>
                back to Notes
             
            </Link>

            <div className=' card bg-base-100'>
                <div className='card-body'>
                    <h2 className='card-title text-2xl mb-4'> carate new note</h2>
                    <form onSubmit={haddleSubmit}>
                        <div className='form-control mb-4'>
                            <label htmlFor="">
                                <span className='label-text'>Title</span>
                            </label>
                            <input type="text" 
                            placeholder='Note Title'
                            className='input input-bordered'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}/>
                        </div>

                        <div className='form-control mb-4'>
                            <label className='label'>
                                <span className='label-text'>Content</span>
                            </label>
                            <textarea type="text" 
                            placeholder='Write your note here...'
                            className='input input-bordered'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}/>
                        </div>

                        <div className="card-actions justify-start">
                            <button type='submit' className='btn btn-primary' disabled={isLoading}>
                                {isLoading ? "creating.." : "Create Note"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
      </div>
    </div>
  )
}

export default CreatePage
