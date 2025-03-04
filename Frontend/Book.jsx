import axios from "axios";
import { use, useState } from "react";
const Book = () =>{
  const [name , setName] = useState("");
  const [email, setEmail] =useState("");
  const [month, setMonth]=useState("");
  const [day , setDay]= useState("")
  const [time , setTime] = useState("")
   
   const handleform = async (_event)=>{

     _event.preventDefault();

     if (name.trim() == ""){
      alert("You need to type your name")
      return false
     }else if(email.trim() == ""){
      alert("Your need to type your email address")
      return false
     }else if(month.trim() == ""){
      alert("please select A month")
      return false
     }
     else if(day.trim() == ""){
        alert("please select A day")
        return false
       }
       else if(time.trim() == ""){
        alert("please select a time")
        return false
       }
       
     
     else{
        
      try{
        const response = await  axios.post(
         'https://backendbookingsystem-3.onrender.com/book',
 
         {name ,email, month, day , time},
         {
           headers: {
             "Content-Type":"application/json",
           }
         })
         if (response.status === 201){
           alert("We will get back to you shortly  ")
           window.location.href= "/"
         }
        
      }catch(error){
          console.log('Error indicating client or server error', error)
      }
 



     }


   }

    return(
    <main className="Hotel-background">
        <form onSubmit={handleform} method="post">
         <h1>Hotel Reserve</h1>
         <div> 
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" name="" id="" />
         </div>
         <div> 
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Your email address" required name="" id="" />
         </div>
        <div> 
            <input type="month" value={month} required onChange={(e) => setMonth(e.target.value)}  placeholder="month" name="" id="" />
         </div>
         <div>
        <input list="days" required  value={day} onChange={(e) => setDay(e.target.value)}  placeholder='Select A Day'/>
    </div>
        <datalist id='days'>
          <option value="Sunday"></option>
          <option value="Monday"></option>
          <option value="Tuesday"></option>
          <option value="Wednesday"></option>
          <option value="Thursday"></option>
          <option value="Friday"></option>
          <option value="Saturday"></option>
        </datalist>
    <div>
        <input type="time"placeholder="time" value={time} onChange={(e) => setTime(e.target.value)}  required name="" id="" />
    </div>
    <button type="submit">Book A Suite</button>
       </form>
    </main>
    )
}
export default Book;