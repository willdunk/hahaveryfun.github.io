$(document).ready(function()
{
	cover();
	$("#open").click(function()
  	{
  		switchcards();
  	});
});

function cover()
{
	$("#cover").hide();
	$("#inside").hide();
	$("#open").hide();
	$("#cover").fadeIn(1000, function()
	{
		$(function(){
      		$("#covertext").typed({
       			strings: ["deer", "Dear Cihtin", "Dear Christina,"],
       			typeSpeed: 0
      		});
  		});
  		$("#open").fadeIn(1000);
	});

}

function switchcards()
{
	$("#cover").fadeOut(1000, function()
	{
		$("#inside").fadeIn(1000, function()
		{
			$("heartwrapper").fadeIn(500);
			inside();
		});
	});
}

function inside()
{
	$(function(){
      	$("#insidetext").typed({
       		strings: ["Happy Valentine's Day! ^5000","From Will"],
       		typeSpeed: 5
      	});
  	});
}