import { useEffect, useState } from "react";

import { fetchQuizQuestion } from "./utils/fetchDataApi";
import "./App.css";
import QuestionCard from "./components/QuestionCard";
import { Difficulty, QuestionState } from "./utils/fetchDataApi";
import { GlobalStyle } from "./App.styles";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTION = 10;
function App() {
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState<QuestionState[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [gameover, setGameOver] = useState(true);

  // useEffect(() => {
  //   console.log(fetchQuizQuestion(TOTAL_QUESTION, Difficulty.EASY));
  // }, []);

  // console.log(question);
  const startTrivia = async () => {
    // if the value returns a question then we will make it a setLoading(False)
    setLoading(true);

    setGameOver(false);
    const newQuestions = await fetchQuizQuestion(
      TOTAL_QUESTION,
      Difficulty.EASY
    );

    setQuestion(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setQuestionNumber(0);
    setLoading(false);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    // if right answer then increase the score by 10
    if (!gameover) {
      const answer = e.currentTarget.value;

      const correct = answer === question[questionNumber].correct_answer;
      if (correct) {
        setScore(score + 10);
        const answerObject = {
          question: question[questionNumber].question,
          answer,
          correct,
          correctAnswer: question[questionNumber].correct_answer,
        };
        setUserAnswer((prev) => [...prev, answerObject]);
      }
    }
    console.log(e);
  };

  const nextQuestion = () => {
    setLoading(true);
    // Check if there are more questions to show
    if (questionNumber < TOTAL_QUESTION - 1) {
      setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
      setLoading(false); // Set loading to false to display the next question
    } else {
      setGameOver(true); // No more questions, set the game to be over
    }
  };
  return (
    <>
      <GlobalStyle />
      <div className="app">
        <h1>React-Typescript Quizz</h1>
        {gameover || userAnswer.length == TOTAL_QUESTION ? (
          <button className="btn-start" onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!gameover && <p className="score">Score: {score}</p>}
        {loading && <p>Loading Questions...</p>}
        {!loading && (
          <>
            {console.log(question[questionNumber].answers[0])}
            {/* console.log(); */}

            <QuestionCard
              questionNr={questionNumber + 1}
              totalQuestion={TOTAL_QUESTION}
              question={question[questionNumber].question}
              answers={question[questionNumber].answers}
              userAnswers={userAnswer ? userAnswer[questionNumber] : undefined}
              callback={checkAnswer}
            />
            {!loading &&
            !gameover &&
            userAnswer.length === questionNumber + 1 &&
            questionNumber !== TOTAL_QUESTION - 1 ? (
              <button className="btn-next" onClick={nextQuestion}>
                Next Question
              </button>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}

export default App;
