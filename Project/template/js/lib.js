
// ==================================================
// lib
//
// function used to extend obj
// meaning, objects with constructors (functions)
function extend(Child, Parent) {
    var p = Parent.prototype;
    var c = Child.prototype;
    for (var i in p) {
        c[i] = p[i];
    }
    c.superClass = p;
    c.isA = function(i) {
        var ancestor = c;
        while ("superClass" in ancestor) {
            ancestor = ancestor.superClass;
            if ( ancestor == i.prototype ) return true;
        }
        return false;
    }
}

// function used to extend var
// meaning, pure variables (var v = {}; )
function deepCopy(p, c) {
    var c = c || {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i], c[i]);
        } else {
            c[i] = p[i];
        }
    }
    return c;
}

// ==================================================
