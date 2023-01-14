import React, { startTransition } from 'react';
import './style.css';
import {Provider, connect} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Card, Nav, Col, Row, Image} from 'react-bootstrap';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import thunk from 'redux-thunk';
import {PropTypes} from 'prop-types';
import {audioObject} from "./sounds.js";
import Draggable, {DraggableCore} from "react-draggable";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.js';


//REACT-REDUX part1
const [POWER_CHANGED, BANK_CHANGED, AUDIO_GROUP_CHANGED, VOLUME_CHANGED] = ['POWER_CHANGED', 'BANK_CHANGED', 'AUDIO_GROUP_CHANGED', 'VOLUME_CHANGED'];

//################ POWER BUTTON SECION ############
const updatePowerStatus = (pow) => ({
	type: POWER_CHANGED,
	pow: pow
});//Power status action creator

const powerReducer = (state=true, action)=>{
	switch(action.type){
		case POWER_CHANGED:
			return action.pow;
		default:
			return state;
	}
};

//################# BANK BUTTON SECTION ###########
const updateBankStatus = (bank) => ({
	type: BANK_CHANGED,
	bank: bank
});//Bank action creator

const bankReducer = (state=true, action) => {
	switch(action.type){
		case BANK_CHANGED:
			return action.bank;
		default:
			return state;
	}
};

//############### AUDIO SECTION ###################
const updateAudioStatus = (audio) => ({
	type: AUDIO_GROUP_CHANGED,
	audio: audio
});// audio action creator

const audioReducer = (state=audioObject[0], action)=>{
	switch(action.type){
		case AUDIO_GROUP_CHANGED:
			return action.audio;
		default:
			return state;
	}
}

//############## VOLUME CONTROL SECTION ###########
const updateVolumeStatus = (vol) => ({
	type: VOLUME_CHANGED,
	vol: vol
});// Volume action Creator

const volumeReducer = (state=true, action)=>{
	switch(action.type){
		case VOLUME_CHANGED:
			return action.vol;
		default:
			return state;
	}
};

//################ ROOT REDUCER ###################
const rootReducer = combineReducers({
	pow: powerReducer,
	bank: bankReducer,
	audio: audioReducer,
	vol: volumeReducer
});

const store = createStore(rootReducer);
//REACT-REDUX part1 ends

const DrumKeys = (props) => {
	return (
		<>
			<div id="drum-keys">
				<button className="drum-pad" id="hitQ" onKeyDown={props.keydown} onMouseDown={props.keyClick} >Q<audio className='clip' id='Q'  src={props.source.Q.link}></audio></button>
				<button className="drum-pad" id="hitW" onKeyDown={props.keydown} onMouseDown={props.keyClick} >W<audio className='clip' id='W'  src={props.source.W.link}></audio></button>
				<button className="drum-pad" id="hitE" onKeyDown={props.keydown} onMouseDown={props.keyClick} >E<audio className='clip' id='E'  src={props.source.E.link}></audio></button>
				<button className="drum-pad" id="hitA" onKeyDown={props.keydown} onMouseDown={props.keyClick} >A<audio className='clip' id='A'  src={props.source.A.link}></audio></button>
				<button className="drum-pad" id="hitS" onKeyDown={props.keydown} onMouseDown={props.keyClick} >S<audio className='clip' id='S'  src={props.source.S.link}></audio></button>
				<button className="drum-pad" id="hitD" onKeyDown={props.keydown} onMouseDown={props.keyClick} >D<audio className='clip' id='D'  src={props.source.D.link}></audio></button>
				<button className="drum-pad" id="hitZ" onKeyDown={props.keydown} onMouseDown={props.keyClick} >Z<audio className='clip' id='Z'  src={props.source.Z.link}></audio></button>
				<button className="drum-pad" id="hitX" onKeyDown={props.keydown} onMouseDown={props.keyClick} >X<audio className='clip' id='X'  src={props.source.X.link}></audio></button>
				<button className="drum-pad" id="hitC" onKeyDown={props.keydown} onMouseDown={props.keyClick} >C<audio className='clip' id='C'  src={props.source.C.link}></audio></button>
			</div>
		</>
	);
};
DrumKeys.propTypes = {
	keydown: PropTypes.func.isRequired,
	keyClick: PropTypes.func.isRequired,
	source: PropTypes.object.isRequired
};

