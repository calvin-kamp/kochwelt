const contact = {

    vars: {
        queries: {
            form:                   '*[data-js="contact-form"]'
        },

        attributes: {
            validationRequired:     'data-validation-required'
        },

        classes: {
            valid:                  'valid',
            invalid:                'invalid'
        },

        events: {
            validation:             ['keyup', 'change', 'input'],
            submit:                 'submit'
        },

        states: {
            initialized: false
        }
    },

    init() {

        if(this.vars.states.initialized) {
            return
        }

        const $form = document.querySelector(this.vars.queries.form);

        if(!$form) {
            return
        }

        this.addEventTrigger($form);
        this.vars.states.initialized = true;

    },

    addEventTrigger($form) {

        const $formFields = new Set([
            ...$form.querySelectorAll('input'),
            ...$form.querySelectorAll('textarea')
        ]);

        for(const $formField of $formFields) {
            for(const eventName of this.vars.events.validation) {

                $formField.addEventListener(eventName, () => {
                    this.addEventHandler($formField);
                });

            }
        }

        $form.addEventListener(this.vars.events.submit, (event) => {

            event.preventDefault();

            for(const $formField of $formFields) {
                this.addEventHandler($formField, true);
            }

            if(!$form.checkValidity()) {

                $form.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });

                const $firstInvalid = Array.from($formFields).find((f) => !f.checkValidity());

                if($firstInvalid) {
                    $firstInvalid.focus({ preventScroll: true });
                    $firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }

                return
            }

            alert('Nachricht versendet!');

            this.resetForm($form, $formFields);

        });

    },

    addEventHandler($formField, isSubmit = false) {

        this.setRequiredAttribute($formField);
        this.setValueAttribute($formField);
        this.setValidationClasses($formField, isSubmit);

    },

    setRequiredAttribute($formField) {

        if(!$formField.hasAttribute(this.vars.attributes.validationRequired)) {
            return
        }

        $formField.setAttribute('required', '');

    },

    setValueAttribute($formField) {

        if($formField.tagName === 'INPUT') {
            $formField.setAttribute('value', $formField.value);
            $formField.setAttribute('data-value', $formField.value);
            return
        }

        if($formField.tagName === 'TEXTAREA') {
            $formField.textContent = $formField.value;
            $formField.setAttribute('data-value', $formField.value);
            return
        }

    },

    setValidationClasses($formField, isSubmit) {

        if(!$formField.hasAttribute(this.vars.attributes.validationRequired)) {
            return
        }

        $formField.setCustomValidity('');

        const isValid = $formField.checkValidity();

        $formField.classList.toggle(this.vars.classes.valid, isValid);
        $formField.classList.toggle(this.vars.classes.invalid, !isValid);

    },

    resetForm($form, $formFields) {

        $form.reset();

        for(const $formField of $formFields) {

            $formField.classList.remove(this.vars.classes.valid);
            $formField.classList.remove(this.vars.classes.invalid);

            if($formField.tagName === 'INPUT') {
                $formField.setAttribute('value', '');
                $formField.setAttribute('data-value', '');
            }

            if($formField.tagName === 'TEXTAREA') {
                $formField.textContent = '';
                $formField.setAttribute('data-value', '');
            }

        }

    }

}

contact.init();