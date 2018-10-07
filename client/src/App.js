import React, {Component}          from 'react';
import { render }                  from 'react-dom';
import { FloatingActionButton,
        MuiThemeProvider }         from 'material-ui';
import MicrophoneOn                from 'material-ui/svg-icons/av/mic';
import MicrophoneOff               from 'material-ui/svg-icons/av/stop';

// import { ReactMic, saveRecording } from '/components';
import ReactMic from './ReactMic';
// import sampleAudio                 from './sample_audio.webm';
// import ReactGA                     from 'react-ga';

// require ('./styles.scss');


// ReactGA.initialize('UA-98862819-1');

export default class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      blobObject: null,
      isRecording: false
    }
  }

  componentDidMount() {
    // ReactGA.pageview(window.location.pathname);
  }

  startRecording= () => {
    this.setState({
      isRecording: true
    });
  }

  stopRecording= () => {
    this.setState({
      isRecording: false
    });
  }

  onSave=(blobObject) => {
  }

  onStart=() => {
    console.log('You can tap into the onStart callback');
  }

  onStop= (blobObject) => {
    this.setState({
      blobURL : blobObject.blobURL
    });
  }

  onData(recordedBlob){
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  render() {
    const { isRecording } = this.state;

    return(
      <MuiThemeProvider>
        <div>
          <h1>React-Mic</h1>
          <p><a href="https://github.com/hackingbeauty/react-mic">Documentation</a></p>
          <ReactMic
            className="oscilloscope"
            record={isRecording}
            backgroundColor="#FF4081"
            visualSetting="sinewave"
            audioBitsPerSecond= {128000}
            onStop={this.onStop}
            onStart={this.onStart}
            onSave={this.onSave}
            onData={this.onData}
            strokeColor="#000000" />
          <div>
            <audio ref="audioSource" controls="controls" src={this.state.blobURL}></audio>
          </div>
          <br />
          <br />
          <FloatingActionButton
            className="btn"
            secondary={true}
            disabled={isRecording}
            onClick={this.startRecording}>
            <MicrophoneOn />
          </FloatingActionButton>
          <FloatingActionButton
            className="btn"
            secondary={true}
            disabled={!isRecording}
            onClick={this.stopRecording}>
            <MicrophoneOff />
          </FloatingActionButton>
          <br />
          <br />
          <br />
          <p>As featured in the course <br /><a href="http://professionalreactapp.com">How To Develop A Professional React App</a></p>
          <br />
          <br />
          <p>Check out how I use it in my app
          <br />
            <a href="http://voicerecordpro.com" target="_blank">Voice Record Pro</a> (record your voice and publish it)</p>
        </div>
    </MuiThemeProvider>
    );
  }
}
