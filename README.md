# Task Manager - Todo Application

A modern, fully-featured todo application built with React and TypeScript. Organize your daily tasks into groups, track progress, and add notes to manage blockers.

## Features

### Group Management
- Create multiple task groups (e.g., Work, Personal, Daily Goals)
- Customize group colors with 6 vibrant color options
- Edit group names and colors anytime
- Delete groups with confirmation dialog
- Expand/collapse groups for better organization

### Task Management
- Create tasks within groups with title and description
- Mark tasks as complete with visual feedback
- View completion timestamps for finished tasks
- Edit task titles and descriptions
- Delete tasks with confirmation protection
- Clear visual distinction between active and completed tasks
- Completed tasks are grouped separately for cleaner view

### Comments & Blockers
- Add comments to track blockers and notes for each task
- Edit existing comments
- Delete comments with confirmation
- Timestamps on all comments
- Dedicated blockers/notes section with amber styling for clear visibility

### Data Persistence
- Automatic localStorage integration
- All data persists between sessions
- No backend required

### User Experience
- Clean, modern, responsive design
- Smooth animations and transitions
- Intuitive keyboard interactions
- Progress tracking showing completed vs total tasks
- Confirmation dialogs for destructive actions
- Empty states with helpful guidance

## Tech Stack

- **React 18**
- **TypeScript** - Type safety
- **Context API + useReducer** - State management
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Running the Development Server
```bash
npm run dev
```
The application will start at `http://localhost:5173`

### Building for Production
```bash
npm run build
```
The built files will be in the `dist` directory.

### Type Checking
```bash
npm run typecheck
```

### Linting
```bash
npm run lint
```

## How to Use the Application

### Creating a Group
1. Click the "New Group" button in the header
2. Enter a group name (e.g., "Work", "Personal")
3. Choose a color from the available options
4. Click "Create Group"

### Managing Tasks
1. Click "Add Task" within a group
2. Enter task title and optional description
3. Click "Add Task" to save
4. Check the circle icon to mark a task as complete
5. Click the pencil icon to edit a task (not available for completed tasks)
6. Click the trash icon to delete a task

### Adding Comments/Blockers
1. Click the "Comments" button on a task to expand
2. Click "Add Comment" to add a blocker or note
3. Type your comment and click "Add Comment"
4. Edit or delete comments using the icons on each comment

### Editing Groups
1. Click the pencil icon in the group header
2. Update the group name and/or color
3. Click "Save" to apply changes

### Deleting Groups/Tasks
1. Click the trash icon for the item you want to delete
2. Confirm the deletion in the dialog

## Project Structure

```
src/
├── App.tsx                 # Main application component
├── TodoContext.tsx         # Context API and state management
├── types.ts               # TypeScript type definitions
├── index.css              # Global styles
├── main.tsx               # React entry point
└── components/
    ├── GroupCard.tsx      # Group display and management
    ├── TaskCard.tsx       # Task display and management
    ├── CommentSection.tsx # Comments and blockers
    └── ConfirmDialog.tsx  # Reusable confirmation modal
```

## State Management

The application uses React Context API with useReducer for centralized state management. All state changes go through the `todoReducer` which handles:

- Adding, updating, and deleting groups
- Adding, updating, and deleting tasks
- Toggling task completion status
- Managing comments on tasks
- Loading and persisting state from localStorage

### Available Actions

- `ADD_GROUP` - Create a new group
- `UPDATE_GROUP` - Modify group name or color
- `DELETE_GROUP` - Remove a group and all its tasks
- `ADD_TASK` - Create a task in a group
- `UPDATE_TASK` - Modify task title or description
- `DELETE_TASK` - Remove a task
- `TOGGLE_TASK` - Mark task as complete/incomplete
- `ADD_COMMENT` - Add a comment to a task
- `UPDATE_COMMENT` - Edit an existing comment
- `DELETE_COMMENT` - Remove a comment
- `LOAD_STATE` - Restore state from localStorage

## Data Persistence

All data is automatically saved to localStorage whenever the state changes. The app loads persisted data on startup, allowing users to pick up where they left off.

## Design Highlights

- **Color-coded organization** - Groups have distinct colors for quick visual identification
- **Progress tracking** - Header displays overall task completion statistics
- **Visual feedback** - Completed tasks show green checkmarks, "Done" badges, and timestamps
- **Responsive layout** - Works seamlessly on mobile, tablet, and desktop
- **Accessibility** - Proper semantic HTML and keyboard navigation support
- **Animations** - Subtle transitions and hover effects for better interactivity

## Future Enhancements

Potential features for future versions:
- Task priorities and due dates
- Search and filtering
- Task templates
- Dark mode
- Category tags
- Task recurrence
- Drag and drop reordering
