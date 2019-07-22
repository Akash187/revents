const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

const createNotification = (notification) => {
  return admin.firestore().collection('notifications').add(notification)
    .then(doc => console.log('notification added', doc));
};

exports.eventCreated = functions.firestore
  .document('events/{eventId}')
  .onCreate((event, context) => {
    const eventId = context.params.eventId;
    const tempEvent = event.data();
    return admin.firestore()
      .collection('users')
      .doc(tempEvent.createdBy)
      .get()
      .then(user => {
        const tempUser = user.data();
        const notification = {
          content: 'New Event',
          eventId: eventId,
          eventName: tempEvent.name,
          userId: tempEvent.createdBy,
          userName: tempUser.name,
          image: tempUser.images ? tempUser.images[0] : '/assets/user.png',
          addedAt: admin.firestore.FieldValue.serverTimestamp()
      };
        return createNotification(notification);
      });
  });

exports.cancelEvent = functions.firestore
  .document('events/{eventId}')
  .onUpdate((change, context) => {
    const tempEvent = change.after.data();
    if(!tempEvent.active){
      const eventId = context.params.eventId;
      return admin.firestore()
        .collection('users')
        .doc(tempEvent.createdBy)
        .get()
        .then(user => {
          const tempUser = user.data();
          const notification = {
            content: 'Event Cancelled',
            eventId: eventId,
            eventName: tempEvent.name,
            userId: tempEvent.createdBy,
            userName: tempUser.name,
            image: tempUser.images ? tempUser.images[0] : '/assets/user.png',
            addedAt: admin.firestore.FieldValue.serverTimestamp()
          };
          return createNotification(notification);
        });
    }
  });
