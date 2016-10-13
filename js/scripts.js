// Mansion namespace
var Mansion = Mansion || {};
Mansion.Functions = Mansion.Functions || {};

// addEvents is function which can apply any EventListener to element
Mansion.Functions.addEvents = function(el){
    this.el = el;

    Mansion.Functions.addEvents.prototype.apply = function(){
        el.addEventListener("click", function(){
            console.log('1');
        }, false);
    }

}

var el = document.getElementById('niki');
var obj = new Mansion.Functions.addEvents(el);
obj.apply();
