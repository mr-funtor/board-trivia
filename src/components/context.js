import React, {useState,useEffect, useReducer, useContext, useRef} from 'react';

const AppContext= React.createContext();

const allQuestions = {
    "response_code": 0,
    "results": [
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
        },
        {
            "category": "Entertainment: Music",
            "type": "multiple",
            "difficulty": "easy",
            "question": "Which brass instrument has the lowest pitch in an orchestra?",
            "correct_answer": "Tuba",
            "incorrect_answers": [
                "Trumpet",
                "Saxophone",
                "Trombone"
            ]
        },
        {
            "category": "Entertainment: Music",
            "type": "multiple",
            "difficulty": "easy",
            "question": "What was Rage Against the Machine&#039;s debut album?",
            "correct_answer": "Rage Against the Machine",
            "incorrect_answers": [
                "Evil Empire",
                "Bombtrack",
                "The Battle Of Los Angeles"
            ]
        },
        {
            "category": "Entertainment: Music",
            "type": "multiple",
            "difficulty": "easy",
            "question": "In Mean Girls, who has breasts that tell when it&#039;s raining?",
            "correct_answer": "Karen Smith",
            "incorrect_answers": [
                "Gretchen Weiners",
                "Janice Ian",
                "Cady Heron"
            ]
        },
        {
            "category": "Entertainment: Music",
            "type": "multiple",
            "difficulty": "easy",
            "question": "Sting, the lead vocalist of The Police, primarily plays what instrument?",
            "correct_answer": "Bass Guitar",
            "incorrect_answers": [
                "Drums",
                "Guitar",
                "Keyboards"
            ]
        },
        {
            "category": "Entertainment: Music",
            "type": "multiple",
            "difficulty": "easy",
            "question": "The 2016 song &quot;Starboy&quot; by Canadian singer The Weeknd features which prominent electronic artist?",
            "correct_answer": "Daft Punk",
            "incorrect_answers": [
                "deadmau5",
                "Disclosure",
                "DJ Shadow"
            ]
        },
        {
            "category": "Entertainment: Music",
            "type": "multiple",
            "difficulty": "easy",
            "question": "When was Gangnam Style uploaded to YouTube?",
            "correct_answer": "2012",
            "incorrect_answers": [
                "2013",
                "2014",
                "2011"
            ]
        },
        {
            "category": "Entertainment: Music",
            "type": "multiple",
            "difficulty": "easy",
            "question": "Who was &quot;Kung Fu Fighting&quot; in 1974?",
            "correct_answer": "Carl Douglas",
            "incorrect_answers": [
                "The Bee Gees",
                "Heatwave",
                "Kool &amp; the Gang"
            ]
        },
        {
            "category": "Entertainment: Music",
            "type": "multiple",
            "difficulty": "easy",
            "question": "Which of these are NOT a Men at Work song?",
            "correct_answer": "Basket Case",
            "incorrect_answers": [
                "Dr. Heckyll and Mr. Jive",
                "Who Can It Be Now?",
                "Be Good Johnny"
            ]
        }
    ]
}


// const allQuestions='https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple'

const reducer =(state, action)=>{
	if(action.type==='SET_QUESTIONS'){
		return {...state,questions:action.payload,isLoading:false}
	}
	
	if(action.type==='SET_LOADING'){
		return {...state,isLoading:true}
	}
	
	if(action.type==='PLAYERS_NUMBER'){
		return {...state,numberofPlayer:action.payload}
	}
	
	if(action.type==='PLAYERONE_COLOUR'){
		const player={...state.playerOne,colour: action.payload,}
		return{...state, playerOne:player};
	}
	
	if(action.type==='PLAYERTWO_COLOUR'){
		const player={...state.playerTwo,colour: action.payload,};
		return{...state, playerTwo:player};
	}
	
	if(action.type==='SWITCH_PLAYER'){
		if(state.presentPlayer==='playerOne'){
			return {...state,presentPlayer:'playerTwo'}
		}
		
		return {...state,presentPlayer:'playerOne'}
	}
	
	if(action.type==='UPDATE_PONE'){
		const player={...state.playerOne,movement: action.payload.newNumber,moveNumb:action.payload.numb};
		return{...state, playerOne:player};
	}
	
	if(action.type==='UPDATE_PTWO'){
		const player={...state.playerTwo,movement: action.payload.newNumber,moveNumb:action.payload.numb};
		return{...state, playerTwo:player};
	}
	
	if(action.type==='INCREASE_SCORE'){
		if(state.presentPlayer==='playerOne'){
			const newScore=state.playerOne.score+10
			const player={...state.playerOne,score:newScore};
			return {...state,playerOne:player}
		}
		
		const newScore=state.playerTwo.score+10
		const player={...state.playerTwo,score:newScore};
		return {...state,playerTwo:player}
		
	}
	
	
	return state
}

