// http://www.tutorialspoint.com/javascript/array_foreach.htm
/*if (!Object.prototype.forEach)
{
    Object.prototype.forEach = function(fun /*, thisp*)
    {
        var len = this.length;
        if (typeof fun != "function")
            throw new TypeError();

        var thisp = arguments[1];
        for (var i = 0; i < len; i++)
        {
            if (i in this)
                fun.call(thisp, this[i], i, this);
        }
    };
}*/
var argh = {};

getAndDrawRandomSpriteToLoadingScreen = function() {
    // Created by Dan, Hacked to pieces by John
    var random = Math.floor(Math.random()*6);
    random = random + 1;
    var stringnum = "rs" + random;
    var special_ingredient_map = [undefined,4,3,2,1,4,0];
    var special_ingredient = special_ingredient_map[random];
    $(".randomsprite").addClass(stringnum);
    return special_ingredient;
}
/*
 * * Recursively merge properties of two objects 
 * */
function merge(obj1, obj2) {

    for (var p in obj2) {
        try {
            //Property in destination object set; update its value.
            if ( obj2[p].constructor==Object ) {
                obj1[p] = MergeRecursive(obj1[p], obj2[p]);

            } else {
                obj1[p] = obj2[p];

            }

        } catch(e) {
            // Property in destination object not set; create it and set its value.
            obj1[p] = obj2[p];

        }
    }

    return obj1;
}


