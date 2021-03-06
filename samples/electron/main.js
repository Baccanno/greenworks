var message = '';

function log(msg) {
  message = message + msg + '<br>';
  document.getElementById('logs').innerHTML = message;
}

function testSteamAPI() {
  var os = require('os');
  var greenworks = require('../../greenworks');
  if (!greenworks) {
    log('Greenworks not support for ' + os.platform() + ' platform');
  } else {
    if (!greenworks.initAPI()) {
      log('Error on initializing steam API.');
    } else {
      log('Steam API initialized successfully.');

      log('Cloud enabled: ' + greenworks.isCloudEnabled());
      log('Cloud enabled for user: ' + greenworks.isCloudEnabledForUser());

      greenworks.on('steam-servers-connected', function() { log('connected'); });
      greenworks.on('steam-servers-disconnected', function() { log('disconnected'); });
      greenworks.on('steam-server-connect-failure', function() { log('connected failure'); });
      greenworks.on('steam-shutdown', function() { log('shutdown'); });

      greenworks.saveTextToFile('test_file.txt', 'test_content',
          function() { log('Save text to file successfully'); },
          function(err) { log('Failed on saving text to file'); });

      greenworks.readTextFromFile('test_file.txt', function(message) {
          log('Read text from file successfully.'); }, function(err) {
          log('Failed on reading text from file'); });

      greenworks.getCloudQuota(
          function() { log('Getting cloud quota successfully.') },
          function(err) { log('Failed on getting cloud quota.') });

      greenworks.activateAchievement('achievement',
          function() { log('Activating achievement successfully'); },
          function(err) { log('Failed on activating achievement.'); });

      greenworks.getNumberOfPlayers(
          function(a) { log("Number of players " + a) },
          function(err) { log ('Failed on getting number of players'); });
    }
  }
}

document.addEventListener('DOMContentLoaded', function() { testSteamAPI() });
