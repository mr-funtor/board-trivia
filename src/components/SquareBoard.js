import React, {useState,useEffect} from 'react';
import {useGlobalContext} from './context';

const SquareBoard=()=>{
	const [boardNumb, setBoardNumb]=useState([]);
	const [playerStage, setPlayerStage]=useState(4);
	const {playerOne, playerTwo,introLevel,presentPlayer}=useGlobalContext();
	
	let requiredNumber=[];
		for(let i=0; i<24; i++){
			// requiredNumber.push(i);
			const playerOneColour= `player-stage ${i===playerOne.movement && playerOne.colour}`;
				const playerTwoColour= `player-stage ${i===playerTwo.movement && playerTwo.colour}`;
				
			requiredNumber.push(<div className={`${i===playerOne.movement ?playerOneColour : playerTwoColour}`} key={i}></div>)
		}
	

	
	useEffect(()=>{
		
		setBoardNumb(requiredNumber);
	},[])
	console.log(playerOne.colour)
	
	useEffect(()=>{
		const allSquares=document.querySelectorAll('.player-stage');
		let diceNumber=1;
		if(presentPlayer==='playerOne'){
			diceNumber=playerOne.moveNumb;
			console.log('in dice one',diceNumber)
		}else{
			diceNumber=playerTwo.moveNumb;
			console.log('in dice two',diceNumber)
		}
		
		const trig=setInterval(()=>{
			if(presentPlayer==='playerOne'){
				allSquares.forEach((item)=>item.classList.remove(playerOne.colour))
			}else{
				allSquares.forEach((item)=>item.classList.remove(playerTwo.colour))
			}
			
			
			allSquares.forEach((square,index)=>{
				// square.className='player-stage';
				
				if(index===(playerOne.movement-diceNumber) && presentPlayer==='playerOne'){
					console.log('in playone  index')
					square.classList.add(playerOne.colour);
				}else if(index===(playerTwo.movement-diceNumber) && presentPlayer==='playerTwo'){
					square.classList.add(playerTwo.colour);
					console.log('in playtwo  index')
				}
			})
			
			diceNumber--;
			console.log(diceNumber)
			if(diceNumber<0){
				clearInterval(trig)
			}
			
		},500)
		
		// allSquares.forEach((square,index)=>{
			// square.className='player-stage';
			// if(index===playerTwo.movement){
				// console.log(typeof(playerTwo.colour))
				// square.classList.add(playerTwo.colour);
			// }
		// })
		
	},[playerTwo.movement,playerOne.movement])
	
	
	return(
		<article className="squareBoard">
		{boardNumb.map((item)=>{
			return item;
		})}
		
		
		</article>
	)
	
}

export default SquareBoard;