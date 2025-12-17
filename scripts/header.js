const header = {
    
    vars: {
        queries: {
            header:                 '*[data-js=header]',
            navToggle:              '*[data-header-nav-toggle]'
        },

        classes: {
            navOpen:                'header--navigation-open'
        },

        windowWidth:                0
    },

    init() {

        this.addEventTrigger();

    },

    addEventTrigger() {

        const $header = document.querySelector(this.vars.queries.header);
        const $navToggle = document.querySelector(this.vars.queries.navToggle);

        $navToggle.addEventListener('click', (e) => {

            e.stopPropagation();
            this.toggleNavigation();

        })

        document.body.addEventListener('click', (e) => {

            if(!$header) {
                return;
            } 

            if(e.target.closest(this.vars.queries.header)) {
                return;
            }

            $header.classList.remove(this.vars.classes.navOpen);

        });

    },

    toggleNavigation() {

        const $header = document.querySelector(this.vars.queries.header);

        $header.classList.toggle(this.vars.classes.navOpen)

    },

}

header.init();