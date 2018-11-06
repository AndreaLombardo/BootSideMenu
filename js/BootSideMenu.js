/**
 * BootSideMenu v 2.1
 * Authors: Andrea Lombardo, William Crandell
 * http://www.lombardoandrea.com
 * https://github.com/AndreaLombardo/BootSideMenu
 * */
(function ($) {

    // here we go!
    $.BootSideMenu = function(element, userOptions) {
        var defaults = {
            side: "left",
            duration: 500,
            remember: true,
            autoClose: false,
            pushBody: true,
            closeOnClick: true,
            icons: {
                left: 'glyphicon glyphicon-chevron-left',
                right: 'glyphicon glyphicon-chevron-right',
                down: 'glyphicon glyphicon-chevron-down'
            },
            theme: 'default',
            width: "15%",
            onTogglerClick: function () {
                //code to be executed when the toggler arrow was clicked
            },
            onBeforeOpen: function () {
                //code to be executed before menu open
            },
            onBeforeClose: function () {
                //code to be executed before menu close
            },
            onOpen: function () {
                //code to be executed after menu open
            },
            onClose: function () {
                //code to be executed after menu close
            },
            onStartup: function () {
                //code to be executed when the plugin is called
            }
        };

      // to avoid confusions, use "plugin" to reference the
      // current instance of the object
      var plugin = this;

      // this will hold the merged default, and user-provided options
      // plugin's properties will be available through this object like:
      // plugin.settings.propertyName from inside the plugin or
      // element.data('pluginName').settings.propertyName from outside the plugin,
      // where "element" is the element the plugin is attached to;
      plugin.settings = {}

      var $element = $(element), // reference to the jQuery version of DOM element
      element = element; // reference to the actual DOM element

      // the "constructor" method that gets called when the object is created

        var initialCode;
        var newCode;
        var $menu;
        var prevStatus;
        var bodyProperties = {};

        var hoverStatus;

        var $DOMBody = $("body", document);
        
        var resizeStart;
        var resizeEnd;
        var wait = 250;
        //var options = $.extend({}, defaults, userOptions);
    
    plugin.init = function() {
        // the plugin's final properties are the merged default and
        // user-provided options (if any)
        plugin.settings = $.extend({}, defaults, userOptions);
        bodyProperties['originalMarginLeft'] = $DOMBody.css("margin-left");
        bodyProperties['originalMarginRight'] = $DOMBody.css("margin-right");
        bodyProperties['width'] = $DOMBody.width();

        initialCode = $element.html();

        newCode = '<div class="menu-wrapper">' + initialCode + '</div>';
        newCode += '<div class="toggler" data-whois="toggler">';
        newCode += '<span class="icon">&nbsp;</span>';
        newCode += '</div>';

        $element.empty();
        $element.html(newCode);

        $menu = $element;

        $menu.addClass("container");
        $menu.addClass("bootsidemenu");
        $menu.addClass(plugin.settings.theme);
        $menu.css("width", plugin.settings.width);

        if (plugin.settings.side === "left") {
            $menu.addClass("bootsidemenu-left");
        } else if (plugin.settings.side === "right") {
            $menu.addClass("bootsidemenu-right");
        }

        $menu.id = $menu.attr("id");
        $menu.cookieName = "bsm2-" + $menu.id;
        $menu.toggler = $menu.find('[data-whois="toggler"]');
        $menu.originalPushBody = plugin.settings.pushBody;
        $menu.originalCloseOnClick = plugin.settings.closeOnClick;


        if (plugin.settings.remember) {
            prevStatus = readCookie($menu.cookieName);
        } else {
            prevStatus = null;
        }


        forSmallBody();

        switch (prevStatus) {
            case "opened":
                startOpened();
                break;
            case "closed":
                startClosed();
                break;
            default:
                startDefault();
                break;
        }

        if (plugin.settings.onStartup !== undefined && isFunction(plugin.settings.onStartup)) {
            plugin.settings.onStartup($menu);
        }

        $('[data-toggle="collapse"]', $menu).each(function () {
            var $icon = $('<span/>');
            $icon.addClass('icon');
            $icon.addClass(plugin.settings.icons.right);

            $(this).prepend($icon);
        });

        $menu.off('click', '.toggler[data-whois="toggler"]', toggle);
        $menu.on('click', '.toggler[data-whois="toggler"]', toggle);

        $menu.off('click', '.list-group-item');
        $menu.on('click', '.list-group-item', function () {
            $menu.find(".list-group-item").each(function () {
                $(this).removeClass("active");
            });
            $(this).addClass('active');
            $('.icon', $(this)).toggleClass(plugin.settings.icons.right).toggleClass(plugin.settings.icons.down);
        });

        $menu.off('click', 'a.list-group-item', onItemClick);
        $menu.on('click', 'a.list-group-item', onItemClick);

        $menu.off('mouseenter mouseleave');
        $menu.hover(menuOnHoverIn, menuOnHoverOut);

        $(document).on('click', function () {
            if (plugin.settings.closeOnClick && (!hoverStatus)) {
                closeMenu(true);
            }
        });

        window.addEventListener("resize", function () {
            resizeStart = new Date().getMilliseconds();
            resizeEnd = resizeStart + wait;
            setTimeout(function () {
                var now = new Date().getMilliseconds();
                if (now > resizeEnd) {
                    onResize();
                }
            }, wait);
        }, false);
     }
     
			/*
			plugin.foo_public_method = function() {}
      var foo_private_method = function() {} 
      */

      plugin.open = function () {
        openMenu();
        return $menu;
      };

      plugin.close = function () {
        closeMenu();
        return $menu;
      };

      plugin.toggle = function () {
        toggle();
        return $menu;
      };
      
       // fire up the plugin!
       // call the "constructor" method
       plugin.init();


        function menuOnHoverOut() {
            hoverStatus = false;
        }

        function menuOnHoverIn() {
            hoverStatus = true;
        }

        function onItemClick() {
            if (plugin.settings.closeOnClick && ($(this).attr('data-toggle') !== 'collapse')) {
                closeMenu(true);
            }
        }

        function toggle() {

            if (plugin.settings.onTogglerClick !== undefined && isFunction(plugin.settings.onTogglerClick)) {
                plugin.settings.onTogglerClick($menu);
            }

            if ($menu.status === "opened") {
                closeMenu(true);
            } else {
                openMenu(true);
            }
        }

        function switchArrow(side) {
            var $icon = $menu.toggler.find(".icon");

            $icon.removeClass();

            if (side === "left") {
                $icon.addClass(plugin.settings.icons.right);
            } else if (side === "right") {
                $icon.addClass(plugin.settings.icons.left);
            }

            $icon.addClass('icon');
        }

        function startDefault() {
            if (plugin.settings.side === "left") {
                if (plugin.settings.autoClose) {
                    $menu.status = "closed";
                    $menu.hide().animate({
                        left: -($menu.width() + 2)
                    }, 1, function () {
                        $menu.show();
                        switchArrow("left");
                    });
                } else if (!plugin.settings.autoClose) {
                    switchArrow("right");
                    $menu.status = "opened";
                    if (plugin.settings.pushBody) {
                        $DOMBody.css("margin-left", $menu.width() + 20);
                    }
                }
            } else if (plugin.settings.side === "right") {
                if (plugin.settings.autoClose) {
                    $menu.status = "closed";
                    $menu.hide().animate({
                        right: -($menu.width() + 2)
                    }, 1, function () {
                        $menu.show();
                        switchArrow("right");
                    });
                } else {
                    switchArrow("left");
                    $menu.status = "opened";
                    if (plugin.settings.pushBody) {
                        $DOMBody.css("margin-right", $menu.width() + 20);
                    }
                }
            }
        }

        function startClosed() {
            if (plugin.settings.side === "left") {
                $menu.status = "closed";
                $menu.hide().animate({
                    left: -($menu.width() + 2)
                }, 1, function () {
                    $menu.show();
                    switchArrow("left");
                });
            } else if (plugin.settings.side === "right") {
                $menu.status = "closed";
                $menu.hide().animate({
                    right: -($menu.width() + 2)
                }, 1, function () {
                    $menu.show();
                    switchArrow("right");
                })
            }
        }

        function startOpened() {
            if (plugin.settings.side === "left") {
                switchArrow("right");
                $menu.status = "opened";
                if (plugin.settings.pushBody) {
                    $DOMBody.css("margin-left", $menu.width() + 20);
                }

            } else if (plugin.settings.side === "right") {
                switchArrow("left");
                $menu.status = "opened";
                if (plugin.settings.pushBody) {
                    $DOMBody.css("margin-right", $menu.width() + 20);
                }
            }
        }

        function closeMenu(execFunctions) {
            if (execFunctions) {
                if (plugin.settings.onBeforeClose !== undefined && isFunction(plugin.settings.onBeforeClose)) {
                    plugin.settings.onBeforeClose($menu);
                }
            }
            if (plugin.settings.side === "left") {

                if (plugin.settings.pushBody) {
                    $DOMBody.animate({marginLeft: bodyProperties.originalMarginLeft}, {duration: plugin.settings.duration});
                }

                $menu.animate({
                    left: -($menu.width() + 2)
                }, {
                    duration: plugin.settings.duration,
                    done: function () {
                        switchArrow("left");
                        $menu.status = "closed";

                        if (execFunctions) {
                            if (plugin.settings.onClose !== undefined && isFunction(plugin.settings.onClose)) {
                                plugin.settings.onClose($menu);
                            }
                        }
                    }
                });
            } else if (plugin.settings.side === "right") {

                if (plugin.settings.pushBody) {
                    $DOMBody.animate({marginRight: bodyProperties.originalMarginRight}, {duration: plugin.settings.duration});
                }

                $menu.animate({
                    right: -($menu.width() + 2)
                }, {
                    duration: plugin.settings.duration,
                    done: function () {
                        switchArrow("right");
                        $menu.status = "closed";

                        if (execFunctions) {
                            if (plugin.settings.onClose !== undefined && isFunction(plugin.settings.onClose)) {
                                plugin.settings.onClose($menu);
                            }
                        }
                    }
                });
            }

            if (plugin.settings.remember) {
                storeCookie($menu.cookieName, "closed");
            }

        }

        function openMenu(execFunctions) {

            if (execFunctions) {
                if (plugin.settings.onBeforeOpen !== undefined && isFunction(plugin.settings.onBeforeOpen)) {
                    plugin.settings.onBeforeOpen($menu);
                }
            }

            if (plugin.settings.side === "left") {

                if (plugin.settings.pushBody) {
                    $DOMBody.animate({marginLeft: $menu.width() + 20}, {duration: plugin.settings.duration});
                }

                $menu.animate({
                    left: 0
                }, {
                    duration: plugin.settings.duration,
                    done: function () {
                        switchArrow("right");
                        $menu.status = "opened";

                        if (execFunctions) {
                            if (plugin.settings.onOpen !== undefined && isFunction(plugin.settings.onOpen)) {
                                plugin.settings.onOpen($menu);
                            }
                        }
                    }
                });
            } else if (plugin.settings.side === "right") {

                if (plugin.settings.pushBody) {
                    $DOMBody.animate({marginRight: $menu.width() + 20}, {duration: plugin.settings.duration});
                }

                $menu.animate({
                    right: 0
                }, {
                    duration: plugin.settings.duration,
                    done: function () {
                        switchArrow("left");
                        $menu.status = "opened";

                        if (execFunctions) {
                            if (plugin.settings.onOpen !== undefined && isFunction(plugin.settings.onOpen)) {
                                plugin.settings.onOpen($menu);
                            }
                        }
                    }
                });
            }

            if (plugin.settings.remember) {
                storeCookie($menu.cookieName, "opened");
            }
        }


        function forSmallBody() {
            var windowWidth = $(window).width();

            if (windowWidth <= 480) {
                plugin.settings.pushBody = false;
                plugin.settings.closeOnClick = true;
            } else {
                plugin.settings.pushBody = $menu.originalPushBody;
                plugin.settings.closeOnClick = $menu.originalCloseOnClick;
            }
        }

        function storeCookie(nome, valore) {
            var d = new Date();
            d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = nome + "=" + valore + "; " + expires + "; path=/";
        }

        function readCookie(nome) {
            var name = nome + "=";
            var ca = document.cookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === " ")
                    c = c.substring(1);
                if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
            }
            return null;
        }

        function isFunction(functionToCheck) {
            var getType = {};
            return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        }

        function onResize() {
            forSmallBody();
            if ($menu.status === "closed") {
                startClosed();
            }
            if ($menu.status === "opened") {
                startOpened();
            }
        }
    }
    
    $.fn.BootSideMenu = function (options) {

        $.fn.BootSideMenu.open = function () {
            openMenu();
        };

        $.fn.BootSideMenu.close = function () {
            closeMenu();
        };

        $.fn.BootSideMenu.toggle = function () {
            toggle();
        };
        
        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {

          // if plugin has not already been attached to the element
          if (undefined == $(this).data('BootSideMenu')) {

              // create a new instance of the plugin
              // pass the DOM element and the user-provided options as arguments
              var plugin = new $.BootSideMenu(this, options);

              // in the jQuery version of the element
              // store a reference to the plugin object
              // you can later access the plugin and its methods and properties like
              // element.data('pluginName').publicMethod(arg1, arg2, ... argn) or
              // element.data('pluginName').settings.propertyName
              $(this).data('BootSideMenu', plugin);

         }
      });
    }
}(jQuery));
