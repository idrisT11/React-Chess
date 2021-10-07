import React, { Component } from 'react'
import Plateau from './Plateau/Plateau'

import PlayerIA from '../Class/IA'

const PIECE = {
    NULL: 0,
    PION: 1,
    CAVALIER: 2,
    TOUR: 3,
    FOU: 4,
    ROI: 5,
    REINE: 6
}
const COLOR = {
  BLANC: 1,
  NOIR: -1
}

export default class RoomManager extends Component {

    constructor(props){
        super(props);
        


        this.color = props.color;
        this.status = [
            [-3, -2, -4, -5, -6, -4, -2, -3],
            [-1, -1, -1, -1, -1, -1, -1, -1],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [3, 2, 4, 6, 5, 4, 2, 3],
        ];

        this.move = {
            previousPieceInfo:{
              x: 1,
              y: 1,
            },
            newPieceInfo:{
              x: 1,
              y: 1,
            },
            consumedPiece: PIECE.NULL
        }


        this.state = {
            turn: 0,
            playing: props.color === COLOR.BLANC ? true : false,
        }

        this.opponentType = 'IA';
        this.ia = new PlayerIA(this.status, -this.color);

    }

    letIAChoose(){

        let iaMove = this.ia.getIAMove();

        this.status[iaMove.newPieceInfo.y][iaMove.newPieceInfo.x] = 
                    this.status[iaMove.previousPieceInfo.y][iaMove.previousPieceInfo.x];
        this.move = {...iaMove};

        /*this.setState({
            turn: this.state.turn + 1
        });*/
    }

    comfirmMove(altCoord, newCoord){

        let consumedPiece = this.status[newCoord.y][newCoord.x],
            previousPieceInfo = altCoord,
            newPieceInfo = newCoord;

        this.status[newCoord.y][newCoord.x] = this.status[altCoord.y][altCoord.x];
        this.status[altCoord.y][altCoord.x] = PIECE.NULL;
        this.move = {previousPieceInfo, newPieceInfo, consumedPiece};


        if( this.opponentType === "IA" )
        {
            this.letIAChoose();
        }
        else
        {

        }
    }

    render() {
        return (
            <div>
                    <Plateau 
                        turn={this.state.turn}
                        color={this.props.color}
                        status={this.status}
                        move={this.move}
                        handleComfirmMove={(altCoord, newCoord)=>this.comfirmMove(altCoord, newCoord)}
                    />
            </div>
        )
    }
}


