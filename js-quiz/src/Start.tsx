import { Button } from "@mui/material";
import { useQuestionsStore } from "./store/questions";

const LIMIT_QUESTIONS = 10
export default function Start () {
  const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)
  
  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTIONS)
  }

  return  (
    <Button variant='contained' color='primary' onClick={handleClick}>
      Start
    </Button>
  )
}
