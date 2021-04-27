import React from 'react';
import {useGlobalContext} from './context'

const Colourpage= ()=>{
	const {numberofPlayer,choosingState,choosePlayerColour}=useGlobalContext();
	const words= (choosingState===1 && 'Player 1, Pick a Colour') || (choosingState===2 && 'Player 2, Pick a Colour')

	
	return(
		<div className="colourpage-container">
		{numberofPlayer===1?<p>Pick A Colour</p>: <p>{words}</p>}
			<div className="coloursBox">
				<button className="colour-button"  onClick={()=>choosePlayerColour('black')}></button>
				<button className="colour-button pink" onClick={()=>choosePlayerColour('pink')}></button>
				<button className="colour-button coral" onClick={()=>choosePlayerColour('coral')}></button>
				<button className="colour-button blue" onClick={()=>choosePlayerColour('blue')}></button>
				<button className="colour-button red" onClick={()=>choosePlayerColour('red')}></button>
				
			</div>
			
		</div>
	)

}

export default Colourpage