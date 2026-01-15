# KOODAM - Travel Resort Website

A modern, responsive, dark-themed website for discovering and booking unique resorts.

## Features

- 🏠 **Home Page** - Beautiful hero section with animated logo and tagline
- 🏨 **Resorts Listing** - Grid view of all available resorts with image carousels
- 📱 **WhatsApp Integration** - Direct booking via WhatsApp
- 🔐 **Admin Panel** - Protected CRUD operations for managing resorts
- 🎨 **Dark Theme** - Elegant dark design with teal accents
- ✨ **Smooth Animations** - Framer Motion powered transitions
- 📱 **Fully Responsive** - Mobile-first design

## Tech Stack

- React 18
- React Router DOM
- Tailwind CSS
- Framer Motion
- Vite

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
  components/       # Reusable components
    Navbar.jsx
    Footer.jsx
    ResortCard.jsx
    ImageCarousel.jsx
    WhatsAppButton.jsx
    AdminForm.jsx
    Modal.jsx
  pages/           # Page components
    Home.jsx
    Resorts.jsx
    Admin.jsx
  lib/             # Utilities and data
    data.js        # Mock API functions
  App.jsx          # Main app component with routing
  main.jsx         # Entry point
  index.css        # Global styles
```

## Admin Panel

Access the admin panel at `/admin`

**Default Password:** `koodam2024`

You can change this password in `src/pages/Admin.jsx` (line 12).

### Admin Features

- View all resorts
- Add new resorts
- Edit existing resorts
- Delete resorts
- Upload multiple images per resort

## Data Storage

Currently, data is stored in browser localStorage. This means:
- Data persists across sessions
- Data is browser-specific
- For production, replace with a backend API

To migrate to a backend API, update the functions in `src/lib/data.js`.

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:
- Teal accent: `colors.teal`
- Background: `bg-[#0A0A0A]` in components

### Logo

Replace the text logo with an actual image:
1. Add your logo to `src/assets/logo.png`
2. Update `src/pages/Home.jsx` to use the image

### WhatsApp Number

Update the default WhatsApp number in `src/lib/data.js` or set it per resort in the admin panel.

## License

MIT

