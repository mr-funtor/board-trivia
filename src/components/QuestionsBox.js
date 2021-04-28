import React, {useState, useEffect} from 'react';
import {useGlobalContext} from './context';

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
	const {presentPlayer}=useGlobalContext();
	// const [playNumb, setPlayNumb]=useState(0)
	const [questions, setQuestions]=useState(data);
	const [answers,setAnswers]=useState([]);
	const [singleQuestion, setSingleQuestion]=useState('');
	const [answerIndex, setAnswerIndex]=useState(null);
	const [answered,setAnswered]=useState(false);
	// const [pickedCorrect,setPickedCorrect]=useState(false);
	const [dNumberPicked, setDNumberPicked]=useState(null);
	

	const{question, correct_answer,incorrect_answers}=questions[0];
	
	const pickQuestion=()=>{
		//set the questions into the useState
			setAnswers(incorrect_answers)
			console.log(answers)
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
		
	}
	
	useEffect(()=>{
		// setTimeout(()=>{
			
			pickQuestion();
			
			
		// },500)

		
	},[])
	
	useEffect(()=>{
		// if(answered){
			// setPickedCorrect(true);
		// }
		// setAnswers(answers)
		
		const singles=document.querySelectorAll('.single-question')
		
		if(answered &&(dNumberPicked===answerIndex)){
			console.log('simmer');
			//this means the answer is correct
			singles[dNumberPicked].classList.add('correct');
			increaseScore()
		}else if(answered &&(dNumberPicked!==answerIndex)){
			//this means the answer is wrong
			singles[dNumberPicked].classList.add('wrong');
			singles[answerIndex].classList.add('correct')
		}
		
	},[answered])
	
	const pickAnswer=(numberPicked)=>{
		setDNumberPicked(numberPicked);
		let newIndex= answers.indexOf(correct_answer);
			console.log(newIndex,answers,correct_answer);
		setAnswerIndex(newIndex);
		console.log('in picked');
		//this determines if the right answer was picked;
		// if(numberPicked===answerIndex){
			// setAnswered(true);
			// setPickedCorrect(true);
			// console.log(pickedCorrect);
		// }else{
			// setAnswered(true);
			// setPickedCorrect(false);
			// console.log(pickedCorrect);
		// }
		
		setAnswered(true);
		
		console.log(correct_answer);
		
	}
	
	const increaseScore=()=>{
		if(presentPlayer==='playerOne'){
			
		}
	}
	
	return(
		<div className="questions-box">
			<h3 className="question-bar">{singleQuestion}</h3>
			<div className="answers-bar">
				{
				answers.map((item, index)=>{
					
					
					return<p onClick={()=>pickAnswer(index)}
						className="single-question"
						key={index}><span>{index+1}</span>{item}</p>
				})
				}
			</div>
		</div>
	)
	
}

export default QuestionsBox;