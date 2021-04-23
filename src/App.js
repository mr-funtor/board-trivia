import SquareBoard from './components/SquareBoard';
import PlayArea from './components/PlayArea';
import {useGlobalContext} from './components/context';

function App() {
	const {introLevel,isLoading}=useGlobalContext();
	
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
				<p>this is the click place</p>
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
