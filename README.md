##SnapFoo
 
SnapFoo is a lightweight (~4k minified) animation library that compliments Snap.svg. The focus of SnapFoo is to simplify bringing elaborate scenes of SVG animations and interactions to life. 

####Documentation 
[SnapFoo Documentation](http://yuschick.github.io/SnapFoo/)

####Release Notes (V1.02)
+ If an element has an ID, use that as the identifier instead of assigning a class to help minimize conflicts of numerous separate animations per page.
+ Slight performance enhancements.

####Release Notes (V1.01)
Updated the .set() function to accept a selector containing a group of elements.

####Get Started 

Download SnapFoo and include it in your project after jQuery and Snap.svg. Once included, call the library for use:
 
`var snapfoo = snapFoo();`

####SnapFoo Calls
+ **snapfoo.animate()**: The primary animation call that receives an element or group of elements to animate based on theAnimationValues object. Any object that is animated is appended the class "sf#" for a unique identifier.
+ **snapfoo.animatePath()**: Animate an element or group of elements along a path. Any object that is animated is appended the class "sf#" for a unique identifier.
+ **snapfoo.clear()**: The clear call points to an object containing three functions that will clear various loop intervals.
+ **snapfoo.set()**: Set an element's attributes without animating.
+ **snapfoo.stop()**: The stop call points to an object containing two functions that will stop an element that is being animated. Note that if the element is part of a loop, the loop will continue until its interval is cleared or its loopCount has been met.

####Contact
[@Yuschick on Twitter](http://www.twitter.com/Yuschick)
