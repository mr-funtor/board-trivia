import SquareBoard from './components/SquareBoard';
import PlayArea from './components/PlayArea';
import {useGlobalContext} from './components/context';

function App() {
	const {introLevel,isLoading,selectPlayersRef,pickPlayers}=useGlobalContext();
	
	if(isLoading){
		return(
		<main>
			<section className="playing-field">
				<p>loading</p>
			</section>
		</main>
		)
	}
	
	if(introLevel<4 && !isLoading){
		return(
		<main>
			<section className="playing-field">
			{introLevel===0 &&
			
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
			}

				
			</section>
		</main>
		)
	}

	
  return (
    <main >
		<section className="playing-field">
			{introLevel<4 && <SquareBoard />}
			{introLevel<4 && <PlayArea />}
		</section>
    </main>
  );
}

export default App;
