import React, { Component } from 'react';
import classes from './PlayMusic.module.css'

class PlayMusic extends Component {
  state = {
    musicToPlay: []
  }

  handleMusicNote = (ev) => {
    let newNote = ev.currentTarget.getAttribute('data-note');
    let noteName = newNote;

    newNote = require('../musical-notes/' + newNote);

    let newNoteAudio = new Audio(newNote);
    newNoteAudio.setAttribute('data-name', noteName);

    // console.log(ev.currentTarget.getAttribute('data-note'), this.state, newNote);

    let musicToplayCopy = this.state.musicToPlay.splice(0);
    musicToplayCopy.push(newNoteAudio);

    // delay is added because when referencing .duration of the Audio element
    // it will be NaN, sometime needs to be waited
    const RANDOM_DELAY_FOR_AUDIO_TO_LOAD = 30;
    setTimeout(() => {
      this.setState({
        musicToPlay: musicToplayCopy
      });
    }, RANDOM_DELAY_FOR_AUDIO_TO_LOAD);
  }

  playNotes = () => {
    let duration = 0;
    this.state.musicToPlay.forEach((musicalNote, index) => {
        if (index === 0) {
          setTimeout(function () {
            musicalNote.play();
          }, 0)
        } else {
          let previousNote = this.state.musicToPlay[index - 1];
            duration += previousNote.duration
            setTimeout(function () {
              musicalNote.play();
            }, duration * 1000)

        }
      })
  }

  createTimeBar = () => {
    const ONE_SECOND_IN_VIEW_WIDTH= 10;
    let secondsToDom = [];

    const defaultAmountOfSecondToDisplay = 40;
    for (let i = 0; i < defaultAmountOfSecondToDisplay; i++) {
      let divWidth = {
        width: ONE_SECOND_IN_VIEW_WIDTH + 'vw'
      }

      let secondsDiv = (
        <div className={classes['time-block']} style={divWidth}>
          { i + 1 }
        </div>
      )
      secondsToDom.push(secondsDiv);
    }

    return secondsToDom;
  }

  render() {

    let currentlyPlaying = (null);

    let secondsToDom = this.createTimeBar();

    currentlyPlaying = this.state.musicToPlay.map(function (audio) {
      let divWidth = {
        width: audio.duration * 10 + 'vw',
      }
      
      return (
        <div className={classes['music-blocks__block']} style={divWidth}>
          <p>
            {audio.getAttribute('data-name')}
          </p>
          <p>
            duration: {audio.duration}
          </p>
        </div>
      )
    });

    return (
      <div>
        <div id={classes['time-tracker']}>
          <div className={classes['music-blocks']}>
            {currentlyPlaying}
          </div>

          <div className={classes['time-bar']} id="time">
            {secondsToDom}
          </div>
        </div>

        <p onClick={this.playNotes}>
          play notes
        </p>
        <div>
          <div
            data-note='piano_middle_C.mp3'
            onClick={this.handleMusicNote}>
            piano middle C
          </div>
        </div>
      </div>
    )
  }
}

export default PlayMusic
