import React, { useEffect, useState } from "react";
import './index.css';
import { NavLink } from "react-router-dom";
import axios from "axios";

function MLassessment() {
  const CID=5;
  const [ques,setQues]=useState([])

  useEffect(()=>{
    axios.post('http://localhost:3001/getExam',{CID})
    .then((res)=>{
      if(res.data.message){
        console.log("Result: ",res.data)
      }
      else{
        setQues(res.data[0])
      }
    })
},[])

    const quiz = {
        topic: 'ML',
        level: 'Beginner',
        totalQuestions: 4,
        perQuestionScore: 5,
        questions: [
          {
            // question: 'Machine learning is an application of ___________.',
            // choices: ['Blockchain', 'Artificial Intelligence','Both A and B', 'None of the above'],
            // type: 'MCQs',
            // correctAnswer: 'Artificial Intelligence',
            
            question: ques.question1,
            choices: ques.choices1,
            type: 'MCQs',
            correctAnswer: ques.answer1,
          },
          {
            // question: '_________ is the machine learning algorithms that can be used with labeled data.',
            // choices: ['Regression algorithms', 'Clustering algorithms', 'Association algorithms', 'All of the above'],
            // type: 'MCQs',
            // correctAnswer: 'Regression algorithms',
            
            question: ques.question2,
            choices: ques.choices2,
            type: 'MCQs',
            correctAnswer: ques.answer2,
          },
          {
            // question:'Which Language is Best for Machine Learning?',
            // choices: ['C','Java','Python','HTML'],
            // type: 'MCQs',
            // correctAnswer: 'Python',
            
            question: ques.question3,
            choices: ques.choices3,
            type: 'MCQs',
            correctAnswer: ques.answer3,
          },
          {
            // question: 'The categories in which Machine learning approaches can be traditionally categorized are ______ ',
            // choices: ['Supervised learning','UnSupervised learning','Reinforcement learning','All of the above'],
            // type: 'MCQs',
            // correctAnswer: 'All of the above',
            
            question: ques.question4,
            choices: ques.choices4,
            type: 'MCQs',
            correctAnswer: ques.answer4,
          },
        ],
      }

    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [showResult, setShowResult] = useState(false)
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    })
    const { question, choices,correctAnswer } = quiz.questions[activeQuestion]
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)
    const [scores, setScores] = useState(0)

    const onClickNext = () => {
        setSelectedAnswerIndex(null)
        setResult((prev) =>
          selectedAnswer
            ? {
                ...prev,
                score: prev.score + 5,
                correctAnswers: prev.correctAnswers + 1,
              }
            : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
        )
        if (activeQuestion !== quiz.questions.length - 1) {
          setActiveQuestion((prev) => prev + 1)
        } else {
          setActiveQuestion(0)
          setShowResult(true)

          const username=window.userName
          axios.post('http://localhost:3001/scores',{username,scores,CID})
          .then((res)=>{
            console.log("RES: ",res)
            if(res.data.message){
              console.log(res.data.message)
            }
            else{
              alert("Score submitted successfully")
            }
          })
        }
      }

    const onAnswerSelected = (answer, index) => {
        setSelectedAnswerIndex(index)
        if (answer === correctAnswer) {
            setSelectedAnswer(true)
            setScores(scores+25)
        } else {
            setSelectedAnswer(false)
        }
    }

    return (
        <div className='Materials'>
            <h1 id="heading">ML ASSESSMENT</h1>
            <br></br>
            <div className="quiz-container">
            {!showResult ? (
                <div>
                    <div>
                        <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
                        <span className="total-question">/{addLeadingZero(quiz.questions.length)}</span>
                    </div>
                    <h2>{question}</h2>
                    <ul className="ul">
                        {choices && choices.split("&&&").map((answer, index) => (
                        <li id="li"
                            onClick={() => onAnswerSelected(answer, index)}
                            key={answer}
                            className={selectedAnswerIndex === index ? 'selected-answer' : null}>
                            {answer}
                        </li>
                        ))}
                    </ul>
                    <div className="flex-right">
                        <button onClick={onClickNext} className="button" disabled={selectedAnswerIndex === null}>
                        {activeQuestion === quiz.questions.length - 1 ? 'Finish' : 'Next'}
                        </button>
                    </div>
                </div>
                    ) : (
                <div className="result">
                    <h3>Result</h3>
                    <p>
                        Total Question: <span>{quiz.questions.length}</span>
                    </p>
                    <p>
                        Total Score:<span> {result.score}</span>
                    </p>
                    <p>
                        Correct Answers:<span> {result.correctAnswers}</span>
                    </p>
                    <p>
                        Wrong Answers:<span> {result.wrongAnswers}</span>
                    </p>
                </div>
            )}
            
            </div>
        </div>
    );


}

export default MLassessment;
