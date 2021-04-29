import React from 'react';
import {useGlobalContext} from './context';


const ButtonsArea=()=>{
	const{rollDice,rollDiceRef,triggerSelection}=useGlobalContext();
	
	
	return(
		<div className="buttons-area">
			<button>Reset</button>
			<button ref={rollDiceRef} onClick={triggerSelection}>Roll Dice</button>
		</div>
	)
	
}

export default ButtonsArea;