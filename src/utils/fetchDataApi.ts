import { shuffleArray } from "./shuffleArray";


export type Questions = {
    category : string,
    correct_answer : string,
    incorrect_answers : string[],
    question : string,
    type : string,
    difficulty : string
}
export type QuestionState = Questions & {answers : string[]} // it means that we will have a questionsstate where all the type of the questions will be present as well as the newly created or additional / add on of the answers
export enum Difficulty {
    EASY= "easy",
    MEDIUM = "medium",
    HARD = "hard"
}
export const fetchQuizQuestion =async (amount:number , difficulty : Difficulty) => {
    const endPoint = `http://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endPoint)).json();

    return (
        data.results.map((question : Questions) => (
            {
                ...question,
                answers:  shuffleArray([...question.incorrect_answers , question.correct_answer])
            }
        ))
    )
    // console.log(data.results);
}