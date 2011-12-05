/*!
 * jquery.tzineClock.js - Tutorialzine Colorful Clock Plugin
 *
 * Copyright (c) 2009 Martin Angelov
 * http://tutorialzine.com/
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Launch  : December 2009
 * Version : 1.0
 * Released: Monday 28th December, 2009 - 00:00
 */

(function($){
    
    // A global array used by the functions of the plug-in:
    var gVars = {};

    // Extending the jQuery core:
    $.fn.countDown = function (options) {
    
                
        config = {};

        $.extend(config, options);

        diffSecs = this.setCountDown(config);

        setDials.call(this);
        // Calling the setUp function and passing the container,
        // will be available to the setUp function as "this":

        //$('#' + $(this).attr('id') + ' .digit').html('<div class="top"></div><div class="bottom"></div>');
        $(this).doCountDown($(this).attr('id'), diffSecs, 500);

        return this;
    };

    $.fn.setCountDown = function (options) {

        var targetTime = new Date();

        targetTime = new Date(options.targetDate.month + '/' + options.targetDate.day + '/' + options.targetDate.year + ' ' + options.targetDate.hour + ':' + options.targetDate.min + ':' + options.targetDate.sec + (options.targetDate.utc ? ' UTC' : ''));
        
        var nowTime = new Date();

        diffSecs = Math.floor((targetTime.valueOf()-nowTime.valueOf())/1000);

        $.data(this[0], 'diffSecs', diffSecs);

        return diffSecs;
    };
    
    $.fn.doCountDown = function (id, diffSecs, duration) {

        $this = $('#' + id);
        if (diffSecs <= 0)
        {
            diffSecs = 0;
            if ($.data($this[0], 'timer'))
            {
                clearTimeout($.data($this[0], 'timer'));
            }
        }

        secs = diffSecs % 60;
        mins = Math.floor(diffSecs/60)%60;
        hours = Math.floor(diffSecs/60/60)%24;
        days = Math.floor(diffSecs/60/60/24)%7;
        weeks = Math.floor(diffSecs/60/60/24/7);
        
        animation(gVars.green, secs, 60, duration ? duration : 800);
        animation(gVars.blue, mins, 60, duration ? duration : 1200);
        animation(gVars.orange, hours, 24, duration ? duration : 1200);

        $.data($this[0], 'diffSecs', diffSecs);
        if (diffSecs > 0)
        {
            e = $this;
            t = setTimeout(function() { e.doCountDown(id, diffSecs-1) } , 1000);
            $.data(e[0], 'timer', t);
        } 
        else if (cb = $.data($this[0], 'callback')) 
        {
            $.data($this[0], 'callback')();
        }

    };

    function setDials() {

        //alert("in setDials");

        // The colors of the dials:
        var colors = ['orange','blue','green'];

        var tmp;

        for(var i=0;i<3;i++)
        {
            // Creating a new element and setting the color as a class name:
            tmp = $('<div>').attr('class',colors[i]+' clock').html(
                '<div class="display"></div>'+
                
                '<div class="front left"></div>'+
                
                '<div class="rotate right">'+
                    '<div class="bg right"></div>'+
                '</div>'+
                
                '<div class="rotate left">'+
                    '<div class="bg left"></div>'+
                '</div>'
            );

            // Appending to the container:
            $(this).append(tmp);

            // Assigning some of the elements as variables for speed:
            tmp.rotateRight = tmp.find('.rotate.right');
            tmp.rotateLeft = tmp.find('.rotate.left');
            tmp.display = tmp.find('.display');
            
            // Adding the dial as a global variable. Will be available as gVars.colorName
            gVars[colors[i]] = tmp;



        };
        
        // Setting up a interval, executed every 1000 milliseconds:
        /*setInterval(function(){
        
            var currentTime = new Date();
            var h = currentTime.getHours();
            var m = currentTime.getMinutes();
            var s = currentTime.getSeconds();
            
            animation(gVars.green, s, 60);
            animation(gVars.blue, m, 60);
            animation(gVars.orange, h, 24);
        
        },1000);*/
    };


    function animation(clock, current, total) {
        //alert(current);
        //alert("in animation");
        // Calculating the current angle:
        var angle = (360/total)*(current);
        
        //console.debug(angle);
        
        var element;
        
        if(current==0)
        {
            // Hiding the right half of the background:
            clock.rotateLeft.hide();
            
            // Resetting the rotation of the left part:
            rotateElement(clock.rotateRight,0);
        }
        

        if(angle<=180)
        {
            // The left part is rotated, and the right is currently hidden:
            clock.rotateRight.hide();
            element = clock.rotateLeft;

        }
        else
        {
            // The first part of the rotation has completed, so we start rotating the right part:
            clock.rotateRight.show();
            clock.rotateLeft.show();
            
            rotateElement(clock.rotateLeft,180);
            
            element = clock.rotateRight;
            angle = angle-180;
            //alert(angle);
        }

        rotateElement(element,angle);
        
        // Setting the text inside of the display element, inserting a leading zero if needed:
        clock.display.html(current<10?'0'+current:current);
    }
    
    function rotateElement(element,angle)
    {
        // Rotating the element, depending on the browser:
        var rotate = 'rotate('+angle+'deg)';
        
        if(element.css('MozTransform')!=undefined)
            element.css('MozTransform',rotate);
            
        else if(element.css('WebkitTransform')!=undefined)
            element.css('WebkitTransform',rotate);
    
        // A version for internet explorer using filters, works but is a bit buggy (no surprise here):
        else if(element.css("filter")!=undefined)
        {
            var cos = Math.cos(Math.PI * 2 / 360 * angle);
            var sin = Math.sin(Math.PI * 2 / 360 * angle);
            
            element.css("filter","progid:DXImageTransform.Microsoft.Matrix(M11="+cos+",M12=-"+sin+",M21="+sin+",M22="+cos+",SizingMethod='auto expand',FilterType='nearest neighbor')");
    
            element.css("left",-Math.floor((element.width()-200)/2));
            element.css("top",-Math.floor((element.height()-200)/2));
        }
    
    }
    
})(jQuery);