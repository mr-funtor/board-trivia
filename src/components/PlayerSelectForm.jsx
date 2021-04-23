import React from 'react';
import {useGlobalContext} from './components/context';

const PlayerSelectForm=()=>{
		const {selectPlayersRef,pickPlayers}=useGlobalContext();
	
	return(
		<div className="player-select-container">
					<form>
						<div className="option-box">
							<label htmlFor="players-tag">Please select number of players</label>
							<select id="players-tag" ref={selectPlayersRef}>
								<option>1</option>
								<option>2</option>
							</select>
						</div>
						<button type="submit" onClick={pickPlayers}>OK</button>
					</form>
				</div>
	)
	
}

export default PlayerSelectForm;