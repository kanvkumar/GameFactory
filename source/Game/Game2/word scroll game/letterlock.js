/*

Search methods:
- brute force: O(N), (worst case)
- binary search: O(log N), takes 8 iterations per search (worst case)
- hash table: O(1), takes ~3 iterations per search (worst case; based on empirical observation); has greater memory requirements than brute force or binary search
- huge array: O(1), takes 1 iteration per search (worst case); has greatest memory requirements--array of size 17,576--but can potentially store info about best/shortest moves

Hash table functions are based on the Java functions in Mark Allen Weiss' Data Structures and Problem Solving using Java
*/

// Preload all game board images (actually, just the locked images--all the others have been called)
// Alternate idea: use one game board image that contains all elements and change the CSS background position (loads all at once and reduces # of calls)
var position = ["left","center","right"];
var p = 0;
var imageArray = new Array();
for ( var i = 0; i < position.length; i++ ) {
	imageArray[i+p] = new Image();
	imageArray[i+p].src = position[i] + "-up-arrow-locked.png";
	p++;
	imageArray[i+p] = new Image();
	imageArray[i+p].src = position[i] + "-down-arrow-locked.png";
	p++
	imageArray[i+p] = new Image();
	imageArray[i+p].src = position[i] + "-letter-locked.png";
	p++;
}


// Specify the preferred search type: brute, binary, hash, or array
var searchType = "hash";

var alphabet = "abcdefghijklmnopqrstuvwxyz";

