import React, {useState, useEffect} from 'react'

const data=[
	{
            "category": "Entertainment: Music",
            "type": "multiple",
            "difficulty": "easy",
            "question": "Which rap group released the album &quot;Straight Outta Compton&quot;?",
            "correct_answer": "N.W.A",
            "incorrect_answers": [
                "Wu-Tang Clan",
                "Run-D.M.C.",
                "Beastie Boys"
            ]
        },
        {
            "category": "Entertainment: Music",
            "type": "multiple",
            "difficulty": "easy",
            "question": "Ringo Starr of The Beatles mainly played what instrument?",
            "correct_answer": "Drums",
            "incorrect_answers": [
                "Bass",
                "Guitar",
                "Piano"
            ]
        }
]

const QuestionsBox=()=>{
	const [playNumb, setPlayNumb]=useState(0)
	const [questions, setQuestions]=useState(data);
	const [answers,setAnswers]=useState([]);
	const [singleQuestion, setSingleQuestion]=useState('');

	const{question, correct_answer,incorrect_answers}=questions[1];
	
	useEffect(()=>{
		setTimeout(()=>{
			//set the questions into the useState
			setAnswers(incorrect_answers)
			setAnswers((answers)=>{
				return [...answers,correct_answer ]
				
			})
			console.log(answers)
			//rearrange the order of the questions 
			setAnswers((answers)=>{
				return answers.sort(()=>0.5-Math.random())
			})
			
			setSingleQuestion((singleQuestion)=>{
				let formatQuestion=question.replace('&quot;', '"');
				formatQuestion=formatQuestion.replace('&quot;', '"');
				let reformat=question.replace('&#039;','\'')
				return formatQuestion;
			})
			
		},1000)
		
	},[])
	
	
	return(
		<div className="questions-box">
			<h3 className="question-bar">{singleQuestion}</h3>
			<div className="answers-bar">
				{
				answers.map((item, index)=>{
					return<p key={index}><span>{index+1}</span>{item}</p>
				})
				}
			</div>
		</div>
	)
	
}

export default QuestionsBox;