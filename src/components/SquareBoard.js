import React, {useState,useEffect} from 'react';
import {useGlobalContext} from './context';

const SquareBoard=()=>{
	const [boardNumb, setBoardNumb]=useState([]);
	const [playerStage, setPlayerStage]=useState(4);
	const {dispatch,playerOne, playerTwo,introLevel,presentPlayer,switchQuestion,diceShow,
	callEndGame,increaseScore,boardTrigger,setComputerTrig,numberofPlayer,takeAction,setTakeAction,
	questionBoxRef,}=useGlobalContext();
	
	let requiredNumber=[];
		for(let i=0; i<24; i++){
			// requiredNumber.push(i);
			const playerOneColour= `player-stage ${i===playerOne.movement && playerOne.colour}`;
				const playerTwoColour= `player-stage ${i===playerTwo.movement && playerTwo.colour}`;
				
				if(i===6 || i==17){
					requiredNumber.push(<div className="player-stage bonus" key={i}>
			</div>)
				}else{
					requiredNumber.push(<div className={`${i===playerOne.movement ?playerOneColour : playerTwoColour}`} key={i}>
			</div>)
				}
			
		}
	

	
	useEffect(()=>{
		
		setBoardNumb(requiredNumber);
	},[])
	
	useEffect(()=>{
		dispatch({type:'BOARD_TRIGGER',payload:false});
	if (boardTrigger){
		const allSquares=document.querySelectorAll('.player-stage');
		let diceNumber=1;
		if(presentPlayer==='playerOne'){
			diceNumber=playerOne.moveNumb;
			console.log('in dice one',diceNumber)
		}else{
			diceNumber=playerTwo.moveNumb;
			console.log('in dice two',diceNumber)
		}
		
		
		console.log('movement number',playerOne.movement,playerTwo.movement)
		const trig=setInterval(()=>{
			if(presentPlayer==='playerOne'){
				allSquares.forEach((item)=>item.classList.remove(playerOne.colour))
			}else{
				allSquares.forEach((item)=>item.classList.remove(playerTwo.colour))
			}
			
			
			allSquares.forEach((square,index)=>{
				// square.className='player-stage';
				
				if(index===(playerOne.movement-diceNumber) && presentPlayer==='playerOne'){
					// console.log('in playone  index')
					square.classList.add(playerOne.colour);
				}else if(index===(playerTwo.movement-diceNumber) && presentPlayer==='playerTwo'){
					square.classList.add(playerTwo.colour);
					// console.log('in playtwo  index')
				}
			})
			
			diceNumber--;
			// console.log(diceNumber)
			if(diceNumber<0){
				console.log(presentPlayer,playerOne.movement)
				clearInterval(trig)
				
				//this checks if a player has gotten to the end
				if(presentPlayer==='playerOne' && Number(playerOne.movement)>23){
					callEndGame();
				}else if(presentPlayer==='playerTwo' && Number(playerTwo.movement)>23){
					callEndGame();
				}
				
				//this correspondence with where the bonus spots are
				if((Number(playerOne.movement)===6 || Number(playerOne.movement)===17) && presentPlayer==='playerOne'){
					console.log('in bonus player one')
					increaseScore(20)
				}else if((Number(playerTwo.movement)===6 || Number(playerTwo.movement)===17) && presentPlayer==='playerTwo'){
					increaseScore(20)
					console.log('in bonus player Two')
				}
				
				if(Number(numberofPlayer)===1 && Number(presentPlayer==='playerTwo')){
					setComputerTrig(true)
				}
				setTakeAction('Pick An Answer');//This reflects in the Score Nav
				
				//this makes the questions become visible
				questionBoxRef.current.classList.remove('invisible');
				
			}
			
			// if(diceNumber<0&&!diceShow){
				// switchQuestion()
			// }
			
		},500)
		
		
	}
	},[boardTrigger])

	
	
	return(
		<article className="squareBoard">
		{boardNumb.map((item)=>{
			return item;
		})}
		
		
		</article>
	)
	
}

export default SquareBoard;