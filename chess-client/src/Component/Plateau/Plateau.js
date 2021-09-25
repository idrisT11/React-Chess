import React from 'react';
import {Spring, animated} from 'react-spring';

import '../../Style/Plateau.css'
import Piece from './Piece';

const PIECE = {
    NULL: 0,
    PION: 1,
}

const COLOR = {
    BLANC: 1,
    NOIR: -1
}

class Plateau extends React.Component{

    constructor(props){
        super(props);

        this.playerColor = 1;
        this.newPosition = null;
        this.newPositionStyle = null;

        this.state = {
            selectedPiece: null,
            possibleMoves: null,
            moving: false,
        }

        
    }


    findPossibleMoves(x, y, tour){
        
        let table = toggleDirection(this.props.status, tour),
            possibleMoves = Array(8).fill(null).map(() => Array(8).fill(0));//Innit a 8x8 matrix (JS :/)


        y = (tour === COLOR.NOIR) ? y : 8-y-1;

        //PAWN
        //==============================================================
        if ( table[y][x] === PIECE.PION) 
        {
            let  pasclassique = false; // Si on peut fair un pas classique, on met cette variable a 1

            //CLASSICAL MOVE
            if ( table[y+1][x] === PIECE.NULL)
            {
                possibleMoves[y+1][x] = 1;
                pasclassique = true;
            }

            //FIRST MOVE
            if ( pasclassique && y === 1 )
            {

                if ( table[y+2][x] === PIECE.NULL )

                    possibleMoves[y+2][x] = 1;

            }

            //TAKING OPPONENT'S PIECE
            if ( y !== 7 ) 
            {
                if ( x !== 7 && table[y+1][x+1] * tour < 0)

                    possibleMoves[y+1][x+1] = 1;

                if ( x !== 0 && table[y+1][x-1] * tour < 0 )

                    possibleMoves[y+1][x-1] = 1;
            }

            console.log(possibleMoves);
        }

        return toggleDirection(possibleMoves, tour);
        
        function toggleDirection(table, tour){
            if( tour === COLOR.BLANC )
            {
                let newTable = new Array(8);

                for (let i = 0; i < 8; i++) 
                    newTable[i] = [...table[8-i-1]];

                return newTable;
            }
            else
                return table;

        }
    }

    handleClick(x, y){
        let table = this.props.status;


        //If we've clicked on a second on the selected piece
        if(this.state.selectedPiece && this.state.selectedPiece.x === x && this.state.selectedPiece.y === y)
        {
            this.setState({
                selectedPiece: null,
                possibleMoves: null
            });
        }

        //If we've clicked on a piece which is the same color as ours
        else if(table[y][x] !== 0 && table[y][x] * this.playerColor > 0)
        {
            
            this.setState({
                selectedPiece: {x , y},
                possibleMoves: this.findPossibleMoves(x, y, this.playerColor),
            });

        }
        
        //If we've selected a piece and clicked on a legit position to make a move
        else if ( this.state.selectedPiece && this.state.possibleMoves[y][x] == 1 )
        {
            this.newPosition = { x, y };
            this.newPositionStyle = {
                top: (y * 75) + 'px',
                left: (x * 75) + 'px',
            }
            this.setState({
                moving: true
            })
        }
        else
        {   
            this.setState({
                selectedPiece: null,
                possibleMoves: null
            });
        
        }
        
    }


    //Generate the bottom grid layer 
    generateGrille(selectedPiece, possibleMoves){

        let grilleCaseElements = [];
        let black = true;

        for (let i = 0; i < 64 ; i++) 
        {
            //Is the tile black ?
            if (i % 8 != 0)
                black = !black;

            //We get our current coordinates
            let x = i % 8,
                y = Math.floor(i / 8);

            //If the current tile corresponds to a selectedPiece, or if it corresponds to a "movable" location
            let isPieceSelected = selectedPiece !== null && (selectedPiece.x === x && selectedPiece.y === y),
                isMovePossible = possibleMoves !== null && possibleMoves[y][x];

            let color = black ? '#769656' : '#eeeed2';

            grilleCaseElements.push(
                //The first spring corresponds to the selected piece
                <Spring
                    key={i+'caseGrille'}
                    backgroundColor={ isPieceSelected ? '#e2e25f' : color}
                >
                { styles => (
                    <animated.div 
                        
                        className={black ? 'blackTile': 'whiteTile'}
                        style={{...styles}}
                    >  
                    
                    <Spring  //The second spring corresponds to the "movable" location
                        opacity={ isMovePossible ? '1' : '0'}
                    >
                    { styles => (
                        <animated.div                             
                            style={{...styles}}
                            className="possibleMoveIcon" 
                        >
                        </animated.div>
                    )}
                    </Spring>
                    
                        
                    </animated.div>
                )}
                </Spring>
                
            );

            
        }

        return grilleCaseElements;
    }

