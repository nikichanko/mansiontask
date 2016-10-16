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

Mansion.Functions.getFormInputs = function(form){
    this.form = form;
    if(!this.form.length)
        return false;
    $.fn.realVal = function(){
        var $obj = $(this);
        var val = $obj.val();
        var type = $obj.attr('type');
        if (type && type==='checkbox') {
            return $obj.prop('checked') ? 1 : 0;
        } else {
            return val;
        }
    };
    this.inputs = this.form.find('input:not([type="submit"]):not([type="button"]), select, textarea');
    var obj = $.map(this.inputs, function(x, y) {
        return {
            Key: x.name,
            Value: $(x).realVal()
        };
    });
    return  obj;
}

Mansion.Functions.validation = function(form, options){
    var defaults = {
        validated_fields : {
            username: { regex: /^.{4,12}$/g, error: 'Minium 4 Max 12 characters' },
                // any characters with range from 4 to 12 characters
            password: { regex : /^(?=.*[a-z])(?=.*[A-Z])((?=.*\d)|(?=.*[\#@\$%\^&\*\(\)_\+-=])).{6,12}$/g, 
                        error: 'Minium 6 Max 12 characters. One lower-case letter, One capital letter, One number OR special character: !@#$%^&*()_+-=' },
                // One lower-case letter, One capital letter, One number OR special character: !@#$%^&*()_+-=
                // range from 6 to 12 characters
            terms: { regex: /^(?=.*1).{1}$/g, error: 'Need to accept Terms & Conditions'}
                // expect only 1 to be valid
        }
    };
    this.form = form;
    this.settings = Mansion.Functions.extend(defaults, options);
    this.notValidated = function(){
        var inputs = new Mansion.Functions.getFormInputs(this.form);
        var noval = [];
        for(var i in inputs){
            if(this.settings.validated_fields.hasOwnProperty(inputs[i].Key)){
                var input_name = inputs[i].Key;
                if(!this.settings.validated_fields[input_name].regex.test(inputs[i].Value)){
                   noval.push({name:input_name, error: this.settings.validated_fields[input_name].error});
                }
            }
        }
        return noval;
    }
    return this.notValidated();
}

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

function toggleError(el){
    var not_validate = new Mansion.Functions.validation($("#reg_form"));
    var input_name = $(el).prop('name');
    var input_value = $(el).val().trim();
    $(el).removeClass('input-error-field');
    $("#reg_form").find('.input-error').remove();
    if(input_value == '' || input_value.length <= 1){
        return;
    }
    if(not_validate && not_validate.length){
        for(var i in not_validate){
            if(not_validate[i].name == input_name){
                var input = $("#reg_form").find('[name="'+not_validate[i].name+'"]');
                if(input.length){
                    input.addClass('input-error-field');
                    $('<div class="input-error">'+not_validate[i].error+'<span></span></div>').insertAfter(input);
                }
            }

        }
    }
}

$("#reg_form .reg-input-text")
    .on('keyup paste', function(){
        toggleError(this);
    })
    .focus(function(){
       toggleError(this); 
    });

$("#reg_form").on('submit', function(e){
    e.preventDefault;
    var not_validate = new Mansion.Functions.validation($(this));
    $(this).find('.input-error').remove();
    if(not_validate && not_validate.length){
        //not validated build some error functionality
        var j=0;
        for(var i in not_validate){
            var input = $(this).find('[name="'+not_validate[i].name+'"]');
            if(input.length && j==0){
                input.addClass('input-error-field');
                $('<div class="input-error">'+not_validate[i].error+'<span></span></div>').insertAfter(input);
            }else{
                input.removeClass('input-error-field');
            }
            j++;
        }
    }else{
        //validated do ajax request of the form
    }

    return false;
});