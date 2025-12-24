import { useState } from 'react';
import { Plus, Pencil, Trash2, AlertCircle } from 'lucide-react';
import { useTodo } from '../TodoContext';
import { Task, Comment } from '../types';
import ConfirmDialog from './ConfirmDialog';

interface CommentSectionProps {
  task: Task;
  groupId: string;
}

const CommentSection = ({ task, groupId }: CommentSectionProps) => {
  const { dispatch } = useTodo();
  const [isAdding, setIsAdding] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null);

  const handleAddComment = () => {
    if (newCommentText.trim()) {
      dispatch({
        type: 'ADD_COMMENT',
        payload: {
          groupId,
          taskId: task.id,
          text: newCommentText,
        },
      });
      setNewCommentText('');
      setIsAdding(false);
    }
  };

  const handleUpdateComment = (commentId: string) => {
    if (editText.trim()) {
      dispatch({
        type: 'UPDATE_COMMENT',
        payload: {
          groupId,
          taskId: task.id,
          commentId,
          text: editText,
        },
      });
      setEditingCommentId(null);
      setEditText('');
    }
  };

  const handleDeleteComment = () => {
    if (deleteCommentId) {
      dispatch({
        type: 'DELETE_COMMENT',
        payload: {
          groupId,
          taskId: task.id,
          commentId: deleteCommentId,
        },
      });
      setDeleteCommentId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className="w-4 h-4 text-amber-600" />
        <h4 className="font-semibold text-sm text-gray-700">Blockers & Notes</h4>
      </div>

      {task.comments.length === 0 && !isAdding && (
        <p className="text-sm text-gray-500 italic py-2">
          No comments yet. Add blockers or notes to track progress.
        </p>
      )}

      <div className="space-y-2">
        {task.comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-amber-50 border border-amber-200 rounded-lg p-3"
          >
            {editingCommentId === comment.id ? (
              <div className="space-y-2">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  rows={3}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateComment(comment.id)}
                    className="flex-1 px-3 py-1.5 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingCommentId(null);
                      setEditText('');
                    }}
                    className="flex-1 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-gray-700 flex-1">{comment.text}</p>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => {
                        setEditingCommentId(comment.id);
                        setEditText(comment.text);
                      }}
                      className="p-1 hover:bg-amber-100 rounded transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5 text-amber-700" />
                    </button>
                    <button
                      onClick={() => setDeleteCommentId(comment.id)}
                      className="p-1 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-600" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{formatDate(comment.createdAt)}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {isAdding ? (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-3 space-y-2">
          <textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            placeholder="Describe a blocker or add a note..."
            rows={3}
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddComment}
              className="flex-1 px-3 py-1.5 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
            >
              Add Comment
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewCommentText('');
              }}
              className="flex-1 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors border border-amber-200 hover:border-amber-300"
        >
          <Plus className="w-4 h-4" />
          Add Comment
        </button>
      )}

      <ConfirmDialog
        isOpen={deleteCommentId !== null}
        onClose={() => setDeleteCommentId(null)}
        onConfirm={handleDeleteComment}
        title="Delete Comment"
        message="Are you sure you want to delete this comment?"
      />
    </div>
  );
};

export default CommentSection;
