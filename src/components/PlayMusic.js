import React, { Component } from 'react';

class PlayMusic extends Component {
  state = {
    musicToPlay: []
  }

  handleMusicNote = (ev) => {
    let newNote = ev.currentTarget.getAttribute('data-note');

    console.log(ev.currentTarget.getAttribute('data-note'));

    let musicToplayCopy = this.state.musicToPlay.splice();
    musicToplayCopy.push(newNote);

    this.setState({
      musicToPlay: musicToplayCopy
    });
  }

  render() {

    this.state.musicToPlay.forEach(musicalNote => {
      musicalNote = require('../musical-notes/' + musicalNote);

      let musicalNoteAudio = new Audio(musicalNote);
      musicalNoteAudio.play();  
    });

    console.log(this.state.musicToPlay)

    return (
      <div>
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
