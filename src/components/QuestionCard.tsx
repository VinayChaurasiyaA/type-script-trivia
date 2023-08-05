import React from "react";
type Props = {
  // there will be props
  question: string;
  answers: string[];
  callback: any;
  userAnswers: any;
  questionNr: number;
  totalQuestion: number;
};
// FC stands for function component. If we write a function that returns a React component, we can use this type. const App: Reac
const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswers,
  questionNr,
  totalQuestion,
}) => {
  return (
    <div>
      {/* dangerouslySetInnerHtml is used when we have to add from the api or external source
      answers.map((answer) => {
          question
        } ) */}
      {/* {console.log(answers[0])} */}
      <div>
        <p className="number">
          {questionNr}/ {totalQuestion}
        </p>
      </div>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((answer) => (
          <div key={answer}>
            <button
              value={answer}
              onClick={callback}
              className="btn-options"
              disabled={userAnswers}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
