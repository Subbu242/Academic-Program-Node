import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminSettings() {
  const navigate = useNavigate();
  
  const [courses, setCourses] = useState([]);
  const [containerColor, setcontainerColor] = useState("#ff0000");

//   useEffect(()=>{
//     const username=window.userName
//     // console.log(username)
//     axios.post('http://localhost:3001/allCourse',{username})
//     .then((res)=>{
//       if(res.data.message){
//         setCourses(["No Courses Registered"])
//         setnoCourses(true)
//       }
//       else{
//         console.log("Result: ",res.data)
//         setCourses(res.data)
//         setnoCourses(false)
//       }
//     })
// },[])

  const handleCreate=() =>{ 
    console.log("COURSES: ",courses)  
    let courseName=document.getElementById("courseHeading").value;
    let courseCode=document.getElementById("courseCode").value;
    if(courseName && courseCode)
    {
      const newList = courses.concat(courseName);
      setCourses(newList);
      document.getElementById("courseHeading").value=''
      document.getElementById("courseCode").value=''

      const username=window.userName
      axios.post('http://localhost:3001/addCourse',{username,courseName,courseCode})
        .then((res)=>{
            if(res.data.message){
            console.log("second Result1: ",res.data)
            }
            else{
            console.log("second Result2: ",res.data)
            }
        })
    } 
    else{
      alert("Please enter all the fields")
    }
  }
  
  const handleDelete = (course) => {
    const newList = courses.filter((item) => item !== course);
    console.log("NEWLIST: ",newList,course)
    setCourses(newList);
    
    axios.post('http://localhost:3001/deleteCourse',{course})
    .then((res)=>{
      if(res.data.message){
        console.log("Result: ",res)
      }
      else{
        console.log("Result: ",res.data)
        alert("Course Deleted");
      }
    })
  };

  const handleContainerColor=(e) =>{ 
      console.log('COLOR:',e.target.value)
      setcontainerColor(e.target.value)
      document.getElementById('container').style.backgroundColor=containerColor
  }

  return (
    <div>
     <br></br> <br></br>
      <div className="container" id="container">
      <center><h2>SETTINGS</h2></center> 
      <br/><br/>
  {/* <button id='miniButton' className="create-button" onClick={() => handleCreate()}>CREATE COURSE</button> */}
        <div className="courses-section">
            <label for="containerColor"><h3>Container color:</h3></label>
            <input type="color" id="containerColor" name="containerColor" value={containerColor} onChange={(e) =>handleContainerColor(e)}></input>
        </div>   
      </div>
    </div>
  );
}

export default AdminSettings;
