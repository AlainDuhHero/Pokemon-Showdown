'use strict';

const messages = [
	"ventured into Shrek's Swamp.",
	"disrespected the OgreLord!",
	"used Explosion!",
	"was swallowed up by the Earth!",
	"was eaten by Lex!",
	"was sucker punched by Absol!",
	"has left the building.",
	"got lost in the woods!",
	"left for their lover!",
	"was hit by Magikarp's Revenge!",
	"was sucked into a whirlpool!",
	"got scared and left the server!",
	"went into a cave without a repel!",
	"got eaten by a bunch of piranhas!",
	"ventured too deep into the forest without an escape rope",
	"got shrekt",
	"woke up an angry Snorlax!",
	"was forced to give jd an oil massage!",
	"was used as shark bait!",
	"peered through the hole on Shedinja's back",
	"received judgment from the almighty Arceus!",
	"used Final Gambit and missed!",
	"went into grass without any Pokemon!",
	"made a Slowbro angry!",
	"took a focus punch from Breloom!",
	"got lost in the illusion of reality.",
	"ate a bomb!",
	"left for a timeout!",
	"fell into a snake pit!",
	"was swallowed whole by a Wailord!", // Bought by Selena
	"was swallowed whole by a giant wigglytuff!", // Bought by Lyrical WigglyTuff
	"was fused with Zarif!", //bought by Infernape/Zarif
	"fades into nothingness!", // bought by Unknown"s Remnant
	"forgot their towel!", // bought by Alphayocom
	"got pimp slapped by jd!", // bought by Jordan-Moo
	"is blasting off again!", // bought by Noiprocs
	"flies back to their comfy nest!", // bought by Aerodactylol
	"tried to eat Piscean!", // bought by Piscean
	"away!", // bought by CrazyClown94
	"disapparated!", // bought by Jedi Lion Potter
	"was hugged by Figgybear!", // bought by Figgy
	"was thrown into the TV world by P4 Ka'elbasa", // bought by E4 Kael
	"was accidentally killed in a shaving accident", // bought by DeltaFlame
	"faced a Xerneas with geomancy and powerherb", // bought by FireDudeWind
	"drowned in the ocean trying to find SeaNanners", // bought by SeaNanners
	"was killed by Donald", // bought by REV Czim
	"is blasting off again", // bought by L Chevy 12
	"use defog on Bisharp", // bought by Hope/Fallen Blood
	"got outsassed by Félicette!", // bought by FÃ©licette
	"got outclassed by Félicette!",
	"was proclaimed an enemy of the state by King Jong-un!", // bought by KJU
	"got haxed by minatokyuubi", // bought by minatokyuubi
];

exports.commands = {
	d: 'poof',
	cpoof: 'poof',
	poof: function (target, room, user) {
		if (Config.poofOff) return this.sendReply("Poof is currently disabled.");
		if (target && !this.can('broadcast')) return false;
		if (room.id !== 'lobby') return false;
		let message = target || messages[Math.floor(Math.random() * messages.length)];
		if (message.indexOf('{{user}}') < 0) message = '{{user}} ' + message;
		message = message.replace(/{{user}}/g, user.name);
		if (!this.canTalk(message)) return false;

		let colour = '#' + [1, 1, 1].map(function () {
			let part = Math.floor(Math.random() * 0xaa);
			return (part < 0x10 ? '0' : '') + part.toString(16);
		}).join('');

		room.addRaw('<center><strong><font color="' + colour + '">~~ ' + Tools.escapeHTML(message) + ' ~~</font></strong></center>');
		user.lastPoof = Date.now();
		user.lastPoofMessage = message;
		user.disconnectAll();
	},
		poofhelp: ["/poof - Disconnects the user and leaves a message in the lobby."],

	poofoff: 'nopoof',
	nopoof: function () {
		if (!this.can('poofoff')) return false;
		Config.poofOff = true;
		return this.sendReply("Poof is now disabled.");
	},
        poofoffhelp: ["/poofoff - Disable the use of the /poof command."],
        
	poofon: function () {
		if (!this.can('poofoff')) return false;
		Config.poofOff = false;
		return this.sendReply("Poof is now enabled.");
	},
	poofonhelp: ["/poofon - Enable the use /poof command."],
	
	poofmessageslist: 'poofmessages',
	pooflist: 'poofmessages',
	poofmessages: function (target, room, user) {
		if(!this.runBroadcast()) return false;
		let display = [];
		for(let i = 0; i<messages.length; i++) 
			display.push('<b>' + i + '. </b>' + messages[i]);
		return this.sendReplyBox('<div style="max-height: 300px; overflow-y: scroll"><b><u><center>Wisp Poof Messages List</center></u></b>' + display.join('<br>') + '</div>');
	},
	poofmessageshelp: ["/poofmessages - Shows the list of poof messages"],
};
