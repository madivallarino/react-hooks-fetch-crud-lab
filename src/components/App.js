import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [data, setData] = useState([])
  const [page, setPage] = useState("List");
  const [question, setQuesiton] = useState();
  
  useEffect(()=>{
  fetch('http://localhost:4000/questions')
  .then(resp => resp.json())
  .then(data => setData(data))
},[]) 
    

    
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm /> : <QuestionList question={data}/>}
    </main>
  );
}

export default App;
