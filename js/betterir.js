/*
 *	Customized script to handle archive states.
 *	Dated: 01/26/2009
 *
 */
// ------------------- GLOBALS ------------------- //
var $j = jQuery;
// ------------------- GLOBALS ------------------- //

$j().ready(function(){
    init();
});

function init(){
    var zipLabels = $j('#archivedNewsLetters>li>a');
    var aArcLinks = $j('#archivedNewsLetters li ul li a');
    var aYearsIds = [];
    var archiveWidget = new BETTERIR.ArchiveWidget();

    $j('#tabs').length > 0 && $j('#tabsContentContainer').length > 0 ? $j.jQTabs('tabs', 'tabsContentContainer', {evt: "mouseover"}) : "";

    aArcLinks.mouseover(function(event){
        $j(this).parent().css({
            'position': 'relative'
        });
        $j(this).next().css({
            'position': 'absolute'
        });
        $j(this).next().show().css({
            'left': $j(this).width() + 10
        });

    }).mouseout(function(event){
        $j(this).parent().css({
            'position': 'static'
        });
        $j(this).next().css({
            'position': 'static'
        });
        $j(this).next().hide();
    });

    zipLabels.each(function(i){
        aYearsIds.push(this.id);
    }).click(function(event){
        var $thisId = $j('#' + this.id).next().attr("id");
        if ($j.support.cssFloat) {
            $j("#" + $thisId).css("padding", "1px 0");
            $j("#"+ $thisId).jQSliderToggle({
                speed: 500
            })
        }
        else {
            $j('#' + $thisId).slideToggle("normal");
        }
        archiveWidget.setArchiveState(event);
        archiveWidget.setToolTipToggle(this, event);
        return false;
    });

    archiveWidget.checkArchiveState(aYearsIds);
}