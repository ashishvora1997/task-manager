import { useState } from 'react';
import { Pencil, Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { useTodo } from '../TodoContext';
import { Group } from '../types';
import TaskCard from './TaskCard';
import ConfirmDialog from './ConfirmDialog';

interface GroupCardProps {
  group: Group;
}

const GroupCard = ({ group }: GroupCardProps) => {
  const { dispatch } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editName, setEditName] = useState(group.name);
  const [editColor, setEditColor] = useState(group.color);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const handleUpdateGroup = () => {
    if (editName.trim()) {
      dispatch({
        type: 'UPDATE_GROUP',
        payload: { groupId: group.id, name: editName, color: editColor },
      });
      setIsEditing(false);
    }
  };

  const handleDeleteGroup = () => {
    dispatch({ type: 'DELETE_GROUP', payload: { groupId: group.id } });
    setShowDeleteConfirm(false);
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      dispatch({
        type: 'ADD_TASK',
        payload: {
          groupId: group.id,
          title: newTaskTitle,
          description: newTaskDescription,
        },
      });
      setNewTaskTitle('');
      setNewTaskDescription('');
      setIsAddingTask(false);
    }
  };

  const activeTasks = group.tasks.filter((task) => !task.completed);
  const completedTasks = group.tasks.filter((task) => task.completed);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div
        className="p-4"
        style={{
          backgroundColor: group.color,
          background: `linear-gradient(135deg, ${group.color} 0%, ${group.color}dd 100%)`,
        }}
      >
        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border-2 border-white/30 bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-white"
              placeholder="Group name"
              autoFocus
            />
            <div className="flex gap-2">
              {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'].map((color) => (
                <button
                  key={color}
                  onClick={() => setEditColor(color)}
                  className={`w-8 h-8 rounded-full transition-transform ${
                    editColor === color ? 'scale-125 ring-2 ring-white' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleUpdateGroup}
                className="flex-1 px-4 py-2 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditName(group.name);
                  setEditColor(group.color);
                }}
                className="flex-1 px-4 py-2 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-white" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white" />
                )}
              </button>
              <h2 className="text-2xl font-bold text-white">{group.name}</h2>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium text-white">
                {activeTasks.length} active
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Pencil className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="p-4 space-y-4">
          {activeTasks.map((task) => (
            <TaskCard key={task.id} task={task} groupId={group.id} />
          ))}

          {completedTasks.length > 0 && (
            <div className="space-y-4 pt-4 border-t-2 border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Completed ({completedTasks.length})
              </h3>
              {completedTasks.map((task) => (
                <TaskCard key={task.id} task={task} groupId={group.id} />
              ))}
            </div>
          )}

          {isAddingTask ? (
            <div className="bg-gray-50 rounded-lg p-4 space-y-3 border-2 border-gray-200">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Task title"
                autoFocus
              />
              <textarea
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Description (optional)"
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddTask}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Add Task
                </button>
                <button
                  onClick={() => {
                    setIsAddingTask(false);
                    setNewTaskTitle('');
                    setNewTaskDescription('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingTask(true)}
              className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors border-2 border-dashed border-gray-300 hover:border-gray-400"
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          )}
        </div>
      )}

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteGroup}
        title="Delete Group"
        message={`Are you sure you want to delete "${group.name}"? This will also delete all tasks and comments in this group.`}
      />
    </div>
  );
};

export default GroupCard;
