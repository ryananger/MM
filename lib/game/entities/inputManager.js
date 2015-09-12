ig.module(
    'game.entities.inputManager'
)
.requires(
    'impact.game',
    'impact.entity'
)
.defines(function(){
    EntityInputManager = ig.Entity.extend({

    	entryString: '',
    	entryPosition: 0,

    	shiftOn: false,

        init: function () {
        	var self = this;

        	self.bindKeys();
   	 	},

   	 	update: function () {
   	 		var self = this;

   	 		var shiftState = ig.input.state('SHIFT');
   	 		
   	 		if (shiftState != undefined && !shiftState) {
   	 			self.shiftOn = false;
   	 		};

   	 		if (!ig.game.Chat.entryOn) {
   	 			self.emptyString();
   	 		};
   	 	},

   	 	emptyString: function () {
   	 		var self = this;
   	 		
   	 		self.entryString = '';
   	 		self.entryPosition = 0;
   	 	},

   	 	keyAdd: function (key, code, shift) {
			//this is called in input.js on keydown

			var self = this;

			if (key == 'SHIFT') {
				self.shiftOn = true;
			}

			// 0123456789
			// ; = , - . / `
			// [ \ ] ' 
			if ((code >= 48 && code <= 57) ||
				(code >= 186 && code <= 192) ||
				(code >= 219 && code <= 222)) {

				if (self.shiftOn) {
					switch (code) {
						case 48:
							self.entryString += ')';
							break;
						case 49:
							self.entryString += '!';
							break;
						case 50:
							self.entryString += '@';
							break;
						case 51:
							self.entryString += '#';
							break;
						case 52:
							self.entryString += '$';
							break;
						case 53:
							self.entryString += '%';
							break;
						case 54:
							self.entryString += '^';
							break;
						case 55:
							self.entryString += '&';
							break;
						case 56:
							self.entryString += '*';
							break;
						case 57:
							self.entryString += '(';
							break;
						case 186:
							self.entryString += ':';
							break;
						case 187:
							self.entryString += '+';
							break;
						case 188:
							self.entryString += '<';
							break;
						case 189:
							self.entryString += '_';
							break;
						case 190:
							self.entryString += '>';
							break;
						case 191:
							self.entryString += '?';
							break;
						case 192:
							self.entryString += '~';
							break;
						case 219:
							self.entryString += '{';
							break;
						case 220:
							self.entryString += '|';
							break;
						case 221:
							self.entryString += '}';
							break;
						case 222:
							self.entryString += '"';
							break;						
					}
				}
				else {
					self.entryString += key;
				}				
			};

			// backspace
			if (key == 'BACKSPACE') {
				var backspace = self.entryString.substr(0, self.entryString.length - 1);

				self.entryString = backspace;
			};

			// space
			if (key == ' ') {
				self.entryString += ' ';
			};

			// uppercase
			if (self.shiftOn && code >= 65 && code <= 90) {
				self.entryString += key;
			}

			// lowercase
			if (!self.shiftOn) {
				switch (key) {
					case 'A':
						self.entryString += 'a';
						break;
					case 'B':
						self.entryString += 'b';
						break;
					case 'C':
						self.entryString += 'c';
						break;
					case 'D':
						self.entryString += 'd';
						break;
					case 'E':
						self.entryString += 'e';
						break;
					case 'F':
						self.entryString += 'f';
						break;
					case 'G':
						self.entryString += 'g';
						break;
					case 'H':
						self.entryString += 'h';
						break;
					case 'I':
						self.entryString += 'i';
						break;
					case 'J':
						self.entryString += 'j';
						break;
					case 'K':
						self.entryString += 'k';
						break;
					case 'L':
						self.entryString += 'l';
						break;
					case 'M':
						self.entryString += 'm';
						break;
					case 'N':
						self.entryString += 'n';
						break;
					case 'O':
						self.entryString += 'o';
						break;
					case 'P':
						self.entryString += 'p';
						break;
					case 'Q':
						self.entryString += 'q';
						break;
					case 'R':
						self.entryString += 'r';
						break;
					case 'S':
						self.entryString += 's';
						break;
					case 'T':
						self.entryString += 't';
						break;
					case 'U':
						self.entryString += 'u';
						break;
					case 'V':
						self.entryString += 'v';
						break;
					case 'W':
						self.entryString += 'w';
						break;
					case 'X':
						self.entryString += 'x';
						break;
					case 'Y':
						self.entryString += 'y';
						break;
					case 'Z':
						self.entryString += 'z';
						break;
				}
			}				

			self.entryPosition = ig.game.font.widthForString(self.entryString);

			ig.game.Chat.updateString(self.entryString, self.entryPosition);
   	 	},

   	 	bindKeys: function() {

			ig.input.bind(ig.KEY.MOUSE1, 'lmb');
			ig.input.bind(ig.KEY.MOUSE2, 'rmb');

			ig.input.bind(ig.KEY.W, 'up');
			ig.input.bind(ig.KEY.D, 'right');
			ig.input.bind(ig.KEY.S, 'down');
			ig.input.bind(ig.KEY.A, 'left');

			ig.input.bind(ig.KEY.UP_ARROW, 'face_up');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'face_right');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'face_down');
			ig.input.bind(ig.KEY.LEFT_ARROW, 'face_left');


			// ig.KEY is missing these keycodes.
			ig.KEY['SEMICOLON'] = 186;

	        ig.KEY['FORWARD_SLASH'] = 191;
	        ig.KEY['TILDE'] = 192;

	        ig.KEY['OPEN_BRACKET'] = 219;
	        ig.KEY['BACKSLASH'] = 220;
	        ig.KEY['CLOSE_BRACKET'] = 221;
	        ig.KEY['APOSTROPHE'] = 222;        
	        

	        ig.input.bind(ig.KEY.TILDE, '`');
	        ig.input.bind(ig.KEY.BACKSLASH, '\\');
	        ig.input.bind(ig.KEY.FORWARD_SLASH, '/');
	        ig.input.bind(ig.KEY.SEMICOLON, ';');
	        ig.input.bind(ig.KEY.APOSTROPHE, "'");
	        ig.input.bind(ig.KEY.OPEN_BRACKET, '[');
	        ig.input.bind(ig.KEY.CLOSE_BRACKET, ']');

	        ig.input.bind(ig.KEY.BACKSPACE, 'BACKSPACE');
	        ig.input.bind(ig.KEY.TAB, 'TAB');
	        ig.input.bind(ig.KEY.ENTER, 'ENTER');
	        ig.input.bind(ig.KEY.PAUSE, 'PAUSE');
	        ig.input.bind(ig.KEY.CAPS, 'CAPS');
	        ig.input.bind(ig.KEY.ESC, 'ESC');
	        ig.input.bind(ig.KEY.SPACE, ' ');
	        ig.input.bind(ig.KEY.PAGE_UP, 'PAGE_UP');
	        ig.input.bind(ig.KEY.PAGE_DOWN, 'PAGE_DOWN');
	        ig.input.bind(ig.KEY.END, 'END');
	        ig.input.bind(ig.KEY.HOME, 'HOME');
	        ig.input.bind(ig.KEY.LEFT_ARROW, 'LEFT_ARROW');
	        ig.input.bind(ig.KEY.UP_ARROW, 'UP_ARROW');
	        ig.input.bind(ig.KEY.RIGHT_ARROW, 'RIGHT_ARROW');
	        ig.input.bind(ig.KEY.DOWN_ARROW, 'DOWN_ARROW');
	        ig.input.bind(ig.KEY.INSERT, 'INSERT');
	        ig.input.bind(ig.KEY.DELETE, 'DELETE');
	        ig.input.bind(ig.KEY._0, '0');
	        ig.input.bind(ig.KEY._1, '1');
	        ig.input.bind(ig.KEY._2, '2');
	        ig.input.bind(ig.KEY._3, '3');
	        ig.input.bind(ig.KEY._4, '4');
	        ig.input.bind(ig.KEY._5, '5');
	        ig.input.bind(ig.KEY._6, '6');
	        ig.input.bind(ig.KEY._7, '7');
	        ig.input.bind(ig.KEY._8, '8');
	        ig.input.bind(ig.KEY._9, '9');
	        ig.input.bind(ig.KEY.A, 'A');
	        ig.input.bind(ig.KEY.B, 'B');
	        ig.input.bind(ig.KEY.C, 'C');
	        ig.input.bind(ig.KEY.D, 'D');
	        ig.input.bind(ig.KEY.E, 'E');
	        ig.input.bind(ig.KEY.F, 'F');
	        ig.input.bind(ig.KEY.G, 'G');
	        ig.input.bind(ig.KEY.H, 'H');
	        ig.input.bind(ig.KEY.I, 'I');
	        ig.input.bind(ig.KEY.J, 'J');
	        ig.input.bind(ig.KEY.K, 'K');
	        ig.input.bind(ig.KEY.L, 'L');
	        ig.input.bind(ig.KEY.M, 'M');
	        ig.input.bind(ig.KEY.N, 'N');
	        ig.input.bind(ig.KEY.O, 'O');
	        ig.input.bind(ig.KEY.P, 'P');
	        ig.input.bind(ig.KEY.Q, 'Q');
	        ig.input.bind(ig.KEY.R, 'R');
	        ig.input.bind(ig.KEY.S, 'S');
	        ig.input.bind(ig.KEY.T, 'T');
	        ig.input.bind(ig.KEY.U, 'U');
	        ig.input.bind(ig.KEY.V, 'V');
	        ig.input.bind(ig.KEY.W, 'W');
	        ig.input.bind(ig.KEY.X, 'X');
	        ig.input.bind(ig.KEY.Y, 'Y');
	        ig.input.bind(ig.KEY.Z, 'Z');
	        ig.input.bind(ig.KEY.NUMPAD_0, '0');
	        ig.input.bind(ig.KEY.NUMPAD_1, '1');
	        ig.input.bind(ig.KEY.NUMPAD_2, '2');
	        ig.input.bind(ig.KEY.NUMPAD_3, '3');
	        ig.input.bind(ig.KEY.NUMPAD_4, '4');
	        ig.input.bind(ig.KEY.NUMPAD_5, '5');
	        ig.input.bind(ig.KEY.NUMPAD_6, '6');
	        ig.input.bind(ig.KEY.NUMPAD_7, '7');
	        ig.input.bind(ig.KEY.NUMPAD_8, '8');
	        ig.input.bind(ig.KEY.NUMPAD_9, '9');
	        ig.input.bind(ig.KEY.MULTIPLY, '*');
	        ig.input.bind(ig.KEY.ADD, '+');
	        ig.input.bind(ig.KEY.SUBSTRACT, '-');
	        ig.input.bind(ig.KEY.DECIMAL, '.');
	        ig.input.bind(ig.KEY.DIVIDE, '/');
	        ig.input.bind(ig.KEY.SHIFT, 'SHIFT');
	        ig.input.bind(ig.KEY.CTRL, 'CTRL');
	        ig.input.bind(ig.KEY.ALT, 'ALT');
	        ig.input.bind(ig.KEY.PLUS, '=');
	        ig.input.bind(ig.KEY.COMMA, ',');
	        ig.input.bind(ig.KEY.MINUS, '-');
	        ig.input.bind(ig.KEY.PERIOD, '.');
	    }
	});
});

