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
	const {increaseScore,switchPlayer,answered,rollDice,playerOne,playerTwo,
	setAnswered,questionValue,rollDiceRef,presentPlayer,numberofPlayer,
	// computerPlays,
	dNumberPicked, setDNumberPicked,answerIndex, setAnswerIndex}=useGlobalContext();
	// const [playNumb, setPlayNumb]=useState(0)
	const [questions, setQuestions]=useState(data);
	const [answers,setAnswers]=useState([]);
	const [singleQuestion, setSingleQuestion]=useState('');
	const [computerTrig, setComputerTrig]=useState(false);
	
	
	// const [pickedCorrect,setPickedCorrect]=useState(false);
	
	

	const{question, correct_answer,incorrect_answers}=questions[questionValue];
	
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

		
	},[questionValue])
	
	useEffect(()=>{
		// if(answered){
			// setPickedCorrect(true);
		// }
		// setAnswers(answers)
		console.log('inside answering',answered);
		const singles=document.querySelectorAll('.single-question')
		
		if(answered &&(dNumberPicked===answerIndex)){
			console.log('simmer');
			//this means the answer is correct
			singles[dNumberPicked].classList.add('correct');
			increaseScore();
			
		}else if(answered &&(dNumberPicked!==answerIndex)){
			//this means the answer is wrong
			// return console.log(answerIndex)
		singles[`${dNumberPicked ||0}`].classList.add('wrong');
			singles[`${answerIndex ||0}`].classList.add('correct')
			console.log('not simmerr');
			
		}
		
		if(answered){
		setTimeout(()=>{
			singles[dNumberPicked].classList.remove('wrong');
			singles[answerIndex].classList.remove('correct');
			
			// setAnswers([]);
			if(presentPlayer==='playerOne'){
				setSingleQuestion('Computer Rolls');
			}else{
				setSingleQuestion('Roll Dice');
			}
			
			
			rollDiceRef.current.classList.remove('unclick');
		},2000)}
		
		if(answered){
		setTimeout(()=>{
			switchPlayer();
		},1500);
		
		// setTimeout(()=>{
			// computerPlays();
		// },2000)
		
		
		}
		
		
		
	},[answered])
	
	// useEffect(()=>{
		// const singles2=document.querySelectorAll('.single-question')
		// console.log('out sng effect',questionValue)
		// if(questionValue>0){
			// console.log('in sng effect')
			// singles2[`${dNumberPicked || 0}`].classList.remove('wrong');
		// singles2[`${answerIndex || 0}`].classList.remove('correct');
		// }
	// },[questionValue])
	
	const pickAnswer=(numberPicked)=>{
		setDNumberPicked(numberPicked);
		let newIndex= answers.indexOf(correct_answer);
			console.log(newIndex,answers,correct_answer);
		setAnswerIndex(newIndex);
		console.log('in picked answerIndex', answerIndex);
		
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
	
	// useEffect(()=>{
		
	// },[dNumberPicked]);
	
	
	
	useEffect(()=>{
		console.log('inside computer');
		if(Number(numberofPlayer)===2 || presentPlayer==='playerOne')return;
		console.log('computer plays');
		
		
		
		setTimeout(()=>{
			
			rollDice();
			
			
		},1000)
		
		setTimeout(()=>{
			setComputerTrig(true);
		},6000)
		
	
			
		
		
	},[presentPlayer])
	
	useEffect(()=>{
		if(computerTrig){
		let newRandom= Math.floor(Math.random()*4);
		let newIndex= answers.indexOf(correct_answer);
		console.log(newIndex,correct_answer)
			console.log(answered);
			setDNumberPicked(newRandom);
			setAnswerIndex(newIndex);
			setAnswered(true);
			setComputerTrig(false);
		}
	},[computerTrig])
	
	
	
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