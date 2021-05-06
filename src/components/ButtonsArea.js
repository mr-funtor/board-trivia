import React from 'react';
import {useGlobalContext} from './context';


const ButtonsArea=()=>{
	const{rollDice,rollDiceRef,triggerSelection,resetSelect}=useGlobalContext();
	
	
	return(
		<div className="buttons-area">
			<button onClick={resetSelect}><i class="fas fa-power-off"></i>Reset</button>
			<button ref={rollDiceRef} onClick={triggerSelection}><i class="fas fa-dice"></i>Roll Dice</button>
		</div>
	)
	
}

export default ButtonsArea;