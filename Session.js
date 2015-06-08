session.on('submit_sm', function(pdu) {
    var msgid = .... ; // generate a message_id for this message.
    session.send(pdu.response({
        message_id: msgid
    }));
});

session.on('unbind', function(pdu) {
    session.send(pdu.response());
    session.close();
});

session.on('enquire_link', function(pdu) {
    session.send(pdu.response());
});
