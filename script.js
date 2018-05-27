const validateForm = (function() {
    // prywatne właściwości 
    let options ={}; 

    //metoda publiczna 
    const init = function(_options) {
        //do modułu będziemy przekazywać opcje
        //przekazane ustawimy w zmiennej options modułu, lub ustawimy domyślne
        options = {
            form : _options.form || null,
            classError : _options.classError || 'error'
        }
        if (options.form == null || options.form == undefined || options.form.length == 0){
            console.warn('validateForm: Źle przekazany formularz');
            return false;
        }
        //ustawiamy dla form novalidate - dzięki temu nie będzie domyślnych dymków walidacji dla pól required
        options.form.setAttribute('novalidate', 'novalidate');
    }

    return {
        init : init
    }
const prepareElements = function() {
    const elements = options.form.querySelectorAll(':scope [required]');

    [].forEach.call(elements, function(element){
        //Sprawdzamy typ pola
        if(elemnt.nodeName.toUpperCase() == 'INPUT'){
            const type = element.type.toUpperCase();

            //dla każdego pola dodajemy osługę funkcji sprawdzającej
            if (type == 'TEXT') {
                element.addEventListener('keyup', function() {testInputText(element)});
                element.addEventListener('blur', function() {testInputText(element)});
            }
            if (type == 'EMAIL') {
                element.addEventListener('keyup', function() {testInputEmail(element)});
                element.addEventListener('blur', function() {testInputEmail(element)});
            }
            if (type ='URL') {
                element.addEventListener('keyup', function() {testInputURL(element)});
                element.addEventListener('blur', function() {testInputURL(element)});
            }
            if (type == 'CHECKBOX') {
                element.addEventListener('click', function() {testInputCheckbox(element)});
            }
            if (type == 'RADIO') {
                element.addEventListener('click', function() {testInputRadio(element)});
            }
        }
      if (element.nodeName.toUpperCase() == 'TEXTAREA'){
        element.addEventListener('keyup', function() {testInputText(element)});
        element.addEventListener('blur', function() {testInputText(element)});
      }  
      if (elemnt.nodeName.toUpperCase() == 'SELECT'){
          element.addEventListener('change', function() {testInputSelect(element)});
      }

    });
};
const init = function(_options) {
    prepareElement();
}

})();