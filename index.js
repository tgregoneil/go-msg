// go-msg/index.js
// go-msg object has a unique primary msg and zero or more optional attributes


module.exports = function (p0) {

    // PRIVATE Properties
var v = {

    primary: null,
        // primary: {cmd: 1} (contains optional content) or {cmd: 0} (no optional content allowed)

    secondary: null,
        // if a primary message has an optional attribute that concidentally is the same as
        // another primary message, it should be have a key/value pair in secondary {attr: 1}
        // to ensure that it will be treated as an attribute in case a primary is present
        // Secondary is only tested if there exists a primary key

};  // end PRIVATE properties

    // PRIVATE Functions
f = {};


f.init = () => {

    v.primary = p0.primary;
    v.secondary = p0.secondary;
};

    // PUBLIC Functions
var P = {};

//---------------------
P.parseMsg = (msgOb) => {
    
    var res = {};
    var msgKeys = Object.keys (msgOb);

    var primaryCandidatesOb = {};
    var attrsOb = {};
    for (var i = 0; i < msgKeys.length; i++) {

        var key = msgKeys [i];
        
        if (v.primary.hasOwnProperty (key)) {

            primaryCandidatesOb [key] = 1;

        } else {

            attrsOb [key] = msgOb [key];

        } // end if (v.primary.hasOwnProperty (key))
        
    } // end for (var i = 0; i < msgKeys.length; i++)

    var primaryCandidates = Object.keys (primaryCandidatesOb);

    if (primaryCandidates.length === 0) {

        res.err = 'No primary candidates found in msgOb: ' + JSON.stringify (msgOb);

    } else if (primaryCandidates.length === 1) {

        res.p = primaryCandidates [0];
        res.c = v.primary [res.p] ? msgOb [res.p] : null;
            // example void html tag has zero content, so res.c = null

        res.s = attrsOb;
        
    } else {
        // handle primary/secondary key resolution

        var primaryKey = null;
        for (var key in primaryCandidatesOb) {

            if (v.secondary.hasOwnProperty (key)) {

                attrsOb [key] = msgOb [key];

            } else {

                if (primaryKey === null) {

                    primaryKey = key;

                } else {

                    res.err = 'Multiple primary keys found not in secondary object: ' + JSON.stringify (msg);

                } // end if (primaryKey === null)
                

            } // end if (v.secondary.hasOwnProperty (key))
            
        };

        if (!res.hasOwnProperty ('err')) {

            res.p = primaryKey;
            res.c = v.primary [primaryKey] ? msgOb [primaryKey] : null;
            res.s = attrsOb;

        } // end if (!res.hasOwnProperty ('err'))
        

    } // end if (primaryCandidates.length === 0)
    
    return res;

}; // end P.parseMsg 



    // end PUBLIC Functions

f.init ();

return P;

};



