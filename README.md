##SnapFoo
 
SnapFoo is a lightweight (~5k minified) animation library that compliments Snap.svg. The focus of SnapFoo is to simplify bringing elaborate scenes of SVG animations and interactions to life. 

####Documentation 
[SnapFoo Documentation](http://yuschick.github.io/SnapFoo/)

####Release Notes (V2)
+ Greater support and flexibility for callbacks including scoping and when they execute
+ Performance and various updates including ~newer jQuery features for SVG class manipulation
+ Better support and features for path animations
+ Updated support for multiple animations and classes within a single SVG container
+ General overhaul and orgination of features and naming
+ Removed intervals for looping
+ Removed stop(), set(), and clear() methods

####Get Started 

Download SnapFoo and include it in your project after jQuery and Snap.svg. Once included, call the library for use:
 
`var snapfoo = snapFoo("#theSVGContainer");`

####SnapFoo Calls
+ **snapfoo.animate()**: The primary animation call that receives an element or group of elements to animate based on theFramesObj object. Any element to be animated that does not already have an ID is appended the class "sf#" for a unique identifier.
+ **snapfoo.animatePath()**: Animate an element or group of elements along a path. Any element to be animated that does not already have an ID is appended the class "sf#" for a unique identifier.

####Contact
[@Yuschick on Twitter](http://www.twitter.com/Yuschick)
