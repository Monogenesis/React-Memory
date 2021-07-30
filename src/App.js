import { useState } from "react";
import "./App.css";
import MemGame from "./components/MemGame.js";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitterSquare, faGithubSquare } from "@fortawesome/free-brands-svg-icons"

export default function App() {
  const [reset, setReset] = useState(false);
  const [highscore, setHighscore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  return (
    <div className="App">
      <div className="App-header">
        <div class="headline">
          <div class="title">
            Memory
          </div>
          <div class="scores">
            <div class="score">
              Highscore: {highscore}s
            </div>
            <div class="score">
              Last score: {lastScore}s
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setReset(true);
              setTimeout(() => {
                setReset(false);
              }, 5);
            }}
          >
            Start Game
          </Button>
        </div>
        <div className="MemGame">
          {!reset ? <MemGame score={highscore} setScore={setHighscore} setLastScore={setLastScore} /> : <div>Resetting!</div>}
        </div>
        <div class="footer">
          made with React <br />
          by <br />
          <div class='creditName'>
            <div class='author'>Magdalena Köhler</div>
            <div class='socialLinks'>
              <a href={"https://github.com/LeniKoehler"} target="_blank">
                <FontAwesomeIcon icon={faGithubSquare} color='white' /></a>
            </div>
          </div>
          <br />
          <div class='creditName'>
            <div class='author'>Amadeus Zittel</div>
            <div class='socialLinks'>
              <a href={"https://github.com/Monogenesis"} target="_blank">
                <FontAwesomeIcon icon={faGithubSquare} color='white' /></a>
              <a href={"https://twitter.com/AmadeusZittel"} target="_blank">
                <FontAwesomeIcon icon={faTwitterSquare} color='#1DA1F2' /></a></div>
          </div>
        </div>
      </div>
    </div>
  );
}
