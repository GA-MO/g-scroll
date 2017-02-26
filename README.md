# GScroll
#####GScroll is a lightweight javascript tool to trigger a function when you scroll to a DOM.
[Live demo](https://ga-mo.github.io/g-scroll/demo/)

## Getting started

#### Install with NPM:
```
$ npm install g-scroll --save
```

#### Or use CDN:
```
https://cdn.rawgit.com/GA-MO/g-scroll/3dede7c2/lib/g-scroll.js
```

You can [download the source](https://github.com/GA-MO/g-scroll/tree/master/lib) as well. :)


#### Properties:
```js
selector: '.element',           // Class name for trigger
offset: 10,                     // Offset point for trigger
delay: 0.5,                     // Time delay before call action
action: function(selector) {

    // this function will trigger when DOM in viewpoit
    // (selector) is current DOM in viewpoit
    // can use (selector) make a great thing with your favorite lib.

}
```

#### Example:
```js
// Set up properties
var dataScroll = [
    {
        selector: '.element1',
        offset: 10,
        delay: 0.5,
        action: function(selector) {
            TweenMax.from(selector, 0.3, { y:100, opacity: 0 });
        }
    },
    {
        selector: '.element2',
        offset: 10,
        delay: 0.5,
        action: function(selector) {
            alert('Trigger me');
            $(selector).addClass('animated');
        }
    }
];

// Use
GScrolling(dataScroll);
```
