import React from 'react';
import { Comment, Form, Button } from 'semantic-ui-react';
import moment from "moment/moment";

const SingleComment = ({tempComment, participant, uid, parentId, eventId, editId, editComment, updateComment, setEditComment, deleteComment, startEditing, cancel, replyId, replyComment, startReplying, setReplyComment, addChildComment }) => {

  const reply = () => {
    if(replyComment.length > 0){
      addChildComment(replyComment, eventId, parentId);
      cancel();
    }
  };

  const update = (comment, id) => {
    if(editComment.length > 0){
      updateComment(comment, id);
      cancel();
    }
  };

  const delComment = () => {
    if(tempComment.parentId){
      deleteComment(tempComment.id, parentId)
    }else{
      deleteComment(tempComment.id, eventId, tempComment.subComments)
    }
  };

  return (
      <Comment.Content>
        <Comment.Author as='a'>{participant.name}</Comment.Author>
        <Comment.Metadata>
          <div>{moment(tempComment.createdAt ? tempComment.createdAt.seconds * 1000 : new Date()).calendar(null, {
            lastWeek: 'Do MMMM YYYY, h:mm a',
            sameElse: 'Do MMMM YYYY, h:mm a'
          })}</div>
        </Comment.Metadata>
        {!(editId === tempComment.id) ? <Comment.Text>{tempComment.comment}</Comment.Text> :
          <Form reply>
            <Form.TextArea value={editComment} onChange={(e, {value}) => setEditComment(value)} style={{ height: 60}}/>
            <Button content='Update' positive onClick={() => update(editComment, tempComment.id)}/>
            <Button content='Cancel' negative onClick={cancel}/>
          </Form>
        }
        <Comment.Actions>
          {uid && (tempComment.createdBy === uid ? <div>
              {!(editId === tempComment.id) && <div>
                <Comment.Action style={{color: 'blue'}} onClick={() => startEditing(tempComment.comment, tempComment.id)}>Edit</Comment.Action>
                <Comment.Action style={{color: 'red'}} onClick={delComment}>Delete</Comment.Action>
              </div>}
            </div>
            :
            <div>
              {!(replyId === tempComment.id) && <Comment.Action onClick={() => startReplying(tempComment.id)}>Reply</Comment.Action>}
            </div>)
          }
        </Comment.Actions>
        {(replyId === tempComment.id) && <Form reply>
          <Form.TextArea value={replyComment} onChange={(e, {value}) => setReplyComment(value)} style={{ height: 60}}/>
          <Button content='Reply' primary onClick={reply}/>
          <Button content='Cancel' negative onClick={cancel}/>
        </Form>}
      </Comment.Content>
  );
};

export default SingleComment;
