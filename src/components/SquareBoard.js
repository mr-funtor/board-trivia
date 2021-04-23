import React, {useState,useEffect} from 'react'

const SquareBoard=()=>{
	const [boardNumb, setBoardNumb]=useState([]);
	const [playerStage, setPlayerStage]=useState(4);
	
	let requiredNumber=[];
		for(let i=0; i<24; i++){
			requiredNumber.push(i);
		}
	
	useEffect(()=>{
		
		setBoardNumb(requiredNumber);
	},[])
	
	return(
		<article className="squareBoard">
		{
			boardNumb.map((number, index)=>{
				return <div className={index===playerStage&&'player-stage pink'} key={index}></div>
			})
		}
		</article>
	)
	
}

export default SquareBoard;