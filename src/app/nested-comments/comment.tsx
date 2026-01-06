import { KeyboardEvent, useState } from "react";
import { FormattedCommentType } from "./page";

interface CommentProps {
  comment: FormattedCommentType;
  handleAddComment: (message: string, parentId: number) => void;
  handleAddLikeCount: (commentId: number) => void;
  handleAddDislikeCount: (commentId: number) => void;
  handleDeleteComments: (commentId: number) => void;
}

const Comment = ({
  comment,
  handleAddComment,
  handleAddLikeCount,
  handleAddDislikeCount,
  handleDeleteComments,
}: CommentProps) => {
  const [isReplyVisible, setIsReplyVisible] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  const handleReplayAdd = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    console.log("hello");
    if (e.key === "Enter") {
      handleAddComment(replyMessage, comment.id);
      setReplyMessage("");
      setIsReplyVisible(false);
    }
  };

  return (
    <div className="border border-neutral-400 p-4 rounded-lg w-full">
      <p>{comment.commentMessage}</p>
      <div className="flex items-center gap-2 py-2">
        <button
          onClick={() => handleAddLikeCount(comment.id)}
          className="px-2 py-1 bg-blue-600 rounded-lg cursor-pointer"
        >
          Like {comment.likeCount}
        </button>
        <button
          onClick={() => handleAddDislikeCount(comment.id)}
          className="px-2 py-1 bg-orange-600 rounded-lg cursor-pointer"
        >
          Dislike {comment.dislikeCount}
        </button>
        <button
          onClick={() => setIsReplyVisible(!isReplyVisible)}
          className="px-2 py-1 bg-gray-600 rounded-lg cursor-pointer"
        >
          {isReplyVisible ? "Cancel Reply" : "Reply"}
        </button>
        <button
          onClick={() => handleDeleteComments(comment.id)}
          className="px-2 py-1 bg-red-600 rounded-lg cursor-pointer"
        >
          Delete
        </button>
      </div>
      {isReplyVisible && (
        <textarea
          name="reply"
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
          aria-multiline={true}
          className="border border-neutral-600 rounded w-full"
          onKeyDown={handleReplayAdd}
        />
      )}
      <div>
        {Boolean(comment.reply.length) && (
          <div className="ml-8">
            {comment.reply.map((replyComment) => (
              <Comment
                key={replyComment.id}
                comment={replyComment}
                handleAddComment={handleAddComment}
                handleAddLikeCount={handleAddLikeCount}
                handleAddDislikeCount={handleAddDislikeCount}
                handleDeleteComments={handleDeleteComments}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
