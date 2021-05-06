import React ,{useState,useEffect}from 'react';
import {useGlobalContext} from './context'

const EndGame=()=>{
	const {playerOne, playerTwo,numberofPlayer,resetGame}=useGlobalContext();
	const [winner, setWinner]=useState('');
	
	useEffect(()=>{
		console.log(playerOne.score,playerTwo.score,numberofPlayer,typeof(numberofPlayer))
		if(playerTwo.score===playerOne.score){
			return setWinner('It\'s A Draw ')
		}
		
		
		if(playerOne.score>playerTwo.score && Number(numberofPlayer)===1){
			console.log('You Wins')
			return setWinner('You Win')
		}else if(playerOne.score>playerTwo.score && Number(numberofPlayer)===2){
			 return setWinner('Player One Wins')
		}
		
		if(playerTwo.score>playerOne.score && Number(numberofPlayer)===1){
			console.log('Computer Wins')
			setWinner('Computer Wins')
		}else if(playerOne.score>playerTwo.score && Number(numberofPlayer)===2){
			setWinner('Player Two Wins')
		}
		
		
		
		
	})
return(
	<div className="end-game">
		<h2>Game Ended</h2>
		
		<h1>{winner}</h1>
		
		<h2>Scores</h2>
		
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
		
		<button onClick={()=>resetGame('yes')}><i class="fas fa-power-off"></i>Reset</button>
	
	</div>
)

}

export default EndGame