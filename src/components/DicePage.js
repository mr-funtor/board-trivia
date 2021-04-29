import React,{useState,useEffect} from 'react';
import {useGlobalContext} from './context';

const DicePage=()=>{
	const {diceNumber}=useGlobalContext();
	const [dicing,setDicing]=useState(0);
	// const [words,setWords]=useState('');
	
	useEffect(()=>{
		setDicing(diceNumber);
	},[])
	
	return(
		<div className="dice-page">
			<h1>Dice Rolled</h1>
			<h2>{dicing}</h2>
		</div>
	)

}

export default DicePage