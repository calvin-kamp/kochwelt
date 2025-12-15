const header = {
    
    vars: {
        queries: {
            header:                 '*[data-js=header]',
            navToggle:              '*[data-header-nav-toggle]'
        },

        classes: {
            navOpen:                'header--navigation-open'
        }
    },

    init() {

        this.addEventTrigger();

    },

    addEventTrigger() {

        const $navToggle = document.querySelector(this.vars.queries.navToggle);

        $navToggle.addEventListener('click', () => {

            this.toggleNavigation();

        })

    },

    toggleNavigation() {

        const $header = document.querySelector(this.vars.queries.header);

        $header.classList.toggle(this.vars.classes.navOpen)

    },

}

header.init();