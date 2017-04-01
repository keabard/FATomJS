var DEBUG = true;

getRandomQuestionsFilling = function(casper) {
  var questionsNames = casper.getFormValues('form#surveyForm').PostedFNS.split('|');
  casper.log('Found these questions: ' + questionsNames, 'debug');
  var questionFilling = {};
  questionsNames.forEach(function(questionName) {
    questionFilling['input[name="' + questionName + '"]'] = '5';
  });
  casper.log('Attempting to fill this way: ' + JSON.stringify(questionFilling), 'debug');
  return questionFilling;
}

var casper = require('casper').create({
  logLevel: DEBUG ? 'debug' : 'error',
  verbose: DEBUG,
  pageSettings: {
    loadImages: true,
    loadPlugins: true,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'
  },
  viewportSize: {
    height: 960,
    width: 1280
  },
  waitTimeout: 5000,
  onDie: function(casper, message, status) {
    casper.log(casper.getHTML());
    casper.capture('Hurgh.png');
  }
});

casper.reportErrors = function (f) {
  var ret = null;
  try {
    ret = f.call(this);
  } catch (e) {
    this.echo("ERROR: " + e);
    this.exit();
  }
  return ret;
}

casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
})

// --- Let's go!
casper.start('http://www.bkvousecoute.fr');

casper.then(function() {
  DEBUG && this.capture('captures/bk/1.png');
});

// Approve cookies policy
casper.waitForSelector('input#NextButton', function() {
  this.click('input#NextButton');
});

casper.then(function() {
  DEBUG && this.capture('captures/bk/2.png');
});

// Last time at BK info. SurveyCode is written on BK ticket
casper.waitForSelector('input#NextButton', function() {
  this.fillSelectors('form#surveyEntryForm', {
    'input[name="SurveyCode"]': 21614,
    'select[name="InputDay"]': '13',
    'select[name="InputMonth"]': '01',
    'select[name="InputYear"]': '17',
    'select[name="InputHour"]': '12',
    'select[name="InputMinute"]': '00'
  }, true);
});

casper.then(function() {
  DEBUG && this.capture('captures/bk/3.png');
});

// Here or take away?
casper.waitForSelector('input#NextButton', function() {
  this.fillSelectors('form#surveyForm', {
    'input[name="R001000"]': "2"
  }, true);
});

casper.then(function() {
  DEBUG && this.capture('captures/bk/4.png');
});

// Did you use automated order system?
casper.waitForSelector('input#NextButton', function() {
  this.fillSelectors('form#surveyForm', {
    'input[name="R000019"]': "1"
  }, true);
});

casper.then(function() {
  DEBUG && this.capture('captures/bk/5.png');
});

// How many people were eating with you?
casper.waitForSelector('input#NextButton', function() {
  this.fillSelectors('form#surveyForm', {
    'input[name="R002000"]': "2"
  }, true);
});

casper.then(function() {
  DEBUG && this.capture('captures/bk/6.png');
});

// Were you with a child under 12? (Only if you didnt eat alone)
casper.waitForSelector('input#NextButton', function() {
  this.fillSelectors('form#surveyForm', {
    'input[name="R003000"]': "2"
  }, true);
});

casper.then(function() {
  DEBUG && this.capture('captures/bk/7.png');
});

// Global Satisfaction
casper.waitForSelector('input#NextButton', function() {
  this.fillSelectors('form#surveyForm', {
    'input[name="R004000"]': "5"
  }, true);
});

casper.then(function() {
  DEBUG && this.capture('captures/bk/8.png');
});

/* Tricky part!
  Four screens of randomized questions are about to show up.getRandomQuestionsFilling
  analyzes the form to see which questions are here, and then automatically fill them
  with a "Very Good / 5" answer.
  Random questions 1st screen */
casper.waitForSelector('input#NextButton', function() {
  casper.fillSelectors('form#surveyForm', getRandomQuestionsFilling(this), true);
});

casper.then(function() {
  DEBUG && this.capture('captures/bk/9.png');
});

