import React ,{useState,useEffect}from 'react';
import {useGlobalContext} from './context'

const EndGame=()=>{
	const {playerOne, playerTwo,numberofPlayer}=useGlobalContext();
	const [winner, setWinner]=useState('');
	
	useEffect(()=>{
		if(playerTwo.score===playerOne.score){
			return setWinner('It\'s A Draw ')
		}
		
		
		if(playerOne.score>playerTwo.score && Number(numberofPlayer)===1){
			return setWinner('You Win')
		}else if(playerOne.score>playerTwo.score && Number(numberofPlayer)===1){
			 return setWinner('Player One Wins')
		}
		
		if(playerTwo.score>playerOne.score && Number(numberofPlayer)===2){
			setWinner('Computer Wins')
		}else if(playerOne.score>playerTwo.score && Number(numberofPlayer)===2){
			setWinner('Player Two Wins')
		}
		
		
		
		
	})
return(
	<div className="end-game">
		<h2>Game Ended</h2>
		
		<p>{winner}</p>
		
		<h3>Scores</h3>
		
		<div className="score-board">
			<ul>
				<li>{Number(numberofPlayer)===1?'Your Score':'Player One'}</li>
				<li>{playerOne.score}</li>
			</ul>
			
			<ul>
				<li>{Number(numberofPlayer)===2?'Player Two':'Computer\'s Score'}</li>
				<li>{playerTwo.score}</li>
			</ul>
		</div>
	
	</div>
)

}

export default EndGame