// Dictionary is a string of 3-char words
var dictionary = "AAHAALAASABAABOABSABYACEACTADDADOADSADZAFFAFTAGAAGEAGOAGSAHAAHIAHSAIDAILAIMAINAIRAISAITALAALBALEALLALPALSALTAMAAMIAMPAMUANAANDANEANIANTANYAPEAPOAPPAPTARBARCAREARFARKARMARSARTASHASKASPASSATEATTAUKAVAAVEAVOAWAAWEAWLAWNAXEAYEAYSAZOBAABADBAGBAHBALBAMBANBAPBARBASBATBAYBEDBEEBEGBELBENBESBETBEYBIBBIDBIGBINBIOBISBITBIZBOABOBBODBOGBOOBOPBOSBOTBOWBOXBOYBRABROBRRBUBBUDBUGBUMBUNBURBUSBUTBUYBYEBYSCABCADCAMCANCAPCARCATCAWCAYCEECELCEPCHICIGCISCOBCODCOGCOLCONCOOCOPCORCOSCOTCOWCOXCOYCOZCRUCRYCUBCUDCUECUMCUPCURCUTCWMDABDADDAGDAHDAKDALDAMDANDAPDAWDAYDEBDEEDEFDELDENDEVDEWDEXDEYDIBDIDDIEDIFDIGDIMDINDIPDISDITDOCDOEDOGDOLDOMDONDORDOSDOTDOWDRYDUBDUDDUEDUGDUHDUIDUNDUODUPDYEEAREATEAUEBBECUEDHEDSEEKEELEFFEFSEFTEGGEGOEKEELDELFELKELLELMELSEMEEMSEMUENDENGENSEONERAEREERGERNERRERSESSETAETHEVEEWEEYEFABFADFAGFANFARFASFATFAXFAYFEDFEEFEHFEMFENFERFESFETFEUFEWFEYFEZFIBFIDFIEFIGFILFINFIRFITFIXFIZFLUFLYFOBFOEFOGFOHFONFOPFORFOUFOXFOYFROFRYFUBFUDFUGFUNFURGABGADGAEGAGGALGAMGANGAPGARGASGATGAYGEDGEEGELGEMGENGETGEYGHIGIBGIDGIEGIGGINGIPGITGNUGOAGOBGODGOOGORGOSGOTGOXGOYGULGUMGUNGUTGUVGUYGYMGYPHADHAEHAGHAHHAJHAMHAOHAPHASHATHAWHAYHEHHEMHENHEPHERHESHETHEWHEXHEYHICHIDHIEHIMHINHIPHISHITHMMHOBHODHOEHOGHONHOPHOTHOWHOYHUBHUEHUGHUHHUMHUNHUPHUTHYPICEICHICKICYIDSIFFIFSIGGILKILLIMPINKINNINSIONIREIRKISMITSIVYJABJAGJAMJARJAWJAYJEEJETJEUJEWJIBJIGJINJOBJOEJOGJOTJOWJOYJUGJUNJUSJUTKABKAEKAFKASKATKAYKEAKEFKEGKENKEPKEXKEYKHIKIDKIFKINKIPKIRKISKITKOAKOBKOIKOPKORKOSKUEKYELABLACLADLAGLAMLAPLARLASLATLAVLAWLAXLAYLEALEDLEELEGLEILEKLETLEULEVLEXLEYLEZLIBLIDLIELINLIPLISLITLOBLOGLOOLOPLOTLOWLOXLUGLUMLUVLUXLYEMACMADMAEMAGMANMAPMARMASMATMAWMAXMAYMEDMEGMELMEMMENMETMEWMHOMIBMICMIDMIGMILMIMMIRMISMIXMOAMOBMOCMODMOGMOLMOMMONMOOMOPMORMOSMOTMOWMUDMUGMUMMUNMUSMUTMYCNABNAENAGNAHNAMNANNAPNAWNAYNEBNEENEGNETNEWNIBNILNIMNIPNITNIXNOBNODNOGNOHNOMNOONORNOSNOTNOWNTHNUBNUNNUSNUTOAFOAKOAROATOBAOBEOBIOCAODAODDODEODSOESOFFOFTOHMOHOOHSOILOKAOKEOLDOLEOMSONEONOONSOOHOOTOPEOPSOPTORAORBORCOREORSORTOSEOUDOUROUTOVAOWEOWLOWNOXOOXYPACPADPAHPALPAMPANPAPPARPASPATPAWPAXPAYPEAPECPEDPEEPEGPEHPENPEPPERPESPETPEWPHIPHTPIAPICPIEPIGPINPIPPISPITPIUPIXPLYPODPOHPOIPOLPOMPOPPOTPOWPOXPROPRYPSIPSTPUBPUDPUGPULPUNPUPPURPUSPUTPYAPYEPYXQATQISQUARADRAGRAHRAIRAJRAMRANRAPRASRATRAWRAXRAYREBRECREDREEREFREGREIREMREPRESRETREVREXRHORIARIBRIDRIFRIGRIMRINRIPROBROCRODROEROMROTROWRUBRUERUGRUMRUNRUTRYARYESABSACSADSAESAGSALSAPSATSAUSAWSAXSAYSEASECSEESEGSEISELSENSERSETSEWSEXSHASHESHHSHYSIBSICSIMSINSIPSIRSISSITSIXSKASKISKYSLYSOBSODSOLSOMSONSOPSOSSOTSOUSOWSOXSOYSPASPYSRISTYSUBSUESUKSUMSUNSUPSUQSYNTABTADTAETAGTAJTAMTANTAOTAPTARTASTATTAUTAVTAWTAXTEATEDTEETEGTELTENTETTEWTHETHOTHYTICTIETILTINTIPTISTITTODTOETOGTOMTONTOOTOPTORTOTTOWTOYTRYTSKTUBTUGTUITUNTUPTUTTUXTWATWOTYEUDOUGHUKEULUUMMUMPUNSUPOUPSURBURDURNURPUSEUTAUTEUTSVACVANVARVASVATVAUVAVVAWVEEVEGVETVEXVIAVIDVIEVIGVIMVISVOEVOWVOXVUGVUMWABWADWAEWAGWANWAPWARWASWATWAWWAXWAYWEBWEDWEEWENWETWHAWHOWHYWIGWINWISWITWIZWOEWOGWOKWONWOOWOPWOSWOTWOWWRYWUDWYEWYNXISYAGYAHYAKYAMYAPYARYAWYAYYEAYEHYENYEPYESYETYEWYIDYINYIPYOBYODYOKYOMYONYOUYOWYUKYUMYUPZAGZAPZASZAXZEDZEEZEKZEPZIGZINZIPZITZOAZOOZUZZZZ";

// Dictionary hash table -- size is a prime number about twice the size of the dictionary
var dictionaryHash = new Array(2221);

