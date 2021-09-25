import {Spring, animated} from 'react-spring';
import Header from './Component/Header';

import Plateau from "./Component/Plateau/Plateau";

const PIECE = {
  NULL: 0,
  PION: 1,
}
const COLOR = {
  BLANC: 1,
  NOIR: -1
}
const plateauStatus = [
  [-3, -2, -4, -5, -6, -4, -2, -3],
  [-1, 0, -1, -1, -1, -1, -1, -1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, -1, 0, -1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 1, 1, 1],
  [3, 2, 4, 6, 5, 4, 2, 3],
];

const move = {
  previousPieceInfo:{
    x: 1,
    y: 1,
  },
  newPieceInfo:{
    x: 1,
    y: 4,
  },
  consumedPiece: PIECE.PION
}

function App() {
  return (
    <div className="App">
      <Spring
        from={{opacity: 0}}
        to={{opacity: 1}}
      >
      {(styles =>(
          <animated.div style={{...styles, margin:'auto'}}>
            <Header />
            <center>
              <Plateau 
                status={plateauStatus}
                move={move}
              />
            </center> 
          </animated.div>
      ))}
      </Spring>

    </div>
  );
}

export default App;
