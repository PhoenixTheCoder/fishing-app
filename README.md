#1: To get this running you will need to replace the `sendArray([{}])` parts that allow userset for color. Make sure you include the admin password or the bot cant change the colors of other users.

#2: use `npm i` to install all the packages needed.

#3: Replace `var client = new Client(cfg.main.proxy2);` with your proxy/websocket.

#4: File requirements:
  -- You need a file in the same directory as the fishing app script called`pokemongen1.json`
  -- Make a script with this content in it:

`var level = require('level');
var db = level('./test.db');
db.put('name', 'levelup', function(err) { if (err) return console.log('Ooops!', err) db.get('name', function(err, value) { if (err) return console.log('Ooops!', err) console.log('name=' + value) }) })`

-- Make sure you have a FOLDER named test.db and make sure its not a file.
-- Run the script above to put necessary files into the test.db .

#5: Install pm2:
-- Run: npm i pm2 -g as administrator.

#6: To run the fishing app 24/7 - use a cloud service such as: aws, glitch.com, repl.it or heroku / Keep the files private too since they will have the admin password in it.
  -- Run the command: pm2 start <filename>.js
  -- To stop the file: pm2 stop <filename>.js
  -- Restarting the file: pm2 restart <filename>.js
  
#7: Enjoy fishing on test/fishing.