var shortestMoveTable = new Array(Math.pow(26,3));
// Loop through dictionary to populate shortestMoveTable with zero entries
for ( var i = 0; i < dictionary.length; i=i+3 ) {
	var w = new Word(dictionary.substr(i,3).toLowerCase());
	console.log(dictionary.substr(i,3).toLowerCase());
	shortestMoveTable[w.letters[0].value*(676) + w.letters[1].value*26 + w.letters[2].value] = 0;
}


function HashSet(s) {
	this.size = s;
	this.table = new Array(this.size);
}

function Hash_insert(key) {
	var homePosition = this.hash(key,this.size);
	var currentPosition = homePosition;
	var i = 1;

	while ( this.table[currentPosition] != undefined && this.table[currentPosition] != key ) {
		currentPosition = (homePosition + Math.pow(i,2)) % this.size;
		i++;
	}
	
	this.table[currentPosition] = key;
}

function Hash_find(key) {
	var homePosition = this.hash(key,this.size);
	var currentPosition = homePosition;
	var i = 1;

	while ( this.table[currentPosition] != undefined ) {
		if ( this.table[currentPosition] == key ) 
			return true;
		currentPosition = (homePosition + Math.pow(i,2)) % this.size;
		i++;
	}

	return false;
}

function Hash_hash(key) {
	var hashVal = 0;
	for ( var i = 0; i < key.length; i++ )
		hashVal = 37 * hashVal + key.charCodeAt(i);
	// Weiss includes a check for negative hash values, which shouldn't occur in this case	
	return hashVal % this.size;
}

HashSet.prototype.find = Hash_find;
HashSet.prototype.insert = Hash_insert;
HashSet.prototype.hash = Hash_hash;

// populate hash table
var hashTable = new HashSet(2221);
for ( var i = 0; i < dictionary.length; i=i+3 )
	hashTable.insert(dictionary.substr(i,3).toLowerCase());


// -----------------------------------------------------------
// ideal word (fewest possible moves) via Breadth-First Searh
//
// I had originally set this up as a recursive call, but 
// Firefox would throw "too much recursion" errors
// -----------------------------------------------------------
function getIdealWord(sequence,fewestMoves,lookupList,lockPosition) {
	var marker = "###";

	// Add a level-order marker to the queue
	sequence += marker;

	while ( sequence.length > 0 ) {
		if ( sequence.substr(0,3) == marker ) {
			// Increment fewestMoves
			fewestMoves++;
			// remove front marker
			sequence = sequence.substr(3)
			// add marker to end
			sequence += marker;
		} else {
			var currentWord = new Word(sequence.substr(0,3).toLowerCase());
			sequence = sequence.substr(3)
			
			if ( currentWord.isInDictionary() ) 
				return {"word":currentWord.toString(),"moves":fewestMoves};
			else {
				// iterate over all one-move changes from current sequence
				for ( var j = 0; j <= 2; j++ ) {
					if ( j != lockPosition )
						for ( var k = -1; k <= 1; k = k+2 ) {
							var newWord = new Word(alphabet[currentWord.letters[0].value]+alphabet[currentWord.letters[1].value]+alphabet[currentWord.letters[2].value]);
							newWord.letters[j].value += k;
							// edge cases: a-1 or z+1
							if ( newWord.letters[j].value < 0 )
								newWord.letters[j].value = 25;
							if ( newWord.letters[j].value > 25 )
								newWord.letters[j].value = 0;

							// Only add strings we haven't looked at yet to the queue
							if ( !lookupList.find(newWord.toString()) ) {
								// add to lookup list
								lookupList.insert(newWord.toString());
								// enqueue newWord
								sequence += newWord.toString();
							}
						}
				}
			}
		}	
	}
	// No matches found! This should never occur
	return {"word":"QQQ","moves":fewestMoves}
}


function getRandomLetter() {
	return alphabet[Math.floor(Math.random()*alphabet.length)];
}


function getRandomSequence() {
	// Generate random letter sequence	
	return getRandomLetter() + getRandomLetter() + getRandomLetter();
}

