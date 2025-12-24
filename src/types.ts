export interface Comment {
  id: string;
  text: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  completedAt?: string;
  comments: Comment[];
}

export interface Group {
  id: string;
  name: string;
  color: string;
  tasks: Task[];
}

export type State = {
  groups: Group[];
};

export type Action =
  | { type: 'ADD_GROUP'; payload: { name: string; color: string } }
  | { type: 'DELETE_GROUP'; payload: { groupId: string } }
  | { type: 'UPDATE_GROUP'; payload: { groupId: string; name: string; color: string } }
  | { type: 'ADD_TASK'; payload: { groupId: string; title: string; description: string } }
  | { type: 'UPDATE_TASK'; payload: { groupId: string; taskId: string; title: string; description: string } }
  | { type: 'DELETE_TASK'; payload: { groupId: string; taskId: string } }
  | { type: 'TOGGLE_TASK'; payload: { groupId: string; taskId: string } }
  | { type: 'ADD_COMMENT'; payload: { groupId: string; taskId: string; text: string } }
  | { type: 'UPDATE_COMMENT'; payload: { groupId: string; taskId: string; commentId: string; text: string } }
  | { type: 'DELETE_COMMENT'; payload: { groupId: string; taskId: string; commentId: string } }
  | { type: 'LOAD_STATE'; payload: State };
