/*  Autumn Greeting Card -- js */

(function($){
	'use strict';

	// declare actors here
   var $backFallingLeaves = $('#brownLeaf, #orangeLeaf, #redLeaf'),
		$textLine1 = $('.text-line-1'),
		$textLine2 = $('.text-line-2'),
		$textGreeting = $('.text-greeting'),
		$treeLeaves = $('[id^=treeleaf]'),
		$floorLeaves = $('[id^=floorleaf]'),
		$bird = $('#Bird'),
		$birdHat = $bird.find('#BirdHat'),
		$birdEyes = $bird.find('#leftEye, #rightEye'),
		$nest = $('#NestAndLeaves'),
		$tree = $('#tree_trunk'),
		$cardContainer = $('.card.container')
	;



	// clear stage 
    function clearStage() {
		var clearTine = new TimelineMax();

		clearTine
			.set($backFallingLeaves, {autoAlpha:0})
			.set($textLine1, {autoAlpha:0})
			.set($textLine2, {autoAlpha:0})
			.set($textGreeting, {autoAlpha:0})
			.set($treeLeaves, {autoAlpha:0})
			.set($bird, {y:'+=65', autoAlpha:0})
			.set($nest, {autoAlpha:0})
			.set($tree, {autoAlpha:0})
			.set($floorLeaves, {y:'+=275', onComplete: showContainer})
		;

		function showContainer() {
			$cardContainer.css('display', 'block');
		}

		return clearTine;
	}
    

	// enter floor vegetation
         function floorVegitation(){
        var bottomVeg = new TimelineMax();
        bottomVeg.staggerTo($floorLeaves,1,{y:0, ease: Back.easeOut, onComplete: startLoop},0.15),
      bottomVeg.fromTo($tree, 1.9/10, {autoAlpha:0, scaleY:0.2, transformOrigin: 'bottom center'}, {autoAlpha:1, scaleY:1, transformOrigin: 'bottom center', ease: Back.easeInOut})
			bottomVeg.fromTo($tree, 0.9, {autoAlpha:0, scaleX:0.2, transformOrigin: 'bottom center'}, {autoAlpha:1, scaleX:1, transformOrigin: 'bottom center', ease: Back.easeInOut}, "-=0.9")
              function startLoop() {
            var colors = ['#594935','#c27b25','#c72020'];
            var bgTl = new TimelineMax({repeat:-1});
            bgTl.to($body,3,{backgroundColor:colors[0]}),
            bgTl.to($body,3,{backgroundColor:colors[1]}),
                            bgTl.to($body,3,{backgroundColor:colors[2]});


            
        }

       return bottomVeg;
}
	// enter tree ... stuff
    function stree(){
        var truff = new TimelineMax();
       truff.staggerFromTo($treeLeaves, 0.6, {scale:0.2, autoAlpha:0, transformOrigin: 'bottom center'}, {scale:1, autoAlpha:1, transformOrigin: 'bottom center'}, 0.02)
       truff.fromTo($nest, 1, {y:0, scale:0.2, autoAlpha:0, transformOrigin: 'bottom center'}, {y:'-=15', scale:1, autoAlpha:1, transformOrigin: 'bottom center', ease: Elastic.easeOut}, '-=0.1')
			truff.to($nest, 0.3, {y:'+=15', ease: Bounce.easeOut})
			truff.add('nest-pop-in')
			truff.set($birdHat, {rotation:12, x:'+=10',})
			.set($birdHat, {rotation:12, x:'+=6'})
			.to($bird, 1.4, {y:'-=79', autoAlpha:1, ease: Power4.easeOut}, 'nest-pop-in+=0.1')
			.add('bird-peeking')
			.set($birdEyes, {autoAlpha:0})
			.set($birdEyes, {autoAlpha:1}, '+=0.2')
			.set($birdEyes, {autoAlpha:0}, '+=0.3')
			.set($birdEyes, {autoAlpha:1}, '+=0.2')
			.add('bird-blinks')

			.to($bird, 0.8, {y:'-=63', ease: Power4.easeInOut}, 'bird-blinks+=0.4')
			.to($bird, 0.3, {y: '+=18', ease: Back.easeOut})
			.to($birdHat, 0.4, {y:'-=9'},'-=0.6')
			.to($birdHat, 0.3, {y:'-=1', rotation:0, x:0, onComplete: startBlinking}, '-=0.2')
			.add('bird-reveal')
		;

		function startBlinking() {
			var birdBlinksTl = new TimelineMax({repeat:-1, repeatDelay: 4});

			birdBlinksTl
				.set($birdEyes, {autoAlpha:0})
				.set($birdEyes, {autoAlpha:1}, '+=0.2')
				.set($birdEyes, {autoAlpha:0}, '+=1.2')
				.set($birdEyes, {autoAlpha:1}, '+=0.2');
            return birdBlinksTl;

		}

		//return treeStuffTl;
		//return treeStuffTl;
        return truff;
    }

	// enter the greeting text
	function greeting() {
        var grext = new TimelineMax();
        grext.fromTo($textLine1,1,{y:'-50',autoAlpha:0},{y:0, autoAlpha:1}),
        grext.fromTo($textLine2,1,{y:'-25',autoAlpha:0},{y:0, autoAlpha:1}),
        grext.staggerFromTo($textGreeting,3.5,{scale: 2,autoAlpha:0, transformOrigin:'center'},{scale: 1,autoAlpha:1, transformOrigin:'center'},0.1);
       
        return grext;
    }
	// the GO function ...to kick things all off
	function gameOver(){
        console.log('Has this message meen departed');
        var masterTimeline = new TimelineMax();
        //remeber to add all nested timelines to the mater timeline
        masterTimeline.add(clearStage(),'clear scene');
        masterTimeline.add(floorVegitation(),'scene-floor-veg');
        masterTimeline.add(stree(),'scene-stree');
        masterTimeline.add(greeting(),' scene-greet');
    }
    clearStage();
    gameOver();
})(jQuery);


