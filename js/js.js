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
      $(this).attr("src", "../images/icons/list.png")
      $("#nav-wrapper").animate
      (
        {width:"50px"}
      );

      shrink();
      
      $(".nav-item").toggleClass("nav-item-extended");
    }
    else
    {
      //extend out
      $(this).attr("src", "../images/icons/arrow_left.png")
      $("#nav-wrapper").animate
      (
        {width:"15%"}
      );

      spread();
      
      $(".nav-item").toggleClass("nav-item-extended");
    }
  });
}

function spread()
{
  $("#content-wrapper").animate
  ({
    marginLeft: ($(document).width() * .15)-50
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
    marginLeft:0
  });
  $.each($(".spreadable"),function()
  {
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

function positionCard(_o, _lower, _upper, _animate)
{
  //_o is passed $(this)
  var randomleft = Math.floor(Math.random() * (_upper - _lower)) + _lower;
  var randomtop = Math.floor(Math.random() * (_upper - _lower)) + _lower;
  if (_animate)
  {
    var currentleft = 100*parseInt(_o.css("left"))/parseInt(_o.parent().css("width"));
    var currenttop = 100*parseInt(_o.css("top"))/parseInt(_o.parent().css("height"));
    //animate from their current to the target randomleft and randomtop
    $({leftcurr: currentleft}).animate({leftcurr: randomleft}, 
    {
      duration: 500,
      step: function(step) 
      {
        _o.css
        ({
          left: step + '%'
        });
      }
    });
    $({topcurr: currenttop}).animate({topcurr: randomtop}, 
    {
      duration: 500,
      step: function(step) 
      {
        _o.css
        ({
          top: step + '%'
        });
      }
    });
  }
  else
  {
    _o.css(
    {
      left:randomleft+"%",
      top:randomtop+"%"
    })
  }

}

function projectClick()
{
  $(".project-shadowbox").hide();
  //sets up the hidden cards first

  $.each($(".project-card"), function()
  {
    $(this).hide();
    positionCard($(this), 40, 60, false);
  });
  //fades away intro project text, cards fadeIn, then cluster
  $(".project-intro").click(function()
  {
    $.each($(".project-card"), function()
    {
      $(this).fadeIn(750);
      positionCard($(this), 47, 53, true);
    });
    $(this).toggleClass("project-intro-hidden");
    $(".project-shadowbox").fadeIn(500);
  });

  $("body").on("click", ".project-card", function()
  {
    swapCard($(".project-card:last"));
  });
}

function swapCard(_o)
{
  //takes card _o and shifts it to the back of the line
  var element = _o;
  $(".project-shadowbox").fadeOut(300, function(){$(this).remove()});
  $({swapmargin: 0}).animate({swapmargin: 500}, 
  {
    duration: 500,
    step: function(step) 
    {
      _o.css
      ({
        marginLeft: step + 'px'
      });
    },
    complete: function()
    {
      //card needs to go back
      _o.remove();
      $("#cards-wrapper").prepend(element);
      $("<div class='project-shadowbox'></div>").insertBefore(".project-card:last")
      $(".project-shadowbox").hide().fadeIn(500);
      $({swapmargin: 500}).animate({swapmargin: 0}, 
      {
        duration: 500,
        step: function(step) 
        {
          element.css
          ({
            marginLeft: step + 'px'
          });
        }
      });
    }
  });
}

$(document).ready(function()
{
  navClick();
  projectClick();
});