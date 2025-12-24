import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { State, Action, Group, Task, Comment } from './types';

const STORAGE_KEY = 'todo-app-state';

const initialState: State = {
  groups: [],
};

const loadStateFromStorage = (): State => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
  }
  return initialState;
};

const saveStateToStorage = (state: State) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state to localStorage:', error);
  }
};

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload;

    case 'ADD_GROUP':
      return {
        ...state,
        groups: [
          ...state.groups,
          {
            id: generateId(),
            name: action.payload.name,
            color: action.payload.color,
            tasks: [],
          },
        ],
      };

    case 'UPDATE_GROUP':
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.id === action.payload.groupId
            ? { ...group, name: action.payload.name, color: action.payload.color }
            : group
        ),
      };

    case 'DELETE_GROUP':
      return {
        ...state,
        groups: state.groups.filter((group) => group.id !== action.payload.groupId),
      };

    case 'ADD_TASK':
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.id === action.payload.groupId
            ? {
                ...group,
                tasks: [
                  ...group.tasks,
                  {
                    id: generateId(),
                    title: action.payload.title,
                    description: action.payload.description,
                    completed: false,
                    comments: [],
                  },
                ],
              }
            : group
        ),
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.id === action.payload.groupId
            ? {
                ...group,
                tasks: group.tasks.map((task) =>
                  task.id === action.payload.taskId
                    ? {
                        ...task,
                        title: action.payload.title,
                        description: action.payload.description,
                      }
                    : task
                ),
              }
            : group
        ),
      };

    case 'DELETE_TASK':
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.id === action.payload.groupId
            ? {
                ...group,
                tasks: group.tasks.filter((task) => task.id !== action.payload.taskId),
              }
            : group
        ),
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.id === action.payload.groupId
            ? {
                ...group,
                tasks: group.tasks.map((task) =>
                  task.id === action.payload.taskId
                    ? {
                        ...task,
                        completed: !task.completed,
                        completedAt: !task.completed ? new Date().toISOString() : undefined,
                      }
                    : task
                ),
              }
            : group
        ),
      };

    case 'ADD_COMMENT':
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.id === action.payload.groupId
            ? {
                ...group,
                tasks: group.tasks.map((task) =>
                  task.id === action.payload.taskId
                    ? {
                        ...task,
                        comments: [
                          ...task.comments,
                          {
                            id: generateId(),
                            text: action.payload.text,
                            createdAt: new Date().toISOString(),
                          },
                        ],
                      }
                    : task
                ),
              }
            : group
        ),
      };

    case 'UPDATE_COMMENT':
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.id === action.payload.groupId
            ? {
                ...group,
                tasks: group.tasks.map((task) =>
                  task.id === action.payload.taskId
                    ? {
                        ...task,
                        comments: task.comments.map((comment) =>
                          comment.id === action.payload.commentId
                            ? { ...comment, text: action.payload.text }
                            : comment
                        ),
                      }
                    : task
                ),
              }
            : group
        ),
      };

    case 'DELETE_COMMENT':
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.id === action.payload.groupId
            ? {
                ...group,
                tasks: group.tasks.map((task) =>
                  task.id === action.payload.taskId
                    ? {
                        ...task,
                        comments: task.comments.filter(
                          (comment) => comment.id !== action.payload.commentId
                        ),
                      }
                    : task
                ),
              }
            : group
        ),
      };

    default:
      return state;
  }
};

interface TodoContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState, loadStateFromStorage);

  useEffect(() => {
    saveStateToStorage(state);
  }, [state]);

  return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};