    generatePieces(selectedPiece, moving){

        let grillePieceElements = [];

        let precMove = this.props.move.previousPieceInfo,
            newMove = this.props.move.newPieceInfo;


        grillePieceElements.push( 
            loadMovedPiece.bind(this, precMove, newMove, this.props.status, this.playerColor)() 
        );

        for (let k = 0; k < 64 ; k++) 
        {
            let i = k % 8,
                j = Math.floor(k / 8);

            //If the tile isnt empty, nor has it been moved the previous turn
            if(this.props.status[i][j] !== 0 && ( i !== newMove.y || j !== newMove.x) )
            {   
                
                let isSelected = selectedPiece && (i === selectedPiece.y) && (j === selectedPiece.x),
                    isEaten = this.newPosition && (i === this.newPosition.y) && (j === this.newPosition.x);

                let position = {
                    top: ( i * 75 ) + 'px',
                    left: ( j * 75 ) + 'px',
                }
                
                grillePieceElements.push(

                    <Piece 
                        pieceID={this.props.status[i][j]}
                        isEaten={isEaten}
                        isSelected={isSelected}
                        moving={moving}

                        position={position}
                        newPosition={this.newPositionStyle}

                        key={k+'pieceGrille'}
                    />

                );
            }
            
        }

        return grillePieceElements;


        function loadMovedPiece(precMove, newMove, status, tour) {

            let cursor = (tour * status[newMove.y][newMove.x] > 0 ? 'pointer' : 'initial'),

                isEaten = this.newPosition && 
                        (newMove.y === this.newPosition.y) && 
                        (newMove.x === this.newPosition.x);
            
            return (
                <Spring
                    from={{top: (precMove.y*75) + 'px', left: ( precMove.x * 75 ) + 'px'}}
                    to={{top: (newMove.y*75) + 'px', left: ( newMove.x * 75 ) + 'px'}}

                    opacity={this.state.moving && isEaten ? 0 : 1}
                    key={99+'pieceGrille'}

                >
                {   styles => (

                    <animated.div 
                        style={{
                            ...styles, 
                            cursor
                        }}
                    >
                        <Piece 
                            pieceID={status[newMove.y][newMove.x]}
                            isEaten={isEaten}
                            isSelected={false}
                            moving={moving}

                            position={position}
                            newPosition={this.newPositionStyle}

                            key={k+'pieceGrille'}
                        />
                    </animated.div>

                )}
                </Spring>
            );
        }
    }

    generateClickLayer(){
    
        let grilleClickElements = [];

        for (let i = 0; i < 64 ; i++) 
        {
            let x = i % 8,
                y = Math.floor(i / 8);

            
            let isPlayersTile = this.props.status[y][x] * this.playerColor > 0,
                isMovePossible =  this.state.possibleMoves !== null && this.state.possibleMoves[y][x];

            grilleClickElements.push(
                <div 
                    key={i+'clickGrille'}
                    className={
                        (isMovePossible ? 'highLightedTile' : 'non-highLightedTile') + ' ' +
                        (isPlayersTile? 'playerTile' : 'adversaireTile') + ' ' + 
                        'clickableCase'
                    }


                    onClick={()=>this.handleClick(x, y)}
                >
                    
                </div>
            );

            
        }

        return grilleClickElements;
    }



    render(){
        return(
            <div id='plateauCTN'>
                {this.generateGrille(this.state.selectedPiece, this.state.possibleMoves)}

                <div id='piecesCTN' onClick={(e)=>this.handleClick(e)}>
                    {this.generatePieces(this.state.selectedPiece, this.state.moving)}
                </div>

                <div id='clickLayer'>
                    {this.generateClickLayer()}
                </div>
            </div>
        );
    }
}

export default Plateau;