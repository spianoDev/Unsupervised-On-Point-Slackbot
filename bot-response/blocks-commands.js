/*------------------
  BLOCKS: COMMANDS
------------------*/
const commandsBlocks = [
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*How I Work:*"
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ':sparkles: `@uop new "rotation-name" rotation description` *creates a new rotation*. `rotation-name` can contain _only_ lowercase letters, numbers, and hyphens.'
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ':x: `@uop delete "rotation-name"` *wipes any record of a rotation\'s existence* from my memory. _Use with caution!_'
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ':information_source: `@uop "rotation-name" about` *publicly displays the description and currently on-call user* for a rotation. The *staff list* is also displayed, but only to the user who requested info (to avoid unnecessary user notifications).'
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ':writing_hand: `@uop "rotation-name" description {insert new description (space separated)}` *updates the description* for a rotation.'
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ':busts_in_silhouette: `@uop "rotation-name" staff @user1 @user2 @user3` *saves a staff list* for a rotation. It expects a space-separated list of user mentions in the order you want assignments to rotate. You can then rotate the assignment through the staff list without needing to know who is next. _(Duplicates will be removed, so if you want someone to pull a double shift, you\'ll have to do that assignment by username.)_'
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ':ghost: `@uop "rotation-name" reset staff` *removes all users* from a rotation staff list. _Use with caution!_'
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ':information_desk_person: `@uop "rotation-name" assign @user {optional handoff message}` *assigns a user to a rotation*. Optionally, I can also deliver handoff information at the start of a rotation.'
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ':arrows_counterclockwise: `@uop "rotation-name" assign next {optional handoff message}` *assigns the next person in the staff list* to a rotation. If there is nobody currently assigned or the current user is not in the staff list, I\'ll start at the beginning of the list. Optionally, I can also deliver handoff information when starting a rotation.'
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ':bust_in_silhouette: `@uop "rotation-name" who` *reports the name of the person* who is on duty for a rotation.'
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ':eject: `@uop "rotation-name" unassign` *removes the current assignment* for a rotation.'
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ":clipboard: `@uop list` *displays a list* of all rotations I\'m keeping track of at the moment."
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ':phone: `@uop "rotation-name" message` *contacts a rotation\'s on-call user*. I send a DM telling them your message needs attention. They\'ll follow up at their earliest convenience. _(Kindly keep in mind they may be busy or outside working hours.)_'
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": ":question: `@uop help` shows how to interact with me."
    }
  }
];

module.exports = commandsBlocks;