import React, {useState,useEffect, useReducer, useContext} from 'react';

const AppContext= React.createContext();

const allQuestions='https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple'

const reducer =(state, action)=>{
	if(action.type==='SET_QUESTIONS'){
		return {...state,questions:action.payload,isLoading:false}
	}
	
	if(action.type==='SET_LOADING'){
		return {...state,isLoading:true}
	}
	
	return state
}

const initialState={
	isLoading:true,//this determines if the loading gif shows or not
	questions:[],
}

const AppProvider=({children})=>{
	const [state, dispatch]=useReducer(reducer, initialState);
	const [introLevel, setIntroLevel]=useState(0);
	const [trigger, setTrigger]=useState(null);//this triggers the useEffect to load more questions
	
	//fetch the questions from the API
	const fetchQuestions= async ()=>{
		dispatch({type:'SET_LOADING'})
		const response= await fetch(allQuestions);
		const data= await response.json();
		dispatch({type:'SET_QUESTIONS',payload:data.results})
	}
	
	//this triggers the fetching of the question
	useEffect(()=>{
		fetchQuestions().catch(console.error);
	},[trigger])
	
	return(
		<AppContext.Provider value={{
			introLevel,
			setIntroLevel,
			...state,
		}}>
		{children}
		</AppContext.Provider>
	)
	
}

export const useGlobalContext=()=>{
	return useContext(AppContext)
}

export {AppContext, AppProvider};