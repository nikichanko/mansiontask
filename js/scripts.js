// Mansion namespace

var Mansion = Mansion || {};
Mansion.Functions = Mansion.Functions || {};
/*
Object.prototype.addEvents = function(){
    var tar1 = this;
            tar1.addEventListener("click", function(){
            console.log('266');
        }, false);
    return tar1;
}

*/
//extend is equvalent of jQuery $.extend function
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
        mobile_icon: null,
        mobile_menu: null,
        menu: null,
        onShowMenu: function(){},
        onHideMenu: function(){}
    };
    this.settings = Mansion.Functions.extend(defaults, options);
    Mansion.Functions.mobile.prototype.setmobile = function(){
        if(!this.settings.mobile_icon.length || !this.settings.mobile_menu.length || !this.settings.menu.length)
            return;
        var obj = this;
        obj.settings.mobile_icon.on('click', function(e){
            e.preventDefault;
            // click on mobile icon
            if(!$.trim(obj.settings.mobile_menu.html())){
                //if not visible and empty mobile menu build mobile menu
                obj.settings.mobile_menu.append(obj.settings.menu.clone());
            }
            if(!obj.settings.mobile_menu.is(":visible")){
                obj.settings.mobile_menu.show('fast').animate({
                    opacity: 1
                },200);
                obj.settings.onShowMenu();
            }else{
                               obj.settings.mobile_menu.hide('fast').animate({
                                   opacity: 0
                },200);
                obj.settings.onHideMenu();
            }
        });
    }
}

var obj = new Mansion.Functions.mobile({
    mobile_icon: $('.mobile-icon'),
    mobile_menu: $('.mobile-menu'),
    menu: $('.menu'),
    onShowMenu: function(){

    },
    onHideMenu: function(){

    },
});
obj.setmobile();

window.onload = function(){
    $(".body-bg").addClass('loader');
    $(".left-acide").addClass('body-loader');
    $(".title-logo").addClass('title-logo-loader');
};