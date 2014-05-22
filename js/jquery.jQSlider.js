/**
 *	jQSlider jQuery Plugin (patch) v. 1.0
 * 
 * Copyright (c) 2009 Francis David - (http://www.arcticwebsolutions.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

(function($) {
    $.fn.jQSliderToggle = function(options, e, oClicker) {
        var me = $(this);
        return this.each(function() {
            var getDemensions = function() {
                var cssPadding = 0;
                cssPadding = me.css("display") == "none" ? "10" : "0";

                return { cssPadding: cssPadding }
            }
            var oGetDem = null;
            var iSpeed = options.speed;

            oGetDem = options == null || options != null ?  getDemensions() : null;

            if (me.css("display") == "none") {
                if (options == null || options.iRadioBtnGroupIndex > 0 || options.iRadioBtnGroupIndex == null) {
                    $(this).show("slide", { direction: "up" }, iSpeed)
								.parent()
								.css({ "height": 0 })
								.animate({ height: me.outerHeight(true) }, iSpeed);
                    options != null && options.parentID != null ? $("#" + options.parentID).animate({ paddingBottom: oGetDem.cssPadding }, iSpeed) : "";
                }
            }
            else {
                if (options == null || options.iRadioBtnGroupIndex == 0 || options.iRadioBtnGroupIndex == null) {
                    me.hide("slide", { direction: "up" }, iSpeed)
								.parent()
								.css("height", me.outerHeight(true))
								.animate({ height: 0 }, iSpeed);
                    options != null && options.parentID != null ? $("#" + options.parentID).animate({ paddingBottom: oGetDem.cssPadding }, iSpeed) : "";
                }
            }
        })
    }
})(jQuery);