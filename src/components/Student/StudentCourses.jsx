import React, { useEffect } from "react";
import './index.css';
import { NavLink,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function StudentCourses() {
  const navigate = useNavigate();
  
  const [courses, setCourses] = useState([]);
  const [nocourses, setnoCourses] = useState(false);

  useEffect(()=>{
    const username=window.userName
    // console.log(username)
    axios.post('http://localhost:3001/unenrolledCourse',{username})
    .then((res)=>{
      if(res.data.message){
        setCourses(["No Courses Registered"])
        setnoCourses(true)
      }
      else{
        console.log("Result: ",res.data)
        setCourses(res.data)
        setnoCourses(false)
      }
    })
},[])

    
const handleEnroll = (course) => {
  const username = window.userName; // Retrieve the username from global variable

  axios.post("http://localhost:3001/enrollCourse", { username, course })
    .then((res) => {
      if (res.data.message) {
        alert(res.data.message); // Display success or error messages
      } else {
        alert("Enrollment successful!");
      }
    })
    .catch((err) => {
      console.error("Error enrolling course:", err);
      alert("Failed to enroll. Please try again.");
    });
};


  return (
    <div>
     <br></br> <br></br>
      <div className="container">
      <center><h2>COURSES</h2></center> 
      <br/><br/>
        <div className="courses-section">
        {courses.map((course,index) => (
          <div className="course">
            <div id="courseInfo">
              <h2 id='courseHead'>{course}</h2>
              <button id='miniButton' className="delete-button deleteButton" onClick={() => handleEnroll(course)}>ENROLL COURSE</button>
            </div>
          </div>
        ))}
        </div>   
      </div>
    </div>
  );
}

export default StudentCourses;
