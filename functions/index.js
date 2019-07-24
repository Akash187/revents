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
    }else if(checkAttendeeListUpdate(newEvent, prevEvent)){
      console.log('attendeeList updated');
    }else if(checkCommentsUpdate(newEvent, prevEvent)){
      console.log('comments updated');
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

const checkAttendeeListUpdate = (newEvent, prevEvent) => {
  let prevAttendeeList = prevEvent.attendeeList;
  let newAttendeeList = newEvent.attendeeList;
  for(let attendee of prevAttendeeList){
    if(!newAttendeeList.includes(attendee)){
      return true;
    }
  }
  for(let attendee of newAttendeeList){
    if(!prevAttendeeList.includes(attendee)){
      return true;
    }
  }
  return false;
};

const checkCommentsUpdate = (newEvent, prevEvent) => {
  let prevComments = prevEvent.comments;
  let newComments = newEvent.comments;
  for(let comment of prevComments){
    if(!newComments.includes(comment)){
      return true;
    }
  }
  for(let comment of newComments){
    if(!prevComments.includes(comment)){
      return true;
    }
  }
  return false;
};
