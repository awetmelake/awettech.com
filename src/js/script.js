// import AOS from 'aos';
// import 'aos/dist/aos.css';
//scroll to section on nav link click
$(document).ready(function() {
  AOS.init();
  var navHidden = true;

  //change body padding based on window size and nav state
  $(window).resize(function() {
    var width = $(window).width();

    if (width > 600) {
      $("body").css("padding", "56px 0 0");
      navHidden = true;
    } else if (!navHidden && width < 600) {
      $("body").css("padding", "112px 0 0");
    }
  });

  //adjust padding for mobile nav dropdown
  $("#toggle-nav").click(function() {
    $("body").animate({ paddingTop: navHidden ? "112px" : "56" }, 300);
    $(".nav-links-mobile").animate(
      {
        left: navHidden ? "0" : "-120vw"
      },
      300,
      function() {
        navHidden = !navHidden;
      }
    );
  });

// materialize modal
$(document).ready(function(){
    $('.modal').modal();
  });
});
