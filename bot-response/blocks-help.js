const introArr = require('./blocks-intro');
const commandsArr = require('./blocks-commands');

/*------------------
    BLOCKS: HELP
------------------*/
const helpBlocks = () => {
  const appHome = [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `:house: *Visit your <https://notrandysteam.slack.com/archives/D02BN3T0DK4|App Home>* to find out which rotations you're currently on _active duty_ or _on staff_ for.`
      }
    },
    {
      "type": "divider"
    }
  ];
  return introArr.concat(appHome).concat(commandsArr);
};

module.exports = helpBlocks;
