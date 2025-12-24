import { useState } from 'react';
import { CheckCircle2, Circle, Pencil, Trash2, MessageSquare, Clock } from 'lucide-react';
import { useTodo } from '../TodoContext';
import { Task } from '../types';
import CommentSection from './CommentSection';
import ConfirmDialog from './ConfirmDialog';

interface TaskCardProps {
  task: Task;
  groupId: string;
}

const TaskCard = ({ task, groupId }: TaskCardProps) => {
  const { dispatch } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleUpdateTask = () => {
    if (editTitle.trim()) {
      dispatch({
        type: 'UPDATE_TASK',
        payload: {
          groupId,
          taskId: task.id,
          title: editTitle,
          description: editDescription,
        },
      });
      setIsEditing(false);
    }
  };

  const handleToggleComplete = () => {
    dispatch({
      type: 'TOGGLE_TASK',
      payload: { groupId, taskId: task.id },
    });
  };

  const handleDeleteTask = () => {
    dispatch({
      type: 'DELETE_TASK',
      payload: { groupId, taskId: task.id },
    });
    setShowDeleteConfirm(false);
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
    <div
      className={`bg-white rounded-lg border-2 transition-all ${
        task.completed
          ? 'border-green-200 bg-green-50/50'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
    >
      <div className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Task title"
              autoFocus
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Description (optional)"
              rows={3}
            />
            <div className="flex gap-2">
              <button
                onClick={handleUpdateTask}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditTitle(task.title);
                  setEditDescription(task.description);
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start gap-3">
              <button
                onClick={handleToggleComplete}
                className="mt-1 flex-shrink-0 transition-transform hover:scale-110"
              >
                {task.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400 hover:text-blue-600" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-semibold ${
                        task.completed
                          ? 'text-gray-500 line-through'
                          : 'text-gray-800'
                      }`}
                    >
                      {task.title}
                    </h3>
                    {task.description && (
                      <p
                        className={`mt-1 text-sm ${
                          task.completed ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {task.description}
                      </p>
                    )}
                  </div>

                  {task.completed && (
                    <span className="flex-shrink-0 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Done
                    </span>
                  )}
                </div>

                {task.completed && task.completedAt && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    Completed {formatDate(task.completedAt)}
                  </div>
                )}

                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => setShowComments(!showComments)}
                    className={`px-3 py-1.5 rounded-lg font-medium text-sm flex items-center gap-1.5 transition-colors ${
                      showComments
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    {task.comments.length > 0 && (
                      <span className="font-semibold">{task.comments.length}</span>
                    )}
                    Comments
                  </button>

                  {!task.completed && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4 text-gray-600" />
                    </button>
                  )}

                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>

            {showComments && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <CommentSection task={task} groupId={groupId} />
              </div>
            )}
          </>
        )}
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteTask}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This will also delete all comments.`}
      />
    </div>
  );
};

export default TaskCard;
