import React from 'react';
import {useGlobalContext} from './context';

const ScoreNav=()=>{
	const {playerOne,playerTwo, presentPlayer}=useGlobalContext();
	
	return(
		<nav className="scoreNav">
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