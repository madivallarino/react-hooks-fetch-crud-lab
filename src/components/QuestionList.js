import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList({question}) {

const [questions, setQuestions] = useState([]);

useEffect(()=> {
  fetch("http://localhost:4000/questions")
  .then((resp)=> resp.json())
  .then((quest)=> {
    setQuestions(quest);
  });
},[]);


function handleDelete(id) {
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "DELETE",
  })
    .then((r) => r.json())
    .then(() => {
      const updatedQuestions = questions.filter((q) => q.id !== id);
      setQuestions(updatedQuestions);
    });
}

function handleAnswerChange(id, correctIndex) {
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correctIndex }),
  })
    .then((r) => r.json())
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((q) => {
        if (q.id === updatedQuestion.id) return updatedQuestion;
        return q;
      });
      setQuestions(updatedQuestions);
    });
}


  const listOfQuestions = question.map(quest => {
    return (
      <QuestionItem 
      quest={quest}
      handleDelete={handleDelete}
      onAnswerChange={handleAnswerChange}
      />
  )
  })
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{listOfQuestions}</ul>
    </section>
  );
}

export default QuestionList;
