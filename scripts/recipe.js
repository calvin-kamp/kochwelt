const recipe = {

    vars: {
        queries: {
            ingredientsControl:                     '*[data-js=ingredients-control]',
            ingredientsList:                        '*[data-js=ingredients-list]',
            ingredientItem:                         '*[data-ingredient-item]',
            amountInput:                            '*[data-ingredients-control-input]',
            applyButton:                            '*[data-ingredients-control-button]',
        },

        attributes: {
            servingsAmount:                         'data-servings-amount',
            servingsBaseAmount:                     'data-servings-base-amount',
            ingredientsAmount:                      'data-recipe-ingredients-amount',
            ingredientsBaseAmount:                  'data-recipe-ingredients-base-amount'
        }
    },

    init() {

        this.addEventTrigger();

    },

    addEventTrigger() {

        const $ingredientsControl = document.querySelector(this.vars.queries.ingredientsControl)
        const $amountInput = $ingredientsControl.querySelector(this.vars.queries.amountInput)
        const $applyButton = $ingredientsControl.querySelector(this.vars.queries.applyButton)
        
        $applyButton.addEventListener('click', () => {

            const inputValue = $amountInput.value;
            this.setServingsAmount(inputValue, $amountInput);

        })

        $amountInput.addEventListener('change', () => {

            const inputValue = $amountInput.value;
            this.setServingsAmount(inputValue, $amountInput);

        })
        
    },

    setServingsAmount(amount, $amountInput) {

        $amountInput.setAttribute('value', amount);
        $amountInput.setAttribute(this.vars.attributes.servingsAmount, amount);

        this.updateIngredientAmount(amount);

    },

    updateIngredientAmount(newServingsAmount) {

        const $ingredientItems = document.querySelectorAll(this.vars.queries.ingredientItem);
        const baseServings = Number(document.querySelector(this.vars.queries.amountInput).getAttribute(this.vars.attributes.servingsBaseAmount));

        for(const $ingredientItem of $ingredientItems) {

            const baseIngredientAmount = Number($ingredientItem.getAttribute(this.vars.attributes.ingredientsBaseAmount));
            const ingredientPerServing = baseIngredientAmount / baseServings;
            const newIngredientAmount = ingredientPerServing * Number(newServingsAmount);

            newIngredientAmount.toLocaleString('de-DE', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })

            $ingredientItem.setAttribute(this.vars.attributes.ingredientsAmount, newIngredientAmount);

        }

    }

}

recipe.init();