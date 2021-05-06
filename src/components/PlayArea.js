import React from 'react';
import ScoreNav from './ScoreNav';
import QuestionsBox from './QuestionsBox';
import SquareBoard from './SquareBoard';
import ButtonsArea from './ButtonsArea';

const PlayArea=()=>{
	return(
		<article className="playArea">
			<ScoreNav/>
			<QuestionsBox />
			<div className="board-container">
				{window.matchMedia("(max-width: 400px)").matches && <SquareBoard />}
			</div>
			<ButtonsArea/>
		</article>
	)
	
}

export default PlayArea;