const PowerButton = (props) => {
	return(
		<>
			<div className="power-button">
				<div className="button-name">Power</div>
				<div className="button-container">
					<button onClick={props.power} id="power">Off</button>
				</div>
			</div>
		</>
	);
};
PowerButton.propTypes = {
	power: PropTypes.func.isRequired
};

const Display = () => {
	return (
		<>
			<div id="display"><p className='display-text'></p></div>
		</>
	);
};

const Volume = (props) => {
	return (
		<>
			<div id="volume-control" >
				<div id="volume_bar"></div>
				<Draggable onDrag={props.drag}  
					axis="x" bounds="parent" defaultPosition={{x: 100, y: 0}} disabled={props.volState} handle="#volumeButton" ><button id="volumeButton">{" "}</button></Draggable>
			</div>
		</>
	);
};
Volume.propTypes = {
	drag: PropTypes.func.isRequired,
	volState: PropTypes.bool.isRequired
};

const Bank = (props) => {
	return(
		<>
			<div className="power-button">
				<div className="button-name">{" "}Bank{" "}</div>
				<div className="button-container">
					<button onClick={props.click} id="bank">1</button>
				</div>
			</div>
		</>
	);
};
Bank.propTypes={
	click: PropTypes.func.isRequired
};
class Main extends React.Component{
	constructor(props){
		super(props);
		this.handlePower = this.handlePower.bind(this);
		this.handleBank = this.handleBank.bind(this);
		this.handleKeyClick = this.handleKeyClick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.keyDownfunction = this.keyDownfunction.bind(this);
		this.keyClickfunction = this.keyClickfunction.bind(this);
		this.dragMe = this.dragMe.bind(this);
		this.stopDragging = this.stopDragging.bind(this);
	}

	keyDownfunction(l){
		if(this.props.pow === true){
			$('.display-text').addClass('blindText');
			$(`#hit${l}`).addClass('keyDowns');
			$(`#${l}`).trigger('play');
			$('.display-text').text(this.props.audio[l].name);
			setTimeout(()=>{
				$(`#hit${l}`).removeClass('keyDowns');
			}, 100);
		}else{
			$('.display-text').removeClass('blindText');
			$(`#hit${l}`).addClass('keyDowns').addClass('keyHighlight');
			$(`#${l}`).trigger('play');
			$('.display-text').text(this.props.audio[l].name);
			setTimeout(()=>{
				$(`#hit${l}`).removeClass('keyDowns').removeClass('keyHighlight');
			}, 100);
		}
	}

	keyClickfunction(v){
		if(this.props.pow === true){
			$('.display-text').addClass('blindText');
			$(`#${v}`).trigger("play");
			$(".display-text").text(this.props.audio[v].name);
		}else{
			$('.display-text').removeClass('blindText');
			$(`#${v}`).trigger("play");
			$(".display-text").text(this.props.audio[v].name);
		}
	}
	
	componentWillMount(){
		$('body').addClass('myBackground');
	}

	componentDidMount(){
		document.addEventListener('keydown', this.handleKeyDown);
		document.addEventListener('mouseleave', this.stopDragging);
		if(this.props.bank === true){
			$('audio').on('play', function() {
				$('audio').not(this).each(function() {
					this.pause();
					this.currentTime = 0;
				});
			});
		}
	}

	componentWillUnmount(){
		document.removeEventListener('keydown', this.handleKeyDown);
		document.removeEventListener('mouseleave', this.stopDragging);
	}
	

	async dragMe(e, data){
		let width = 0;
		let myWidth = $('#volume-control').outerWidth();
		if(myWidth < 242){
			width = $('#volume-control').outerWidth() * 0.889;
		}else{
			width = $('#volume-control').outerWidth() * 0.959;
		}
		$('.clip').prop("volume", (data.x/(width)).toFixed(2));
		setTimeout(()=>{
			if(Math.round((data.x/width)*100) === 100){
				$('.display-text').text(`Volume: MAX`);
			}
			else if(Math.round((data.x/width)*100) >= 50 && Math.round((data.x/width)*100) < 100){
				$('.display-text').html(`<i class="fa-solid fa-volume-high"></i>${"  "}<span>Volume: ${Math.round((data.x/width)*100)}%</span>`);
			}else if(Math.round((data.x/width)*100) > 0 && Math.round((data.x/width)*100) < 50){
				$('.display-text').html(`<i class="fa-solid fa-volume-low"></i>${"  "}<span>Volume: ${Math.round((data.x/width)*100)}%</span>`);
			}else if(Math.round((data.x/width)*100) === 0){
				$('.display-text').html(`<i class="fa-solid fa-volume-xmark"></i>`);
			}
		}, 300);
	}

