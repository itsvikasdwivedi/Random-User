import { useNavigate } from "react-router-dom";
import axios from  "axios"

import "./App.css";
import { useState ,useEffect} from "react";
import { Button } from "@mui/material";

const Home = () => {
  const [sign,setSign] =useState(false)
 
  useEffect(() => {
    getBlogFunction();
  }, []);
  
  const getBlogFunction = ()=>{
    
    axios.get("https://random-user-qw68.onrender.com/user?page=0")
    .then((res)=>{
      let arr = res.data.blog
      if(arr.length === 0){
        setSign(false)
        getBlogFunction();
      }
      else{
        setSign(true)
      }
    })
    .catch((e)=>console.log(e))
  }
  const navigate = useNavigate();

  const fetchButton = () => {
    if(sign===false){
      axios.post("https://random-user-qw68.onrender.com/user")
      .then((res)=>{
        getBlogFunction();
        setSign(true)
      })
      alert("Data Successfully Added")
    }
    else{
      alert("Data Already Added")
    }
  };

  const deleteButton = () => {
    if(sign == true){
      axios.delete("https://random-user-qw68.onrender.com/user")
    .then((res)=>{
      getBlogFunction()
    })
    alert("Data Successfully Deleted")
    }
    else{
      alert("Data not Found")
    }
    
  };

  const userButton = () => {
    navigate("/users");
  };
  
  return (
    <div className="App">
      <Button onClick={fetchButton} variant="contained">Fetch User</Button>
      <Button onClick={deleteButton} variant="contained">Delete Users</Button>
      <Button onClick={userButton}variant="contained">View Users</Button>
    </div>
  );
};

export default Home;


