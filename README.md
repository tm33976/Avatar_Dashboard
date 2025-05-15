# AI Avatar Dashboard

A modern, responsive dashboard for managing AI-generated avatars with full CRUD functionality and data persistence.



## Features

- **Create, Read, Update, Delete (CRUD)** operations for avatar management
- **Responsive Design** that works on mobile, tablet, and desktop
- **Data Persistence** using localStorage
- **Modern UI** with animations and hover effects
- **Form Validation** for creating and editing avatars
- **Search Functionality** to filter avatars by name or email
- **Toast Notifications** for user feedback
- **Confirmation Dialogs** for destructive actions
- **Loading States** with skeleton UI
- **Error Handling** for image loading and data operations

## Tech Stack

- **Next.js 14** - React framework with App Router
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable UI components
- **date-fns** - Date formatting
- **localStorage** - Client-side data persistence

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:

\`\`\`bash
git clone https://github.com/tm33976/Avatar_Dashboard.git
cd ai-avatar-dashboard
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install --legacy-peer-deps

\`\`\`

3. Start the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

\`\`\`
ai-avatar-dashboard/
├── app/                  # Next.js App Router
│   ├── page.jsx          # Home page
│   └── layout.jsx        # Root layout
├── components/           # React components
│   ├── avatar-card.jsx   # Individual avatar card
│   ├── avatar-dashboard.jsx # Dashboard component
│   ├── avatar-modal.jsx  # Modal for creating/editing avatars
│   ├── create-avatar-button.jsx # Floating action button
│   ├── error-boundary.jsx # Error handling
│   ├── loading-avatars.jsx # Loading skeleton
│   └── ui/               # UI components from shadcn/ui
├── contexts/             # React contexts
│   └── avatar-context.jsx # Avatar state management
├── lib/                  # Utility functions
│   └── utils.js          # Helper functions
└── public/               # Static assets
\`\`\`

## Usage

### Creating an Avatar

1. Click the "+" button in the bottom right corner
2. Fill in the avatar details (name, email, image URL)
3. Click "Create Avatar"

### Editing an Avatar

1. Click the "Edit" button on an avatar card
2. Modify the avatar details
3. Click "Save Changes"

### Deleting an Avatar

1. Click the trash icon on an avatar card
2. Confirm deletion in the dialog

### Searching Avatars

Use the search box at the top of the dashboard to filter avatars by name or email.

## Customization

### Styling

The application uses Tailwind CSS for styling. You can customize the appearance by modifying the `tailwind.config.js` file.

### Adding New Features

The codebase is designed to be extensible. Some ideas for additional features:

- User authentication
- Cloud storage for avatars
- Categories or tags for organizing avatars
- Drag and drop for avatar reordering
- Image upload instead of using URLs

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)


## Author 
Tushar Mishra

Email : tm3390782@gmail.com
#
