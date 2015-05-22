exports.commands = {
  declareaotd: function(target, room, user) {
    if (room.id != 'lobby') return this.sendReply("The command must be used in Lobby.");
    if (!this.canBroadcast()) return false;
    if (!this.canTalk()) return false;
    this.add('|raw|<div class="broadcast-blue"><b>AOTD has begun in GoldenrodRadioTower! ' +
             '<button name="joinRoom" value="goldenrodradiotower" target="_blank">Join now</button> to nominate your favorite artist for AOTD to be featured on the ' +
             'official page next to your name for a chance to win the monthly prize at the end of the month!</b></div>'
    );
    this.logModCommand(user.name + " used declareaotd.");
  }
};
