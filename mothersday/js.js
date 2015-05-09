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
  		$("#open").fadeIn(1000);
	});

}

function switchcards()
{
	$("#cover").fadeOut(1000, function()
	{
		$("#inside").fadeIn(1000, function()
		{
			$("#heartwrapper").fadeIn(500);
			inside();
		});
	});
}

function inside()
{
	$(function(){
      	$("#insidetext").typed({
       		strings: ["Happy Mother's Day! ^5000","Love, Eric"],
       		typeSpeed: 5
      	});
  	});
}