function getRandomWord(lockPosition) {
	// get a random word from dictionary
	var randomWord = dictionary.substr(Math.floor(Math.random()*( dictionary.length/3 )),3).toLowerCase();
	var shuffledWord = "";

	// shuffle non-locked letters
	for ( var i = 0; i < randomWord.length; i++ ) 
		if ( i != lockPosition )
			shuffledWord += getRandomLetter();
		else
			shuffledWord += randomWord.charAt(i);

	return shuffledWord;
}

function Time(s) {
	this.seconds = s;
}

function Time_format() {
	var h = Math.floor(this.seconds/3600);
	var m = Math.floor((this.seconds-h*60)/60);
	var s = this.seconds % 60;
	// if less than one hour, don't include hours
	if ( h < 1 )
		h = "";
	else
		h += ":";	
	// pad seconds with leading zero if fewer than 10
	if ( s < 10 )
		s = "0" + s;

	return h+m+":"+s;
}

function Time_inc() {
	this.seconds++;
}

function Time_reset() {
	this.seconds = 0;
}


Time.prototype.format = Time_format;
Time.prototype.inc = Time_inc;
Time.prototype.reset = Time_reset;

function Game() {
	this.word;
	this.count = 0; // number of games played
	this.stopwatch;
	this.time = new Time(0);
	this.bestTime = new Time(Number.MAX_VALUE);
	this.totalTime = new Time(0);
	this.ideal;
	this.moves = 0;
	this.bestMoves = Number.MAX_VALUE;
	this.totalMoves = 0;
	this.score = 0;
	this.totalScore = 0;
	this.easyMode = false;
	this.lock = true;
	this.lockBonusFactor = 10;
	this.lockPosition = 1; // 0,1,2
	this.lockPositionName = ["left","center","right"];
	this.inProgress = false;
	this.newGame();
}

function Game_updateDisplay() {
	document.getElementById("moves").innerHTML = this.moves;
	document.getElementById("totalMoves").innerHTML = this.totalMoves;

	// Calculate avg. moves per game
	// Number.toPrecision() doesn't do what I'd like. I could redefine it, but...	
	var av = Math.round(this.totalMoves/this.count*10)/10;
	// Tack on a decimal point if none naturally exists
	if ( Math.floor(av) == av )
		av = av + ".0";
	document.getElementById("avg").innerHTML = av;

	this.word.display();
}

function Game_updateClock() {
	this.time.inc();
	this.totalTime.inc();
	// Update clock
	document.getElementById("time").innerHTML = this.time.format();
	document.getElementById("totalTime").innerHTML = this.totalTime.format();
	// Update score
	if ( !this.easyMode )
		this.updateScore(-1);
}

function Game_unlock() {
	this.lock = false;
	this.showButton("unlock");
	this.updateBoardImages();
}

function Game_updateScore(n) {
	this.score += n;
	// The score can never become negative
	if ( this.score <= 0 ) {
		this.score = 0;
		this.unlock();
	}
	// Update screen display
	document.getElementById("score").innerHTML = this.score;
}

function Game_showButton(b) {
	if ( b == "lock" ) {
		document.getElementById("lock").style.display = "inline";
		document.getElementById("unlock").style.display = "none";
	} else {
		document.getElementById("lock").style.display = "none";
		document.getElementById("unlock").style.display = "inline";
	}
}

function Game_setEasyMode(b) {
	this.easyMode = b;
	if ( this.easyMode ) {
		if ( this.inProgress )
			this.updateScore(-this.score);
		this.unlock();
		this.updateIdealMoves();
	}
	else {
		this.easyMode = b;
		this.lock = true;
		if ( this.inProgress ) {
			clearInterval(this.stopwatch);
			this.newGame();
		} else {
			this.showButton("lock");
		}
	}
}

function Game_updateBoardImages() {
	// Set images based on lock status
	for ( var i = 0; i < this.lockPositionName.length; i++ ) {
		var un = "un";
		if (this.lock && this.lockPosition == i)
			un = "";
		document.getElementById("letter" + (i+1) ).style.backgroundImage = "url(" + this.lockPositionName[i] + "-letter-" + un + "locked.png)";
		document.getElementById("letter" + (i+1) + "-up").style.backgroundImage = "url(" + this.lockPositionName[i] + "-up-arrow-" + un +  "locked.png)";
		document.getElementById("letter" + (i+1) + "-down").style.backgroundImage = "url(" + this.lockPositionName[i] + "-down-arrow-" + un + "locked.png)";
	}
}

