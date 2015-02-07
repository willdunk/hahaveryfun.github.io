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
      $("#nav-wrapper").animate
      (
        {width:"50px"}
      );
      shrink();
    }
    else
    {
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
  $("#nav-button").hover
  (
    function()
    {
      $(this).css("display", "none");
      if(navOut())
      {
        $(this).attr("src","../images/icons/arrow_left.png");
      }
      else
      {
        $(this).attr("src","../images/icons/arrow_right.png");
      }
      $(this).fadeIn(200);
    },
    function()
    {
      $(this).css("display", "none");
      $(this).attr("src","../images/icons/list.png");
      $(this).fadeIn(200);
    }
  );
}

function spread()
{
  $.each($(".spreadable"),function()
  {
    var element = $(this);
    var coordinates = $(this).position();
    //storing of left coordinate in data
    $(this).data("left", coordinates.left);
    //calculating of shifting and rotation constants
    var xshift =  ((($(document).width() * .15) - 50) + (coordinates.left))
    var rotation = (45*((($(document).height())/2)-coordinates.top))/(($(document).height())/2)
    var rotationmultiplier = coordinates.left/$(document).width();
    rotation = rotationmultiplier * rotation;
    rotation = rotation * -1
    $(this).data("rotation", rotation);

    //animation on shift and rotation
    $(this).animate
    ({
        left:xshift,
    });
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
  $.each($(".spreadable"),function()
  {
    var element = $(this);
    var currentrotation = $(this).css("transform");
    $(this).animate
    ({
      left:$(this).data("left")
    });
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

$(document).ready(function()
{
  // navHover();
  navClick();
});