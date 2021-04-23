import React from 'react';
import ScoreNav from './ScoreNav';
import QuestionsBox from './QuestionsBox';
import ButtonsArea from './ButtonsArea';

const PlayArea=()=>{
	return(
		<article className="playArea">
			<ScoreNav/>
			<QuestionsBox />
			<ButtonsArea/>
		</article>
	)
	
}

export default PlayArea;