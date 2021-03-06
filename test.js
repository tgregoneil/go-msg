#!/usr/bin/node
// test.js

var msgStructure = {
        primary: {
            div: 1, 
            input: 0, 
            style: 1,
            artificialTest: 1,
        }, 
        secondary: {
            style: 1,
            artificialTest: 1,
        },
        meta: {
            parent: 1, append: 1, prepend: 1, before: 1, after: 1
        },
};

var msgParser = new require ('go-msg') (msgStructure);

var msg = {div: 'hello world', style: 'color: red;'};
    console.log ('msg: ' + JSON.stringify (msg));
var msgParsed = msgParser.parseMsg (msg);
    console.log ('msgParsed: ' + JSON.stringify (msgParsed) + '\n');
        // expected output:     msgParsed: {"p":"div","c":"hello world","s":{"style":"color: red;"}}

var msg = {id: 'style1', class: 'theStyle', style: '.class1: {color: blue;}'};
    console.log ('msg: ' + JSON.stringify (msg));
var msgParsed = msgParser.parseMsg (msg);
    console.log ('msgParsed: ' + JSON.stringify (msgParsed) + '\n');
        // exptected output:    Note that 'style' is primary, because there is no other primary present. msgParsed: {"p":"style","c":".class1: {color: blue;}","s":{"id":"style1","class":"theStyle"}}

var msg = {id: 'inputId15', class: 'button', input:0, autocomplete: 'autocomplete', value: 'showme', type: 'submit'};
    console.log ('msg: ' + JSON.stringify (msg));
var msgParsed = msgParser.parseMsg (msg);
    console.log ('msgParsed: ' + JSON.stringify (msgParsed) + '\n');
        // exptected output:    Note that it is an error for a void element, such as 'input' to have anything other than 0, false or null as the value for the primay key.   msgParsed: {"p":"input","c":null,"s":{"id":"inputId15","class":"button","autocomplete":"autocomplete","value":"showme","type":"submit"}}


var msg = {parent: '#25', append: '#232', id: 'inputId15', class: 'button', input:'should not be here', autocomplete: 'autocomplete', value: 'showme', type: 'submit'};
    console.log ('msg: ' + JSON.stringify (msg));
var msgParsed = msgParser.parseMsg (msg);
    console.log ('msgParsed: ' + JSON.stringify (msgParsed) + '\n');
        // exptected output:    msgParsed: {"p":"input","c":null,"s":{"id":"inputId15","class":"button","autocomplete":"autocomplete","value":"showme","type":"submit"},"m":{"parent":"#25","append":"#232"}}

var msg = {style: '.cls {color: "red"}', artificialTest: '#232', id: 'inputId15', class: 'button', autocomplete: 'autocomplete', value: 'showme', type: 'submit'};
    console.log ('msg: ' + JSON.stringify (msg));
var msgParsed = msgParser.parseMsg (msg);
    console.log ('msgParsed: ' + JSON.stringify (msgParsed) + '\n');
        // exptected output:    msgParsed: {"err":"Either there was no primary key or all primary candidates are members of secondary: [\"style\",\"artificialTest\"]"}


