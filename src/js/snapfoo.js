function snapFoo(theSVGContainer) {
  "use strict";

  const animate = {
      loopObj: {},
      animateOptions: {},
      label: 0,

      animate(theElement, theProps, theDelay, theDuration, theEasing, theOptions) {
        let s = Snap.select(theSVGContainer),
          el = s.select(theElement);

        setTimeout(() => {
          el.stop().animate(theProps, theDuration, theEasing, () => {
            if (theOptions) {
              if (theOptions.doLoop) animate.loop(theElement, theOptions);
            }
          });
        }, theDelay);
      },

      animatePath(theElement, thePath, theDelay, theDuration, theEasing, theOptions) {
        let s = Snap.select(theSVGContainer),
          el = s.select(theElement),
          obj = theOptions,
          path = s.select(thePath),
          length = path.getTotalLength(),
          elBox = el.getBBox(),
          curX = elBox.x + (elBox.width / 2),
          curY = elBox.y + (elBox.height / 2),
          endPoint = obj.reverse ? 0 : length,
          startPoint = obj.reverse ? length : 0,
          val0 = 0,
          movePoint, movePoint0, angle;

        setTimeout(() => {
          Snap.animate(startPoint, endPoint, (val) => {
            movePoint0 = path.getPointAtLength(val0 * 1);
            movePoint = path.getPointAtLength(val * 1);
            angle = Math.atan2(movePoint.y - movePoint0.y, movePoint.x - movePoint0.x) * 180 / Math.PI;
            movePoint0 = movePoint0;
            el.attr({
              transform: `t${(movePoint.x - curX)},${(movePoint.y - curY)}r${angle},${curX},${curY}`
            });
          }, theDuration, theEasing, () => {
            if (obj) {
              if (obj.rewind) {
                setTimeout(() => {
                  Snap.animate(endPoint, startPoint, (val) => {
                    movePoint0 = path.getPointAtLength(val0 * 1);
                    movePoint = path.getPointAtLength(val * 1);
                    angle = Math.atan2(movePoint.y - movePoint0.y, movePoint.x - movePoint0.x) * 180 / Math.PI;
                    movePoint0 = movePoint0;
                    el.attr({
                      transform: `t${(movePoint.x - curX)},${(movePoint.y - curY)}r${angle},${curX},${curY}`
                    });
                  }, obj.rewindDuration, obj.rewindEasing);
                }, obj.rewindDelay);

              }

              setTimeout(() => {
                if (obj.doCallback) {
                  debugger;
                  callback.logic(obj.func, theElement, obj.loop, 0, obj.callbackAt);
                }

                if (obj.doReset && !obj.loop) {
                  reset.element(theElement);
                }

                if (obj.loop) {
                  animate.loop(theElement, theOptions);
                }
              }, obj.rewindDelay + obj.rewindDuration);
            }
          });
        }, theDelay);
      },

      element(theElement, theFramesObj, theCallback) {
        let el = theElement,
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
          totalChildren = $(theSVGContainer).children(el).size(),
          totalDelay = 0,
          label = 0,
          frame = {},
          theIdentifier, delay, prevDelay, duration, easing;

        $(theSVGContainer).children(el).each(function(num) {
          $(this).delay(stagger * num).queue(function() {
            totalDelay = 0;
            theIdentifier = identifier.create(this);

            if (doReset) reset.store(theIdentifier);

            if (loop && !(theIdentifier in animate.loopObj)) {
              animate.loopObj[theIdentifier] = {
                totalLoops: loopCount,
                type: 'element',
                completedLoops: 1,
                lastOfGroup: num == (totalChildren - 1) ? theIdentifier : null
              }
            }

            for (let i = 0; i <= theFramesLength; i++) {
              if (i < theFramesLength) {
                frame = frames[i];
                delay = frame.delay || 0;
                easing = obj.easing || frame.easing || mina.linear;
                duration = (obj.duration / theFramesLength) || frame.duration;
                totalDelay += (delay + duration);
                delay = i > 0 ? totalDelay - duration : delay;

                if (loop && i == (theFramesLength - 1)) {
                  doLoop = true;
                  animate.animateOptions[theIdentifier] = {
                    doLoop: doLoop,
                    doReset: doReset,
                    framesObj: obj,
                    func: eCallback
                  }
                }
                animate.animate(theIdentifier, frame.props, delay, duration, easing, animate.animateOptions[theIdentifier]);
              } else {
                if (eCallback) {
                  if ((callbackAt === 'end' || callbackAt === 'loop') && (num < (totalChildren - 1))) {
                    // Wait for end of loop / animation
                  } else {
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

      loop(theElement, theOptions) {
        let obj = animate.loopObj[theElement];

        if (obj.totalLoops === 0) {
          reset.element(theElement);
          if (obj.type === 'element') {
            animate.element(theElement, theOptions.framesObj, theOptions.func);
          } else if (obj.type === 'path') {
            animate.path(theElement, obj.obj, theOptions.func);
          }

        } else {
          if (obj.completedLoops < obj.totalLoops) {
            reset.element(theElement);
            if (obj.type === 'element') {
              animate.element(theElement, theOptions.framesObj, theOptions.func);
            } else if (obj.type === 'path') {
              animate.path(theElement, obj.obj, theOptions.func);
            }
            obj.completedLoops++
          } else {
            if (theOptions.doReset) {
              reset.element(theElement);
            } else {
              stop.specificAnimation(theElement);
            }
          }
        }
      },

      path(theElement, theObj, theCallback) {
        let el = theElement,
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
          totalChildren = $(theSVGContainer).children(el).size(),
          theOptions = {},
          theIdentifier;

        $(theSVGContainer).children(el).each(function(num) {
          $(this).delay(stagger * num).queue(function() {
            theIdentifier = identifier.create(this);

            if (loop && !(theIdentifier in animate.loopObj)) {
              animate.loopObj[theIdentifier] = {
                totalLoops: loopCount,
                completedLoops: 1,
                type: 'path',
                obj: theObj,
                lastOfGroup: num == (totalChildren - 1) ? theIdentifier : null
              }
            }

            animate.animateOptions[theIdentifier] = {
              func: eCallback,
              doReset: reset ? reset : false,
              loop: loop ? loop : false,
              callbackAt: callbackAt,
              doCallback: false,
              reverse: reverse,
              rewind: rewind,
              rewindDelay: rewindDelay,
              rewindDuration: rewindDuration,
              rewindEasing: rewindEasing,
            };

            if (eCallback) {
              if ((callbackAt === 'end' || callbackAt === 'loop') && (num < (totalChildren - 1))) {
                animate.animateOptions[theIdentifier].doCallback = false;
              } else {
                animate.animateOptions[theIdentifier].doCallback = true;
              }
            }

            animate.animatePath(theIdentifier, path, delay, duration, easing, animate.animateOptions[theIdentifier]);
            $(this).dequeue();
          });
        });
      }
    },

    callback = {
      logic(theCallback, theIdentifier, loop, totalDelay, callbackAt) {
        let obj = animate.loopObj[theIdentifier];
        callbackAt = loop && obj.totalLoops == 0 && callbackAt == 'end' ? 'loop' : callbackAt;

        if (!loop || loop && callbackAt == 'child') {
          this.run(theIdentifier, theCallback, totalDelay);
        } else if (loop && callbackAt === 'loop' && obj.lastOfGroup) {
          this.run(theIdentifier, theCallback, totalDelay);
        } else if (loop && callbackAt === 'child end' && obj.completedLoops == obj.totalLoops) {
          this.run(theIdentifier, theCallback, totalDelay);
        } else if (loop && callbackAt === 'end' && obj.lastOfGroup && obj.completedLoops == obj.totalLoops) {
          this.run(theIdentifier, theCallback, totalDelay);
        }
      },

      run(scope, callback, delay) {
        setTimeout(function() {
          callback.apply($(theSVGContainer).find(scope), arguments);
        }, delay);
      }
    },

    identifier = {
      num: 0,
      create(theElement) {
        let theIdentifier = $(theElement).attr('id');

        if (theIdentifier) {
          return '#' + theIdentifier;
        } else {
          if (!$(theElement).is('[class*=sf-')) {
            theIdentifier = `sf-${this.num++}`;
            $(theElement).addClass(theIdentifier);
          } else {
            theIdentifier = $(theElement).attr('class').replace(' ', '.');
          }

          return `.${theIdentifier}`;
        }
      }
    },

    reset = {
      resetArray: [],

      getArray() {
        return resetArray;
      },

      element(theIdentifier) {
        theIdentifier = theIdentifier || this.resetArray[0];
        stop.specificAnimation(theIdentifier);
        this.transform(theIdentifier);
        this.shiftArray();
      },

      shiftArray() {
        this.resetArray.shift();
      },

      store(theIdentifier) {
        this.resetArray.push(theIdentifier);
      },

      transform(theIdentifier) {
        $(theSVGContainer).find(theIdentifier).removeAttr('transform');
      }
    },

    stop = {
      sectionAnimations(theSVGContainerID) {
        let s = Snap.select(theSVGContainerID),
          theElements = s.selectAll("image", "g", "ellipse", "rect", "path", "line");

        theElements.forEach((el) => {
          el.stop();
        });
      },
      specificAnimation(theElement) {
        let theParentSVG = "#" + $(theElement).parents("svg").attr("id"),
          s = Snap.select(theParentSVG),
          theElements = s.selectAll(theElement);

        theElements.forEach((el) => {
          el.stop();
        });
      }
    };

  return {
    animate: animate.element,
    animatePath: animate.path
  }
}
