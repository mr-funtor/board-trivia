import React,{useState, useEffect} from 'react';
import {useGlobalContext} from './context';

const ScoreNav=()=>{
	const {playerOne,playerTwo, presentPlayer,numberofPlayer,questionValue}=useGlobalContext();
	const [turnWords, setTurnWords]=useState('');
	const [takeAction,setTakeAction]=useState('');
	// const navTurnRef=useRef(null);
	// const playerOneDisp=`${(presentPlayer==='playerOne' && numberofPlayer===1)?<h3></h3>()}`
	
	const playerTurn=()=>{
		setTakeAction('Roll Dice');
		// console.log('play out',presentPlayer,numberofPlayer)
		if(presentPlayer==='playerOne' && Number(numberofPlayer)===1){
			return setTurnWords('Your Turn');
		}else if(presentPlayer==='playerOne' && Number(numberofPlayer)===2){
			return setTurnWords('Player One');
		}
		
		if(presentPlayer==='playerTwo' && Number(numberofPlayer)===1){
			return setTurnWords('Computer\'s Turn');
		}else if(presentPlayer==='playerTwo' && Number(numberofPlayer)===2){
			return setTurnWords('Player Two');
		}
		
		
		
		
		//this shows/displays the actions the players should take 
		
		
	}
	
	
	
	//this triggers the function that displays the players turn and
	//what they should do
	useEffect(()=>{
		console.log('nav effect')
		playerTurn();
	},[presentPlayer])
	
	useEffect(()=>{
		if(playerOne.score===0 && playerOne.moveNumb===0)return setTakeAction('Roll Dice');
		setTakeAction('Pick An Answer');
	},[questionValue])
	
	return(
		<nav className="scoreNav">
			
			<ul 
			className={presentPlayer==='playerOne'?"personal-score active-player":'personal-score'} >
				
				<li>{Number(numberofPlayer===1)?'You':'Player One'}</li>
				<li>Score:<span>{playerOne.score}</span></li>
			</ul>
			
			<ul className={presentPlayer==='playerTwo'?"personal-score active-player":'personal-score'}>
				<li>{Number(numberofPlayer===2)?'Player Two':'Computer'}</li>
				<li>Score:<span>{playerTwo.score}</span></li>
			</ul>
			
			<h3 >{turnWords}</h3>
			<h3 >{takeAction}</h3>
		</nav>
	)
	
}

export default ScoreNav;