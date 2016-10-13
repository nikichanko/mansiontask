// Mansion namespace
var Mansion = Mansion || {};
Mansion.Functions = Mansion.Functions || {};

// addEvents is function which can apply any EventListener to element
Mansion.Functions.addEvents = function(el){
    this.el = el;

    Mansion.Functions.addEvents.prototype.apply = function(){
        el.addEventListener("click", function(){
            console.log('266');
        }, false);
    }
}

Mansion.Functions.extend = function (defaults, options) {
    this.defaults = defaults;
    this.options = options;
    this.extended = {};

    for (var prop in this.defaults) {
        if (Object.prototype.hasOwnProperty.call(this.defaults, prop)) {
            this.extended[prop] = this.defaults[prop];
        }
    }
    for (var prop in this.options) {
        if (Object.prototype.hasOwnProperty.call(this.options, prop)) {
            this.extended[prop] = this.options[prop];
        }
    }
};

var el = document.getElementById('niki');
var obj = new Mansion.Functions.addEvents(el);
obj.apply();

var defaults = {'event1':1,'event2':2,'event2':3};
var options = {'evat3':4};
var obj1 = new  Mansion.Functions.extend(defaults, options);
var return1 = obj1.extended;
console.log(return1);
