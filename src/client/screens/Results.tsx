import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from "../store";
import { LineScalePulseOut } from 'react-pure-loaders'
import { Button, ButtonGroup, Dropdown, DropdownButton, Popover, OverlayTrigger, Card, CardGroup, Alert, Container, Row, Image, Col, CardDeck, ButtonToolbar, Accordion } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import './style/StyleResults.css';
import { CounterState } from '../store/resultsCounterStore/types';
import { History } from 'history';
import Confetti from 'react-confetti'



//Main report view
class Results extends Component<ResultsPageProps, ResultsPageState>{

    constructor(props: ResultsPageProps) {

        super(props)

    }

    //Set default date to
    async componentDidMount() {
    }



    pelletStorm() {
        return (
            <div>
                <Confetti canvasRef={this.context.canvas}
            colors={[
            // '#f44336', //red
            // '#e91e63', //pink
            // '#9c27b0', // purple
            // '#673ab7', // diff purple shade
            '#3f51b5', // blue
            '#2196f3', // diff blue shade
            '#03a9f4', // diff blue
            '#00bcd4', // diff blue
            '#003366', //dark blue
            // '#009688', // turquoise
            // '#4CAF50', // green
            // '#8BC34A', // diff green
            // '#CDDC39', // yellow
            // '#FFEB3B', // diff yellow
            // '#FFC107', // orange
            // '#FF9800', // diff orange
            // '#FF5722', // red orange
            'white' // grey
                ]}
            
            />
            <Image src='./pelletstorm.jpg' width="285px" height="597px"/>
            <p className="style-text">Welcome to the PelletStorm Guild!</p>
            </div>
        )
    }

    checkMage() {
        return (
            <div>
                <Confetti canvasRef={this.context.canvas}
            colors={[
            '#f44336', //red
            '#e91e63', //pink
            '#8b0000', // dark red
            '#f70027', //brighter red
            // '#9c27b0', // purple
            // '#673ab7', // diff purple shade
            // '#009688', // turquoise
            // '#4CAF50', // green
            // '#8BC34A', // diff green
            // '#CDDC39', // yellow
            // '#FFEB3B', // diff yellow
            // '#FFC107', // orange
            // '#FF9800', // diff orange
            // '#FF5722', // red orange
            'white'
                ]}
            
            />
            <Image src='./checkmage.jpg' width="285px" height="597px"/>
            <p className="style-text">Welcome to the CheckMage Guild!</p>
            </div>
        )
    }

    hiddenLotus() {
        return (
            <div>
                <Confetti canvasRef={this.context.canvas}
            colors={[
            // '#9c27b0', // purple
            // '#673ab7', // diff purple shade
            // '#009688', // turquoise
            // '#4CAF50', // green
            // '#8BC34A', // diff green
            '#CDDC39', // yellow
            '#FFEB3B', // diff yellow
            '#FFC107', // orange
            '#FF9800', // diff orange
            '#DAA520', // goldenrod
            // '#FF5722', // red orange
            'white'
                ]}
            
            />
            <img src='./hiddenlotus.jpg' width="285px" height="597px"/>
            <p className="style-text">Welcome to the Hidden Lotus Guild!</p>
            </div>
        )
    }


    banner() {
        console.log("yeet")
        console.log(this.props.data.resultGuildName)
        if (this.props.data.resultGuildName === "pelletstorm") {
            console.log("pelletstorm")
            return this.pelletStorm()
        } else if (this.props.data.resultGuildName === "checkmage") {
            console.log("checkmage")
            return this.checkMage()
        } else if (this.props.data.resultGuildName === "hiddenlotus") {
            console.log("hiddenlotus")
            return this.hiddenLotus()
        }
    }

    


    // Render
    render() {
        

        return (<div className="thingy">

                {this.banner()}

                
        </div>)
    }
}

const mapStateToProps = (state: AppState) => ({
    data: state.data,

});

export default connect(
    mapStateToProps, {  }
)(Results);

interface ResultsPageState {
}

interface ResultsPageProps {
    data: CounterState;
    history: History;
}



