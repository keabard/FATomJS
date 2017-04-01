var DEBUG = true;

var quickCredentials = {
  login: 'quickie@yopmail.com',
  password: 'Quick45678'
};

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
casper.start('http://avis.quick.fr');

casper.then(function() {
  DEBUG && this.capture('captures/quick/1.png');
});

// Just fill first field to get restaurant IDs with AJAX
casper.waitForSelector('input[name="SENDBTN"]', function() {
  this.fillSelectors('form[name="SFTCPT"]', {
    'select[name="Q25"]': '75',
   });
});

casper.waitForSelector('option[value="F082 - MONTMARTRE"]', function() {
  this.fillSelectors('form[name="SFTCPT"]', {
    'select[name="Q26"]': 'F082 - MONTMARTRE',
    'input[name="Q27"]': '01/03/2017',
    'input[name="MH28"]': '12',
    'input[name="MN28"]': '12'
  }, false);
  this.click('input[name="SENDBTN"]');
});

casper.waitForSelector('input[name="SENDBTN"]', function() {
  DEBUG && this.capture('captures/quick/2.png');
  this.fillSelectors('form[name="SFTCPT"]', {
    'input[name="Q44R1"]': '10'
  }, false);
  this.click('input[name="SENDBTN"]');
});

casper.waitForSelector('input[name="SENDBTN"]', function() {
  DEBUG && this.capture('captures/quick/3.png');
  this.fillSelectors('form[name="SFTCPT"]', {
    'input[name="Q46R1"]': '1'
  }, false);
  this.click('input[name="SENDBTN"]');
});

casper.waitForSelector('input[name="SENDBTN"]', function() {
  DEBUG && this.capture('captures/quick/4.png');
  this.fillSelectors('form[name="SFTCPT"]', {
    'input[name="Q47R1"]': '10',
    'input[name="Q48R1"]': '10',
    'input[name="Q49R1"]': '10',
    'input[name="Q50R1"]': '10',
    'input[name="Q51R1"]': '10'
  }, false);
  this.click('input[name="SENDBTN"]');
});

casper.waitForSelector('input[name="SENDBTN"]', function() {
  DEBUG && this.capture('captures/quick/5.png');
  this.fillSelectors('form[name="SFTCPT"]', {
    'input[name="Q52R1"]': '1'
  }, false);
  this.click('input[name="SENDBTN"]');
});

casper.waitForSelector('input[name="SENDBTN"]', function() {
  DEBUG && this.capture('captures/quick/6.png');
  this.fillSelectors('form[name="SFTCPT"]', {
    'input[name="Q66"]': '1',
    'input[name="Q67R1"]': '2',
    'input[name="Q69"]': 'quickie@yopmail.com',
  }, false);
  this.click('input[name="SENDBTN"]');
});

casper.waitForSelector('a[href="https://www.quick.fr/fr/inscription"]', function() {
  DEBUG && this.capture('captures/quick/7.png');
});

casper.run();