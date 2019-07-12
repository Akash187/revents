import React, {useState, useEffect} from 'react';
import { Card, Segment, Header, Comment, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addParentComment, addChildComment, updateComment, deleteParentComment, deleteChildComment } from "../../store/actions/eventActions";
import { firestoreConnect } from 'react-redux-firebase';
import {firestore} from "../../config/fbConfig";
import SingleComment from "./SingleComment";
import {withRouter} from 'react-router-dom';

const EventComment = ({history, addParentComment, addChildComment, eventId, eventComments, updateComment, deleteParentComment, deleteChildComment, comments, uid}) => {

  const [comment, setComment] = useState('');
  const [editComment, setEditComment] = useState('');
  const [replyComment, setReplyComment] = useState('');
  const [allComments, setAllComments] = useState({});
  const [participants, setParticipants] = useState({});
  const [editId, setEditId] = useState('');
  const [replyId, setReplyId] = useState('');

  useEffect(() => {
    if(eventComments && eventComments.length > 0){
      let tempComments = {};
      eventComments.forEach(comment => tempComments[comment.id] = comment);
      setAllComments(tempComments);
      let peopleCommented = eventComments.map(comment => comment.createdBy);
      let uniqPeopleCommented = [...new Set(peopleCommented)];
      let promises = uniqPeopleCommented.map(async (userId) => {
        if(!(userId in participants)){
          let doc = await firestore.collection("users").doc(userId).get();
          return new Promise((res, rej) => res({id: userId, ...doc.data()}))
        }else{
          return new Promise((res, rej) => res(participants[userId]))
        }
      });

      Promise.all(promises)
        .then((results) => {
          let users = {};
          results.forEach(result => {
            users[result.id] = result
          });
          setParticipants(users);
        });
    }
  },[eventComments]);

  const startEditing = (comment, id) => {
    setEditId(id);
    setComment('');
    setReplyComment('');
    setEditComment(comment);
  };

  const startReplying = (id) => {
    setReplyId(id);
    setComment('');
    setEditComment('');
  };

  const cancel = () => {
    setEditId('');
    setReplyId('');
    setEditComment('');
    setReplyComment('');
  };

  return (
    <Card fluid>
      <Segment inverted size='large' color='teal' style={{ marginBottom: 0 }}>
        <Header as='h5' textAlign='center'>Talk about this Event</Header>
      </Segment>
      <Card.Content>
        <Comment.Group>
          {Object.keys(participants).length > 0 &&
            comments.slice(0).reverse().map(commentId => {
              let tempComment = allComments[commentId];
              let participant = participants[tempComment ? tempComment.createdBy : null];
              return participant ? <Comment key={tempComment.id}>
                <Comment.Avatar src={participant.images ? participant.images[0] : '/assets/user.png'} />
                <SingleComment
                  uid={uid}
                  parentId={tempComment.id}
                  editId={editId}
                  replyId={replyId}
                  eventId={eventId}
                  tempComment={tempComment}
                  participant={participant}
                  startReplying={startReplying}
                  replyComment={replyComment}
                  setReplyComment={setReplyComment}
                  editComment={editComment}
                  updateComment={updateComment}
                  deleteComment={deleteParentComment}
                  startEditing={startEditing}
                  setEditComment={setEditComment}
                  cancel={cancel}
                  addChildComment={addChildComment}
                />
                {tempComment.subComments.length > 0 && <Comment.Group>
                  {tempComment.subComments.map(commentId => {
                    let childTempComment = allComments[commentId];
                    let participant = participants[childTempComment ? childTempComment.createdBy : null];
                    return participant ? <Comment key={childTempComment.id}>
                      <Comment.Avatar src={participant.images ? participant.images[0] : '/assets/user.png'} />
                      <SingleComment
                        uid={uid}
                        parentId={tempComment.id}
                        editId={editId}
                        replyId={replyId}
                        eventId={eventId}
                        tempComment={childTempComment}
                        participant={participant}
                        startReplying={startReplying}
                        replyComment={replyComment}
                        setReplyComment={setReplyComment}
                        editComment={editComment}
                        updateComment={updateComment}
                        deleteComment={deleteChildComment}
                        startEditing={startEditing}
                        setEditComment={setEditComment}
                        cancel={cancel}
                        addChildComment={addChildComment}
                      >
                      </SingleComment>
                    </Comment> : <div/>
                  })}
                </Comment.Group>}
              </Comment> : <div/>
            }
          )}

          {uid ? <Form reply>
            <Form.TextArea style={{ height: 60}} value={comment} onClick={cancel} onChange={(e, {value}) => setComment(value)}/>
            <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={() => {
              addParentComment(comment, eventId);
              setComment('');
            }}/>
          </Form> : <Button primary onClick={() => history.push('/authenticate')}>Login to Comment</Button>}
        </Comment.Group>
      </Card.Content>
    </Card>
  );
};

const mapStateToProps = ({firestore, firebase}) => {
  return{
    eventComments: firestore.ordered.comments,
    uid: firebase.auth.uid
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    addParentComment: (comment, eventId) => dispatch(addParentComment(comment, eventId)),
    addChildComment: (comment, eventId, parentId) => dispatch(addChildComment(comment, eventId, parentId)),
    updateComment: (comment, commentId) => dispatch(updateComment(comment, commentId)),
    deleteParentComment: (commentId, eventId, subComments) => dispatch(deleteParentComment(commentId, eventId, subComments)),
    deleteChildComment: (commentId, parentId) => dispatch(deleteChildComment(commentId, parentId))
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => [{
    collection: 'comments',
    where: [
      ['eventId', '==', props.eventId]
    ]
  }])
)(withRouter(EventComment));
