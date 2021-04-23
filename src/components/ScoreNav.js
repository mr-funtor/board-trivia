import React from 'react'

const ScoreNav=()=>{
	return(
		<nav className="scoreNav">
			<ul id="active-player">
				<li>Player 1</li>
				<li>Score:<span>0</span></li>
			</ul>
			
			<ul>
				<li>Computer</li>
				<li>Score:<span>0</span></li>
			</ul>
		</nav>
	)
	
}

export default ScoreNav;