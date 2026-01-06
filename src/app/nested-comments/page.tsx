"use client";

import { KeyboardEvent, useState } from "react";
import Comment from "./comment";

export type CommentType = {
  id: number;
  commentMessage: string;
  likeCount: number;
  dislikeCount: number;
  parentId: number | null;
};

export type FormattedCommentType = {
  id: number;
  commentMessage: string;
  likeCount: number;
  dislikeCount: number;
  reply: FormattedCommentType[];
};

const getFormattedComments = (
  comments: CommentType[]
): FormattedCommentType[] => {
  const mappedComments = new Map<number, FormattedCommentType>();
  const result: FormattedCommentType[] = [];

  for (let i = 0; i < comments.length; i++) {
    mappedComments.set(comments[i].id, { ...comments[i], reply: [] });
  }

  comments.forEach((comment) => {
    const mappedComment = mappedComments.get(comment.id);
    if (!mappedComment) return;

    if (comment.parentId === null) {
      result.push(mappedComment);
    } else {
      const parentComment = mappedComments.get(comment.parentId);
      parentComment?.reply.push(mappedComment);
    }
  });
  return result;
};

const NestedComments = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [formattedComments, setFormattedComments] = useState<
    FormattedCommentType[]
  >([]);
  const [commentMessage, setCommentMessage] = useState("");

  const handleAddComment = (message: string, parentId: number | null) => {
    const comment = {
      id: comments.length + 1,
      commentMessage: message,
      likeCount: 0,
      dislikeCount: 0,
      parentId,
    };
    setComments((prev) => [...prev, comment]);
    const updatedFormattedComments = getFormattedComments([
      ...comments,
      comment,
    ]);
    setFormattedComments(updatedFormattedComments);
  };

  const handleAddLikeCount = (commentId: number) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id !== commentId) return comment;
      return { ...comment, likeCount: comment.likeCount + 1 };
    });
    setComments(updatedComments);
    const updatedFormmattedComments = getFormattedComments(updatedComments);
    setFormattedComments(updatedFormmattedComments);
  };

  const handleAddDislikeCount = (commentId: number) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id !== commentId) return comment;
      return { ...comment, dislikeCount: comment.dislikeCount + 1 };
    });
    setComments(updatedComments);
    const updatedFormmattedComments = getFormattedComments(updatedComments);
    setFormattedComments(updatedFormmattedComments);
  };

  const handleDeleteComments = (commentId: number) => {
    const deleteCommentIds = [commentId];
    const updatedComments = comments.filter((comment) => {
      if (deleteCommentIds.includes(comment.id)) {
        deleteCommentIds.push(comment.id);
        return false;
      }
      return true;
    });
    setComments(updatedComments);
    const updatedFormmattedComments = getFormattedComments(updatedComments);
    setFormattedComments(updatedFormmattedComments);
  };

  const handleCommentAdd = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      handleAddComment(commentMessage, null);
      setCommentMessage("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-8 min-h-screen">
      <textarea
        name="commentMessage"
        value={commentMessage}
        onChange={(e) => setCommentMessage(e.target.value)}
        onKeyDown={handleCommentAdd}
        aria-multiline={true}
        className="border border-neutral-600 rounded w-full px-2 py-1"
      />
      <div className="flex flex-col w-full items-start gap-2">
        {formattedComments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            handleAddComment={handleAddComment}
            handleAddLikeCount={handleAddLikeCount}
            handleAddDislikeCount={handleAddDislikeCount}
            handleDeleteComments={handleDeleteComments}
          />
        ))}
      </div>
    </div>
  );
};

export default NestedComments;
