import React,{useState, useEffect} from 'react';
import {useGlobalContext} from './context';

const ScoreNav=()=>{
	const {playerOne,playerTwo, presentPlayer,numberofPlayer}=useGlobalContext();
	const [turnWords, setTurnWords]=useState('')
	// const navTurnRef=useRef(null);
	// const playerOneDisp=`${(presentPlayer==='playerOne' && numberofPlayer===1)?<h3></h3>()}`
	
	const playerTurn=()=>{
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
		
	}
	
	useEffect(()=>{
		console.log('nav effect')
		playerTurn();
	},[presentPlayer])
	
	return(
		<nav className="scoreNav">
			<h3 >{turnWords}</h3>
			<ul 
			className={presentPlayer==='playerOne'?"personal-score active-player":'personal-score'} >
				
				<li>Player 1</li>
				<li>Score:<span>{playerOne.score}</span></li>
			</ul>
			
			<ul className={presentPlayer==='playerTwo'?"personal-score active-player":'personal-score'}>
				<li>Computer</li>
				<li>Score:<span>{playerTwo.score}</span></li>
			</ul>
		</nav>
	)
	
}

export default ScoreNav;