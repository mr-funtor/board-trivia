import SquareBoard from './components/SquareBoard';
import PlayArea from './components/PlayArea';

function App() {
  return (
    <main >
		<section className="playing-field">
			<SquareBoard />
			<PlayArea />
		</section>
    </main>
  );
}

export default App;
