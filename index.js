const $ = require('jquery');
const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);

module.exports = function snapFoo(theSVGContainer) {
  "use strict";

  var _animate = {
      loopObj: {},
      animateOptions: {},
      label: 0,

      animate: function animate(theElement, theProps, theDelay, theDuration, theEasing, theOptions) {
        var s = Snap.select(theSVGContainer),
          el = s.select(theElement);

        setTimeout(function() {
          el.stop().animate(theProps, theDuration, theEasing, function() {
            if (theOptions) {
              if (theOptions.doLoop) _animate.loop(theElement, theOptions);
            }
          });
        }, theDelay);
      },
      animatePath: function animatePath(theElement, thePath, theDelay, theDuration, theEasing, theOptions) {
        var s = Snap.select(theSVGContainer),
          el = s.select(theElement),
          obj = theOptions,
          path = s.select(thePath),
          length = path.getTotalLength(),
          elBox = el.getBBox(),
          curX = elBox.x + elBox.width / 2,
          curY = elBox.y + elBox.height / 2,
          endPoint = obj.reverse ? 0 : length,
          startPoint = obj.reverse ? length : 0,
          val0 = 0,
          movePoint = void 0,
          movePoint0 = void 0,
          angle = void 0;

        setTimeout(function() {
          Snap.animate(startPoint, endPoint, function(val) {
            movePoint0 = path.getPointAtLength(val0 * 1);
            movePoint = path.getPointAtLength(val * 1);
            angle = Math.atan2(movePoint.y - movePoint0.y, movePoint.x - movePoint0.x) * 180 / Math.PI;
            movePoint0 = movePoint0;
            el.attr({
              transform: 't' + (movePoint.x - curX) + ',' + (movePoint.y - curY) + 'r' + angle + ',' + curX + ',' + curY
            });
          }, theDuration, theEasing, function() {
            if (obj) {
              if (obj.rewind) {
                setTimeout(function() {
                  Snap.animate(endPoint, startPoint, function(val) {
                    movePoint0 = path.getPointAtLength(val0 * 1);
                    movePoint = path.getPointAtLength(val * 1);
                    angle = Math.atan2(movePoint.y - movePoint0.y, movePoint.x - movePoint0.x) * 180 / Math.PI;
                    movePoint0 = movePoint0;
                    el.attr({
                      transform: 't' + (movePoint.x - curX) + ',' + (movePoint.y - curY) + 'r' + angle + ',' + curX + ',' + curY
                    });
                  }, obj.rewindDuration, obj.rewindEasing);
                }, obj.rewindDelay);
              }

              setTimeout(function() {
                if (obj.doCallback) {
                  debugger;
                  callback.logic(obj.func, theElement, obj.loop, 0, obj.callbackAt);
                }

                if (obj.doReset && !obj.loop) {
                  reset.element(theElement);
                }

                if (obj.loop) {
                  _animate.loop(theElement, theOptions);
                }
              }, obj.rewindDelay + obj.rewindDuration);
            }
          });
        }, theDelay);
      },
      element: function element(theElement, theFramesObj, theCallback) {
        var el = theElement,
          obj = theFramesObj,
          stagger = obj.stagger || 0,
          eCallback = theCallback && typeof theCallback === 'function' ? theCallback : null,
          callbackAt = eCallback ? obj.callbackAt || 'end' : null,
          loop = obj.loop || false,
          loopCount = obj.loopCount || 0,
          doLoop = false,
          doReset = obj.reset || false,
          frames = obj.frames,
          theFramesLength = frames.length,
          totalChildren = $(theSVGContainer).children(el).length,
          totalDelay = 0,
          label = 0,
          frame = {},
          theIdentifier = void 0,
          delay = void 0,
          prevDelay = void 0,
          duration = void 0,
          easing = void 0;

        $(theSVGContainer).children(el).each(function(num) {
          $(this).delay(stagger * num).queue(function() {
            totalDelay = 0;
            theIdentifier = identifier.create(this);

            if (doReset) reset.store(theIdentifier);

            if (loop && !(theIdentifier in _animate.loopObj)) {
              _animate.loopObj[theIdentifier] = {
                totalLoops: loopCount,
                type: 'element',
                completedLoops: 1,
                lastOfGroup: num == totalChildren - 1 ? theIdentifier : null
              };
            }

            for (var i = 0; i <= theFramesLength; i++) {
              if (i < theFramesLength) {
                frame = frames[i];
                delay = frame.delay || 0;
                easing = obj.easing || frame.easing || mina.linear;
                duration = obj.duration / theFramesLength || frame.duration;
                totalDelay += delay + duration;
                delay = i > 0 ? totalDelay - duration : delay;

                if (loop && i == theFramesLength - 1) {
                  doLoop = true;
                  _animate.animateOptions[theIdentifier] = {
                    doLoop: doLoop,
                    doReset: doReset,
                    framesObj: obj,
                    func: eCallback
                  };
                }
                _animate.animate(theIdentifier, frame.props, delay, duration, easing, _animate.animateOptions[theIdentifier]);
              }
              else {
                if (eCallback) {
                  if ((callbackAt === 'end' || callbackAt === 'loop') && num < totalChildren - 1) {
                    // Wait for end of loop / animation
                  }
                  else {
                    debugger;
                    callback.logic(eCallback, theIdentifier, loop, totalDelay, callbackAt);
                  }
                }

                if (doReset && !loop) {
                  setTimeout(function() {
                    reset.element();
                  }, totalDelay);
                }
              }
            }
            $(this).dequeue();
          });
        });
      },
      loop: function loop(theElement, theOptions) {
        var obj = _animate.loopObj[theElement];

        if (obj.totalLoops === 0) {
          reset.element(theElement);
          if (obj.type === 'element') {
            _animate.element(theElement, theOptions.framesObj, theOptions.func);
          }
          else if (obj.type === 'path') {
            _animate.path(theElement, obj.obj, theOptions.func);
          }
        }
        else {
          if (obj.completedLoops < obj.totalLoops) {
            reset.element(theElement);
            if (obj.type === 'element') {
              _animate.element(theElement, theOptions.framesObj, theOptions.func);
            }
            else if (obj.type === 'path') {
              _animate.path(theElement, obj.obj, theOptions.func);
            }
            obj.completedLoops++;
          }
          else {
            if (theOptions.doReset) {
              reset.element(theElement);
            }
            else {
              stop.specificAnimation(theElement);
            }
          }
        }
      },
      path: function path(theElement, theObj, theCallback) {
        var el = theElement,
          obj = theObj,
          path = obj.path,
          delay = obj.delay || 0,
          duration = obj.duration,
          easing = obj.easing || mina.linear,
          loop = obj.loop || false,
          loopCount = obj.loopCount || 0,
          stagger = obj.stagger || 0,
          reset = obj.reset || false,
          reverse = obj.reverse || false,
          rewind = obj.rewind || false,
          rewindDelay = rewind ? obj.rewindDelay || delay : 0,
          rewindDuration = rewind ? obj.rewindDuration || duration : 0,
          rewindEasing = rewind ? obj.rewindEasing || easing : mina.linear,
          eCallback = theCallback && typeof theCallback === 'function' ? theCallback : null,
          callbackAt = eCallback ? obj.callbackAt || 'end' : null,
          totalChildren = $(theSVGContainer).children(el).length,
          theOptions = {},
          theIdentifier = void 0;

        $(theSVGContainer).children(el).each(function(num) {
          $(this).delay(stagger * num).queue(function() {
            theIdentifier = identifier.create(this);

            if (loop && !(theIdentifier in _animate.loopObj)) {
              _animate.loopObj[theIdentifier] = {
                totalLoops: loopCount,
                completedLoops: 1,
                type: 'path',
                obj: theObj,
                lastOfGroup: num == totalChildren - 1 ? theIdentifier : null
              };
            }

            _animate.animateOptions[theIdentifier] = {
              func: eCallback,
              doReset: reset ? reset : false,
              loop: loop ? loop : false,
              callbackAt: callbackAt,
              doCallback: false,
              reverse: reverse,
              rewind: rewind,
              rewindDelay: rewindDelay,
              rewindDuration: rewindDuration,
              rewindEasing: rewindEasing
            };

            if (eCallback) {
              if ((callbackAt === 'end' || callbackAt === 'loop') && num < totalChildren - 1) {
                _animate.animateOptions[theIdentifier].doCallback = false;
              }
              else {
                _animate.animateOptions[theIdentifier].doCallback = true;
              }
            }

            _animate.animatePath(theIdentifier, path, delay, duration, easing, _animate.animateOptions[theIdentifier]);
            $(this).dequeue();
          });
        });
      }
    },
    callback = {
      logic: function logic(theCallback, theIdentifier, loop, totalDelay, callbackAt) {
        var obj = _animate.loopObj[theIdentifier];
        callbackAt = loop && obj.totalLoops == 0 && callbackAt == 'end' ? 'loop' : callbackAt;

        if (!loop || loop && callbackAt == 'child') {
          this.run(theIdentifier, theCallback, totalDelay);
        }
        else if (loop && callbackAt === 'loop' && obj.lastOfGroup) {
          this.run(theIdentifier, theCallback, totalDelay);
        }
        else if (loop && callbackAt === 'child end' && obj.completedLoops == obj.totalLoops) {
          this.run(theIdentifier, theCallback, totalDelay);
        }
        else if (loop && callbackAt === 'end' && obj.lastOfGroup && obj.completedLoops == obj.totalLoops) {
          this.run(theIdentifier, theCallback, totalDelay);
        }
      },
      run: function run(scope, callback, delay) {
        setTimeout(function() {
          callback.apply($(theSVGContainer).find(scope), arguments);
        }, delay);
      }
    },
    identifier = {
      num: 0,
      create: function create(theElement) {
        var theIdentifier = $(theElement).attr('id');

        if (theIdentifier) {
          return '#' + theIdentifier;
        }
        else {
          if (!$(theElement).is('[class*=sf-')) {
            theIdentifier = 'sf-' + this.num++;
            $(theElement).addClass(theIdentifier);
          }
          else {
            theIdentifier = $(theElement).attr('class').replace(' ', '.');
          }

          return '.' + theIdentifier;
        }
      }
    },
    reset = {
      resetArray: [],

      getArray: function getArray() {
        return resetArray;
      },
      element: function element(theIdentifier) {
        theIdentifier = theIdentifier || this.resetArray[0];
        stop.specificAnimation(theIdentifier);
        this.transform(theIdentifier);
        this.shiftArray();
      },
      shiftArray: function shiftArray() {
        this.resetArray.shift();
      },
      store: function store(theIdentifier) {
        this.resetArray.push(theIdentifier);
      },
      transform: function transform(theIdentifier) {
        $(theSVGContainer).find(theIdentifier).removeAttr('transform');
      }
    },
    stop = {
      sectionAnimations: function sectionAnimations(theSVGContainerID) {
        var s = Snap.select(theSVGContainerID),
          theElements = s.selectAll("image", "g", "ellipse", "rect", "path", "line");

        theElements.forEach(function(el) {
          el.stop();
        });
      },
      specificAnimation: function specificAnimation(theElement) {
        var theParentSVG = "#" + $(theElement).parents("svg").attr("id"),
          s = Snap.select(theParentSVG),
          theElements = s.selectAll(theElement);

        theElements.forEach(function(el) {
          el.stop();
        });
      }
    };

  return {
    animate: _animate.element,
    animatePath: _animate.path
  };
}
