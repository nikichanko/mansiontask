// Mansion namespace
var Mansion = Mansion || {};
Mansion.Functions = Mansion.Functions || {};

// addEvents is function which can apply any EventListener to element
Mansion.Functions.addEvents = function(el) {
    this.el = el;

    Mansion.Functions.addEvents.prototype.apply = function(){
        el.addEventListener("click", function(){
            console.log('266');
        }, false);
    }
};

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

var el = document.getElementById('niki');
var obj = new Mansion.Functions.addEvents(el);
obj.apply();

var defaults = {'event1':1,'event2':2,'event3':3};
var options = {'event2':4};
var ret = Mansion.Functions.extend(defaults, options);
console.log(ret);
