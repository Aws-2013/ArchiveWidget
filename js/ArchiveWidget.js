var BETTERIR = {}
BETTERIR.ArchiveWidget = function(){
	
	//Private Members
	var whichArchivesSelected = function (e){
        var whichClickedId = [];
        whichClickedId.push(e.target.id);
        return whichClickedId;
    }
	
	var setToolTipAttr = function (cookieID, toolTipMsg){
        $j('#' + cookieID).attr({
            title: toolTipMsg
        });
    }
	
	var setCookie = function (e, archiveState){
        try {
            $j.cookie(e.target.id, archiveState, {
                expires: 90,
                path: '/'
            });
        }
        catch (ex) {
            alert("Cookies could not be set!\nError: " + ex.message);
        }
    }
	
	var getCookies = function (aArchiveIds){
        var aGetAllCookies = [];

        if (aArchiveIds != null) {
            for (var i = 0; i < aArchiveIds.length; i++) {
                aGetAllCookies.push({
                    cookieValue: $j.cookie(aArchiveIds[i]),
                    cookieName: aArchiveIds[i]
                });
            }
        }
        return aGetAllCookies;
    }
	
	//Public Members
	this.checkArchiveState = function (aArchiveIds){
		var $this = this;
        $j.each(aMyCookie = getCookies(aArchiveIds), function(){
            if (this.cookieValue) {
                var listId = $j('#' + this.cookieName).next().attr("id");
                if (this.cookieValue == "opened") {
                    $j('#' + listId).hide();
                    setToolTipAttr(this.cookieName, "Expand");
                }
                else
                if (this.cookieValue == "closed") {
                    $j('#' + listId).show();
                    setToolTipAttr(this.cookieName, "Collapse");
                }
            }
        });
    }
	
	this.setArchiveState = function (event){
        var aWhichClickedId = whichArchivesSelected(event);
        var aMyCookie = getCookies(aWhichClickedId);
		var $this = this;
		
        $j.each(aMyCookie, function(){
            this.cookieValue == null || this.cookieValue == "closed" ? setCookie(event, "opened") : setCookie(event, "closed");

        });
    }
	
	this.setToolTipToggle = function (_this, e){
        var whichYearClicked = whichArchivesSelected(e);
        var whichYearClickedCookie = getCookies(whichYearClicked);

        whichYearClickedCookie[0].cookieValue == "closed" ? setToolTipAttr(_this.id, "Collapse") : setToolTipAttr(_this.id, "Expand");
    }
	
	this.debugCookie = function (myCookie){
        myCookie ? alert(myCookie) : alert("No cookie set");
    }
	
	this.debugDeleteCookie = function (theCookie){
        $j.cookie(theCookie, null);
        oGetCookie ? alert("Cookie Deleted") : alert("No Cookies to Delete");
        oGetCookie = false;
    }
}