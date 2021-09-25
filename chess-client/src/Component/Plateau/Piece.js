import React, { Component } from 'react'
import { Spring, animated } from 'react-spring';

import '../../Style/Plateau.css'


export default class Piece extends Component {



    loadPieceUrl(pieceID){

        let url = '';
        let parentPath = '/Pieces/svgCommon/';

        let absValue = Math.abs(pieceID);

        switch (absValue) {
            case 1:
                url += 'pion';
                break;

            case 2:
                url += 'cavalier';
                break;

            case 3:
                url += 'tour';
                break;

            case 4:
                url += 'fou';
                break;

            case 5:
                url += 'roi';
                break;

            case 6:
                url += 'reine';
                break;

            default:
                break;
        }

        if(pieceID < 0)
            url += 'NOIR';

        else 
            url += 'BLANC';

        url += '.svg';


        return parentPath + url;
    }


    render() {
        let moving  = this.props.moving,
            isSelected =  this.props.isSelected,
            isEaten = this.props.isEaten;

        let cursor = (this.props.color * this.props.pieceID > 0 ? 'pointer' : 'initial');

        console.log(this.loadPieceUrl);        
        return (
            <Spring
                top={moving && isSelected ? this.props.newPosition.top : this.props.position.top}
                left={moving && isSelected ? this.props.newPosition.left : this.props.position.left}
                opacity={moving && isEaten ? '0' : '1'}
            >
                { styles => (
                    <animated.div
                        className={'pieceElement'}
                        style={{...styles, cursor}}
                    >
                        <img src={this.loadPieceUrl(this.props.pieceID)}>
    
                        </img>
                    </animated.div>
                )}
            </Spring>
        );
    }
}
