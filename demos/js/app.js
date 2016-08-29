

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


// Theme Creator
var themeName="Theme_red";
var borderColor="#F3AFAF";
var borderRadius=8;
var headerColor = "#ED5D5D";
var headerBottomColor = "#F3AFAF";
var headerTextColor = "#FFFFFF";
var bodyColor = "#F3AFAF";
var arrowColor = "#F3AFAF";

$(document).ready(function(){

  $("#themeName").focusout(function(){
    themeName = $(this).val();
    getStyles();
  });

  $('#borderColor').colorPicker({
  GPU: true, // use transform: translate3d or regular rendereing (top, left)
  renderCallback: function($elm, toggled) {

    var colors = this.color.colors;
    borderColor = "#"+colors.HEX;

    if (toggled === true) {
      $("#borderColor").val(borderColor);
    } else if (toggled === false) {

      $("#borderColor").val(borderColor);
    }
    else{
      $("#borderColor").val(borderColor);

      $(".fu_popover_Theme_red").css("border-color","#"+colors.HEX);
      $(".fu_popover_header_Theme_red").css("border-color","#"+colors.HEX);

      if($("#arrow_bottom_pseudo").length){
        $("#arrow_bottom_pseudo").remove();
      }

      var str=".arrow_bottom_Theme_red:after{left: 50%;top: 100%;border-top-color:"+arrowColor+" ;margin-left: -10px;}.arrow_bottom_Theme_red:before{left: 50%;top: 100%;border-top-color: #"+colors.HEX+";margin-left: -11px;}";
      $( "<style type='text/css' id='arrow_bottom_pseudo'>"+str+"</style>" ).appendTo( "head" );
    }
  }

  });

  $("#borderColor").focusout(function(){
    // $(this).css("background-color", $(this).val());
    var color = $(this).val();
    $(".fu_popover_Theme_red").css("border-color",color);
    $(".fu_popover_header_Theme_red").css("border-color",color);

    if($("#arrow_bottom_pseudo").length){
      $("#arrow_bottom_pseudo").remove();
    }

    var str=".arrow_bottom_Theme_red:after{left: 50%;top: 100%;border-top-color: "+arrowColor+";margin-left: -10px;}.arrow_bottom_Theme_red:before{left: 50%;top: 100%;border-top-color: "+color+";margin-left: -11px;}";
    $( "<style type='text/css' id='arrow_bottom_pseudo'>"+str+"</style>" ).appendTo( "head" );

    getStyles();

  });

  $('#headerColor').colorPicker({
  GPU: true, // use transform: translate3d or regular rendereing (top, left)
  renderCallback: function($elm, toggled) {

    var colors = this.color.colors;

    if (toggled === true) {
      $("#headerColor").val("#"+colors.HEX);
    } else if (toggled === false) {
      $("#headerColor").val("#"+colors.HEX);
    }
    else{
      $("#headerColor").val("#"+colors.HEX);
      $(".fu_popover_header_Theme_red").css("background-color","#"+colors.HEX);
    }
  }

  });

  $("#headerColor").focusout(function(){
    headerColor = $(this).val();
    $(".fu_popover_header_Theme_red").css("background-color",headerColor);
    getStyles();
  });

  $('#headerBottomColor').colorPicker({
  GPU: true, // use transform: translate3d or regular rendereing (top, left)
  renderCallback: function($elm, toggled) {

    var colors = this.color.colors;

    if (toggled === true) {
      $("#headerBottomColor").val("#"+colors.HEX);
    } else if (toggled === false) {
      $("#headerBottomColor").val("#"+colors.HEX);
    }
    else{
      $("#headerBottomColor").val("#"+colors.HEX);
      $(".fu_popover_header_Theme_red").css("border-bottom-color","#"+colors.HEX);
    }
  }

  });

  $("#headerBottomColor").focusout(function(){
    headerBottomColor = $(this).val();
    $(".fu_popover_header_Theme_red").css("border-bottom-color",headerBottomColor);
    getStyles();
  });

  $('#headerTextColor').colorPicker({
  GPU: true, // use transform: translate3d or regular rendereing (top, left)
  renderCallback: function($elm, toggled) {

    var colors = this.color.colors;

    if (toggled === true) {
      $("#headerTextColor").val("#"+colors.HEX);
    } else if (toggled === false) {
      $("#headerTextColor").val("#"+colors.HEX);
    }
    else{
      $("#headerTextColor").val("#"+colors.HEX);
      $(".fu_popover_header_Theme_red").css("color","#"+colors.HEX);
    }
  }

  });

  $("#headerTextColor").focusout(function(){
    headerTextColor = $(this).val();
    $(".fu_popover_header_Theme_red").css("color",headerTextColor);
    getStyles();
  });

  $('#bodyColor').colorPicker({
  GPU: true, // use transform: translate3d or regular rendereing (top, left)
  renderCallback: function($elm, toggled) {

    var colors = this.color.colors;

    if (toggled === true) {
      $("#bodyColor").val("#"+colors.HEX);
    } else if (toggled === false) {
      $("#bodyColor").val("#"+colors.HEX);
    }
    else{
      $("#bodyColor").val("#"+colors.HEX);
      $(".fu_popover_Theme_red").css("background-color","#"+colors.HEX);
    }
  }

  });

  $("#bodyColor").focusout(function(){
    bodyColor = $(this).val();
    $(".fu_popover_Theme_red").css("background-color",bodyColor);
    getStyles();
  });

  $('#arrowColor').colorPicker({
  GPU: true, // use transform: translate3d or regular rendereing (top, left)
  renderCallback: function($elm, toggled) {

    var colors = this.color.colors;

    if (toggled === true) {
      $("#arrowColor").val("#"+colors.HEX);
    } else if (toggled === false) {
      $("#arrowColor").val("#"+colors.HEX);
    }
    else{
      $("#arrowColor").val("#"+colors.HEX);

      if($("#arrow_bottom_pseudo").length){
        $("#arrow_bottom_pseudo").remove();
      }

      if(borderColor.length ==0)
      borderColor="rgba(0, 0, 0, 0.2)";

      var str=".arrow_bottom_Theme_red:after{left: 50%;top: 100%;border-top-color: #"+colors.HEX+";margin-left: -10px;}.arrow_bottom_Theme_red:before{left: 50%;top: 100%;border-top-color: "+borderColor+";margin-left: -11px;}";
      $( "<style type='text/css' id='arrow_bottom_pseudo'>"+str+"</style>" ).appendTo( "head" );

    }
  }

  });

  $("#arrowColor").focusout(function(){
    arrowColor = $(this).val();

    if($("#arrow_bottom_pseudo").length){
      $("#arrow_bottom_pseudo").remove();
    }

    if(borderColor.length ==0)
    borderColor="rgba(0, 0, 0, 0.2)";

    var str=".arrow_bottom_Theme_red:after{left: 50%;top: 100%;border-top-color: "+arrowColor+";margin-left: -10px;}.arrow_bottom_Theme_red:before{left: 50%;top: 100%;border-top-color: "+borderColor+";margin-left: -11px;}";
    $( "<style type='text/css' id='arrow_bottom_pseudo'>"+str+"</style>" ).appendTo( "head" );

    getStyles();

  });

});

