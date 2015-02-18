//Returns false if nav is folded in, true if nav is out
function navOut()
{
  return !($("#nav-wrapper").css("width")=="50px");
}

function navClick()
{
  $("#nav-button").click(function()
  {
    if(navOut())
    {
      //return to normal
      $(this).attr("src", "images/icons/list.png")
      $("#nav-wrapper").animate
      (
        {width:"50px"}
      );
      shrink();
    }
    else
    {
      //extend out
      $(this).attr("src", "images/icons/arrow_left.png")
      $("#nav-wrapper").animate
      (
        {width:"15%"}
      );
      spread();
    }
  });
}

function navHover()
{
  //change to a hover inverse color effect
}

function spread()
{
  $("#content-wrapper").animate
  ({
    left: ($(document).width() * .15)-50
  });

  //rotation for each spreadable element
  $.each($(".spreadable"),function()
  {
    var coordinates = $(this).offset();
    coordinates.top += $(this).height()/2;
    //storing of left and top coordinate in data
    var rotation = (45*((($(document).height())/2)-coordinates.top))/(($(document).height())/2);
    var rotationmultiplier = coordinates.left/$(document).width();
    rotation = (rotationmultiplier * rotation)*-1;
    $(this).data("rotation", rotation);

    // animation on rotation
    var element = $(this);
    $({deg: 0}).animate({deg: rotation}, 
    {
      duration: 400,
      step: function(now) 
      {
        element.css
        ({
            transform: 'rotate(' + now + 'deg)'
        });
      }
    });
  });
  $("#shadowbox").fadeTo(400,.5);
}

function shrink()
{
  $("#content-wrapper").animate
  ({
    left:0
  });
  $.each($(".spreadable"),function()
  {
    var currentrotation = $(this).css("transform");
    var element = $(this);
    $({deg: $(this).data("rotation")}).animate({deg: 0}, 
    {
      duration: 400,
      step: function(now) 
      {
        element.css
        ({
            transform: 'rotate(' + now + 'deg)'
        });
      }
    });
  });
  $("#shadowbox").fadeOut(400);
}

function layOutNames()
{
  //helper function to create effect on the name
  var easing = "easeOutBounce";
  var time = 1000;
  $('#william').hide();
  $('#eric').hide();
  $('#dunkerley').hide();
  $('#william').slideDown(1200, easing, function() 
  {
    //recursive for each navitem
  });
  $('#eric').slideDown(1000, easing, function() 
    {
      //recursive for each navitem

    });
        $('#dunkerley').slideDown(800, easing, function() 
      {
        
      });
}

$(document).ready(function()
{
  // navHover();
  layOutNames();
  navClick();
});