import React, { Component } from 'react'

export default class RoomManager extends Component {

    constructor(){
        this.roomID = "";
        this.players = [];

        this.state = {
            status: 'waiting', //ingame
        }
    }

    render() {
        return (
            <div>
                <div>
                    <span> </span>
                </div>
            </div>
        )
    }
}
