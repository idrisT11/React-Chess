import React, { Component } from 'react'
import Header from './Header';
import LoginPopup from './LoginPopup';

import Plateau from "./Plateau/Plateau";

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

export default class AppCTN extends Component {

    constructor(props){
        super( props );

        this.state = {
            displayLoginPopUp: false,
        }

    }

    handleDisplayLogin(){
        this.setState({displayLoginPopUp : true});
    }
    handleHideLogin(){
        this.setState({displayLoginPopUp : false});
    }

    render() {
        return (
            <div style={{margin:'auto'}}>

                <Header 
                    handleDisplayLogin={this.handleDisplayLogin.bind(this)}
                />
                
                <center>
                    <Plateau 
                        status={plateauStatus}
                        move={move}
                    />
                    
                </center>

                {this.state.displayLoginPopUp && 
                    <LoginPopup
                        handleHideLogin={this.handleHideLogin.bind(this)}
                    />
                } 
    
          </div>
        )
    }
}
