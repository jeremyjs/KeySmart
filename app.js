var time;
var done = false;
var letter = function(l){
	var code = keyCode(l);
	var string = "";
	console.log("key added " + l + "; code: " + code);
	return "<span class='" + code + " untyped letter'>" + l + "</span>";
};
var word = function(word){
	var html = "";
	for (var i = 0; i < word.length; i++) {
		html = html + letter(word.charAt(i));
	}
	return html;
};
var results = function(){
		var wrong = $('#wordview').find('.wrong').length;
		var words = $('#wordview').find('.letter').length/5;
		var html = "Missed letters: " + wrong + "<br>";
		var secs = timer()/1000;
		var wpm = words/secs * 60;
		html = html + "Time elapsed: " + secs + " sec" + "<br>";
		html = html + "WPM: " + wpm.toFixed(1);
		return html;
};
var keyPress = function(e) {
	//if(done){ return; }
	var code = (e.keyCode ? e.keyCode : e.which);
	var key = "." + code;
	console.log("key pressed " + code);
	if($('#wordview').find('.letter').first().hasClass('untyped')){
		timer();
	}
	if(code === 8){
		$('#wordview').find('.typed').last().removeClass("typed").removeClass("wrong").addClass("untyped");
	}
	else if($('#wordview').find('.untyped').first().hasClass(code)){
		$('#wordview').find('.untyped').first().removeClass("untyped").addClass("typed");
	}
	else{
		$('#wordview').find('.untyped').first().removeClass("untyped").addClass("typed wrong");
	}
	if($('#wordview').find('.letter').last().hasClass('typed')){
		$('#results').html(results());
		done = true;
	}
};
var getWords = function(n, options) {
	words = getWord();
	for (var i = 0; i < n-1; i++) {
		words = words + " " + getWord();
	}
	return words;
};
var getWord = function(options){
	return wordList[Math.floor(Math.random()*wordList.length)];
};
var timer = function(){
	console.log(new Date().getTime());
	var interval = (new Date().getTime()) - time;
	time = new Date().getTime();
	return interval;
};
$(document).ready(function() {
	$("#wordview").append(word(getWords(10)));
	$(document).keydown(keyPress);
});