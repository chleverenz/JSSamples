/*
sampleCode provided by Christian Leverenz
christian@leverenz.de

This code comes with no warranty to fit any specific purpose. It is just for demo.
Feel Free to use or modify this code.
*/

pedestriansTemplate = {
    PLACEHOLDER: /\#\{([^}]*)\}/g
    , CONTENTPARTS: /([^:]*)\:(.*)/
    , evalTemplate: function (template, data) {
        var replacer = (function (actualdata, contentregexp) {
            if (actualdata == null) {
                actualdata = {};
            }
            return function (fullmatch, content) {
                var retval = fullmatch; // keep the pattern if no values are found
                var defaultvalue = null;
                var name = content;
                content.replace(contentregexp, function (fm, thename, defval) {
                    if (thename != null) {
                        name = thename;
                    }
                    defaultvalue = defval;
                    return fm;
                });

                if (defaultvalue != null) {
                    retval = defaultvalue;
                }
                if (actualdata) {
                    var parts = name.split("."); // allow dotted notation for deeper look in data...
                    var thisretval = actualdata;
                    for (var i = 0; i < parts.length; i++) {
                        thisretval = thisretval[parts[i]];
                    }
                    while (typeof (thisretval) == "function") { // allow functions as data...
                        thisretval = thisretval(actualdata, name, defaultvalue);
                    }
                    if (thisretval != null) {
                        retval = thisretval;
                    }
                }
                return retval;
            };
        })(data, pedestriansTemplate.CONTENTPARTS);
        return template.replace(pedestriansTemplate.PLACEHOLDER, replacer);
    }
};
