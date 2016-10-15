// Mansion namespace

var Mansion = Mansion || {};
Mansion.Functions = Mansion.Functions || {};

Mansion.Functions.extend = function (defaults, options) {
    this.defaults = defaults;
    this.options = options;
    this.buildExtended = function(){
        var extended = {};
        for (var prop in this.defaults) {
            if (Object.prototype.hasOwnProperty.call(this.defaults, prop)) {
                extended[prop] = this.defaults[prop];
            }
        }
        for (var prop in this.options) {
            if (Object.prototype.hasOwnProperty.call(this.options, prop)) {
                extended[prop] = this.options[prop];
            }
        }
        return extended;
    }

    return this.buildExtended();
};

Mansion.Functions.mobile = function(options){
    var defaults = {
        mobile_icon: $('.mobile-icon'),
        mobile_menu: $('.mobile-menu'),
        menu:  $('.menu'),
        onShowMenu: function(){
            if(!$('.close-mobile-icon').length){
                obj.settings.mobile_menu.prepend('<div class="close-mobile-icon"></div>');
               $('.close-mobile-icon').on('click', function(e){
                   e.preventDefault;
                   obj.toggleMobile();
               })
            }
            $('#container, #footer').addClass('active');
            obj.settings.mobile_menu.show();
        },
        onHideMenu: function(){
            $('#container, #footer').removeClass('active');
            obj.settings.mobile_menu.hide();
        }
    };
    this.active = false;
    this.settings = Mansion.Functions.extend(defaults, options);
    this.toggleMobile = function(){
        if(!$.trim(obj.settings.mobile_menu.html())){
            //if not visible and empty mobile menu build mobile menu
            obj.settings.mobile_menu.append(obj.settings.menu.clone());
        }
        if(!obj.settings.mobile_menu.is(":visible")){
            obj.settings.onShowMenu();
            this.active = true;
        }else{
            obj.settings.onHideMenu();
        }
    }
    Mansion.Functions.mobile.prototype.setmobile = function(){
        if(!this.settings.mobile_icon.length || !this.settings.mobile_menu.length || !this.settings.menu.length)
            return;
        var obj = this;
        obj.settings.mobile_icon.on('click', function(e){
            e.preventDefault;
            obj.toggleMobile();
        }); 
        $(window).on('resize', function(){
            if(obj.active && !obj.settings.mobile_icon.is(':visible')){
                obj.settings.onHideMenu();
            }
        });
    }
}

var obj = new Mansion.Functions.mobile();
obj.setmobile();

window.onload = function(){
    $(".body-bg").addClass('loader');
    $(".left-acide").addClass('body-loader');
    $(".title-logo").addClass('title-logo-loader');
};