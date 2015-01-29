(function($, win, background, cta, title) {

    function render() {

        background.render();
        cta.render();
        title.render();

        //-- http://css-tricks.com/using-requestanimationframe/
        //-- Runs at 60 frames per second
        requestAnimationFrame(render);
    }

    $(win).ready(function() {
        $(win).scroll(function() {
            background.update();
        });
        background.init($('#background'));
        cta.init($('.cta-button'));
        title.init($('.title'));
        render();
    });

})(this.jQuery, window, window.Background, window.Cta, window.Title);
