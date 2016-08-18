

function initPosChooser() {

  var mod = function(v, m) {
    return (v < 0 ? m : 0) + v % m;
  };

  var currPos, currType, hPos, i, j, len, len1, mPos, open, p1, p2, p2s, positions, vPos;
  //disable on IE
  if (/MSIE (\d)/.test(window.navigator.userAgent) && parseInt(RegExp.$1, 10) < 8) {
    return;
  }
  //build a all permutations of all positions
  positions = [];
  mPos = ['top', 'right', 'bottom', 'left'];
  vPos = ['top', 'bottom'];
  hPos = ['left', 'right'];
  for (i = 0, len = mPos.length; i < len; i++) {
    p1 = mPos[i];
    p2s = vPos.indexOf(p1) >= 0 ? hPos : vPos;
    if (p1 === 'bottom' || p1 === 'left') {
      p2s.reverse();
    }
    for (j = 0, len1 = p2s.length; j < len1; j++) {
      p2 = p2s[j];
      positions.push(p1 + " " + p2);
    }
  }

  //init knob and cycle though position
  $(".pos-chooser").knob({
    stopper: false,
    change: function(val) {

      val = mod(val, 4);

      if(val == 1){
          $("#large_box").fu_popover("destroy");
          $("#large_box").fu_popover({content:'Positioned Right',placement:'right',title:''});
          $("#large_box").fu_popover("show");
      }
      else if(val == 2){
        $("#large_box").fu_popover("destroy");
        $("#large_box").fu_popover({content:'Positioned Bottom',placement:'bottom'});
        $("#large_box").fu_popover("show");
      }
      else if(val == 3){
        $("#large_box").fu_popover("destroy");
        $("#large_box").fu_popover({content:'Positioned Left',placement:'left'});
        $("#large_box").fu_popover("show");
      }
      else if(val == 0 || val == 4){
        $("#large_box").fu_popover("destroy");
        $("#large_box").fu_popover({content:'Positioned Top',placement:'top'});
        $("#large_box").fu_popover("show");
      }
    }
  });
  $(".pos-chooser").siblings().first().addClass(".pos-chooser-dial");
  return $(document).on('click', 'input[name=pos-type]', function() {
    currType = $(this).val();
    return open();
  });
};

function init() {

  initPosChooser();

  //mouse animation
  var mouseDemo = $(".demo-mouse");
  return $('.summary').hover(function() {
    return mouseDemo.addClass("over");
  }, function() {
    return mouseDemo.removeClass("over");
  });
};

//init on DOM ready
$(init);
