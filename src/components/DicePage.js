import React,{useState,useEffect} from 'react';
import {useGlobalContext} from './context';

const DicePage=()=>{
	const {diceNumber,presentPlayer,numberofPlayer}=useGlobalContext();
	const [dicing,setDicing]=useState(0);
	// const [words,setWords]=useState('');
	const words=()=>{
		// console.log('play out',presentPlayer,numberofPlayer)
		if(presentPlayer==='playerOne' && Number(numberofPlayer)===1){
			return 'Your Move';
		}else if(presentPlayer==='playerOne' && Number(numberofPlayer)===2){
			return 'Player One\'s Move';
		}
		
		if(presentPlayer==='playerTwo' && Number(numberofPlayer)===1){
			return 'Computer\'s Move';
		}else if(presentPlayer==='playerTwo' && Number(numberofPlayer)===2){
			return 'Player Two\'s Move';
		}
		
		
	}
	
	useEffect(()=>{
		setDicing(diceNumber);
	},[])
	
	return(
		<div className="dice-page">
			<h3>{words()}</h3>
			<h1>Dice Rolled</h1>
			<h2>{dicing}</h2>
		</div>
	)

}

export default DicePage