function Game_newGame() {
	// start new game
	this.inProgress = true;
	this.count++; // Update game count
	document.getElementById("games").innerHTML = this.count;

	if ( this.easyMode )
		this.score = 10;
	else
		this.score = 10*this.lockBonusFactor;
	this.updateScore(0);

	this.moves = 0; // reset moves
	this.time.reset(); // reset time
	this.stopwatch = setInterval("game.updateClock()",1000); // start clock

	if ( this.easyMode ) {
		this.showButton("unlock");
		// Get a random sequence
		this.word = new Word(getRandomSequence());
		// Make sure the new word is not in our dictionary
		while ( this.word.isInDictionary() )
			this.word = new Word(getRandomSequence());
	} else {
		this.lock = true;
		this.showButton("lock");
		// Get a random lock position
		this.lockPosition = Math.floor(Math.random() * this.lockPositionName.length);

		// Pick a random word
		this.word = new Word(getRandomWord(this.lockPosition));
		// Make sure the word is not in our dictionary
		while ( this.word.isInDictionary() )
			this.word = this.word = new Word(getRandomWord(this.lockPosition));	
	}

	// Update display
	this.updateBoardImages();
	this.updateDisplay();
	this.updateIdealMoves();

	
	// Reset ideal word to [hidden]
	document.getElementById("idealWord").innerHTML = "[hidden]";

	// Hide new game button
	document.getElementById("newGame").style.visibility = "hidden";
	
}

function Game_updateIdealMoves() {
	// Show fewest moves
	if ( this.lock )
		this.ideal = getIdealWord(this.word.toString(),0,new HashSet(2221),this.lockPosition);
	else
		this.ideal = getIdealWord(this.word.toString(),0,new HashSet(2221),"");
	if ( document.getElementById("fewestMoves") )
		document.getElementById("fewestMoves").innerHTML = this.ideal.moves;
}

function Game_win() {
	// Stop clock
	clearInterval(this.stopwatch);
	this.inProgress = false;

	// Update best values
	if ( this.moves < this.bestMoves ) {
		this.bestMoves = this.moves;
		document.getElementById("bestMoves").innerHTML = this.bestMoves;
	}
	if ( this.time.seconds < this.bestTime.seconds ) {
		this.bestTime.seconds = this.time.seconds;
		document.getElementById("bestTime").innerHTML = this.bestTime.format();
	}
	
	// Reveal the ideal word
	document.getElementById("idealWord").innerHTML = this.ideal.word;

	// update total score
	this.totalScore += this.score;
	document.getElementById("totalScore").innerHTML = this.totalScore;
	
	// display win message
	alert("You win!");
	// Reveal true lock status
	if ( this.easyMode ) 
		this.showButton("unlock");
	else
		this.showButton("lock");
	// Show new game button
	document.getElementById("newGame").style.visibility = "visible";
	
}

// A shortcut function to letter.previous
function Game_previous(p) {
	if ( this.inProgress && ( !this.lock || this.lockPosition != p ) ) {
		this.word.letters[p].previous();	
		this.moves++;
		
		if ( this.moves > this.ideal.moves ) {
			var penalty = -1;
			if ( this.lock )
				penalty *= this.lockBonusFactor;
			this.updateScore(penalty);
		}
		this.totalMoves++;
		this.updateDisplay();
	}
}

// A shortcut function to letter.next
function Game_next(p) {
	if ( this.inProgress && ( !this.lock || this.lockPosition != p ) ) {
		this.word.letters[p].next();
		game.moves++;
		if ( this.moves > this.ideal.moves ) {
			var penalty = -1;
			if ( this.lock )
				penalty *= this.lockBonusFactor;
			this.updateScore(penalty);
		}
		game.totalMoves++;
		game.updateDisplay();
	}
}

