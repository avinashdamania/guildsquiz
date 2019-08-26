import React, { FormEvent, Component } from 'react';
import { connect } from 'react-redux'
import { AppState } from '../store'
import { History } from 'history';

import { LineScalePulseOut } from 'react-pure-loaders'


import './style/StyleResults.css'


import { Form, Row, Col, Button, ButtonGroup, Spinner, OverlayTrigger, Tooltip, ButtonToolbar, DropdownButton, Dropdown } from 'react-bootstrap'
import ReactDOM from 'react-dom';
import {submitButtonClickedThunk} from '../thunk/index'








//Main report view
class Questions extends Component<QuestionsPageProps, QuestionsPageState>{
    //Bind functions and set up state
    constructor(props: QuestionsPageProps) {
        super(props)
        this.state = {
            question1: "choose!",
            question2: "choose!",
            question3: "choose!",
            question4: "choose!",
            question5: "choose!",
            question6: "choose!",
            question7: "choose!",
            question8: "choose!",
            question9: "choose!",
            pelletStorm: 0,
            checkMage: 0,
            hiddenLotus: 0,
            enableButton: true,
            currentQuestion: 1
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    async componentDidMount() {
    }

    async handleSubmit() {
        let temp = this.checkAllQuestionsAnswered()
        if (temp) {
            console.log("starting calculations")
            console.log(this.state)

            await this.calculateQuestion1()
            console.log("finished question 1, ps: " + this.state.pelletStorm + ", cm: " + this.state.checkMage + ", hl: " + this.state.hiddenLotus)
            await this.calculateQuestion2()
            console.log("finished question 2, ps: " + this.state.pelletStorm + ", cm: " + this.state.checkMage + ", hl: " + this.state.hiddenLotus)
            await this.calculateQuestion3()
            console.log("finished question 3, ps: " + this.state.pelletStorm + ", cm: " + this.state.checkMage + ", hl: " + this.state.hiddenLotus)
            await this.calculateQuestion4()
            console.log("finished question 4, ps: " + this.state.pelletStorm + ", cm: " + this.state.checkMage + ", hl: " + this.state.hiddenLotus)
            await this.calculateQuestion5()
            console.log("finished question 5, ps: " + this.state.pelletStorm + ", cm: " + this.state.checkMage + ", hl: " + this.state.hiddenLotus)
            await this.calculateQuestion6()
            console.log("finished question 6, ps: " + this.state.pelletStorm + ", cm: " + this.state.checkMage + ", hl: " + this.state.hiddenLotus)
            await this.calculateQuestion7()
            console.log("finished question 7, ps: " + this.state.pelletStorm + ", cm: " + this.state.checkMage + ", hl: " + this.state.hiddenLotus)
            await this.calculateQuestion8()
            console.log("finished question 8, ps: " + this.state.pelletStorm + ", cm: " + this.state.checkMage + ", hl: " + this.state.hiddenLotus)
            await this.calculateQuestion9()
            console.log("finished question 9, ps: " + this.state.pelletStorm + ", cm: " + this.state.checkMage + ", hl: " + this.state.hiddenLotus)

            console.log(this.state)
            let ps = this.state.pelletStorm
            let cm = this.state.checkMage
            let hl = this.state.hiddenLotus

            console.log("ps: " + ps)
            console.log("cm: " + cm)
            console.log("hl: " + hl)
            console.log(ps > cm)
            if (ps > cm && ps > hl) {
                console.log("doing ps")
                await this.props.submitButtonClickedThunk("pelletstorm", ps, cm, hl)
                console.log("done1")
            } else if (cm > ps && cm > hl) {
                console.log("doing cm")
                await this.props.submitButtonClickedThunk("checkmage", ps, cm, hl)
                console.log("done1")
            } else if (hl > ps && hl > cm) {
                console.log("doing hl")
                await this.props.submitButtonClickedThunk("hiddenlotus", ps, cm, hl)
                console.log("done1")
            }
            console.log("done2")
            this.props.history.push('/mainPage')
        }

    }

    handleKeyPress(target: any) {
        if (target.charCode == 13) {
            this.handleSubmit()
        }
    }


    validateInputs() {
        let tournamentName = (document.getElementById("tournamentName") as HTMLInputElement) ? ((document.getElementById("tournamentName") as HTMLInputElement).value).toString() : "unnamed-tournament";
        let numNonStreamSetups = (document.getElementById("numNonStreamSetups") as HTMLInputElement) ? parseInt((document.getElementById("numNonStreamSetups") as HTMLInputElement).value) : -1;
        let numStreamSetups = (document.getElementById("numStreamSetups") as HTMLInputElement) ? parseInt((document.getElementById("numStreamSetups") as HTMLInputElement).value) : -1;
        console.log(numNonStreamSetups + " " + numStreamSetups)
        if (tournamentName === "unnamed-tournament" || tournamentName === "" || numNonStreamSetups === -1 || numStreamSetups === -1 || numNonStreamSetups.toString() === "NaN" || numStreamSetups.toString() === "NaN") {
            this.setState({ enableButton: false })
        } else {
            this.setState({ enableButton: true })
        }

    }

    checkAllQuestionsAnswered() {
        console.log(this.state)
        if (this.state.question1 === "choose!" || this.state.question2 === "choose!" || this.state.question3 === "choose!" || this.state.question4 === "choose!" || this.state.question5 === "choose!" || this.state.question6 === "choose!" || this.state.question7 === "choose!" || this.state.question8 === "choose!" || this.state.question9 === "choose!") {
            this.setState({ enableButton: false })
            return false
        } else {
            this.setState({ enableButton: true })
            return true
        }
    }
    
    
    async calculateQuestion1() {
        if (this.state.question1 === "Say thank you regularly") {
            let prev = this.state.pelletStorm
            this.setState({ pelletStorm: prev + 1})
        } else if (this.state.question1 === "Say thanks with a joke") {
            let prev = this.state.checkMage
            this.setState({ checkMage: prev + 1})
        } else if (this.state.question1 === "Say thanks, but be cool") {
            let prev = this.state.hiddenLotus
            this.setState({ hiddenLotus: prev + 2})
        }
    }

    async calculateQuestion2() {
        if (this.state.question2 === "Study hard") {
            let prev = this.state.checkMage
            this.setState({ checkMage: prev + 2})
        } else if (this.state.question2 === "Play a little and study at the last second") {
            let prev = this.state.pelletStorm
            this.setState({ pelletStorm: prev + 2})
        } else if (this.state.question2 === "Cheese both the test and Smash, obviously") {
            let prevHL = this.state.hiddenLotus
            let prevPS = this.state.pelletStorm
            this.setState({ pelletStorm: prevPS + 1, hiddenLotus: prevHL + 2})
        }
    }

    async calculateQuestion3() {
        if (this.state.question3 === "Life is just a dating simulator, just tell them sooner rather than later") {
            let prev = this.state.pelletStorm
            this.setState({ pelletStorm: prev + 2})
        } else if (this.state.question3 === "Uh I’ll probably say hello a couple times...") {
            let prev = this.state.checkMage
            this.setState({ checkMage: prev + 1})
        } else if (this.state.question3 === "Just be chill, approach the situation with finesse") {
            let prev = this.state.hiddenLotus
            this.setState({ hiddenLotus: prev + 1})
        }
    }

    async calculateQuestion4() {
        if (this.state.question4 === "Yes") {
            let prev = this.state.pelletStorm
            this.setState({ pelletStorm: prev + 1})
        } else if (this.state.question4 === "No") {
            let prevHL = this.state.hiddenLotus
            let prevCM = this.state.checkMage
            this.setState({ checkMage: prevCM + 1, hiddenLotus: prevHL + 1})
        }
    }

    async calculateQuestion5() {
        if (this.state.question5 === "Love them!") {
            let prev = this.state.checkMage
            this.setState({ checkMage: prev + 2})
        } else if (this.state.question5 === "A little") {
            let prevHL = this.state.hiddenLotus
            let prevPS = this.state.pelletStorm
            this.setState({ pelletStorm: prevPS + 2, hiddenLotus: prevHL + 1})
        } else if (this.state.question5 === "Spare me") {
            let prevHL = this.state.hiddenLotus
            let prevPS = this.state.pelletStorm
            this.setState({ pelletStorm: prevPS + 1, hiddenLotus: prevHL + 2})
        }
    }

    async calculateQuestion6() {
        if (this.state.question6 === "Money match them") {
            let prevPS = this.state.pelletStorm
            let prevHL = this.state.hiddenLotus
            this.setState({ pelletStorm: prevPS + 1, hiddenLotus: prevHL + 1})
        } else if (this.state.question6 === "Research them immediately") {
            let prev = this.state.checkMage
            this.setState({ checkMage: prev + 2})
        } else if (this.state.question6 === "Eh, probably just act natural") {
            let prev = this.state.hiddenLotus
            this.setState({ hiddenLotus: prev + 1})
        }
    }

    async calculateQuestion7() {
        if (this.state.question7 === "Hey, funding for my next tournaments!") {
            let prev = this.state.hiddenLotus
            this.setState({ hiddenLotus: prev + 1})
        } else if (this.state.question7 === "Put it in savings") {
            let prevCM = this.state.checkMage
            let prevHL = this.state.hiddenLotus
            this.setState({ checkMage: prevCM + 2, hiddenLotus: prevHL + 1})
        } else if (this.state.question7 === "Treat the homies to some Wendy’s") {
            let prev = this.state.pelletStorm
            this.setState({ pelletStorm: prev + 1})
        }
    }

    async calculateQuestion8() {
        if (this.state.question8 === "Should probably stay out of it...") {
            let prevPS = this.state.pelletStorm
            let prevCM = this.state.checkMage
            this.setState({ pelletStorm: prevPS + 1, checkMage: prevCM + 1})
        } else if (this.state.question8 === "Calmly explain to them why they’re wrong") {
            let prevCM = this.state.checkMage
            let prevHL = this.state.hiddenLotus
            this.setState({ checkMage: prevCM + 1, hiddenLotus: prevHL + 1})
        } else if (this.state.question8 === "Meme about the person’s opinions") {
            let prevPS = this.state.pelletStorm
            let prevHL = this.state.hiddenLotus
            this.setState({ pelletStorm: prevPS + 1, hiddenLotus: prevHL + 1})
        }
    }

    async calculateQuestion9() {
        if (this.state.question9 === "Time to conquer tournaments elsewhere!") {
            let prev = this.state.pelletStorm
            this.setState({ pelletStorm: prev + 1})
        } else if (this.state.question9 === "More time for me to relax and work on other things") {
            let prevCM = this.state.checkMage
            let prevHL = this.state.hiddenLotus
            this.setState({ checkMage: prevCM + 1, hiddenLotus: prevHL + 1})
        }
    }




    render() {

        return (

            <div className="thingy">


                 

                <Form>
                    <Form.Row style={{alignContent: "center", alignSelf: "center", textAlign: "center"}}>

                {/* <Button variant={this.state.tournamentType === "smashgg" ? "danger" : "outline-danger"} onClick={() => { this.setState({ tournamentType: "smashgg" }) }} >smash.gg</Button> */}
                    
                    {/* {this.state.currentQuestion === 1 ? 
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Ankur’s bringing your adapter that you forgot at the tournament. How do you thank him?</Form.Label>
                        <div></div>
                        <Form.Control as="select" onChange={(e: any) => {this.setState({question1: e.target.value})}}>
                            <option value="" disabled selected>---</option>
                            <option>Say thank you regularly</option>
                            <option>Say thanks with a joke</option>
                            <option>Say thanks, but be cool</option>
                        </Form.Control>
                    </Form.Group>
                    : null } */}

                {this.state.currentQuestion === 1 ?
                        <Form.Group as={Col}>
                            <Form.Label>
                            Ankur’s bringing your adapter that you forgot at the tournament. How do you thank him?
                            </Form.Label>
                            <div></div>
                        <DropdownButton id="dropdown-basic-button" variant="light" title={this.state.question1} onSelect={(eventKey: any) => {this.setState({question1: eventKey})}}   style = {{marginBottom: "2em", marginTop: "2em", fontFamily: 'pmdfont', fontSize: "1.5em", display: "inline-block", verticalAlign: "center"}}>
                            <Dropdown.Item eventKey="Say thank you regularly">Say thank you regularly</Dropdown.Item>
                            <Dropdown.Item eventKey="Say thanks with a joke">Say thanks with a joke</Dropdown.Item>
                            <Dropdown.Item eventKey="Say thanks, but be cool">Say thanks, but be cool</Dropdown.Item>
                        </DropdownButton>
                        </Form.Group>
                : null }

                {this.state.currentQuestion === 2 ?
                        <Form.Group as={Col}>
                            <Form.Label>
                            The midterm is coming up soon but there’s a smashfest, what do you do?
                            </Form.Label>
                        <div></div>
                        <DropdownButton id="dropdown-basic-button" variant="light" title={this.state.question2} onSelect={(eventKey: any) => {this.setState({question2: eventKey})}}   style = {{marginBottom: "2em", marginTop: "2em", fontFamily: 'pmdfont', fontSize: "1.5em", display: "inline-block", verticalAlign: "center"}}>
                            <Dropdown.Item eventKey="Study hard">Study hard</Dropdown.Item>
                            <Dropdown.Item eventKey="Play a little and study at the last second">Play a little and study at the last second</Dropdown.Item>
                            <Dropdown.Item eventKey="Cheese both the test and Smash, obviously">Cheese both the test and Smash, obviously</Dropdown.Item>
                        </DropdownButton>
                        </Form.Group>
                : null }

                {this.state.currentQuestion === 3 ?
                        <Form.Group as={Col}>
                            <Form.Label>
                            There’s a gamer you like... but your gamer genes make you socially awkward. What do you do?
                            </Form.Label>
                            <div></div>
                        <DropdownButton id="dropdown-basic-button" variant="light" title={this.state.question3} onSelect={(eventKey: any) => {this.setState({question3: eventKey})}}   style = {{marginBottom: "2em", marginTop: "2em", fontFamily: 'pmdfont', fontSize: "1.5em", display: "inline-block", verticalAlign: "center"}}>
                            <Dropdown.Item eventKey="Life is just a dating simulator, just tell them sooner rather than later">Life is just a dating simulator, just tell them sooner rather than later</Dropdown.Item>
                            <Dropdown.Item eventKey="Uh I’ll probably say hello a couple times...">Uh I’ll probably say hello a couple times...</Dropdown.Item>
                            <Dropdown.Item eventKey="Just be chill, approach the situation with finesse">Just be chill, approach the situation with finesse</Dropdown.Item>
                        </DropdownButton>
                        </Form.Group>
                : null }

                {this.state.currentQuestion === 4 ?
                        <Form.Group as={Col}>
                            <Form.Label>
                            Do you just fall asleep at a tournament without noticing?
                            </Form.Label>
                            <div></div>
                        <DropdownButton id="dropdown-basic-button" variant="light" title={this.state.question4} onSelect={(eventKey: any) => {this.setState({question4: eventKey})}}   style = {{marginBottom: "2em", marginTop: "2em", fontFamily: 'pmdfont', fontSize: "1.5em", display: "inline-block", verticalAlign: "center"}}>
                            <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                            <Dropdown.Item eventKey="No">No</Dropdown.Item>
                        </DropdownButton>
                        </Form.Group>
                : null }

                {this.state.currentQuestion === 5 ?
                        <Form.Group as={Col}>
                            <Form.Label>
                            Do you enjoy StudZ’s groan-inducing puns?
                            </Form.Label>
                            <div></div>
                        <DropdownButton id="dropdown-basic-button" variant="light" title={this.state.question5} onSelect={(eventKey: any) => {this.setState({question5: eventKey})}}   style = {{marginBottom: "2em", marginTop: "2em", fontFamily: 'pmdfont', fontSize: "1.5em", display: "inline-block", verticalAlign: "center"}}>
                            <Dropdown.Item eventKey="Love them!">Love them!</Dropdown.Item>
                            <Dropdown.Item eventKey="A little">A little</Dropdown.Item>
                            <Dropdown.Item eventKey="Spare me">Spare me</Dropdown.Item>
                        </DropdownButton>
                        </Form.Group>
                : null }

                {this.state.currentQuestion === 6 ?
                        <Form.Group as={Col}>
                            <Form.Label>
                            Some outside Smash players have invaded UT, what do you do?
                            </Form.Label>
                            <div></div>
                        <DropdownButton id="dropdown-basic-button" variant="light" title={this.state.question6} onSelect={(eventKey: any) => {this.setState({question6: eventKey})}}   style = {{marginBottom: "2em", marginTop: "2em", fontFamily: 'pmdfont', fontSize: "1.5em", display: "inline-block", verticalAlign: "center"}}>
                            <Dropdown.Item eventKey="Money match them">Money match them</Dropdown.Item>
                            <Dropdown.Item eventKey="Research them immediately">Research them immediately</Dropdown.Item>
                            <Dropdown.Item eventKey="Eh, probably just act natural">Eh, probably just act natural</Dropdown.Item>
                        </DropdownButton>
                        </Form.Group>
                : null }

                {this.state.currentQuestion === 7 ?
                        <Form.Group as={Col}>
                            <Form.Label>
                            You won a huge Smash tournament and got loads of dough! What will you do with it?
                            </Form.Label>
                            <div></div>
                        <DropdownButton id="dropdown-basic-button" variant="light" title={this.state.question7} onSelect={(eventKey: any) => {this.setState({question7: eventKey})}}   style = {{marginBottom: "2em", marginTop: "2em", fontFamily: 'pmdfont', fontSize: "1.5em", display: "inline-block", verticalAlign: "center"}}>
                            <Dropdown.Item eventKey="Hey, funding for my next tournaments!">Hey, funding for my next tournaments!</Dropdown.Item>
                            <Dropdown.Item eventKey="Put it in savings">Put it in savings</Dropdown.Item>
                            <Dropdown.Item eventKey="Treat the homies to some Wendy’s">Treat the homies to some Wendy’s</Dropdown.Item>
                        </DropdownButton>
                        </Form.Group>
                : null }

                {this.state.currentQuestion === 8 ?
                        <Form.Group as={Col}>
                            <Form.Label>
                            Someone is making fun of your friend’s main, what do you do?
                            </Form.Label>
                            <div></div>
                        <DropdownButton id="dropdown-basic-button" variant="light" title={this.state.question8} onSelect={(eventKey: any) => {this.setState({question8: eventKey})}}   style = {{marginBottom: "2em", marginTop: "2em", fontFamily: 'pmdfont', fontSize: "1.5em", display: "inline-block", verticalAlign: "center"}}>
                            <Dropdown.Item eventKey="Should probably stay out of it...">Should probably stay out of it...</Dropdown.Item>
                            <Dropdown.Item eventKey="Calmly explain to them why they’re wrong">Calmly explain to them why they’re wrong</Dropdown.Item>
                            <Dropdown.Item eventKey="Meme about the person’s opinions">Meme about the person’s opinions</Dropdown.Item>
                        </DropdownButton>
                        </Form.Group>
                : null }


                {this.state.currentQuestion === 9 ?
                        <Form.Group as={Col}>
                            <Form.Label>
                            It’s spring break and you’ve got time to relax back home, how do you feel?
                            </Form.Label>
                            <div></div>
                        <DropdownButton id="dropdown-basic-button" variant="light" title={this.state.question9} onSelect={(eventKey: any) => {this.setState({question9: eventKey})}}   style = {{marginBottom: "2em", marginTop: "2em", fontFamily: 'pmdfont', fontSize: "1.5em", display: "inline-block", verticalAlign: "center"}}>
                            <Dropdown.Item eventKey="Time to conquer tournaments elsewhere!">Time to conquer tournaments elsewhere!</Dropdown.Item>
                            <Dropdown.Item eventKey="More time for me to relax and work on other things">More time for me to relax and work on other things</Dropdown.Item>
                        </DropdownButton>
                        </Form.Group>
                : null }

                </Form.Row>
                </Form>

                

                        <div className="submitButton2">
                            <Button variant="light" style={{backgroundColor: "black", color: "white"}} onClick={()=>{
                                if (this.state.currentQuestion > 1) {
                                    let temp = this.state.currentQuestion
                                    this.setState({currentQuestion: temp - 1 })
                                }
                            }}>{"<"}</Button> 
                            <span>                         </span>
                            <Button variant="light" style={{backgroundColor: "black", color: "white"}} onClick={()=>{
                                if (this.state.currentQuestion < 9) {
                                    let temp = this.state.currentQuestion
                                    this.setState({currentQuestion: temp + 1})
                                }
                            }}>{">"}</Button>
                        </div>

                        {this.state.currentQuestion === 9 ? 
                    <div className="submitButton">
                        {this.state.enableButton ? 
                            <Button variant="light" onClick={() => {this.handleSubmit()}} style={{fontSize: "1.5em", backgroundColor: "black", color: "white", marginLeft: "1em", marginRight: "1em"}}>
                                Submit
                            </Button>
                        : 
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled" style={{fontFamily: "pmdfont", fontSize: "1.5em"}}>Please answer all questions before submitting!</Tooltip>}>
                            <span className="d-inline-block">
                            <Button variant="light" onClick={() => {this.handleSubmit()}} style={{fontSize: "1.5em", backgroundColor: "black", color: "white", marginLeft: "1em", marginRight: "1em"}}>
                                Submit
                            </Button>
                            </span>
                        </OverlayTrigger>}
                    </div>
                : null }



            </div>
        );

    }

}


const mapStateToProps = (state: AppState) => ({
});

export default connect(
    mapStateToProps,
    {
        submitButtonClickedThunk
    }
)(Questions);





interface QuestionsPageState {
    question1: string
    question2: string
    question3: string
    question4: string
    question5: string
    question6: string
    question7: string
    question8: string
    question9: string
    pelletStorm: number
    checkMage: number
    hiddenLotus: number
    enableButton: boolean
    currentQuestion: number
}

interface QuestionsPageProps {
    history: History
    submitButtonClickedThunk: any
}

