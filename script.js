const validateForm = (function() {
    // prywatne właściwości 
    let options ={}; 

    const showFieldValidation = function(input, inputIsValid){
        if(!inputIsValid) {
            input.parentNode.classList.add(options.classError);
        } else {
            input.parentNode.classList.remove(options.classError);
        }
    }
    
    const testInputText = function(input){
        let inputIsValid = true;
        const pattern = input.getAttribute('pattern');
    
        if (pattern != null){
            const reg = new RegExp(pattern, 'gi');
            if(!reg.test(input.value)){
                inputIsValid = false;
            } else {
                if (input.value == '') {
                    inputIsValid = false;
                }
            }
        }
            if (inputIsValid) {
                showFieldValidation(input, true);
                return true;
            } else {
                showFieldValidation(input, false);
                return false;
            }
    };
    
    const testInputEmail = function(input) {
        const mailReg = new RegExp('^[0-9a-zA-z_.-]+@[0-9a-zA-z.-]+\.[a-zA-z]{2,3}$', 'gi');
    
        if(!mailReg.test(input.value)) {
            showFieldValidation(input, false);
            return false;
        } else {
            showFieldValidation(input, true);
            return true;
        }
    };
    
    const testInputURL = function(input) {
        const urlReg = new RegExp('^https:\/\/.+', 'i');
        if(!urlReg.test(input.value)){
            showFieldValidation(input, false);
            return false;
        } else {
            showFieldValidation(input, true);
            return true;
        }
    };
    
    const testInputSelect = function(select) {
        if(select.options[select.selectedIndex].value=='' || select.options[select.selectedIndex].value=='-1') {
            showFieldValidation(select, false);
            return false;
        } else {
            showFieldValidation(select, true);
            return true;
        }
    };
    
    const testInputCheckbox = function(input) {
        const name = input.getAttribute('name');
        const group = input.form.querySelectorAll(':scope input[name="'+name+'"]:checked');
    
        if(group.length) {
            showFieldValidation(input, true);
            return true;
        } else {
            showFieldValidation(input, false);
            return false;
        }
    };

const prepareElements = function() {
    const elements = options.form.querySelectorAll(':scope [required]');

    [].forEach.call(elements, function(element){
        //Sprawdzamy typ pola
        if(element.nodeName.toUpperCase() == 'INPUT'){
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
            if (type =='URL') {
                element.addEventListener('keyup', function() {testInputURL(element)});
                element.addEventListener('blur', function() {testInputURL(element)});
            }
            if (type == 'CHECKBOX') {
                element.addEventListener('click', function() {testInputCheckbox(element)});
            }
            if (type == 'RADIO') {
                element.addEventListener('click', function() {testInputCheckbox(element)});
            }
        }
      if (element.nodeName.toUpperCase() == 'TEXTAREA'){
        element.addEventListener('keyup', function() {testInputText(element)});
        element.addEventListener('blur', function() {testInputText(element)});
      }  
      if (element.nodeName.toUpperCase() == 'SELECT'){
          element.addEventListener('change', function() {testInputSelect(element)});
      }

    });
};

//Sprawdzanie formularza przy wysyłaniu

const formSubmit = function(){
    options.form.addEventListener('submit', function(e) {
        e.preventDefault();

        let validated = true;

        //Pobieranie wszystkich pól z required
        const elements = options.form.querySelectorAll(':scope [required]');

        [].forEach.call(elements, function(element) {
            if (element.nodeName.toUpperCase() == 'INPUT'){
            const type = element.type.toUpperCase();
            if (type == 'EMAIL') {
                if (!testInputEmail(element)) validated = false; 
            }

            if (type == 'URL') {
                if(!testInputURL(element)) validated = false;
            }

            if (type == 'TEXT') {
                if(!testInputText(element)) validated = false;
            }

            if (type == 'CHECKBOX') {
                if(!testInputCheckbox(element)) validated = false;
            }

            if (type == 'RADIO') {
                if(!testInputCheckbox(element)) validated = false;
            }
        }
        if (element.nodeName.toUpperCase() == 'TEXTAREA') {
            if(!testInputText(element)) validated = false;
        }

        if (element.nodeName.toUpperCase() == 'SELECT') {
            if(!testInputSelect(element)) validated = false;
        }
        });

        if (validated) {
            this.submit();
        } else {
            return false;
        }
    });
}

const init = function(_options) {
    //Do modułu będziemy przekazywać opcje
    options = {
        form : _options.form || null, 
        classError : _options.classError || 'error'
    }
    //Jeśli nie przekazaliśmy formularza
    if (options.form == null || options.form == undefined || options.form/length == 0){
        console.warn('validateForm: Źle przekazany formularz');
        return false; 
    }

    //Wyłączenie domyślnych dymków walidacji 
    options.form.setAttribute('novalidate', 'novalidate');

    prepareElements();
    formSubmit();
};

return {
    init : init
}
})();

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.form');
    validateForm.init({form : form})
});


document.addEventListener