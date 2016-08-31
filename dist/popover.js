/* ========================================================================
 * fu_popover v1.1.2
 *
 * ========================================================================
 * Copyright 2016 gsreddy.in
 *
 * ======================================================================== */

(function($){

  var pluginName = 'fu_popover';
  var popoverId = 7;

 // These are the plugin defaults values
  var defaults = {
    arrowShow:true,
    autoHide:false,
    autoHideDelay:2500,
    content:'',
    delay:{"show": 0, "hide": 0},
    dismissable:false,
    placement:'bottom',
    themeName:'default',
    title:'',
    trigger:'click',
    width:'150px'
  };

  var fu_popover = function(element,options){

    this.element = $(element);
    this.popoverId = pluginName+"_"+(popoverId++);
    this.options = $.extend({}, defaults, options);
    this.options.autoHideDelay = this.options.autoHideDelay === undefined ? 0 : this.options.autoHideDelay;
    this.options.delay.show = this.options.delay.show === undefined ? 0 : this.options.delay.show;
    this.options.delay.hide = this.options.delay.hide === undefined ? 0 : this.options.delay.hide;
    this.setStyles();
    this.init();
    this.initTriggers();

    return this;
  };

  fu_popover.prototype.setStyles = function(){

    if(this.options.themeName === "default"){
      if($("#fu_popover_styles_default").length){

      }
      else{
        var str='.fu_popover_'+this.options.themeName+' {position: absolute;background: #fff;border: 1px solid rgba(0, 0, 0, 0.2);border-radius: 6px;z-index: 1060;-webkit-background-clip: padding-box;background-clip: padding-box;border: 1px solid #cccccc;border: 1px solid rgba(0, 0, 0, 0.2);border-radius: 6px;-webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);}';

        str+='.fu_popover_header_'+this.options.themeName+'{margin: 0;padding: 8px 14px;font-size: 14px;text-align: center;background-color: #f7f7f7;border-bottom: 1px solid #ebebeb;border-radius: 5px 5px 0 0;}.fu_popover_content_'+this.options.themeName+'{padding: 9px 14px;}';
        str+='.fu_popover_'+this.options.themeName+':after, .fu_popover_'+this.options.themeName+':before {border: solid transparent;content: " ";height: 0;width: 0;position: absolute;pointer-events: none;}.fu_popover_'+this.options.themeName+':after {border-color: rgba(255, 255, 255, 0);border-width: 10px;}.fu_popover_'+this.options.themeName+':before {border-color: rgba(0, 0, 0, 0);border-width: 11px;}';

            str+='.arrow_top_'+this.options.themeName+':after{left: 50%;bottom: 100%;border-bottom-color: #fff;margin-left: -10px;}.arrow_top_'+this.options.themeName+':before{left: 50%;bottom: 100%;border-bottom-color: rgba(0, 0, 0, 0.2);margin-left: -11px;}';
            str+='.arrow_bottom_'+this.options.themeName+':after{left: 50%;top: 100%;border-top-color: #fff;margin-left: -10px;}.arrow_bottom_'+this.options.themeName+':before{left: 50%;top: 100%;border-top-color: rgba(0, 0, 0, 0.2);margin-left: -11px;}';
            str+='.arrow_left_'+this.options.themeName+':after{right: 100%;top: 50%;border-right-color: #fff;margin-top: -10px;}.arrow_left_'+this.options.themeName+':before{right: 100%;top: 50%;border-right-color: rgba(0, 0, 0, 0.2);margin-top: -11px;}';
            str+='.arrow_right_'+this.options.themeName+':after{left: 100%;top: 50%;border-left-color: #fff;margin-top: -10px;}.arrow_right_'+this.options.themeName+':before{left: 100%;top: 50%;border-left-color: rgba(0, 0, 0, 0.2);margin-top: -11px;}';

        // set styles for popover
        $( "<style type='text/css' id='fu_popover_styles_default'>"+str+"</style>" ).appendTo( "head" );

        // set styles for progressbar
        str = '.fu_progress{overflow: hidden;height: 20px;margin-bottom: 10px;background-color: #f5f5f5;border-radius: 4px;-webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);}';
        str+='.fu_progress_bar{float: left;width: 0%;height: 100%;font-size: 12px;line-height: 20px;color: #ffffff;text-align: center;background-color: #337ab7;-webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);-webkit-transition: width 0.6s ease;-o-transition: width 0.6s ease;transition: width 0.6s ease;}';

        $( "<style type='text/css'>"+str+"</style>" ).appendTo( "head" );
      }
    }

  };

  fu_popover.prototype.init = function()
  {
    var title='';
    var content='';

    if(this.options.title.length > 0)
    title='<div class="fu_popover_header_'+this.options.themeName+'">'+this.options.title+'</div>';

    var htmlStr = '<div class="fu_popover_'+this.options.themeName+' '+this.getArrowClass()+'" id="'+this.popoverId+'" style="display:none;">'+title+'<div class="fu_popover_content_'+this.options.themeName+'">'+this.options.content+'</div></div>';

    this.options.dismissable === true ? this.initDismissableEvent():'';

    this.htmlStr = htmlStr;

  };

  fu_popover.prototype.getArrowClass = function(){

    return this.options.placement === 'top' ? 'arrow_bottom_'+this.options.themeName :
           this.options.placement === 'bottom' ? 'arrow_top_'+this.options.themeName :
           this.options.placement === 'left' ? 'arrow_right_'+this.options.themeName :
           this.options.placement === 'right' ? 'arrow_left_'+this.options.themeName : '';
  }
//**************  Events
  fu_popover.prototype.initDismissableEvent = function(){

    var id = this.popoverId;
    var delay = this.options.delay.hide;
    var elem = this.element;

    $(document).mouseup(function (e)
    {
        var container = $(elem);
        var container1 = $('#'+id);

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0 // ... nor a descendant of the container
           && !container1.is(e.target)
           && container1.has(e.target).length === 0) // ... nor a descendant of the container
        {
            $('#'+id).hide(delay);
        }
    });

  };

  fu_popover.prototype.initTriggers = function(){
    var triggers = (this.options.trigger).split(" ");
    triggers = jQuery.unique(triggers);

    for(var i=0;i<triggers.length;i++)
    {
      triggers[i] === 'click' ? this.initClickTrigger() :
      triggers[i] === 'hover' ? this.initHoverTrigger() :
      triggers[i] === 'focus' ? this.initFocusTrigger() : '';
    }
  };

  fu_popover.prototype.initClickTrigger = function(){
    var elem = this.element;
    $('body').on("click", '#'+this.element[0].id+'', function() {
      $(elem).fu_popover("show");
    });
  };
  fu_popover.prototype.initHoverTrigger = function(){
    var elem = this.element;
    $('body').on("mouseenter", '#'+this.element[0].id+'', function() {
      $(elem).fu_popover("show");
    });
  };
  fu_popover.prototype.initFocusTrigger = function(){
    var elem = this.element;
    $('body').on("focus", '#'+this.element[0].id+'', function() {
      $(elem).fu_popover("show");
    });
  };

  //**************  Events

  // Show /hide /destroy
    fu_popover.prototype.display = function(option){

      var id = this.popoverId;

      if(option === 'show'){
        var showDelay = this.options.delay.show;
        var arrowShow = this.options.arrowShow;

        if(!$("#"+id).length)
        $("body").append(this.htmlStr);

        setTimeout(function(){

          if(!arrowShow){
            $("#"+id).attr('class','');
            $("#"+id).addClass("fu_popover_"+this.options.themeName);
          }

          $("#"+id).show();
        },showDelay);

        this.setPopupPosition();

        if(this.options.autoHide === true){
          var hideDelay = this.options.autoHideDelay;
          hideDelay = hideDelay == 0 ? 2500 : hideDelay;

          setTimeout(function(){
              $("#"+id).hide();
          },hideDelay);

        }

      }
      else if(option === 'hide'){
        $("#"+id).hide(this.options.delay.hide);
      }
      else if(option === 'destroy'){
        $("#"+id).remove();
        $(this.element).removeData("fu_popover");
        this.destroyTriggers();
      }

    }

// Calculate offsets - for old browsers
    fu_popover.prototype.getOffsetSum = function(elem) {
      var top=0, left=0
      while(elem) {
        top = top + parseInt(elem.offsetTop)
        left = left + parseInt(elem.offsetLeft)
        elem = elem.offsetParent
      }

      return {top: top, left: left}
    }

// Calculate offsets
    fu_popover.prototype.getOffsetRect = function(elem) {
        var box = elem.getBoundingClientRect()

        var body = document.body
        var docElem = document.documentElement

        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
        var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft

        var clientTop = docElem.clientTop || body.clientTop || 0
        var clientLeft = docElem.clientLeft || body.clientLeft || 0

        var top  = box.top +  scrollTop - clientTop
        var left = box.left + scrollLeft - clientLeft

        return { top: Math.round(top), left: Math.round(left) }
    }

    fu_popover.prototype.getOffset = function( elem ){
        if (elem.getBoundingClientRect) {
            return this.getOffsetRect(elem)
        } else {
            return this.getOffsetSum(elem)
        }
    }

  fu_popover.prototype.setPopupPosition = function(){

    $("#"+this.popoverId).css({width:this.options.width});

    var position = this.getOffset(this.element[0]);

    var popoverPosition = $("#"+this.popoverId).position();

    var parentWidth = $(this.element).outerWidth();
    var parentHeight = $(this.element).outerHeight();
    var parentLeft = position.left;
    var parentTop = position.top;

    var popoverWidth = $("#"+this.popoverId).outerWidth();
    var popoverHeight = $("#"+this.popoverId).outerHeight();

    var left,top;

    if(this.options.placement === 'bottom' || this.options.placement === 'top'){

      var parentCenter = (parentWidth/2);
      var popoverCenter = (popoverWidth/2);

      if(this.options.placement === 'bottom'){
          top = parentTop + parentHeight + 14;// 12.5 - arrow height
      }
      else{
          top = parentTop - popoverHeight - 10;//why 10 ?? box consists shadow
      }

      var  pCenterLeft = parentLeft + parentCenter;

      left = pCenterLeft - popoverCenter;

    }
    else if(this.options.placement === 'left' || this.options.placement === 'right'){

      var parentCenter = (parentHeight/2);
      var popoverCenter = (popoverHeight/2);

      if(this.options.placement === 'left'){
          left = parentLeft - popoverWidth - 10;
      }
      else{
          left = parentLeft + parentWidth + 14;//box shadow
      }

      var  pCenterTop = parentTop + parentCenter;

      top = pCenterTop - popoverCenter;

    }

    $("#"+this.popoverId).css({"left":left+"px","top":top+"px"});

  }

  fu_popover.prototype.destroyTriggers = function(){
    var triggers = (this.options.trigger).split(" ");
    triggers = jQuery.unique(triggers);

    for(var i=0;i<triggers.length;i++)
    {
      $('body').off("click", '#'+this.element[0].id+'', function(){});
      $('body').off("mouseenter", '#'+this.element[0].id+'', function(){});
      $('body').off("focus", '#'+this.element[0].id+'', function(){});
    }
  };

  $.fn.fu_popover = function(options){

    if (typeof options == 'string'){
        var obj = $(this).data(pluginName);
        if(jQuery.isEmptyObject(obj))
        return this;
        obj.display(options);
    }
    else{
      if(!$.data(this, pluginName)){

        var pop = new fu_popover(this,options);
        $("#"+pop.element[0].id).data(pluginName,pop);
        $.data(this, pluginName, pop);

        return this;
      }
    }
  }

}(jQuery));
