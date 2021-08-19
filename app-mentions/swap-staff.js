module.exports = async (app, event, context, ec, utils, store, msgText, errHandler) => {
  const postMsg = async (msg) => await app.client.chat.postMessage(utils.msgConfig(ec.botToken, ec.channelID, msg));

  try {
    const pCmd = await utils.parseCmd('swap staff', event, context);
    const { rotation, staff } = pCmd;
    if (!utils.rotationInList(rotation, ec.rotaList)) {
      return await postMsg(msgText.resetStaffError(rotation));
    }
    if (staff.length !== 2) {
      return await postMsg(`Please pass in exactly two users (got ${staff.length})`)
    }

    const existingStaff = (await store.getRotation(rotation)).staff;
    const indexes = staff.map(s => existingStaff.indexOf(s));
    if (indexes.includes(-1)) {
      return await postMsg('One or more of the users specified is not in this rotation');
    }

    existingStaff[indexes[0]] = staff[1];
    existingStaff[indexes[1]] = staff[0];
    await store.saveStaff(rotation, existingStaff);
    await postMsg('Swap successful!');
  }
  catch (err) {
    errHandler(app, ec, utils, err, msgText);
  }
};