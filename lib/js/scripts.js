function scrollTo(theTarget, theDuration, theBuffer, theCallback) {
    var theDuration = theDuration || 1000,
        theBuffer = theBuffer || 0,
        theCallback = theCallback || null;

    $("body, html").stop().animate({scrollTop: $(theTarget).offset().top + theBuffer}, theDuration, function() {
        if (theCallback) {
            theCallback();
        }
    });
}