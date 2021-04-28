import React from 'react';
import {useGlobalContext} from './context';


const ButtonsArea=()=>{
	const{rollDice,rollDiceRef}=useGlobalContext();
	
	
	return(
		<div className="buttons-area">
			<button>Reset</button>
			<button ref={rollDiceRef} onClick={rollDice}>Roll Dice</button>
		</div>
	)
	
}

export default ButtonsArea;