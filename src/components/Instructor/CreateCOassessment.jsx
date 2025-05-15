import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateCOassessment() {
  const navigate = useNavigate();
  const CID=2;
  const [instructor, setInstructor] = useState([]);


  useEffect(()=>{
    axios.post('http://localhost:3001/courseInstructor',{CID})
      .then((res)=>{
          if(res.data.message=="Could not create Assessment"){
            alert(res.data.message)
          }
          else{
            console.log("second Result2: ",res.data[0].username)
            setInstructor(res.data[0].username)          
          }
      })
  },[])

  const handleSubmit=() =>{  

      const username=instructor
      let description=document.getElementById('description').value
      let points=document.getElementById('points').value
      
      if(points && description)
      {
        axios.post('http://localhost:3001/createAssessment',{CID,username,description,points})
          .then((res)=>{
              if(res.data.message=="Could not create Assessment"){
                alert(res.data.message)
              }
              else{
                console.log("second Result2: ",res.data)
                alert("Successfully created Assessment")
                document.getElementById('description').value=''
                document.getElementById('points').value=''          
              }
          })
      }
      else{
        alert("Please fill in all the details")
      }
  };
  

  return (
    <div>
     <br></br> <br></br>
      <div className="container">
      <center><h2>CO ASSESSMENT</h2></center> 
        <div className="courses-section">
          <textarea id='description'></textarea>
          <input type="text" style={{width:"100px"}} id="points" className='gradesInput' placeholder='Enter total Points'/>
          <button id='miniButton' className="submit-button" onClick={handleSubmit}>SUBMIT</button>
        </div>   
      </div>
    </div>
  );
}

export default CreateCOassessment;
