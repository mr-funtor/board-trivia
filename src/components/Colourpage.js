import React from 'react';
import {useGlobalContext} from './context'

const Colourpage= ()=>{
	const {numberofPlayer,choosingState}=useGlobalContext();
	const words= (choosingState===1 && 'Player 1, Pick a Colour') || (choosingState===2 && 'Player 2, Pick a Colour')

	
	return(
		<div className="colourpage-container">
		{numberofPlayer===1?<p>Pick A Colour</p>: <p>{words}</p>}
			<div className="coloursBox">
				<button className="colour-button"  ></button>
				<button className="colour-button pink"></button>
				<button className="colour-button coral"></button>
				<button className="colour-button blue"></button>
				<button className="colour-button red"></button>
				
			</div>
			
		</div>
	)

}

export default Colourpage