	stopDragging(){
		$('.display-text').text("");
	}

	handlePower(){
		if(this.props.pow === true){
			$('.display-text').removeClass('blindText');
			$('#power').addClass('changeControlButtonFeatures').text("On");
			$('.drum-pad').addClass('appKeys');
			$('.display-text').text('Yamaha Keys');
			setTimeout(()=>{
				$('.display-text').text("By Obed Nuertey");
				setTimeout(()=>{
					$('.display-text').text("");
				}, 2000);
			}, 3000);
			this.props.updatePow(false);
			this.props.updateAudio(audioObject[1]);
			this.props.updateVol(false);
		}else{
			$('#power').removeClass('changeControlButtonFeatures').text("Off");
			$('.drum-pad').removeClass('appKeys');
			$('#bank').removeClass('changeControlButtonFeatures').text("1");
			$('.display-text').text("");
			this.props.updatePow(true);
			this.props.updateBank(true);
			this.props.updateAudio(audioObject[0]);
			this.props.updateVol(true);
		}
	}

	handleBank(){
		if(this.props.pow === false){
			if(this.props.bank === true){
				$('#bank').addClass('changeControlButtonFeatures').text("2");
				$('.display-text').text("Smooth Piano Kit");
				this.props.updateBank(false);
				this.props.updateAudio(audioObject[2]);
			}else{
				$('#bank').removeClass('changeControlButtonFeatures').text("1");
				$('.display-text').text("Heater Kit");
				this.props.updateBank(true);
				this.props.updateAudio(audioObject[1]);
			}
		}
	}
	async handleKeyClick(e){
		switch(e.target.id){
			case "hitQ":
				this.keyClickfunction("Q");
				break;
			case "hitW":
				this.keyClickfunction("W");
				break;
			case "hitE":
				this.keyClickfunction("E");
				break;
			case "hitA":
				this.keyClickfunction("A");
				break;
			case "hitS":
				this.keyClickfunction("S");
				break;
			case "hitD":
				this.keyClickfunction("D");
				break;
			case "hitZ":
				this.keyClickfunction("Z");
				break;
			case "hitX":
				this.keyClickfunction("X");
				break;
			case "hitC":
				this.keyClickfunction("C");
				break;
			default:
				console.log("INVALID Operation");
		}
	}

	async handleKeyDown(event){
		switch(event.keyCode){
			case this.props.audio.Q.keycode:
				this.keyDownfunction("Q");
				break;
			case this.props.audio.W.keycode:
				this.keyDownfunction("W");
				break;
			case this.props.audio.E.keycode:
				this.keyDownfunction("E");
				break;
			case this.props.audio.A.keycode:
				this.keyDownfunction("A");
				break;
			case this.props.audio.S.keycode:
				this.keyDownfunction("S");
				break;
			case this.props.audio.D.keycode:
				this.keyDownfunction("D");
				break;
			case this.props.audio.Z.keycode:
				this.keyDownfunction("Z");
				break;
			case this.props.audio.X.keycode:
				this.keyDownfunction("X");
				break;
			case this.props.audio.C.keycode:
				this.keyDownfunction("C");
				break;
			default:
				console.log("Invalid Input");
		}
	}
	render(){
		return(
			<div>
				<div id="drum-machine">
					<div id="component-flexbox" >
						<DrumKeys keydown={this.handleKeyDown} keyClick={this.handleKeyClick} source={this.props.audio} />
						<div id="system-controls-flexbox">
							<PowerButton power={this.handlePower} />
							<Display />
							<Volume drag={this.dragMe} volState={this.props.vol} />
							<Bank click={this.handleBank} />
						</div>
					</div>
				</div>
			</div>
		);
	}
};

//REACT REDUX part 2
const mapStateToProps = (state) => ({
	pow: state.pow,
	bank: state.bank,
	audio: state.audio,
	vol: state.vol
});// we change internal states into props

const mapDispatchToProps = (dispatch) => ({
	updatePow: (pow) => (dispatch(updatePowerStatus(pow))),
	updateBank: (bank) => (dispatch(updateBankStatus(bank))),
	updateAudio: (audio) => (dispatch(updateAudioStatus(audio))),
	updateVol: (vol) => (dispatch(updateVolumeStatus(vol)))
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Main);

export default class AppWrapper extends React.Component{
	render(){
		return(
			<Provider store={store}>
				<Container />
			</Provider>
		);
	}
};
