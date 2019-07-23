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
    const newEvent = event.data();
    return admin.firestore()
      .collection('users')
      .doc(newEvent.createdBy)
      .get()
      .then(user => {
        const tempUser = user.data();
        const notification = {
          content: 'New Event',
          eventId: eventId,
          eventName: newEvent.name,
          userId: newEvent.createdBy,
          userName: tempUser.name,
          image: tempUser.images ? tempUser.images[0] : '/assets/user.png',
          addedAt: admin.firestore.FieldValue.serverTimestamp()
      };
        return createNotification(notification);
      });
  });

exports.updateEvent = functions.firestore
  .document('events/{eventId}')
  .onUpdate((change, context) => {
    const newEvent = change.after.data();
    const prevEvent = change.before.data();
    const eventId = context.params.eventId;
    if(!newEvent.active){
      return admin.firestore()
        .collection('users')
        .doc(newEvent.createdBy)
        .get()
        .then(user => {
          const tempUser = user.data();
          const notification = {
            content: 'Event Cancelled',
            eventId: eventId,
            eventName: newEvent.name,
            userId: newEvent.createdBy,
            userName: tempUser.name,
            image: tempUser.images ? tempUser.images[0] : '/assets/user.png',
            addedAt: admin.firestore.FieldValue.serverTimestamp()
          };
          return createNotification(notification);
        });
    }else if(newEvent.attendeeList !== prevEvent.attendeeList || newEvent.comments !== prevEvent.comments){
      return 'hello'
    }else{
      return admin.firestore()
        .collection('users')
        .doc(newEvent.createdBy)
        .get()
        .then(user => {
          const tempUser = user.data();
          const notification = {
            content: 'Event Updated',
            eventId: eventId,
            eventName: newEvent.name,
            userId: newEvent.createdBy,
            userName: tempUser.name,
            image: tempUser.images ? tempUser.images[0] : '/assets/user.png',
            addedAt: admin.firestore.FieldValue.serverTimestamp()
          };
          return createNotification(notification);
        });
    }
  });
