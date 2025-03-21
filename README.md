# CloudHive Feature Idea Portal

This project is a proof-of-concept for CloudHive's Feature Idea Portal, an internal web application where employees can propose feature ideas for Integration Hub and help shape its roadmap.

## Features

1. **Idea Submission Form**
   - Submit new feature ideas with summary, description, employee selection, and priority
   - Validation for required fields

2. **Idea List & Voting System**
   - View all submitted ideas in a stacked list, sorted by upvotes
   - Upvote or downvote ideas
   - Delete ideas directly from the list

3. **Idea Exploration**
   - Click on an idea to view its full description and details
   - View the submitting employee and vote counts

4. **Search Functionality**
   - Search for ideas based on keywords in summary or description

5. **Pagination**
   - Display 20 ideas per page with navigation controls

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Form Management**: react-hook-form with zod validation
- **State Management**: TanStack Query for client-side data fetching
- **UI Components**: Custom components wrapping RadixUI primitives
- **Routing**: Next.js App Router

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jagrutijoshi95/cloudhive-feature-portal.git
   cd cloudhive-feature-portal
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Design Constraints & Assumptions

1. **Data Persistence**
   - Ideas and employee data are stored in JSON files in the project
   - No authentication or user sessions are implemented as this is a proof of concept

2. **Server Actions**
   - Server actions are used to handle data operations (create, read, update, delete)
   - These directly modify the JSON files for persistence

3. **Optimistic Updates**
   - TanStack Query is used for client-side state management with optimistic updates for a seamless user experience

4. **Responsive Design**
   - The UI is designed to work on both desktop and mobile devices

## Potential Future Enhancements

1. **User Authentication**
   - Implement user authentication to track who submitted ideas and votes
   - Restrict voting to once per user per idea

2. **Rich Text Editor**
   - Add a rich text editor for idea descriptions to support formatting, images, and links

3. **Integration Categories**
   - Add categories for ideas to improve organization and filtering

4. **Notifications**
   - Implement notifications for when ideas are upvoted, commented on, or status changes

5. **Analytics Dashboard**
   - Create a dashboard showing trends in idea submissions and voting

6. **Comment System**
   - Allow employees to comment on ideas for discussion and refinement

7. **Status Tracking**
   - Add status tracking for ideas (under review, accepted, in development, implemented)

8. **User Profiles**
   - Create user profiles showing ideas submitted and voting activity

## License

This project is for demonstration purposes only.