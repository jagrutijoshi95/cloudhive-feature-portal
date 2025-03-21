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


## License

This project is for demonstration purposes only.