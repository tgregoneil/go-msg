// go-msg/index.js
// go-msg object has a unique primary msg and zero or more optional attributes


module.exports = function (p0) {

const v = {

    primary: null,
        // primary: {cmd: 1} (contains optional content) or {cmd: 0} (no optional content allowed)

    secondary: null,
        // if a primary message has an optional attribute that concidentally is the same as
        // another primary message, it should be have a key/value pair in secondary {attr: 1}
        // to ensure that it will be treated as an attribute in case a primary is present
        // Secondary is only tested if there exists a primary key

    meta: null,
        // meta parameters intended for ctrl or other purpose outside of primary and secondary msg
        // parameter usage

};  

const A = {};
//---------------------
A.init = () => {

    v.primary = p0.primary;
    v.secondary = p0.hasOwnProperty ('secondary') ? p0.secondary : {};
    v.meta = p0.hasOwnProperty ('meta') ? p0.meta : {};

}; // end A.init


const P = {};
//---------------------
P.parseMsg = (msgOb) => {
    
    const res = {};
    const msgKeys = Object.keys (msgOb);

    const primaryCandidatesOb = {};
    const attrsOb = {};
    const metaOb = {};

    let key;
    for (let i = 0; i < msgKeys.length; i++) {

        key = msgKeys [i];
        
        if (v.primary.hasOwnProperty (key)) {

            primaryCandidatesOb [key] = 1;

        } else if (v.meta.hasOwnProperty (key)) {

            metaOb [key] = msgOb [key];

        } else {

            attrsOb [key] = msgOb [key];

        } // end if (v.primary.hasOwnProperty (key))
        
    } // end for (let i = 0; i < msgKeys.length; i++)

    const primaryCandidatesA = Object.keys (primaryCandidatesOb);

    let primaryKey = null;

    if (primaryCandidatesA.length === 1) {

        primaryKey = primaryCandidatesA [0];

    } else {
        // handle primary/secondary key resolution

        for (key in primaryCandidatesOb) {

            if (v.secondary.hasOwnProperty (key)) {

                attrsOb [key] = msgOb [key];

            } else {

                if (primaryKey === null) {

                    primaryKey = key;

                } else {

                    res.err = 'Multiple primary keys found: ' + primaryKey + ',' + key + 'and possibly others. Original message\n'  + JSON.stringify (msg);

                } // end if (primaryKey === null)
                

            } // end if (v.secondary.hasOwnProperty (key))
            
        }

    } // end if (primaryCandidatesA.length === 0)

    if (primaryKey === null) {

        res.err = 'Either there was no primary key or all primary candidates are members of secondary: ' + JSON.stringify (primaryCandidatesA);

    } // end if (primaryKey === null)
    


    res.p = primaryKey;
    res.c = primaryKey && v.primary [primaryKey] !== 0 ? msgOb [primaryKey] : null;
        // example void html tag has zero content, so content is forced to null

    res.s = attrsOb;
    res.m = metaOb;

    action = v.primary [primaryKey];
    if (typeof action === 'function') {

        action (res);

    } // end if (typeof action === 'function')
        

    return res;

}; // end P.parseMsg 


A.init ();

return P;

};



