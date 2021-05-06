import Colourpage from './components/Colourpage';
import InstructionsPage from './components/InstructionsPage';
import SquareBoard from './components/SquareBoard';
import PlayArea from './components/PlayArea';
import DicePage from './components/DicePage';
import EndGame from './components/EndGame';
import {useGlobalContext} from './components/context';


function App() {
	const {introLevel,isLoading,selectPlayersRef,pickPlayers,diceShow,endGameShow,resetShow,resetGame}=useGlobalContext();
	
	if(isLoading){
		return(
		<main>
			
				<div className="loading-page">
					<svg><rect></rect></svg>
				</div>
			
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
			{!window.matchMedia("(max-width: 700px)").matches && <SquareBoard />}
			<PlayArea />
			{diceShow && <DicePage/>}
			{endGameShow && <EndGame/>}
			
			{resetShow && <div className="reset-page">
				<h2>Are you sure?</h2>
				<div className="reset-answers">
					<button onClick={()=>resetGame('yes')}>Yes</button>
					<button onClick={()=>resetGame('no')}>No</button>
				</div>
			</div>}
		</section>
    </main>
  );
}

export default App;
