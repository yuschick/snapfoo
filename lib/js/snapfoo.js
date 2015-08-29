function snapFoo(theSVGContainerID) {
    "use strict";
    var theLoopIntervalIDs = [], thePathLoopIntervalIDs = [], theAnimatingElementsObj = {};

    var theIntervalFunctions = {
            storeIntervalID: function(theID) {
                /**
                 * Store an interval ID for later use
                 * @param {Number} theID
                 */
                theLoopIntervalIDs.push(theID);
            },

            clearIntervalIDs: {
                /**
                 * Clear loop intervals
                 */
                all: function() {
                    var i = 0;
                    while (i<theLoopIntervalIDs.length) {
                        clearInterval(theLoopIntervalIDs[i]);
                        i++
                    }
                    while (i<thePathLoopIntervalIDs.length) {
                        clearInterval(thePathLoopIntervalIDs[i]);
                        i++
                    }
                    thePathLoopIntervalIDs=[];
                    theLoopIntervalIDs=[];
                },

                sequences: function() {
                    while (i<theLoopIntervalIDs.length) {
                        clearInterval(theLoopIntervalIDs[i]);
                        i++
                    }
                    theLoopIntervalIDs=[];
                },

                paths: function() {
                    while (i<thePathLoopIntervalIDs.length) {
                        clearInterval(thePathLoopIntervalIDs[i]);
                        i++
                    }
                    thePathLoopIntervalIDs=[];
                }
            },

            clearSpecificInterval: function(theID) {
                /**
                 * Clear a specific loop interval
                 */
                clearInterval(theID);
            }
        },

        theAnimationFunctions = {
            stop: {
                sectionAnimations: function(theSVGContainerID) {
                    /**
                     * Stop all animations inside the provided section SVG container
                     * @param {String} theSVGContainerID
                     */
                    var s = Snap.select(theSVGContainerID),
                        theElements = s.selectAll("image","g","ellipse","rect","path","line");

                    theIntervalFunctions.clearIntervalIDs();

                    theElements.forEach(function(el) {
                        el.stop();
                    });
                },
                specificAnimation: function(theElement) {
                    /**
                     * Stop a specific Snap animation
                     * @param {String} theElement
                     */
                    var theParentSVG = "#" + $(theElement).parents("svg").attr("id"),
                        s = Snap.select(theParentSVG),
                        theElements = s.selectAll(theElement);

                    theElements.forEach(function(el) {
                        el.stop();
                    });
                }
            },

            setSVGElementAttrWithSnap: function(theElement, theAttrValues) {
                /**
                 * Set a Snap element's attributes
                 * @param {String} theElement
                 * @param {Object} theAttrValues
                 */
                var s = Snap.select(theSVGContainerID),
                    theSVGElement = s.select(theElement);

                theSVGElement.attr(theAttrValues);
            },

            animateSingleSVGElementWithSnap: function(theElement, theAnimationValues, theDuration, theEasing, theDelay, theCallback) {
                /**
                 * Performs an animation of one element in one direction
                 * @param {String} theElement
                 * @param {Object} theAnimationValues
                 * @param {Number} theDuration
                 * @param {Function} theEasing
                 * @param {Number} theDelay
                 * @param {Object} theCallback
                 */

                theEasing = theEasing || mina.linear;
                theDelay = theDelay || 0;
                theCallback = theCallback || null;

                var s = Snap.select(theSVGContainerID),
                    theSVGElement = s.select(theElement);

                setTimeout(function() {
                    theSVGElement.stop().animate(theAnimationValues, theDuration, theEasing, function() {
                        if (theCallback) {
                            if (typeof theCallback === "function") {
                                theCallback();
                            } else {
                                for (var key in theCallback) {
                                    theCallback[key]();
                                }
                            }
                        }
                    });
                }, theDelay);

                if (theElement in theAnimatingElementsObj) {
                    theAnimatingElementsObj[theElement].frameProgress++;

                    if (theAnimatingElementsObj[theElement].frameProgress >= theAnimatingElementsObj[theElement].totalFrames) {
                        if (theAnimatingElementsObj[theElement].doLoop) {
                            theAnimatingElementsObj[theElement].frameProgress = 0;
                            theAnimatingElementsObj[theElement].loopsCompleted++;
                        }
                    }
                }
            },

            animateSequence: function (theElement, theAnimationValues, thePassedFrame) {
                /**
                 * Receives an array of animation values and sends them in sequence to animateGroupOfSVGElementsWithSnap
                 * @param {String} theElement
                 * @param {Object} theAnimationValuesArray{keyframes[ values, duration, easing, options { keyframeCallback, keyframeDelay }], stagger, animationDelay, animationCallback, loop, loopCount}
                 * @param {Number} theCurrentFrame
                 *
                 */

                var theCurrentFrame = thePassedFrame || 0,
                    doLoop = theAnimationValues.loop || false,
                    totalLoops = theAnimationValues.loopCount || 0,
                    theStagger = theAnimationValues.stagger || 0,
                    theAnimationDelay = theAnimationValues.animationDelay || 0,
                    theAnimationCallback = theAnimationValues.animationCallback || null;

                if (theCurrentFrame >= theAnimationValues.keyframes.length) {
                    if (doLoop) {
                        if(totalLoops > 0) {
                            if (theAnimatingElementsObj[theElement].loopsCompleted < totalLoops) {
                                theAnimationFunctions.animateSequence(theElement, theAnimationValues, 0);
                            } else {
                                if((theElement in theAnimatingElementsObj)) {
                                    delete theAnimatingElementsObj[theElement];
                                }
                                return
                            }
                        } else {
                            theAnimationFunctions.animateSequence(theElement, theAnimationValues, 0)
                        }
                    } else {
                        if (theAnimationCallback) { theAnimationCallback(); }
                        if((theElement in theAnimatingElementsObj)) {
                            delete theAnimatingElementsObj[theElement];
                        }
                        return
                    }
                } else {
                    var theKeyframeOptions = theAnimationValues.keyframes[theCurrentFrame].options || {},
                        theKeyframeValues = theAnimationValues.keyframes[theCurrentFrame].values,
                        theKeyframeDuration = theAnimationValues.keyframes[theCurrentFrame].duration,
                        theKeyframeEasing = theAnimationValues.keyframes[theCurrentFrame].easing || mina.linear,
                        theKeyframeDelay = theKeyframeOptions.keyframeDelay || 0,
                        theKeyframeCallback = theKeyframeOptions.keyframeCallback || {};

                    if (theCurrentFrame == 0 && doLoop && totalLoops != 0 && theAnimatingElementsObj[theElement] == undefined) {
                        theAnimatingElementsObj[theElement] = {};
                        theAnimatingElementsObj[theElement].loopsCompleted = 0;
                    }

                    if (theCurrentFrame > 0) { theAnimationDelay = 0; }

                    setTimeout(function() {
                        var i=0;
                        $(theElement).each(function() {
                            if ($(this).parents(theSVGContainerID).length) {
                                if (!$(this).is('[class^="sf"]')) {
                                    var theCurrentClass = $(this).attr("class"),
                                        theIdentifier = "sf" + i + " "+ theCurrentClass;

                                    $(this).attr("class", theIdentifier);
                                } else {
                                    var theIdentifier = $(this).attr("class");
                                }

                                theIdentifier = "." + theIdentifier.replace(" ",".");

                                if (theKeyframeOptions.callback) {
                                    theKeyframeCallback = {
                                        custom: theKeyframeOptions.callback,
                                        default: theAnimationFunctions.animateSequence.bind(null, theIdentifier, theAnimationValues, theCurrentFrame+1)
                                    };
                                } else {
                                    theKeyframeCallback = {
                                        default: theAnimationFunctions.animateSequence.bind(null, theIdentifier, theAnimationValues, theCurrentFrame+1)
                                    }
                                }

                                if(!(theIdentifier in theAnimatingElementsObj)) {
                                    theAnimatingElementsObj[theIdentifier] = {frameProgress: 0, totalFrames: theAnimationValues.keyframes.length, values: {}, doLoop: doLoop, loopsCompleted: 0, totalLoops: totalLoops};
                                }

                                if (theCurrentFrame == theAnimatingElementsObj[theIdentifier].frameProgress) {
                                    theAnimationFunctions.animateSingleSVGElementWithSnap(theIdentifier, theKeyframeValues, theKeyframeDuration, theKeyframeEasing, ((theStagger*i)+theKeyframeDelay), theKeyframeCallback);
                                }
                                i++;
                            }
                        });
                    }, theAnimationDelay);
                }
            },

            animateSVGElementAlongPath: function(theElement, thePath, theDuration, theEasing, theDelay, theCallback, reversePathDirection, reverseAtEnd, theReverseSettings) {
                /**
                 * Animates an element along a path
                 * @param {String} theElement
                 * @param {String} thePath
                 * @param {Number} theDuration
                 * @param {function} theEasing
                 * @param {Number} theDelay
                 * @param {Function} theCallback
                 * @param {Boolean} reversePathDirection
                 * @param {Boolean} reverseAtEnd
                 * @param {Object} theReverseSettings
                 */
                var s = Snap.select(theSVGContainerID),
                    theSnapElement = s.select(theElement),
                    theSnapPath = s.select(thePath),
                    theLength = theSnapPath.getTotalLength(),
                    thisBox = theSnapElement.getBBox(),
                    curX = thisBox.x + (thisBox.width/2),
                    curY = thisBox.y + (thisBox.height/2),
                    theMovePoint,
                    reversePathDirection = reversePathDirection || false,
                    reverseAtEnd = reverseAtEnd || false,
                    theStartPoint = 0,
                    theEndPoint = theLength;

                    if (reversePathDirection) {
                        theStartPoint = theLength;
                        theEndPoint = 0;
                    }

                setTimeout(function() {
                    Snap.animate(theStartPoint, theEndPoint, function(value) {
                        theMovePoint = theSnapPath.getPointAtLength(value);
                        theSnapElement.attr({transform: "t"+ (theMovePoint.x - curX) +","+ (theMovePoint.y - curY)});
                    }, theDuration, theEasing, function() {

                        if (theCallback) { theCallback(); }

                        if (reverseAtEnd) {
                            setTimeout(function() {
                                Snap.animate(theEndPoint, theStartPoint, function(value) {
                                    theMovePoint = theSnapPath.getPointAtLength(value);
                                    theSnapElement.attr({transform: "t"+ (theMovePoint.x - curX) +","+ (theMovePoint.y - curY)});
                                }, theReverseSettings.duration, theReverseSettings.easing, function() {

                                    if (theReverseSettings.callback) { theReverseSettings.callback(); }

                                    if((theElement in theAnimatingElementsObj)) {
                                        theAnimatingElementsObj[theElement].loopsCompleted++;

                                        if (theAnimatingElementsObj[theElement].totalLoops > 0 && theAnimatingElementsObj[theElement].loopsCompleted == theAnimatingElementsObj[theElement].totalLoops -1) {
                                            theIntervalFunctions.clearSpecificInterval(theAnimatingElementsObj[theElement].intervalID);
                                            theAnimationFunctions.stop.specificAnimation(theElement);
                                        }
                                    }
                                });
                            }, theReverseSettings.delay);
                        } else {
                            if((theElement in theAnimatingElementsObj)) {
                                theAnimatingElementsObj[theElement].loopsCompleted++;

                                if (theAnimatingElementsObj[theElement].totalLoops > 0 && theAnimatingElementsObj[theElement].loopsCompleted >= theAnimatingElementsObj[theElement].totalLoops -1) {
                                    theIntervalFunctions.clearSpecificInterval(theAnimatingElementsObj[theElement].intervalID);
                                    theAnimationFunctions.stop.specificAnimation(theElement);
                                }
                            }
                        }
                    });
                }, theDelay);
            },

            animateAlongAPath: function(theElement, thePath, theDuration, thePathOptions) {
                /**
                 * Animate an element along a path.
                 *
                 * @param {String} theElement
                 * @param {String} thePath
                 * @param {Number} theDuration
                 * @param {Object} theOptions
                 * @param {Function} theOptions.easing
                 * @param {Function} theOptions.reverseAtEnd
                 * @param {Number} theOptions.stagger
                 * @param {Number} theOptions.delay
                 * @param {Function} theOptions.callback
                 * @param {Boolean} theOptions.reversePathDirection
                 * @param {Boolean} theOptions.loop
                 * @param {Object} theOptions.loopOptions
                 * @param {Number} theOptions.loopOptions.loopCount
                 * @param {Number} theOptions.reverseOptions
                 * @param {Number} theOptions.reverseOptions.duration
                 * @param {Function} theOptions.reverseOptions.easing
                 * @param {Function} theOptions.reverseOptions.callback
                 * @param {Number} theOptions.reverseOptions.delay
                 */

                var theOptions = thePathOptions || {},
                    theEasing = theOptions.easing || mina.linear,
                    theStagger = theOptions.stagger || 0,
                    theDelay = theOptions.delay || 0,
                    theCallback = theOptions.callback || null,
                    reversePathDirection = theOptions.reversePathDirection || false,
                    reverseAtEnd = theOptions.reverseAtEnd || false,
                    doLoop = theOptions.loop || false,
                    theLoopOptions = theOptions.loopOptions || {},
                    theReverseOptions = theOptions.reverseOptions || {},
                    theLoopCount = theLoopOptions.loopCount || 0,
                    theLoopIntervalTime = theDuration,
                    loopReverseDuration = theReverseOptions.duration || theDuration,
                    loopReverseEasing = theReverseOptions.easing || mina.linear,
                    loopReverseCallback = theReverseOptions.callback || null,
                    loopReverseDelay = theReverseOptions.delay || 0;

                var theReverseSettings = {
                    delay: loopReverseDelay,
                    easing: loopReverseEasing,
                    duration: loopReverseDuration,
                    callback: loopReverseCallback
                };

                setTimeout(function() {
                    var i=0;
                    $(theElement).each(function() {
                        if ($(this).parents(theSVGContainerID).length) {
                            if (!$(this).is('[class^="sf"]')) {
                                var theCurrentClass = $(this).attr("class"),
                                    theIdentifier = "sf" + i + " "+ theCurrentClass;

                                $(this).attr("class", theIdentifier);
                            } else {
                                theIdentifier = $(this).attr("class");
                            }

                            theIdentifier = "." + theIdentifier.replace(" ",".");

                            if(!(theIdentifier in theAnimatingElementsObj)) {
                                theAnimatingElementsObj[theIdentifier] = {loopsCompleted: 0, totalLoops: theLoopCount, intervalID: 0, theDelay: (theStagger*i)};
                                i++;
                            }

                            theAnimationFunctions.animateSVGElementAlongPath(theIdentifier, thePath, theDuration, theEasing, theAnimatingElementsObj[theIdentifier].theDelay, theCallback, reversePathDirection, reverseAtEnd, theReverseSettings);

                            if (doLoop) {
                                if (reverseAtEnd) {
                                    theLoopIntervalTime = theDuration*2 + theReverseSettings.delay;
                                }
                                thePathLoopIntervalIDs = setInterval(function() {
                                    setTimeout(function() {
                                        theAnimationFunctions.setSVGElementAttrWithSnap(theIdentifier, {transform: "t0,0"});
                                        theAnimationFunctions.animateSVGElementAlongPath(theIdentifier, thePath, theDuration, theEasing, 0, theCallback, reversePathDirection, reverseAtEnd, theReverseSettings);
                                    }, theAnimatingElementsObj[theIdentifier].theDelay);
                                }, theLoopIntervalTime);
                                theIntervalFunctions.storeIntervalID(thePathLoopIntervalIDs);
                                theAnimatingElementsObj[theIdentifier].intervalID = thePathLoopIntervalIDs;
                            }
                        }

                    });
                }, theDelay);
            }
        };

    return {
        stop: theAnimationFunctions.stop,
        clear: theIntervalFunctions.clearIntervalIDs,
        set: theAnimationFunctions.setSVGElementAttrWithSnap,
        animate: theAnimationFunctions.animateSequence,
        animatePath: theAnimationFunctions.animateAlongAPath
    }




//        ---------------- TO DO ----------------
//        [X: V2] Storing the transforms to reset - getBBox + transform?
//        [X: V2] Allow for passing additional animations to run while along a path
//        [X: V2] Reverse:
//          -- If reverse, store that in the element object
//          -- When the final frame is hit, add reverseActive value to the object
//          -- Call the animation function passing in keyframe count as theFrame
//          -- When determining the callbacks check if reverse is active and decrease theFrame

//        Group
//          [X] Send to group function for animation
//          [X] Need to keep a counter in the groups to determine correct stagger delay
//          [X] Will have to get total group time for the completion callback, too
//          [X] Loop group animations
//          [X[ Loop group stagger animations
//
//
//       Looping:
//          [X[ Loop group animations
//
//        [X] Remove any object reference to an element when it completes
//        [X[ Combine the path animation functions to support single and looped animations
//        [X] Stagger groups of elements along a path
//        [X] Loop staggered group elements
//        [X} Allow for loop counts

//        [X] Restructure theOptions of the path animation putting loopCount in loopOptions and...





//        ---------------- UPDATES ----------------
//      8/10
//        Updated the stop animations name spacing
//              Removed the stopAll API call in lieu of 'stop' that can now reach both functions in the new namespace
//        Wrote a new sequence function to eventually replace the current function and the current animation API call
//        Laying out an options object to pass into all functions to cut down on required parameters per call
//        Changed the stopLoops API call to clear for more accurate function description
//        Updated interval function names for better description

//      8/12
//          Added startAtEnd functionality to the animatePath.  Need to test and refine naming. Also add to the loop.
//          Added staggering to elements passed as an array
//          Merged the resetValuesObj and groupElementObj into theAnimatingElementsObj

//      8/13
//          Updated startAtEnd naming to reversePathDirection
//          Added staggered delay to group animation
//          Remove element reference from theAnimatingElementsObj in non-loop completions

//      8/14
//          Replaced array functionality or string jQuery selectors
//          Removed the group key
//          Moved .animate resets and reverse loops to potential V2 features

//      8/18
//          Combined the path functions for single animation and loop
//          Added loop counts to the animate path functions

//      8/19
//          Removed old functions and API calls
//          Added the ability to stagger a group of elements along a path
//          Loop a group of elements along a path
//          Restructured the naming and call order for animatePath

}