(function ($) {

    $.fn.goTo = function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top - 200 + 'px'
        }, 'fast');
        return this;
    };

    if (!$.fn.popover) throw new Error('Tour requires bootstrap popover.js');

    var Tour = function (element, options) {
        var self = this;
        this.options = options;
        this.$element = $(element);
        this.$start = this.$element.find('[data-start="tour"]');
        this.$quit = this.$element.find('[data-stop="tour"]');
        this.$hide = this.$element.find('[data-dismiss="tour"]');
        this.isActive = null;
        this.$backdrop = null;
        this.i = 0;

        this.$start.click(function () {
            self.start();
        });      

    };

    Tour.DEFAULTS = {
        manual: true,
        delay: 2000
    };

    Tour.prototype.backdrop = function () {

        if (this.isActive) {

            this.$backdrop = $('<div class="tour-backdrop" />')
                .appendTo(document.body);

            this.$backdrop.addClass('tour-in');


        } else if (!this.isActive && this.$backdrop) {
            this.$backdrop.removeClass('tour-in');
        }
    };


    Tour.prototype.stop = function () {
        var self = this;

        var items = this.options.items;

        if (!this.isActive) return;
        
        this.hideTourItem(items[self.i]);

        self.i = 0;
        
        self.$start.text("Start");

        self.$start.off();
        self.$start.on('click', function () {
            self.start();
        });
        
        this.isActive = false;
        this.backdrop();
        this.escape();

    };

    Tour.prototype.escape = function () {
        if (this.isActive) {
            this.$element.on('keyup.dismiss.tour', $.proxy(function (e) {
                e.which == 27 && this.stop();
            }, this));
        } else if (!this.isActive) {
            this.$element.off('keyup.dismiss.tour');
        }
    };


    Tour.prototype.hideTour = function () {
       
        this.stop();
        this.backdrop();
    };

    Tour.prototype.start = function () {
        var self = this;

        if (this.isActive) return;
        this.isActive = true;

        this.escape();

        this.$element.on('click.stop.tour', '[data-stop="tour"]', $.proxy(this.stop, this));

        this.backdrop();

        var manual = this.options.manual;
        var items = this.options.items;
        var length = this.options.items.length;
        

        self.i = 0;
       
        if ($(items[self.i].id).length > 0)
            this.showTourItem(items[self.i]);
        
        if (manual) {
            
            this.$start.text("Continue");

            this.$start.on('click', function () {

                self.hideTourItem(items[self.i]);
                self.i++;
                if (self.i < length && $(items[self.i].id).length >0) {
                    self.showTourItem(items[self.i]);

                } else {
                    self.i = self.i - 1;
                    self.stop();
                   }
            });

        } else {

            self.continue();        
        }

    };

    Tour.prototype.continue = function () {
        var self = this;
       
        var items = this.options.items;
        var length = this.options.items.length;
        var delay = this.options.delay;
        
        if (this.isActive && $(items[self.i].id).length > 0) {
            setTimeout(function () {
            
                self.hideTourItem(items[self.i]);
                self.i++;
                if (self.i < length && self.isActive && $(items[self.i].id).length > 0) {

                    self.showTourItem(items[self.i]);
                    self.continue();

                } else {
                    self.i = self.i - 1;
                    self.stop();
                }
            },
            delay);
        }
    };


    Tour.prototype.showTourItem = function (item) {

        $(item.id).popover({
            container: 'body',
            trigger: "manual",
            placement: item.placement,
            content: item.description
        });

        $(item.id).popover("show");

        $(item.id).goTo();

    };

    Tour.prototype.hideTourItem = function (item) {
        $(item.id).popover("hide");
    };

    var old = $.fn.tour;

    $.fn.tour = function (option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('tour');
            var options = $.extend({}, Tour.DEFAULTS, $this.data(), typeof option == 'object' && option);

            if (!data) $this.data('tour', (data = new Tour(this, options)));
        });
    };

    $.fn.tour.Constructor = Tour;

    $.fn.tour.noConflict = function () {
        $.fn.tour = old;
        return this;
    };

})(jQuery);
