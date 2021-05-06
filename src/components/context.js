import React, {useState,useEffect, useReducer, useContext, useRef} from 'react';

const AppContext= React.createContext();


const reducer =(state, action)=>{
	if(action.type==='SET_QUESTIONS'){
		console.log(action.payload)
		return {...state,stateQuestions:action.payload,isLoading:false}
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
	
	if(action.type==='RESET_PAGE'){
		if(action.payload==='show'){
			return {...state, resetShow:true}
		} 
		return {...state, resetShow:false}
	}
	
	if(action.type==='RESET_GAME'){
		const newPlayerOne={
			colour: state.playerOne.colour,
			movement:0,
			score:0,
			moveNumb:0,
		};
		
		const newPlayerTwo={
			colour: state.playerTwo.colour,
			movement:0,
			score:0,
			moveNumb:0,
		};
		
		return{...state,stateQuestions:[],presentPlayer:'playerOne',endGameShow:false,
		diceNumber:0,playerOne:{...newPlayerOne},playerTwo:{...newPlayerTwo}}
	}
	
	
	return state
}

const allQuestions='https://opentdb.com/api.php?amount=40&category=12&difficulty=easy&type=multiple'

const initialState={
	gameStarted:false,
	isLoading:true,//this determines if the loading gif shows or not
	stateQuestions:[],
	numberofPlayer:0,
	presentPlayer:'playerOne',
	endGameShow:false,
	boardTrigger:false,
	resetShow:false,
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
	
	
	let sudoQuestion=[];
	
	//fetch the questions from the API
	const fetchQuestions= async ()=>{
		dispatch({type:'SET_LOADING'})
		const response= await fetch(allQuestions);
		
		const data= await response.json();
		console.log(data);
		sudoQuestion=[...sudoQuestion,...data.results]
		console.log(sudoQuestion);
		dispatch({type:'SET_QUESTIONS',payload:sudoQuestion})
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
			if(newValue>state.stateQuestions.length)newValue=0;
				
			// if(newValue>state.stateQuestions.length-2){
				// fetchQuestions()//this calls in fresh questions
				// };
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
	
	//this resets the game
	const resetSelect=()=>{
		dispatch({type:'RESET_PAGE',payload:'show'})
	}
	
	const resetGame=(type)=>{
		if(type==='yes'){
			dispatch({type:'RESET_GAME',payload:'hide'})
		}
		
		//this hide the reset question page that pops up
		dispatch({type:'RESET_PAGE',payload:'hide'})
		fetchQuestions()
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
			 resetSelect,
			 resetGame,
			 
		}}>
		{children}
		</AppContext.Provider>
	)
	
}

export const useGlobalContext=()=>{
	return useContext(AppContext)
}

export {AppContext, AppProvider};