Game.prototype.newGame = Game_newGame;
Game.prototype.updateDisplay = Game_updateDisplay;
Game.prototype.updateIdealMoves = Game_updateIdealMoves;
Game.prototype.updateScore = Game_updateScore;
Game.prototype.updateClock = Game_updateClock;
Game.prototype.win = Game_win;
Game.prototype.previous = Game_previous;
Game.prototype.next = Game_next;
Game.prototype.updateBoardImages = Game_updateBoardImages;
Game.prototype.unlock = Game_unlock;
Game.prototype.setEasyMode = Game_setEasyMode;
Game.prototype.showButton = Game_showButton;

function Word(w) {
	this.letters = new Array();
	for ( var i = 0; i < w.length; i++ )
		this.letters[i] = new Letter(w.charAt(i));
		//console.log(this.letters[i]);
}

function Word_display() {
	// show word on screen/game board
	for ( i = 0; i < this.letters.length; i++ ) {
		var ltr = new Letter(alphabet.charAt(this.letters[i].value));
		document.getElementById("letter"+(i+1)).innerHTML = alphabet.charAt(this.letters[i].value).toUpperCase();
		ltr.previous();
		document.getElementById("letter"+(i+1)+"-up").innerHTML = "<div>" + alphabet.charAt(ltr.value).toUpperCase() + "</div>";
		ltr.next();
		ltr.next();
		document.getElementById("letter"+(i+1)+"-down").innerHTML = "<div>" + alphabet.charAt(ltr.value).toUpperCase() + "</div>";
	}
	if ( this.isInDictionary() ) game.win();
}

function Word_toString() {
	// create string from letters
	var w = "";

	for ( var i = 0; i < this.letters.length; i++ ) 
		w = w + alphabet.charAt(this.letters[i].value);

	return w;
}


function Word_isInDictionary() {
	// check word against dictionary using the specified search type
	switch ( searchType ) {
		case "brute":
			return this.bruteForceSearch(dictionary.toLowerCase());
			break;
		case "binary":
			return this.toString() == this.binarySearch(dictionary.toLowerCase());
			break;
		case "hash":
			return hashTable.find(this.toString());
			break;
		case "array":
			return this.arrayFind();
			break;
		default:
			return hashTable.find(this.toString());
			break;
	}
}


function Word_bruteForceSearch(d) {
	// check against every word in the dictionary until a match is found
	for ( var i = 0; i < d.length; i=i+3 )
		if ( this.toString() == d.substr(i,3).toLowerCase() ) return true;
	// No match found
	return false;
}


function Word_binarySearch(d) {
	var numWords = d.length/3;
	var middle = Math.floor(numWords/2);

	// compare
	var compare = d.substr(middle*3-3,3).localeCompare(this.toString());

	// Base case: if the middle word is a match, return true
	if ( compare == 0 ) return this.toString();

	// Base case: if there is only one word and it didn't match, the word is not present
	if ( numWords <= 1 ) 
		return d.substr(middle*3-3,3);

	// Current words sorts after? Check second half
	if ( compare < 0 ) return this.binarySearch(d.substr(middle*3));

	// Current word sorts before? Check first half
	if ( compare > 0 ) return this.binarySearch(d.substr(0,(middle-1)*3+3));
}


function Word_arrayFind() {
	if ( shortestMoveTable[this.letters[0].value*676+this.letters[1].value*26+this.letters[2].value] == 0 ) 
		return true;
	else
		return false;
}

Word.prototype.display = Word_display;
Word.prototype.toString = Word_toString;
Word.prototype.isInDictionary = Word_isInDictionary;
Word.prototype.bruteForceSearch = Word_bruteForceSearch;
Word.prototype.binarySearch = Word_binarySearch;
Word.prototype.arrayFind = Word_arrayFind;

function Letter(l) {
	var a = "a";
	// calculate position in alphabet based on ASCII string value
	this.value = l.charCodeAt(0) - a.charCodeAt(0);
}

function Letter_next() {
	// go to next letter
	this.value++;
	if ( this.value >= alphabet.length ) this.value = 0;
}

function Letter_previous() {
	// go to previous letter
	this.value--;
	if ( this.value < 0 ) this.value = alphabet.length-1;
}

Letter.prototype.next = Letter_next;
Letter.prototype.previous = Letter_previous;
