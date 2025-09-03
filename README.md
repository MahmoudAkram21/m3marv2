# معمار للتطوير العقاري (Maar for Real Estate Development)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Overview

**معمار للتطوير العقاري** (Maar for Real Estate Development) is a comprehensive real estate development company website that showcases:

- **Real Estate Projects** - Current and previous projects
- **Company Departments** - Various business divisions
- **News & Events** - Company updates and activities
- **Our Agents** - Sales representatives and contact information
- **Jobs** - Career opportunities
- **Contact Information** - Multiple ways to reach the company

## Features

### 🌐 **Multilingual Support**
- **Arabic (RTL)** - Primary language with full RTL support
- **English (LTR)** - Complete English translation
- Dynamic language switching with proper locale routing
- RTL/LTR layout switching based on selected language

### 🎨 **Modern UI/UX**
- Responsive design for all devices
- Beautiful animations and transitions
- Interactive sliders and carousels
- Modern card-based layouts
- Professional color scheme and typography

### 🏗️ **Real Estate Specific Features**
- Project showcase with detailed information
- Interactive project maps and galleries
- Project phases and progress tracking
- Unit availability and booking system
- Agent profiles with contact information
- Downloadable project brochures

### 📱 **Technical Features**
- Next.js 15 with App Router
- React 19 with TypeScript
- Tailwind CSS 4 for styling
- Swiper.js for carousels
- Internationalization with next-intl
- Responsive image handling
- SEO optimized

## Translation System

The project uses a comprehensive translation system with JSON files located in `src/messages/`:

### Translation Files Structure
```
src/messages/
├── en.json          # English translations
└── ar.json          # Arabic translations
```

### Translation Categories

#### Navigation (`navBar`)
- Home, About, Contact, Jobs, News
- Company Departments, Our Projects
- Language switching options

#### Common Elements (`common`)
- Buttons: View More, Read More, Contact Us
- Actions: Download, Search, Close
- Status: Next, Previous, Play
- Company information and social media

#### Projects (`projects`)
- Project descriptions and features
- Project phases and completion status
- Project units and details
- Filter options and categories

#### Forms (`form`)
- Contact form fields and messages
- Success/error messages
- Form validation text
- Booking and reservation text

#### Jobs (`jobs`)
- Job application form
- Department selection
- CV upload instructions
- Application status messages

#### Contact (`contact`)
- Contact form validation
- Error messages
- Form submission feedback

#### Units (`units`)
- Unit information and details
- Contact methods for units
- Unit numbering system

#### Our Projects (`ourProjects`)
- Project filtering options
- Search functionality text
- City and project type labels

#### About Project (`aboutProject`)
- Project description sections
- Project details and features
- Navigation breadcrumbs

#### Agents (`agents`)
- Agent profiles and information
- Sales statistics and coverage areas
- Contact methods for agents

### How to Use Translations

1. **Import the hook:**
   ```tsx
   import { useTranslations } from "next-intl";
   ```

2. **Initialize in component:**
   ```tsx
   const t = useTranslations("categoryName");
   ```

3. **Use in JSX:**
   ```tsx
   <h1>{t("translationKey")}</h1>
   ```

4. **Access nested translations:**
   ```tsx
   <p>{t("common.viewMore")}</p>
   ```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd app-new
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Language Switching

- **Arabic**: Navigate to `/ar` or use the language switcher
- **English**: Navigate to `/en` or use the language switcher
- **Default**: The app automatically detects user's preferred language

## Project Structure

```
src/
├── app/
│   └── [locale]/          # Localized routes
│       ├── about-project/ # Project details
│       ├── about-us/      # Company information
│       ├── city/          # City-specific projects
│       ├── contactus/     # Contact page
│       ├── department/    # Company departments
│       ├── jobs/          # Career opportunities
│       ├── news/          # News and events
│       ├── our-projects/  # Current projects
│       ├── previous-projects/ # Completed projects
│       ├── testimonials/  # Customer reviews
│       └── unit/          # Individual units
├── components/             # Reusable UI components
├── data/                  # Static data files
├── i18n/                  # Internationalization setup
├── lib/                   # API and utility functions
└── messages/              # Translation files
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The easiest way to deploy this Next.js app is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

### Environment Variables

Create a `.env.local` file with:
```env
NEXT_PUBLIC_API_URL=your_api_url_here
NEXT_PUBLIC_SITE_URL=your_site_url_here
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure translations are updated in both `en.json` and `ar.json`
5. Submit a pull request

## Translation Guidelines

When adding new text to the application:

1. **Always use translation keys** instead of hardcoded text
2. **Add translations to both language files** (`en.json` and `ar.json`)
3. **Use appropriate categories** for organizing translations
4. **Maintain consistency** in translation key naming
5. **Test both languages** to ensure proper display

### Example of Adding New Translations

1. **Add to English file:**
   ```json
   {
     "newSection": {
       "title": "New Section Title",
       "description": "New section description"
     }
   }
   ```

2. **Add to Arabic file:**
   ```json
   {
     "newSection": {
       "title": "عنوان القسم الجديد",
       "description": "وصف القسم الجديد"
     }
   }
   ```

3. **Use in component:**
   ```tsx
   const t = useTranslations("newSection");
   return (
     <div>
       <h1>{t("title")}</h1>
       <p>{t("description")}</p>
     </div>
   );
   ```

## Support

For questions or support regarding:
- **Translations**: Check the `src/messages/` directory
- **Components**: Review the `src/components/` directory
- **Routing**: Check the `src/app/[locale]/` structure
- **API**: Review the `src/lib/` directory

## License

This project is proprietary software owned by Maar Company for Real Estate Development.

---

**Built with ❤️ by the Maar Development Team**
