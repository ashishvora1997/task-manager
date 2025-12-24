import { useState } from 'react';
import { Plus, ListChecks } from 'lucide-react';
import { TodoProvider, useTodo } from './TodoContext';
import GroupCard from './components/GroupCard';

const TodoApp = () => {
  const { state, dispatch } = useTodo();
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3B82F6');

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      dispatch({
        type: 'ADD_GROUP',
        payload: { name: newGroupName, color: selectedColor },
      });
      setNewGroupName('');
      setSelectedColor('#3B82F6');
      setIsAddingGroup(false);
    }
  };

  const totalTasks = state.groups.reduce((sum, group) => sum + group.tasks.length, 0);
  const completedTasks = state.groups.reduce(
    (sum, group) => sum + group.tasks.filter((task) => task.completed).length,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <ListChecks className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
                <p className="text-gray-600">
                  {totalTasks > 0 ? (
                    <>
                      {completedTasks} of {totalTasks} tasks completed
                    </>
                  ) : (
                    'Create a group to get started'
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAddingGroup(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              New Group
            </button>
          </div>
        </header>

        {isAddingGroup && (
          <div className="mb-6 bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Group</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400"
                placeholder="Enter group name (e.g., Work, Personal)"
                autoFocus
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose a color
                </label>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-lg transition-transform ${
                        selectedColor === color
                          ? 'scale-110 ring-4 ring-offset-2'
                          : 'hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: color,
                        ringColor: color,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAddGroup}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Create Group
                </button>
                <button
                  onClick={() => {
                    setIsAddingGroup(false);
                    setNewGroupName('');
                    setSelectedColor('#3B82F6');
                  }}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {state.groups.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-6 bg-white rounded-2xl shadow-lg mb-4">
              <ListChecks className="w-16 h-16 text-gray-400 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No groups yet</h2>
            <p className="text-gray-600 mb-6">
              Create your first group to start organizing your tasks
            </p>
            <button
              onClick={() => setIsAddingGroup(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              Create Your First Group
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {state.groups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}

export default App;
