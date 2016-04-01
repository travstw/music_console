

function Session(){
  
  this.directory = '~/>';

 
}

Session.prototype.newSong = function(name, tempo){
  this.song = new Song(name, tempo);
};

Session.prototype.parse = function(input){
  var commands = input.split(' ');
  

  switch (commands[0]){
    case "new":

      switch(commands[1]){
        case "song":
          this.song = new Song(commands[2], commands[3]);
          this.directory = this.directory.replace('>', commands[2] + '/>');
          break;
        case "sect":
          this.song.addSection(new Section(commands[2]));
          this.directory = this.directory.replace('>', commands[2] + '/>');
          break;
        case "trk":
          this.song.section[commands[2]].addTrack(new Track(commands[3]));
          this.directory = this.directory.replace('>' , commands[3] + '/>'); 
          break;
        default:
          return commands[1] + ' is not a valid command for ' + commands[0];
      }

      break;

    case "del":
      break;

    default:
      return commands[0] + " is not a valid command" ;
  }


};





function Song(name, tempo){
  this.name = name;
  this.section = {};
  this.tempo = tempo || 120;
}

Song.prototype.addSection = function(section){
  this.section[section.name] = section;
};

Song.prototype.removeSection = function(section_name){
  delete this.section[section_name];
};




function Section(name){
  this.name = name;
  this.tracks = {};
}

Section.prototype.addTrack = function(track){
  this.tracks[track.name] = track;
};

Section.prototype.removeTrack =  function(track_name){
  delete this.tracks[track_name];
};




function Track(name){
  this.name = name;
  this.FX = {};
}

Track.prototype.addFX = function(options){
  this.FX[options.name] = new FX(options);
};



var s = new Session();
s.parse('new song pancakes 135');
console.log(s.directory);
s.parse('new sect chorus');
console.log(s.directory);
s.parse('new trk chorus drums');
console.log(s.directory);
console.log(s.song.section.chorus);
console.log(s.parse('noodles are great'));








