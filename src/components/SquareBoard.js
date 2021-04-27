import React, {useState,useEffect} from 'react';
import {useGlobalContext} from './context';

const SquareBoard=()=>{
	const [boardNumb, setBoardNumb]=useState([]);
	const [playerStage, setPlayerStage]=useState(4);
	const {playerOne, playerTwo}=useGlobalContext();
	
	let requiredNumber=[];
		for(let i=0; i<24; i++){
			requiredNumber.push(i);
		}
	
	useEffect(()=>{
		
		setBoardNumb(requiredNumber);
	},[])
	console.log(playerOne.colour)
	return(
		<article className="squareBoard">
		{
			boardNumb.map((number, index)=>{
				return <div className={index===playerStage&&`player-stage ${playerOne.colour}`} key={index}></div>
			})
		}
		</article>
	)
	
}

export default SquareBoard;