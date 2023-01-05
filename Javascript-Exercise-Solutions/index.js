
//Objects
function StopWatch() {

    let startTime, stopTime, duration = 0;
    let isStarted = false;

    this.start = function() {
        if(isStarted)
            throw new Error('Stopwatch started');
        isStarted = true;
        startTime = new Date().getTime();
    };

    this.stop = function() {
        if(!isStarted)
            throw new Error('Stopwatch stopped');
        isStarted = false;
        stopTime = new Date().getTime();
        duration = duration + (stopTime - startTime) / 1000;
    };

    this.reset = function() {
        duration = 0;
        isStarted = false;
    };

    Object.defineProperty(this, 'duration', {
        get: function() {
            return duration;
        }
    });
}

/*
//Prototype - Bad Idea to use Prototype
function StopWatch() {
    let startTime, stopTime, duration = 0;
    let isStarted = false;

    Object.defineProperty(this, 'duration', {
        get: function() { return duration; },
        set: function(value) { duration = value; },
    });
}

StopWatch.prototype.start = function() {
    if(this.isStarted)
        throw new Error('Stopwatch started');
    this.isStarted = true;
    this.startTime = new Date().getTime();
};

StopWatch.prototype.stop = function() {
    if(!this.isStarted)
        throw new Error('Stopwatch stopped');
    this.isStarted = false;
    this.stopTime = new Date().getTime();
    this.duration += (this.stopTime - this.startTime) / 1000;
};

StopWatch.prototype.reset = function() {
    this.duration = 0;
    this.isStarted = false;
};

const s = new StopWatch();
s.duration = 20;    //can be modified - Breaks principle of Abstraction
//Objects should always be in a valid state - Unreliable and untrust worthy
*/


// Prototypical Inheritance

function HtmlElement() {
    this.click = function() {
        console.log('clicked');
    }
}

HtmlElement.prototype.focus = function() {
    console.log('focused');
};

function HtmlSelectElement(items) {        //items = []
    this.items = items || [];
    this.addItem = function(item) {
        this.items.push(item);
    };
    this.removeItem = function(item) {
        if (item in this.items)
            this.items.splice(this.items.indexOf(item), 1);
    };
    this.render = function() {
        return `<select>${this.items.map(item =>
                    `<option>${item}</option>`)
                    .join('') }</select>`;
    }
}

HtmlSelectElement.prototype = new HtmlElement();
HtmlSelectElement.prototype.constructor = HtmlSelectElement;


// Polimorphism

function HtmlImageElement(src) {
    this.src = src;
    this.render = function() {
        return `<img src="${this.src}" />`
    }
}
HtmlImageElement.prototype = new HtmlElement();
HtmlImageElement.prototype.constructor = HtmlImageElement;


//ES6 Classes

const _data = new WeakMap();

class Stack {
    constructor() {
        //this.count = 0;     //should not use - can be modified externally
        _data.set(this, []);
    }

    push(value) {
        _data.get(this).push(value);
        //this.count++;
    }

    pop() {
        if (_data.get(this).length == 0)    throw new Error('Stack is empty');
        //this.count--;
        return _data.get(this).pop();
    }
    
    peek() {
        if (_data.get(this).length == 0)    throw new Error('Stack is empty');
        return _data.get(this)[_data.get(this).length - 1];
    }

    get count() {
        return _data.get(this).length;
    }
}
