// by Xhrn 'Cee' Smith aka Cee Shadowmuur
// https://twitter.com/ceeshadowmuur


function updateClock ()
{
	var currentTime = new Date();
	var currentHours = currentTime.getHours();
	var currentMinutes = currentTime.getMinutes();
	var currentSeconds = currentTime.getSeconds();
	var currentMilSecs = currentTime.getMilliseconds();
	var knobRotation = 0; //the degrees a knob is rotated
	var secondKnob = document.getElementById("secsKnob");
	var minuteKnob = document.getElementById("minsKnob");
	var hourKnob = document.getElementById("hoursKnob");
	var secondSlider = document.getElementById("secondSlider");
	var minuteSlider = document.getElementById("minuteSlider");
	var hourSlider = document.getElementById("hourSlider");
	var crossFader = document.getElementById("crossFader");
	var amLight = document.getElementById("amLight_1_");
	var pmLight = document.getElementById("pmLight");


	// DIGITAL CLOCK /////
	// Convert the hours component to 12-hour format if needed
	currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
	
	//Convert an hours component of "0" to "12"
	currentHours = ( currentHours == 0 ) ? 12 : currentHours;




	//This is the code for the ANALOG knobs
	//Code for the seconds knob
	knobRotation = currentSeconds*6+currentMilSecs/999*6;
	if (knobRotation > 359) 
		{
			knobRotation = 0;
		}

		secondKnob.setAttribute('transform', 'rotate('+knobRotation+' 691.17, 162.37)');



	//Code for the minutes knob
	knobRotation = currentMinutes*6;
	if (knobRotation > 359) 
		{
			knobRotation = 0;
		}

		minuteKnob.setAttribute('transform', 'rotate('+knobRotation+' 425.46, 161.03)');



	//Code for the hours knob
	knobRotation = currentHours*30+currentMinutes/2.5;
	if (knobRotation > 359) 
		{
			knobRotation = 0;
		}

	if (currentHours > 12) 
		{
			knobRotation = (currentHours-24)*30+currentMinutes/2.5;
		}

		hourKnob.setAttribute('transform', 'rotate('+knobRotation+' 163.52, 160.65)');




	//This is the code for the Sliders
	//Code for seconds slider
	var ssBB = secSliderHeight.getBBox();
	var yOffset = (1-currentSeconds/60-currentMilSecs/60000)*ssBB.height;
	var transformSlide = 'translate(0,'+yOffset+')';
	secondSlider.setAttribute('transform',transformSlide);


	//Code for minutes slider
	var msBB = minSliderHeight.getBBox();
	var yOffset = (1-currentMinutes/60)*msBB.height;
	var transformSlide = 'translate(0,'+yOffset+')';
	minuteSlider.setAttribute('transform',transformSlide);


	//Code for hour slider 
	var hsBB = hourSliderHeight.getBBox();
	var yOffset = (1-currentHours/12-currentMinutes/60/12)*hsBB.height;//-currentMinutes/60/12)
	var transformSlide = 'translate(0,'+yOffset+')';
	hourSlider.setAttribute('transform',transformSlide);


	var cbhBB = crossBarWidth.getBBox();
	var xOffset = (currentTime.getHours()/24)*cbhBB.width;
	if (currentTime.getHours() <= 12) 
		{
			xOffset = (currentHours/12)*cbhBB.width;
		}
	else
		{
			var rch = 24-currentTime.getHours();
			xOffset = (rch/12)*cbhBB.width;
		}
	if (currentTime.getHours() == 0) 
		{
			var bch = currentTime.getHours();
			xOffset = (bch/12)*cbhBB.width;
		}

	var transformSlide = 'translate ('+xOffset+', 0)';
	crossFader.setAttribute('transform', transformSlide);


	if (currentTime.getHours() >= 12) 
		{
			amLight.style.opacity = 0;
			pmLight.style.opacity = 1;
		}
	else
		{
			amLight.style.opacity = 1;
			pmLight.style.opacity = 0;
		}


}

window.addEventListener ('load', function()
{
	setInterval(updateClock, 10);
});