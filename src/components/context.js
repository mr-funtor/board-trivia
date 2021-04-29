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
		console.log('action payload',action.payload)
		if(state.presentPlayer==='playerOne'){
			const newScore=state.playerOne.score+action.payload;
			const player={...state.playerOne,score:newScore};
			return {...state,playerOne:player}
		}
		
		const newScore=state.playerTwo.score+action.payload;
		const player={...state.playerTwo,score:newScore};
		return {...state,playerTwo:player}
		
	}
	
	if(action.type==='BOARD_TRIGGER'){
		
		return{...state,boardTrigger:action.payload}
	}
	
	if(action.type==='GAME_STARTED'){
		
		return{...state,gameStarted:action.payload}
	}
	
	if(action.type==='DIG_QUESTION'){
		
		return{...state,gameStarted:action.payload}
	}
	
	if(action.type==='ENDGAME'){
		return{...state,endGameShow:true}
	}
	
	if(action.type==='DICE_NUMBER'){
		return{...state,diceNumber:action.payload}
	}
	
	
	return state
}

const initialState={
	gameStarted:false,
	isLoading:true,//this determines if the loading gif shows or not
	questions:[],
	numberofPlayer:0,
	presentPlayer:'playerOne',
	endGameShow:false,
	boardTrigger:false,
	diceNumber:0,
	playerOne:{
		colour: 'blue',
		movement:0,
		score:0,
		moveNumb:0,
	},
	playerTwo:{
		colour: 'blue',
		movement:0,
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
	const questionBoxRef=useRef(null);
	const [dNumberPicked, setDNumberPicked]=useState(null);
	const [answerIndex, setAnswerIndex]=useState(null);
	const [digQuestion, setDigQuestion]=useState(false);
	const [computerTrig, setComputerTrig]=useState(false);
	const [takeAction,setTakeAction]=useState('');
	
	
	
	
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
	
	useEffect(()=>{
		console.log(state);
	})
	
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
		
		rollDiceRef.current.classList.add('unclick');
		let newRandom= Math.floor(Math.random()*6)+1;
		setDiceShow(true)//mounts the page that shows the dice rolling
		dispatch({type:'DICE_NUMBER',payload:newRandom})
		console.log('dice number',newRandom)
		
		
		setTimeout(()=>{
			setDiceShow(false)//unmounts the page that shows the dice rolling
			playersNumber(newRandom);
		},1500)
	}
	
	//switches between player one and player two
	const switchPlayer=()=>{
		
			 dispatch({type:'SWITCH_PLAYER'})
			 
	}
	
	useEffect(()=>{
		if(Number(state.numberofPlayer)===1 && Number(state.presentPlayer==='playerTwo')){
				
					triggerSelection();
				}
		switchQuestion();
	},[state.presentPlayer])
	
	
	//this stores the present position where a player is
	const playersNumber=(numb)=>{
		// switchPlayer();
		console.log('numb', numb)
		if (state.presentPlayer==='playerOne'){
			console.log('in movement playerOne')
			let newNumber=state.playerOne.movement+numb;
			 dispatch({type:'UPDATE_PONE',payload:{newNumber,numb}});
			  // switchPlayer();
			  return dispatch({type:'BOARD_TRIGGER',payload:true})
		}
		
		console.log('out movement playerTwo')
		let newNumber=state.playerTwo.movement+numb;
		dispatch({type:'UPDATE_PTWO',payload:{newNumber,numb}});
		// switchPlayer();
		dispatch({type:'BOARD_TRIGGER',payload:true})
	}
	
	const switchQuestion=()=>{
		// setAnswered(false)
		
		// const newValue=questionValue+1;
		setQuestionValue( (questionValue)=>{
			let newValue=questionValue+1;
			if(newValue>1)newValue=0;
			return newValue;
		});
		console.log(questionValue)
		
		if(Number(state.numberofPlayer)===1 && state.presentPlayer==='playerTwo')return;
			
			// setAnswered(false);//this allows the answers to be clickable;
		
		
	}
	
	//this increases the scores for the players
	const increaseScore=(scoring)=>{
			dispatch({type:'INCREASE_SCORE',payload:scoring})
		console.log(state.playerOne)
	}
	
	
	//this makes the game come to an end
	const callEndGame=()=>{
		dispatch({type:'ENDGAME'})
	}
	
	
	//this makes the computer play the game
	
	const triggerSelection=()=>{
		// if(!state.gameStarted)dispatch({type:'GAME_STARTED',payload:true});
		
		setDigQuestion(true);
		// dispatch({type:'DIG_QUESTION',payload:true})//this triggers the useEffect that will get questions
		rollDice();
		
		
	}
	
	
	
	return(
		<AppContext.Provider value={{
			introLevel,
			setIntroLevel,
			...state,
			dispatch,
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
			callEndGame,
			triggerSelection,
			digQuestion, setDigQuestion,
			computerTrig, setComputerTrig,
			takeAction,setTakeAction,
			questionBoxRef,
		}}>
		{children}
		</AppContext.Provider>
	)
	
}

export const useGlobalContext=()=>{
	return useContext(AppContext)
}

export {AppContext, AppProvider};