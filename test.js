#!/usr/bin/node
// test.js

var msgStructure = {
        primary: {
            div: 1, 
            input: 0, 
            style: 1,
        }, 
        secondary: {
            style: 1,
        },
};

var msgParser = new require ('go-msg') (msgStructure);

var msg = {div: 'hello world', style: 'color: red;'};
var msgParsed = msgParser.parseMsg (msg);
    console.log ('msgParsed: ' + JSON.stringify (msgParsed) + '\n');
        // expected output:     msgParsed: {"p":"div","c":"hello world","s":{"style":"color: red;"}}

var msg = {id: 'style1', class: 'theStyle', style: '.class1: {color: blue;}'};
var msgParsed = msgParser.parseMsg (msg);
    console.log ('msgParsed: ' + JSON.stringify (msgParsed) + '\n');
        // exptected output:    msgParsed: {"p":"style","c":".class1: {color: blue;}","s":{"id":"style1","class":"theStyle"}}

var msg = {id: 'inputId15', class: 'button', input:0, autocomplete: 'autocomplete', value: 'showme', type: 'submit'};
var msgParsed = msgParser.parseMsg (msg);
    console.log ('msgParsed: ' + JSON.stringify (msgParsed) + '\n');
        // exptected output:    msgParsed: {"p":"input","c":null,"s":{"id":"inputId15","class":"button","autocomplete":"autocomplete","value":"showme","type":"submit"}}



