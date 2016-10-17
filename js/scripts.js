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

Mansion.Functions.xmlhttpRequest = function(options){
    var defaults = {
        url: '',
        type: 'GET',
        params: '',
        onCompleteRequest: function(){},
        onStartRequest: function(){},
        onError404: function(){console.log("Error 400")},
        onErrorAll: function(){console.log("Other error")}
    };
    this.settings = Mansion.Functions.extend(defaults, options);
    this.xmlhttp = new XMLHttpRequest();
 
    Mansion.Functions.xmlhttpRequest.prototype.doRequest = function(){
        var obj = this;

        //open xml request
        obj.xmlhttp.open(obj.settings.type, obj.settings.url, true);
        obj.settings.onStartRequest();

        //result for xml request
        obj.xmlhttp.onreadystatechange = function() {
            if (obj.xmlhttp.readyState == XMLHttpRequest.DONE ) {
                if (obj.xmlhttp.status == 200) {
                    obj.settings.onCompleteRequest();
                }
                else if (obj.xmlhttp.status == 400) {
                    obj.settings.onError404();
                }
                else {
                    obj.settings.onErrorAll();
                }
            }
        }
        //send xml request
        obj.xmlhttp.send(obj.settings.params);
    }
};


Mansion.Functions.validation = function(form, options){
    var defaults = {
        validated_fields : {
            username: { regex: /^.{4,12}$/g, error: 'Minium 4 Max 12 characters' },
            password: { regex : /^(?=.*[a-z])(?=.*[A-Z])((?=.*\d)|(?=.*[\#@\$%\^&\*\(\)_\+-=])).{6,12}$/g, 
                        error: 'Minium 6 Max 12 characters. One lower-case letter, One capital letter, One number OR special character: !@#$%^&*()_+-=' },
            terms: { regex: /^(?=.*1).{1}$/g, error: 'Need to accept Terms & Conditions'}
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
                   e.preventDefault();
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
            e.preventDefault();
            obj.toggleMobile();
        }); 
        $(window).on('resize', function(){
            if(obj.active && !obj.settings.mobile_icon.is(':visible')){
                obj.settings.onHideMenu();
            }
        });
    }
}

Mansion.Functions.fadeTwoElements = function(el_show, el_hide){
    if(!el_show.length || !el_hide.length)
        return;
    el_hide.fadeOut(100);
    setTimeout(function(){
        el_show.fadeIn(100);
    },200);
}

var obj = new Mansion.Functions.mobile();
obj.setmobile();

window.onload = function(){
    $(".body-bg").addClass('loader');
    $(".left-acide").addClass('body-loader');
    $(".title-logo").addClass('title-logo-loader');
};

// Step1 and Step3 form inputs onchange validation
$("form .reg-input-text, form input[type='checkbox']")
    .on('keyup paste change', function(){
        toggleRegErrorChange($("#step1 form, #step3 form"),this);
    })
    .focus(function(){
       toggleRegErrorChange($("#step1 form, #step3 form"),this); 
    });

// STEP 1 submit registration form
$("#step1 form").on('submit', function(e){
    e.preventDefault();

    var form = $(this);
    if(new toggleRegErrorSubmit(form).validated)
    {
        //validated do xmlhttp request of the form
        var xobj = new Mansion.Functions.xmlhttpRequest({
            type: form.attr('method'),
            url: form.attr('action'),
            params: form.serialize(),
            onStartRequest: function(){
                $('.img-loader').show();
                xobj.xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            },
            onCompleteRequest: function(){
                $('.img-loader').hide();
                var response = xobj.xmlhttp.responseText;
                    object = JSON && JSON.parse(response);
                if(object.hasOwnProperty('status') && object.hasOwnProperty('username') && object.status == '1' && object.username != ""){
                    // show STEP 2 hide STEP 1
                    $("#step3 form").append($('<input type="hidden" value="'+object.username+'" name="username" />'));
                    Mansion.Functions.fadeTwoElements($('#step2'), $('#step1'));
                }else{
                    console.log('Not successful registration');
                }
            } 
        });
        xobj.doRequest();
    }
});

//STEP 2 Continue Registration button click
$('#step2 #continue_btn').on('click', function(e){
    e.preventDefault();
    // show STEP 3 hide STEP 2
    $('#step2').fadeOut(100);
    setTimeout(function(){
        $('#step3').fadeIn(100);
    },200);
})

//Step 3 From submit (Registration 2)
$("#step3 form").on('submit', function(e){
    e.preventDefault();

    var form = $(this);
    if(new toggleRegErrorSubmit(form).validated)
    {
        //validated do xmlhttp request of the form
        var xobj = new Mansion.Functions.xmlhttpRequest({
            type: form.attr('method'),
            url: form.attr('action'),
            params: form.serialize(),
            onStartRequest: function(){
                $('.img-loader').show();
                xobj.xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            },
            onCompleteRequest: function(){
                $('.img-loader').hide();
                var response = xobj.xmlhttp.responseText;
                    object = JSON && JSON.parse(response);
                if(object.hasOwnProperty('status') && object.hasOwnProperty('username') && object.status == '2' && object.username != ""){
                    // show STEP 4 hide STEP 3
                    Mansion.Functions.fadeTwoElements($('#step4'), $('#step3'));
                }else{
                    console.log('Not successful registration');
                }
            } 
        });
        xobj.doRequest();
    }
});

function toggleRegErrorChange(form, el){
    this.form = form;
    this.el = el;

    this.toggleRegError = function(){
        this.form.find('.input-error').remove();
        var not_validate = new Mansion.Functions.validation(this.form);
        var input_name = $(this.el).prop('name');
        var input_value = $(this.el).val().trim();
        if(input_value == '' || input_value.length <= 1){
            return;
        }
        $(this.el).removeClass('input-error-field');
        if(not_validate && not_validate.length){
            for(var i in not_validate){
                if(not_validate[i].name == input_name){
                    var input = this.form.find('[name="'+not_validate[i].name+'"]');
                    if(input.length){
                        input.addClass('input-error-field');
                        input.parent().closest('div').append($('<div class="input-error">'+not_validate[i].error+'<span></span></div>'));
                    }
                }
            }
        }
    } 
    this.toggleRegError();
}

function toggleRegErrorSubmit(form){
    this.form = form;
    this.validated = false;
    this.toggleRegError = function(){
        this.form.find('.input-error').remove();
        var not_validate = new Mansion.Functions.validation(this.form);
        if(not_validate && not_validate.length){
            //not validated build some error functionality
            var j=0;
            for(var i in not_validate){
                var input = this.form.find('[name="'+not_validate[i].name+'"]');
                if(input.length && j==0){
                    input.addClass('input-error-field');
                    input.parent().closest('div').append($('<div class="input-error">'+not_validate[i].error+'<span></span></div>'));
                }else{
                    input.removeClass('input-error-field');
                }
                j++;
            }
        }else{
            this.validated = true;
        }
    }
    this.toggleRegError();
}