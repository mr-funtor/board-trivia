import React from 'react';
import {useGlobalContext} from './context'

const EndGame=()=>{
return(
	<div className="end-game">
		<h2>Game Ended</h2>
		
		<p><span>{}</span>Wins</p>
		
		<h3>Scores</h3>
		
		<div className="score-board">
			
		</div>
	
	</div>
)

}

export default EndGame