var whackacake = function all() {
    var $g = this;
    my = {};
    my.config = {
        spawnProbability:3/100,
        gameTime:60,
        ingredientStaysTimeRandom:50,
        ingredientstaysTimeConstant:500,
        goodScore:100,
        badScore:-200,
        numLayersPerCake:10,
        
        gameOverCallback:function(score, cakes){}
    };

    /*my.init = function() {
        
        }*/


    my.init = function(config) {
        var findPosition =function(obj){
            var curleft = curtop = 0;
            if (obj.offsetParent) {
              do {
                  curleft += obj.offsetLeft;
                  curtop += obj.offsetTop;
                 } while (obj = obj.offsetParent);
            return [curleft,curtop];
          }
        }
        my.config = merge(my.config, config);
        my.canvas = document.getElementById("main_canvas");
        my.canvas_cake_stack = document.getElementById("cake_stack");
        var screenWidth = 640;
        var screenHeight = 500;
        var cakeStackWidth = 160;

        var style = my.canvas.getAttribute("style");
        my.canvas.setAttribute("style", style + "; height:" + screenHeight + "; width:" + screenWidth + ";");
        my.canvas_cake_stack.setAttribute("style", style + "; height:" + screenHeight + "; width:" + cakeStackWidth + ";");


        my.canvas.height = screenHeight;
        my.canvas.width = screenWidth;
        my.canvas.x = findPosition(my.canvas)[0];
        my.canvas.y = findPosition(my.canvas)[1];
        my.canvas_cake_stack.height = screenHeight;
        my.canvas_cake_stack.width = cakeStackWidth;

				/**
				* User agent matching to detect iOS devices and Android devices
				* Currently used to adjust animation duration
				**/
				
				my.isRunningOnIos = true;
				my.isRunningOnAndroid = false;
				if (navigator.userAgent.match(/like Mac OS X/i)) {
				   my.isRunningOnIos = true;
				}
				
							if (navigator.userAgent.match(/Android/i)) {
							   my.isRunningOnAndroid = true;
							}

            $g.loadSounds();
    }

    my.start = function(){
        // Loading 
        
        special_ingredient = getAndDrawRandomSpriteToLoadingScreen();
        setTimeout("my.actuallyStart("+special_ingredient+")", 2000); //TODO 4
        $(".game_loading_wp").show();
        $('#canvas_wp').hide();

    }
    
    my.actuallyStart = function(special_ingredient) {
        $(".game_loading_wp").hide();
        $('#canvas_wp').show();
        my.game = new Game(special_ingredient);
        my.game.init();
        $g.sounds.music.play();
        my.loop = setInterval("my.game.loop()", my.game.loopInterval);
    }

    my.setSpawnProb = function(value){
        my.config.spawnProbability = value;
    }
    my.setGoodScore = function(value){
        my.config.goodScore = value;
    }
    my.setBadScore = function(value){
        my.config.badScore = value;
    }


    /**
     * Returns the number of frames required for a delay of a given time
		 * Adjusts according to device type
     */

    my.getDurationInFrames = function(milliseconds){
		if (my.isRunningOnIos)
            return (milliseconds / my.game.loopInterval)/3;
		else if (my.isRunningOnAndroid)
			return (milliseconds/my.game.loopInterval)/5;
		else
			return milliseconds/my.game.loopInterval;
    }

    my.getMousePosition = function(e) {
      e = e || window.event;
      var cursor = {x:0, y:0};
      if (e.pageX || e.pageY) {
          cursor.x = e.pageX;
          cursor.y = e.pageY;
      } 
      else {
          var de = document.documentElement;
          var b = document.body;
          cursor.x = e.clientX + 
              (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
          cursor.y = e.clientY + 
              (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
      }
      return cursor;
    }
    
    
    $g.loadSounds = function() {
        // 5UP3R 1337 C0D3
    
        $g.sounds = {}

        var addSound = function(src) {
            var aud = document.createElement("audio");
            // Set source files for audio
            [".mp3", ".ogg"].forEach(function(ext) {
                var src_el = document.createElement("source");
                src_el.setAttribute("src", src+ext);
                aud.appendChild(src_el);
            });
            aud.addEventListener('ended', function() {
                this.currentTime=0;
                this.pause();
            });
            
            return aud;
        }
        $g.sounds.music = addSound("sound/whackacake");
        $g.sounds.music.load();
        $g.sounds.music.addEventListener('loadeddata', function () {
            // Loaded
        });
        
        
    }
    
    $g.setMusic = function(some_bool) {
        if (some_bool) {
            $g.sounds.music.volume = 1;
        } else {
            $g.sounds.music.volume = 0;
        }    
    }
    
    argh.toggleMusic = function() {
        if ($g.sounds.music.volume < 0.5) {
            $g.sounds.music.volume=1;
            $(".btn_sound1").removeClass("btn_sound1_inactive");
        } else if ($g.sounds.music.volume > 0.5) {
            $g.sounds.music.volume=0;
            $(".btn_sound1").addClass("btn_sound1_inactive");
        }
        return false;
    }

    ///---------------- objects ----------------

    var Game = function(special_ingredient) {
        var $this = this;
        $this.special_ingredient = special_ingredient;

        this.init = function() {
            $this.score = 0;
            $this.cakesFinished = 0;
            $this.loopInterval = 30;
            $this.startTime = new Date().getTime();
            // 1 per second - Actually, this is the expectation of the number of ingredients that should spawn in a frame.
            my.frameCount = 0;
            $this.loadImages();
            $this.cakeStack = new my.CakeStack($this.images.cakeLayers);
            $this.cups = this.createCups();
            $this.animatedText = [];
            $this.scoreDisplay = document.getElementById("game_score");
            $this.frameDisplay = document.getElementById("frames");
            $this.cakesDisplay = document.getElementById("cakes");
            
            //horrible hack to allow multiple games without refresh
            $this.timerDisplay = document.getElementById("timer");
            my.gameDiv = document.getElementById("game");
            $this.timerDisplay.setAttribute("style", ""); 

            $this.ctx = my.canvas.getContext('2d');
            $this.ctx_cake_stack = my.canvas_cake_stack.getContext('2d');
            $this.cursor = new my.Cursor(60, 62, $this.images.cursor_down);
            $this.background_left = new my.Background(my.canvas_cake_stack.width,my.canvas_cake_stack.height,$this.images.background_left);
            $this.background_right = new my.Background(my.canvas.width,my.canvas.height,$this.images.background_right);
            my.gameDiv.addEventListener('click', $this.mouseDown,false);
            my.canvas.addEventListener("touchstart", $this.touchDown, false);
            my.canvas.addEventListener("touchmove", $this.touchMove, true);
            my.canvas.addEventListener("touchend", $this.touchUp, false);
            my.canvas.addEventListener("touchcancel", $this.touchUp, false);
            my.canvas.addEventListener('mousemove', $this.cursor.setPosition);
        }


        //Main game loop
        this.loop = function() {
            my.frameCount++;
            $this.updateState();
            $this.drawAll();

            if (this.getTime() >= 0) {
            } else {
                clearInterval(my.loop);
                this.gameOver();
            }
        }

        this.updateState = function(){
					
						var n_ing = 0;
	           $this.cups.forEach(function(c) {
							if (c.hasIngredient()) {
								n_ing++;
							}
							});
							
            if (Math.random() < my.config.spawnProbability || n_ing==0) {
                var cup = $this.getRandomCup()
                    if (!cup.hasIngredient()) {
                        cup.setIngredient(this.getRandomIngredient()); // Choose a random ingredient
                    }
            }
            $this.cups.forEach(function(c) { c.updateState(); });
            $this.cursor.updateState();
            // Look at the first animatedText element - if it has finished we remove it.
            if ($this.animatedText.length > 0 && $this.animatedText[0].isFinished()) {
                $this.animatedText.shift();
            }
        }

        this.mouseDown = function(e) {
            var mousePosition = my.getMousePosition(e);
            console.log(e);
            var position = $('#main_canvas').offset();
            mouseX = mousePosition.x - position.left;
            mouseY = mousePosition.y - position.top;
            console.log(mouseX);
            console.log(mouseY);
            $this.cursor.down()
            $this.canvasPressed(mouseX, mouseY);
        }

        this.touchDown = function(e) {
            if (!e) {
                var e = event;
            }
            e.preventDefault();
						var position = $('#main_canvas').offset();
            
            touchX = e.targetTouches[0].pageX - position.left;
            touchY = e.targetTouches[0].pageY - position.top;

            $this.canvasPressed(touchX,touchY);

        }

        this.getTime = function() {
            return my.config.gameTime - (new Date().getTime() - $this.startTime) /1000;
        }


        /** 
          This function determines which sprite was clicked
          and takes relevant action. The x,y parameters are passed by
          touchDown or mouseDown functions.
         **/

        this.canvasPressed = function(x,y) {        
            var i;
            for (i = 0; i < $this.cups.length; i++) {
                if ($this.cups[i].hasIngredient() && $this.cups[i].ingredient.sprite.isClickedOn(x, y)) {
                    $this.clickedIngredient($this.cups[i], x, y);
                }
            }
        }


        this.clickedIngredient = function(cup,x, y) {
            //var type = cup.hasIngredient().getType();
            //$this.cakeStack.addToCakeStack(type);
            var isSpecial = (cup.ingredient.type_no == my.game.special_ingredient)
            
            var scoreToAdd = cup.hit();

            var messageX = x - 50;
            var messageY = y - 50;
            var innerColor = 'orange';
            var outerColor = 'white';

            var scoreMessage;
            if (scoreToAdd > 0) {
                scoreMessage = "+"+scoreToAdd;
            } else {
                innerColor = 'brown';
                outerColor = 'white';
                scoreMessage = scoreToAdd;
            }
            
            if (isSpecial) {
                innerColor = 'orange';
                outerColor = 'blue';
                scoreMessage+=" x 2";
            }
            //animate score message popping up
            var textAnimation = new my.TransAnimation(new my.Coords(messageX, messageY),
                    new my.Coords(messageX, messageY - 50),
                    my.getDurationInFrames(2000));

            $this.animatedText.push( new my.AnimatedText( messageX, messageY, innerColor, outerColor, textAnimation, scoreMessage ));

            if (isSpecial) {
                scoreToAdd = scoreToAdd*2;
            }
            $this.score += scoreToAdd;
        }

        this.loadImages = function() {
            var addImage = function(src, width, height) {
                var im = new Image();
                im.src = src;
                im.width = width;
                im.height = height;
                return im;
            }
            $this.images={}
            $this.images.cup = addImage("images/game/bowl_back.png", 150, 100);
            $this.images.cupFront = addImage("images/game/bowl_front.png", 150, 100);
            $this.images.ingredients = addImage("images/game/ingredients.png", 150, 150);
            $this.images.choc = new Image();
            $this.images.choc.src = "images/game/chocolate.jpg";
            for (i=0; i<10; i++) {
                $this.images["ingredient_"+i] = addImage("images/game/ing_"+i+".png", 130, 90);
                $this.images["cake_layer_"+i] = addImage("images/game/cl_"+i+".png", 100, 50);
            }
            $this.images.cursor_down =  addImage("images/game/club_02.png");
        }
        
        


        this.incrementCakes = function() {
            $this.cakesFinished++;
        }


        this.createCups = function() {
            var screenWidth = my.canvas.width;
            var screenHeight = my.canvas.height;

            positions = [[screenWidth / 4 + 20, screenHeight / 4 + 50],
                      [3 * screenWidth / 4 - 20, screenHeight / 4 + 50],
                      [screenWidth / 2, screenHeight / 2 + 20],
                      [screenWidth / 4, 3 * screenHeight / 4],
                      [3 * screenWidth / 4, 3 * screenHeight / 4]]

                          var result = new Array;
            for(var i = 0; i < positions.length; i++){
                frontSprite = new my.Sprite(positions[i][0], positions[i][1], $this.images.cupFront);
                backSprite = new my.Sprite(positions[i][0], positions[i][1], $this.images.cup);
                result.push(new my.Cup(frontSprite, backSprite));
            }
            return result;
        }

        this.getRandomCup = function() {
            cup_idx = Math.floor(Math.random()*$this.cups.length)
                return $this.cups[cup_idx];
        }

        this.getRandomIngredient = function() {
            // 50% chance of only a good ingredient:
            if (Math.random() < 0.5) {
                return new my.Ingredient(Math.floor(Math.random()*5));
            } else {
                return new my.Ingredient(Math.floor(Math.random()*10));
            }
        }


        this.drawAll = function() {

            $this.ctx.clearRect(0, 0, my.canvas.width, my.canvas.height);
            //$this.background_right.draw($this.ctx);
            this.scoreDisplay.innerHTML = $this.score;
            this.frameDisplay.innerHTML = my.frameCount;
            this.cakesDisplay.innerHTML = $this.cakesFinished;

            var timeLeft = parseInt($this.getTime());

            // If < 10 seconds - bigger timer text & red color
            if (timeLeft <= 10) {
                var fontSize = parseInt( (100) - (timeLeft*7) );
                var style = "color:#F00;"
                    + " font-size:"+ fontSize +";";
                this.timerDisplay.setAttribute("style", style);
            }
            this.timerDisplay.innerHTML = timeLeft;

            var i;
            for (i = 0; i < $this.cups.length; i++) {
                $this.cups[i].draw($this.ctx);
            }
            $this.cursor.draw($this.ctx);
            $this.ctx_cake_stack.clearRect(0, 0, my.canvas_cake_stack.width, my.canvas_cake_stack.height);

            for (i = 0; i < $this.animatedText.length; i++) {
                $this.animatedText[i].draw($this.ctx);
            }

            $this.ctx_cake_stack.clearRect(0, 0, my.canvas_cake_stack.width, my.canvas_cake_stack.height);
            //$this.background_left.draw($this.ctx_cake_stack);
            $this.cakeStack.draw($this.ctx_cake_stack);
        }

        this.gameOver = function() {
						/** 
							* my.game.sounds.music.currentTime = 0 was throwing an error on  iOS.
						**/
		
            $g.sounds.music.pause();
            
            var oldScore = $this.score;
            if ($this.cakesFinished > 0) {
                $this.score = $this.score;
            }
            my.config.gameOverCallback($this.score, $this.cakesFinished);
        }
    }

    objects(my);

    return my;

}();


