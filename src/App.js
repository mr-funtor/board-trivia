import Colourpage from './components/Colourpage';
import InstructionsPage from './components/InstructionsPage';
import SquareBoard from './components/SquareBoard';
import PlayArea from './components/PlayArea';
import DicePage from './components/DicePage';
import {useGlobalContext} from './components/context';

function App() {
	const {introLevel,isLoading,selectPlayersRef,pickPlayers,diceShow}=useGlobalContext();
	
	if(isLoading){
		return(
		<main>
			<section className="playing-field">
				<p>loading</p>
			</section>
		</main>
		)
	}
	
	if(introLevel<3 && !isLoading){
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
			
			{introLevel===1 && <Colourpage/>}
			
			{introLevel===2 && <InstructionsPage/>}

				
			</section>
		</main>
		)
	}

	
  return (
    <main >
		<section className="playing-field">
			 <SquareBoard />
			<PlayArea />
			{diceShow && <DicePage/>}
			
		</section>
    </main>
  );
}

export default App;
