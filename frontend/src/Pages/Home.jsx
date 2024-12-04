import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Notes from '../components/Notes'
import NoteModal from '../components/NoteModal'
import { get, post, put } from '../../services/ApiEndPoint'
import toast from 'react-hot-toast'
import UpdateModel from '../components/UpdateModel'

export default function Home() {
  const [notes,setNotes] = useState([]);
  const [title,setTitle] =useState("");
  const [refresh,setRefresh] =useState(false);
  const [updatenote ,setUpdatenote] =useState("");
  const [notesId, setNotesId] = useState('');

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const handleCreateNote = async ()=>
  {
    try {
      
      const request = await post("/notes/createNotes",{title})
      const response = request.data
      if (response.success) {
        toast.success(response.message);
        setRefresh(true);
      }

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  }


  useEffect(()=>
  {
        const getnotes = async ()=>
        {
          try {
            const request = await get('/notes/getNotes')
            const response =request.data;
            setNotes(response.Notes)
             console.log("res",response);
            
          } catch (error) {
            console.log(error)
          }
        }
        getnotes();
  },[refresh])

const handleUpdateNote =  ()=>
{
  try {
    alert(notesId);
      
    // const request = await put(`/notes/updateNotes/${modalId}`,{title:updatenote})
    // const response = request.data
    // console.log(response);
    // if (response.success) {
    //   toast.success(response.message);
    //   setRefresh(true);
    // }

  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    }
  }
}



  return (
    <>
    <NoteModal title={'Create Note'} value={title} handleTitleChange={(e)=>setTitle(e.target.value)} handleCreateNote={handleCreateNote}/>
    <UpdateModel title={'Update Note'}  value={updatenote} handleTitleChange={(e)=>setUpdatenote(e.target.value)} handleUpdateNote={handleUpdateNote}/>
    <div className='conatiner-fluid'>
      <div className='row'>

        <div className='col-lg-2 col-md-2 min-vh-100 shadow'>
            <Sidebar/>
        </div>

        <div className='col-lg-10 col-md-10'>
            <Navbar/>

            <div className='mt-3 mx-5'>
            <h1 className='fs-3 fw-bold'>Notes</h1>
            </div>


            <div className='row mt-4 mx-5'>

              
              {
                notes && notes.map((elem)=>
                {
                  
                  return (<div className='col-md-4 mb-5 col-lg-4'>
                  <Notes 
                  date={formatDate(elem.createdAt)} 
                  title={elem.title} 
                  handleUpdate={() => setNotesId(elem._id)}/>
                  </div>
                  )
                 
                })
              }
                
              
             


               </div>



        </div>
      </div>
    </div>
    </>
  )
}