function changeBorderRadius(newValue){

  document.getElementById("border_radius").innerHTML=newValue;

  $(".fu_popover_Theme_red").css("border-radius",newValue+"px");
  $(".fu_popover_header_Theme_red").css("border-radius",newValue+"px "+newValue+"px 0 0");

  borderRadius = newValue;

  getStyles();

}

function getStyles(){

  var str ='.fu_popover_'+themeName+' {\n   position: absolute;\n   background: '+bodyColor+';\n   z-index: 1060;\n   -webkit-background-clip: padding-box;\n   background-clip: padding-box;\n   border: 1px solid '+borderColor+';\n   border-radius: '+borderRadius+'px;\n   -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n   box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n}';
  str+='\n.fu_popover_header_'+themeName+'{\n   margin: 0;\n   padding: 8px 14px;\n   font-size: 14px;\n   text-align: center;\n   color:'+headerTextColor+';\n   background-color: '+headerColor+';\n   border-bottom: 1px solid '+headerBottomColor+';\n   border-radius: '+borderRadius+'px '+borderRadius+'px 0 0;\n}\n.fu_popover_content_'+themeName+'{\n   padding: 9px 14px;\n}';
  str+='\n.fu_popover_'+themeName+':after, .fu_popover_'+themeName+':before {\n   border: solid transparent;\n   content: " ";\n   height: 0;\n   width: 0;\n   position: absolute;\n   pointer-events: none;\n}\n.fu_popover_'+themeName+':after {\n   border-color: rgba(255, 255, 255, 0);\n   border-width: 10px;\n}\n.fu_popover_'+themeName+':before {\n   border-color: rgba(0, 0, 0, 0);\n   border-width: 11px;\n}';

  str+='\n.arrow_top_'+themeName+':after{\n   left: 50%;\n   bottom: 100%;\n   border-bottom-color: '+arrowColor+';\n   margin-left: -10px;\n}\n.arrow_top_'+themeName+':before{\n   left: 50%;\n   bottom: 100%;\n   border-bottom-color: '+borderColor+';\n   margin-left: -11px;\n}';
  str+='\n.arrow_bottom_'+themeName+':after{\n   left: 50%;\n   top: 100%;\n   border-top-color: '+arrowColor+';\n   margin-left: -10px;\n}\n.arrow_bottom_'+themeName+':before{\n   left: 50%;\n   top: 100%;\n   border-top-color: '+borderColor+';\n   margin-left: -11px;\n}';
  str+='\n.arrow_left_'+themeName+':after{\n   right: 100%;\n   top: 50%;\n   border-right-color: '+arrowColor+';\n   margin-top: -10px;\n}\n.arrow_left_'+themeName+':before{\n   right: 100%;\n   top: 50%;\n   border-right-color: '+borderColor+';\n   margin-top: -11px;\n}';
  str+='\n.arrow_right_'+themeName+':after{\n   left: 100%;\n   top: 50%;\n   border-left-color: '+arrowColor+';\n   margin-top: -10px;\n}\n.arrow_right_'+themeName+':before{\n   left: 100%;\n   top: 50%;\n   border-left-color: '+borderColor+';\n   margin-top: -11px;\n}';

  $("#finalOutput").text(str);

}
