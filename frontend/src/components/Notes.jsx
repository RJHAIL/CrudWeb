import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPen } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

export default function Notes({title,date,handleUpdate}) {
  return (
    <>
      <div className="card position-relative" style={{width: "18rem", backgroundColor:"white"}}>
  <div className="card-body position-relative">
    <h5 className="card-title">{title}</h5>
       <div className='bottomContent'>

        <div className='date d-flex justify-content-between align-items-center'>
        <h5 className='fs-6'>{date}</h5>
        
     
        <div className='dropdown'>
              <BsThreeDotsVertical data-bs-toggle="dropdown" aria-expanded="false" size={25} cursor={"pointer"} />
              <ul className="dropdown-menu">
                <li>
                    <button className="dropdown-item" type="button"  data-bs-toggle="modal" data-bs-target="#updateModal">
                        <FaPen size={20} style={{ cursor: "pointer", color: "green" }}  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleUpdate} />
                        Edit
                    </button>
                </li>
                <li>
                    <button className="dropdown-item" type="button">
                        <MdDelete size={25} style={{ cursor: "pointer", color: "red" }} />
                        Delete
                    </button>
                </li>
            </ul>
       
        </div>
        </div>

        

       </div>
  </div>
    </div>
    </>
  )
}
