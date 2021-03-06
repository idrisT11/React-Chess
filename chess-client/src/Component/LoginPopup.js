import React, { Component } from 'react'

import '../Style/font/font.css'
import '../Style/LoginPopup.css'

export default class LoginPopup extends Component {

    constructor(props){
        super(props);

        this.name = "";
        this.email = "";
        this.mdp = "";
        this.reMdp = "";


        this.state = {
            inscriptionMode: false,
            inscriptionConfirmed: false,

            nameError: false,
            emailError: false,
            mdpError: false,
            reMdpError: false,
        }
    }

    handleServerError(errorString, where='sign'){

    }

    executeSignIn(obj){
        console.log("signed", obj);
    }

    executeLogin(obj){
        console.log("logged", obj);
    }

    signAjax(){
        let gibtError = false;

        let errors = {
            nameError: false,
            emailError: false,
            mdpError: false,
            reMdpError: false,   
        }

        errors.emailError = ( this.email.length === 0 || false);
        errors.mdpError = ( this.mdp.length < 8 );
        errors.reMdpError = ( this.reMdpError !== this.mdp );
        errors.nameError = ( this.name.length === 0 );

        

        //Detecte local errors
        for (const errorType in errors) 
            gibtError  |= errors[errorType]
        
        if (gibtError) 

            this.setState(errors);
        //If there are no local errors, we send a request
        else 
        {
            let dataObject = {
                name: this.name,
                email: this.email,
                password: this.password
            };

            let xhttp = new XMLHttpRequest();
            let self = this;

            xhttp.onreadystatechange = ()=>{

                if (this.readyState === 4 && this.status === 200) 
                {
                    let rawJSON = xhttp.responseText;
                    let objRes = JSON.parse(rawJSON);

                    if(objRes.status)

                        self.executeSignIn(objRes);

                    else 

                        self.handleServerError(objRes.errorMessage, 'sign');
                }
            }

            xhttp.open("Post", "sign", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            let dataURL = new URLSearchParams(dataObject).toString();
            xhttp.send(dataURL);
        }
        
    }

    loginAjax(){
        let gibtError = false;

        let errors = {
            nameError: false,
            mdpError: false,
        }

        errors.nameError = ( this.name.length === 0 );
        errors.mdpError = ( this.mdp.length === 0 );
        

        //Detecte local errors
        for (const errorType in errors) 
            gibtError  |= errors[errorType]
        
        if (gibtError) 

            this.setState(errors);

        //If there are no local errors, we send a request
        else 
        {
            let dataObject = {
                name: this.name,
                password: this.password
            };

            let xhttp = new XMLHttpRequest();
            let self = this;

            xhttp.onreadystatechange = ()=>{

                if (this.readyState === 4 && this.status === 200) 
                {
                    let rawJSON = xhttp.responseText;
                    let objRes = JSON.parse(rawJSON);

                    if(objRes.status)

                        self.executeLogin(objRes);

                    else 

                        self.handleServerError(objRes.errorMessage, 'login');
                }
            }

            xhttp.open("Post", "login", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            let dataURL = new URLSearchParams(dataObject).toString();
            xhttp.send(dataURL);
        }
        
    }


    

    showInscriptionScreen(){

        return (
            <div id="LoginPopup-CTN">


                <div id="loginHeaderCTN">
                    <img width="40px" height="40px" src="x.svg" id="XbtnLogin"
                        onClick={this.props.handleHideLogin}
                    />
                    <h1>
                        ??????????   
                    </h1>
                </div>

                <hr width="90%" style={{backgroundColor: 'black'}}/>

                <div className="popupElements">
                    <input type="text" onChange={(e)=>this.email = e.target.value}/>
                    <label>:?????????? ???????????? ????????????????????</label> 
                </div>

                <div className="popupElements">
                    <input type="text"  onChange={(e)=>this.name = e.target.value}/>
                    <label>:????????</label> 
                </div>
                <div className="popupElements">
                    <input type="password"  onChange={(e)=>this.mdp = e.target.value}/> 
                    <label>:???????? ????????????</label> 
                </div>
                <div className="popupElements">
                    <input type="password"  onChange={(e)=>this.reMdp = e.target.value}/> 
                    <label>:?????????? ???????????? ???????????? </label> 
                </div>

                <div id="btnPopUp-CTN">

                    <hr width="90%" style={{backgroundColor: 'black'}}/>
                    
                    <button 
                        className="LoginButton"
                        onClick={this.signAjax.bind(this)}
                    >
                        ?????????? ??????????????   
                    </button>
                </div>
            </div>
        );

    }

    showConnexionScreen(){
        return(

        <div id="LoginPopup-CTN">

            <div id="loginHeaderCTN">
                <img width="40px" height="40px" src="x.svg" id="XbtnLogin"

                    onClick={this.props.handleHideLogin}
                />
                <h1>
                    ?????????????? 
                </h1>
            </div>
            <hr width="90%" style={{backgroundColor: 'black'}}/>

            <div className="popupElements">
                
                <input type="text" onChange={(e)=>this.name = e.target.value}/>
                <label>:????????</label> 
            </div>
            <div className="popupElements">
                <input type="password"  onChange={(e)=>this.mdp = e.target.value}/> 
                <label>:???????? ????????????</label> 
            </div>

            <div className="popupElements">
                <a href="#">???? ???????? ???????? ???????????? ???????????? ??????</a>
            </div>

            <div id="btnPopUp-CTN">
                <button className="LoginButton">
                    ????????    
                </button>

                <hr width="90%" style={{backgroundColor: 'black'}}/>
                
                <button className="LoginButton" onClick={()=>this.setState({inscriptionMode: true})}>
                    ??????????   
                </button>
            </div>

        </div>

        );
    }

    showInscriptionComfirmed(){
        return(

            <div id="LoginPopup-CTN">
    
                <div id="loginHeaderCTN">
                    <img width="40px" height="40px" src="x.svg" id="XbtnLogin"
    
                        onClick={this.props.handleHideLogin}
                    />
                    <h1>
                        ! ???????? 
                    </h1>
                </div>
                <hr width="90%" style={{backgroundColor: 'black'}}/>
    
                <div className="popupElements" id="titlePopupLog">
                    ???????? ???? ??????????  
                </div> 
                <div className="popupElements">
                    ?????? ???? ?????? ?????????? ?????????????????? ???? ?????????? ???????????? ???????????????????? ?????????? ?????? ???????????? ???? ?????????? 
                </div>

                <div id="btnPopUp-CTN">
                    <button className="LoginButton" 
                    onClick={()=>this.setState({
                        inscriptionMode: false,
                        inscriptionConfirmed: false,
                    })}>
                        ????????     
                    </button>
                </div>
    
            </div>
    
            );
    }

    render() {
        return (
            <div id="LoginPopupOVERLAY-CTN">
               {this.state.inscriptionMode && !this.state.inscriptionConfirmed &&
                    this.showInscriptionScreen()
               }
               {!this.state.inscriptionMode && !this.state.inscriptionConfirmed &&
                    this.showConnexionScreen()
               }
               { this.state.inscriptionConfirmed &&
                    this.showInscriptionComfirmed()
               }
            </div>
        )
    }
}
