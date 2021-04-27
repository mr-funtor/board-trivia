import React from 'react';
import {useGlobalContext} from './context'

const InstructionsPage=()=>{
	const {setIntroLevel, playerOne}=useGlobalContext();
	
	return(
	<>
		<p>How to play</p>
		<button onClick={()=>setIntroLevel(3)}>I Understand</button>
	</>
	)
}

export default InstructionsPage