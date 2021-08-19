const utils = require('./utils/utils');
const helpBlocks = require('./bot-response/blocks-help');
const msgText = require('./bot-response/message-text');
// Commands
const cmdNew = require('./app-mentions/new');
const cmdDescription = require('./app-mentions/description');
const cmdStaff = require('./app-mentions/staff');
const cmdResetStaff = require('./app-mentions/reset-staff');
const cmdSwapStaff = require('./app-mentions/swap-staff');
const cmdDelete = require('./app-mentions/delete');
const cmdAbout = require('./app-mentions/about');
const cmdAssign = require('./app-mentions/assign');
const cmdAssignNext = require('./app-mentions/assign-next');
const cmdWho = require('./app-mentions/who');
const cmdUnassign = require('./app-mentions/unassign');
const cmdList = require('./app-mentions/list');
const cmdHelp = require('./app-mentions/help');
const cmdMessage = require('./app-mentions/message');
// Error handling
const errHandler = require('./utils/error');

/*------------------
    APP MENTIONS
------------------*/
const app_mentions = (app, store) => {
  app.event('app_mention', utils.ignoreMention, async({ event, context }) => {
    // Event and context data
    const ec = {
      text: event.text,                           // raw text from the mention
      sentByUserID: event.user,                   // ID of user who sent the message
      channelID: event.channel,                   // channel ID
      botToken: context.botToken,                 // bot access token
      rotaList: await store.getRotations()        // rotations in db
    }

    // Decision logic establishing how to respond to mentions
    // @uop new "[rotation]" [optional description]
    if (await utils.isCmd('new', ec.text)) {
      cmdNew(app, event, context, ec, utils, store, msgText, errHandler);
    }
    // @uop "[rotation]" description [new description]
    else if (await utils.isCmd('description', ec.text)) {
      cmdDescription(app, event, context, ec, utils, store, msgText, errHandler);
    }
    // @uop "[rotation]" staff [@user @user @user]
    else if (await utils.isCmd('staff', ec.text)) {
      cmdStaff(app, event, context, ec, utils, store, msgText, errHandler);
    }
    // @uop "[rotation]" swap staff
    else if (await utils.isCmd('swap staff', ec.text)) {
      cmdSwapStaff(app, event, context, ec, utils, store, msgText, errHandler);
    }
    // @uop "[rotation]" reset staff
    else if (await utils.isCmd('reset staff', ec.text)) {
      cmdResetStaff(app, event, context, ec, utils, store, msgText, errHandler);
    }
    // @uop "[rotation]" delete
    else if (await utils.isCmd('delete', ec.text)) {
      cmdDelete(app, event, context, ec, utils, store, msgText, errHandler);
    }
    // @uop "[rotation]" about
    else if (await utils.isCmd('about', ec.text)) {
      cmdAbout(app, event, context, ec, utils, store, msgText, errHandler);
    }
    // @uop "[rotation]" assign [@user] [handoff message]
    else if (await utils.isCmd('assign', ec.text)) {
      cmdAssign(app, event, context, ec, utils, store, msgText, errHandler);
    }
    // @uop "[rotation]" assign next [handoff message]
    else if (await utils.isCmd('assign next', ec.text)) {
      cmdAssignNext(app, event, context, ec, utils, store, msgText, errHandler);
    }
    // @uop "[rotation]" who
    else if (await utils.isCmd('who', ec.text)) {
      cmdWho(app, event, context, ec, utils, store, msgText, errHandler);
    }
    // @uop "[rotation]" unassign
    else if (await utils.isCmd('unassign', ec.text)) {
      cmdUnassign(app, event, context, ec, utils, store, msgText, errHandler);
    }
    // @uop list
    else if (await utils.isCmd('list', ec.text)) {
      cmdList(app, ec, utils, msgText, errHandler);
    }
    // @uop help
    else if (await utils.isCmd('help', ec.text)) {
      cmdHelp(app, ec, utils, helpBlocks, msgText, errHandler);
    }
    // @uop "[rotation]" free form message for on-call user
    else if (await utils.isCmd('message', ec.text)) {
      cmdMessage(app, event, context, ec, utils, store, msgText, errHandler);
    }
    // @uop anything else
    else {
      try {
        // console.log('Event: ', event, 'Clean Text: ', utils.cleanText(ec.text));
        const result = await app.client.chat.postMessage(
          utils.msgConfig(ec.botToken, ec.channelID, msgText.didntUnderstand(ec, msgText))
        );
      }
      catch (err) {
        errHandler(app, ec, utils, err, msgText);
      }
    }
  });
}
module.exports = app_mentions;