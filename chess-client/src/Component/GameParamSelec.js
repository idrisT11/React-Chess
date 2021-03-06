import React, { Component } from 'react'

import '../Style/font/font.css'
import '../Style/GameParamSelec.css'

export default class GameParamSelec extends Component {
    constructor(props){
        super(props);

        this.state = {
            color: 'ALEA',
        }
    }

    go(){
        this.props.validate({
            color: this.state.color
        });
    }

    render() {
        return (
            <div id="GameParamOVERLAYCTN">
            <div id="GameParamCTN">

                <div id="popupHeaderCTN">
                    <img width="40px" height="40px" src="x.svg" id="Xbtn"
                        onClick={this.props.handleHideParam}
                        alt="غلق"
                    />
                    <h1>
                        مميزات اللعبة
                    </h1>
                </div>

                <hr width="90%" style={{backgroundColor: 'black'}} />

                <div>

                    <h2 class="popUpSetting">اختر مدت اللعبة</h2>
                    <div>
                        <button className="popupSelectionBTN">5</button>
                        <button className="popupSelectionBTN">10</button>
                        <button className="popupSelectionBTN">20</button>
                    </div>
                </div>

                <div>

                    <h2 class="popUpSetting">اختر كلمة السرية للادخول</h2>
                    <div>
                        <div>
                            <p></p>
                            <input type="text" disabled="true"/>
                        </div>
                    </div>
                </div>

                <div>

                    <h2 class="popUpSetting">اختر لون قطعك</h2>
                    <img src="Pieces/svgCommon/pionBLANC.svg" class="colorBTN"

                        id={this.state.color === 'BLANC' ? 'selectedColorBTN' : 'none'}
                        alt="أبيض"

                        onClick={()=>this.setState({color: 'BLANC'})}
                    />

                    <img src="Pieces/svgCommon/pionNOIRBLANC.svg" class="colorBTN"

                        id={this.state.color === 'ALEA' ? 'selectedColorBTN' : 'none'}
                        alt="عشوائي"
                        onClick={()=>this.setState({color: 'ALEA'})}
                    />

                    <img src="Pieces/svgCommon/pionNOIR.svg" class="colorBTN"

                        id={this.state.color === 'NOIR' ? 'selectedColorBTN' : 'none'}
                        alt="أسود"
                        onClick={()=>this.setState({color: 'NOIR'})}
                    />
                </div>
                
                <div>
                    <button  id="popupBTN" onClick={this.go.bind(this)}>إبدأ</button>
                </div>
            </div>
            </div>
        )
    }
}