const initialState={
	isLoading:true,//this determines if the loading gif shows or not
	questions:[],
	numberofPlayer:0,
	presentPlayer:'playerOne',
	playerOne:{
		colour: 'blue',
		movement:5,
		score:0,
		moveNumb:0,
	},
	playerTwo:{
		colour: 'blue',
		movement:4,
		score:0,
		moveNumb:0,
	}
}

const AppProvider=({children})=>{
	const [state, dispatch]=useReducer(reducer, initialState);
	const [introLevel, setIntroLevel]=useState(0);//determines the options that shows at the beginning of the game
	const [choosingState, setChoosingState]=useState(1);
	const [trigger, setTrigger]=useState(null);//this triggers the useEffect to load more questions
	const [diceShow, setDiceShow]=useState(false);//determines if the dice page shows
	const [answered,setAnswered]=useState(false);
	const [questionValue, setQuestionValue]=useState(0);
	const selectPlayersRef=useRef(null);
	const rollDiceRef=useRef(null);
	const [dNumberPicked, setDNumberPicked]=useState(null);
	const [answerIndex, setAnswerIndex]=useState(null);
	
	
	
	
	//fetch the questions from the API
	const fetchQuestions= async ()=>{
		dispatch({type:'SET_LOADING'})
		const response= await fetch(allQuestions);
		const data= await response;
		dispatch({type:'SET_QUESTIONS',payload:data.results})
	}
	
	//this triggers the fetching of the question
	useEffect(()=>{
		fetchQuestions().catch(console.error);
	},[trigger])
	
	//sets the number of players for the game
	const pickPlayers=(e)=>{
		e.preventDefault();
		const chosenPlayers=selectPlayersRef.current.value;
		dispatch({type: 'PLAYERS_NUMBER', payload:chosenPlayers})
		setIntroLevel(1)
		setChoosingState(1)
	}
	
	//selects the colours of the seeds for the players
	
	const choosePlayerColour=(colour)=>{
		if (choosingState===1 && Number(state.numberofPlayer)===1){
			  dispatch({type:'PLAYERONE_COLOUR',payload:colour})
			  return setIntroLevel(2);
		}else if(choosingState===1 && Number(state.numberofPlayer)===2){
			dispatch({type:'PLAYERONE_COLOUR',payload:colour})
			return setChoosingState(2);
		}
		
		dispatch({type:'PLAYERTWO_COLOUR',payload:colour})
		setIntroLevel(2);
	}
	
	//function for rolling the dice
	let triggeri=0;
	const rollDice=()=>{
		setDiceShow(true);//mounts the page the shows the dice rolling
		rollDiceRef.current.classList.add('unclick');
		
		let newRandom;
		console.log(state)
		let triggerRoll=setInterval(()=>{
			
		if(triggeri===10){
			
			setDiceShow(false)
			console.log(newRandom)
			playersNumber(newRandom);
			clearInterval(triggerRoll);
			triggeri=0;
			
		}else{
			
			newRandom= Math.floor(Math.random()*6)+1;
			console.log(newRandom)
			// boxes.forEach((item)=>{
				// item.style.background='white';
			// })
			// boxes[randomNumber].style.background='red';
			triggeri++;
		}
			
		},200)
		
		
		
	}
	
	//switches between player one and player two
	const switchPlayer=()=>{
		
			 dispatch({type:'SWITCH_PLAYER'})
	}
	
	
	//this stores the present position where a player is
	const playersNumber=(numb)=>{
		// switchPlayer();
		console.log('numb', numb)
		if (state.presentPlayer==='playerOne'){
			console.log('in playerOne')
			let newNumber=state.playerOne.movement+numb;
			return dispatch({type:'UPDATE_PONE',payload:{newNumber,numb}});
			  // switchPlayer();
		}
		
		console.log('out playerTwo')
		let newNumber=state.playerTwo.movement+numb;
		dispatch({type:'UPDATE_PTWO',payload:{newNumber,numb}});
		// switchPlayer();
	}
	
	const switchQuestion=()=>{
		setAnswered(false);//this allows the answers to be clickable;
		// const newValue=questionValue+1;
		setQuestionValue( (questionValue)=>{
			let newValue=questionValue+1;
			if(newValue>1)newValue=0;
			return newValue;
		});
		console.log(questionValue)
		
	}
	
	//this increases the scores for the players
	const increaseScore=()=>{
		
			dispatch({type:'INCREASE_SCORE'})
		console.log(state.playerOne)
	}
	
	return(
		<AppContext.Provider value={{
			introLevel,
			setIntroLevel,
			...state,
			selectPlayersRef,
			pickPlayers,
			choosingState, setChoosingState,
			choosePlayerColour,
			rollDice,
			switchPlayer,
			setDiceShow,diceShow,
			rollDiceRef,
			increaseScore,
			answered,setAnswered,
			questionValue, setQuestionValue,
			dNumberPicked, setDNumberPicked,
			answerIndex, setAnswerIndex,
			switchQuestion,
		}}>
		{children}
		</AppContext.Provider>
	)
	
}

export const useGlobalContext=()=>{
	return useContext(AppContext)
}

export {AppContext, AppProvider};