import React from 'react';
import {useGlobalContext} from './context'

const InstructionsPage=()=>{
	const {setIntroLevel, playerOne}=useGlobalContext();
	
	return(
	<div className="instruct-page">
		<h2>How to play</h2>
		<ol>
			<li>Roll the dice to move across the board.</li>
			<li>When your tile reaches it's destination a question would pop up.</li>
			<li>Answer the question correctly to get 10 points.</li>
			<li>A player is awarded with an additional 20 if they land on a green box.</li>
			<li>The game ends once any player reaches the end of the board.</li>
			<li>Whoever has the highest score is the winner.</li>
			<li>NB: If only one person is playing, the computer immediately plays after you.</li>
			
		</ol>
		<button onClick={()=>setIntroLevel(3)}>I Understand</button>
	</div>
	)
}

export default InstructionsPage