// Random questions 2nd screen
casper.waitForSelector('input#NextButton', function() {
  casper.fillSelectors('form#surveyForm', getRandomQuestionsFilling(this), true);
});

casper.then(function() {
  DEBUG && this.capture('captures/bk/10.png');
});

// Random questions 3rd screen
casper.waitForSelector('input#NextButton', function() {
  casper.fillSelectors('form#surveyForm', getRandomQuestionsFilling(this), true);
});

casper.then(function() {
  DEBUG && this.capture('captures/bk/11.png');
});

// Random questions 4th screen
casper.waitForSelector('input#NextButton', function() {
  casper.fillSelectors('form#surveyForm', getRandomQuestionsFilling(this), true);
});

casper.then(function() {
  DEBUG && this.capture('captures/bk/12.png');
});

// Any problem at BK?
casper.waitForSelector('input#NextButton', function() {
  this.fillSelectors('form#surveyForm', {
    'input[name="R041000"]': "2"
  }, true);
});

casper.then(function() {
  DEBUG && this.capture('captures/bk/13.png');
});

// Come back or recommand?
casper.waitForSelector('input#NextButton', function() {
  casper.fillSelectors('form#surveyForm', getRandomQuestionsFilling(this), true);
});

casper.then(function() {
  DEBUG && this.capture('captures/bk/14.png');
});

// Text area step, no need to fill it
casper.waitForSelector('input#NextButton', function() {
  casper.fillSelectors('form#surveyForm', null, true);
});

casper.then(function() {
  DEBUG && this.capture('captures/bk/15.png');
});

// First Ticking screen, no need to fill it
casper.waitForSelector('input#NextButton', function() {
  casper.fillSelectors('form#surveyForm', null, true);
});

casper.then(function() {
  DEBUG && this.capture('captures/bk/16.png');
});

// Second Ticking screen, no need to fill it
casper.waitForSelector('input#NextButton', function() {
  casper.fillSelectors('form#surveyForm', null, true);
});

casper.then(function() {
  DEBUG && this.capture('captures/bk/17.png');
});

// Was your order complete? Yet it was!
casper.waitForSelector('input#NextButton', function() {
  this.fillSelectors('form#surveyForm', {
    'input[name="R049000"]': "1"
  }, true);
});

casper.then(function() {
  DEBUG && this.capture('captures/bk/18.png');
});

// How many times did you come to Burger King during current month? 5! Because we're fat!
casper.waitForSelector('input#NextButton', function() {
  this.fillSelectors('form#surveyForm', {
    'input[name="R057000"]': "5"
  }, true);
});

casper.then(function() {
  DEBUG && this.capture('captures/bk/19.png');
});

// Why do you come to Burger King? Because we love junk food.
casper.waitForSelector('input#NextButton', function() {
  this.fillSelectors('form#surveyForm', {
    'input[name="R060000"]': "6"
  }, true);
});

casper.then(function() {
  DEBUG && this.capture('captures/bk/20.png');
});

// Which junk food restaurant?
casper.waitForSelector('input#NextButton', function() {
  this.fillSelectors('form#surveyForm', {
    'input[name="R068000"]': "1"
  }, true);
});

casper.then(function() {
  DEBUG && this.capture('captures/bk/21.png');
});

// Age and gender?
casper.waitForSelector('input#NextButton', function() {
  this.fillSelectors('form#surveyForm', {
    'select[name="R069000"]': "9",
    'select[name="R070000"]': "9",
  }, true);
});

casper.then(function() {
  DEBUG && this.capture('captures/bk/22.png');
});

// Zipcode
casper.waitForSelector('input#NextButton', function() {
  this.fillSelectors('form#surveyForm', {
    'input[name="S076000"]': "75000"
  }, true);
});

casper.then(function() {
  DEBUG && this.capture('captures/bk/23.png');
});

// Here is the code
casper.waitForSelector('p.ValCode', function() {
  console.log(casper.fetchText('p.ValCode').split(':')[1].trim());
});

casper.run();