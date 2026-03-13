# 🏥 Patient Directory Application

A modern, full-stack patient directory application built with **Next.js 14**, **TypeScript**, and **TailwindCSS**. This application provides an intuitive interface for managing patient records with both table and card views, advanced filtering, and real-time search capabilities.

![Patient Directory Demo]([public/demo-screenshot.png](https://github.com/Aqib1239/patient-directory.git))

---

# 🚀 Live Demo

[View Live Application](https://patient-directory-ochre.vercel.app)

---

# 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Features in Detail](#features-in-detail)
- [Performance Optimizations](#performance-optimizations)
- [Responsive Design](#responsive-design)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

# ✨ Features

## Core Functionality

- **Dual View Modes** – Switch between **Table View** and **Card View**
- **Advanced Filtering** – Filter patients by **medical condition and age**
- **Real-time Search** – Debounced search for name, ID, and email
- **Multi-level Sorting** – Sort by name, age, and ID
- **Pagination** – Handle **1000+ patient records** with 20 per page

## UI/UX Highlights

- **Color-coded Medical Issues**
- **Active Filter Tags**
- **Responsive Layout**
- **Loading Skeletons & Spinners**
- **Error Handling & Boundaries**

## Technical Features

- Full **TypeScript type safety**
- **Local API using Next.js Route Handlers**
- **Optimized images with Next.js Image**
- **Modular and reusable component structure**

---

# 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Icons:** Lucide React
- **API:** Next.js Route Handlers
- **Deployment:** Vercel

---

# 🏁 Getting Started

## Prerequisites

- Node.js **18.17+**
- npm / yarn / pnpm

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Aqib1239/patient-directory.git
cd patient-directory
```

### 2. Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

or

```bash
pnpm install
```

---

### 3. Add Patient Data

Place your `data.json` file inside the `public` folder.

```bash
cp /path/to/data.json public/
```

---

### 4. Run Development Server

```bash
npm run dev
```

or

```bash
yarn dev
```

or

```bash
pnpm dev
```

---

### 5. Open in Browser

```
http://localhost:3000
```

---

# 📁 Project Structure

```
patient-directory/
│
├── app/
│   ├── api/
│   │   └── patients/
│   │       └── route.ts
│
│   ├── components/
│   │   ├── CardView.tsx
│   │   ├── TableView.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Filters.tsx
│   │   ├── Pagination.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ClientOnly.tsx
│
│   ├── types/
│   │   └── patient.ts
│
│   ├── utils/
│   │   └── dataHelpers.ts
│
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── public/
│   ├── data.json
│   └── header_plus.png
│
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

# 🔌 API Endpoints

## GET `/api/patients`

Fetch patient data with support for **pagination, filtering, and sorting**.

---

## Query Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| page | number | Page number | 1 |
| limit | number | Items per page | 20 |
| search | string | Search term | '' |
| medicalIssue | string[] | Filter medical conditions | [] |
| minAge | number | Minimum age | undefined |
| maxAge | number | Maximum age | undefined |
| sortBy | string | Sort field | patient_name |
| sortOrder | string | Sort direction | asc |

---

## Response

```ts
{
  patients: Patient[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

---

# 🎯 Features in Detail

## View Toggle

- **Table View** – Detailed data layout
- **Card View** – Modern responsive card layout

---

## Search Functionality

- **300ms debounced search**
- Searches by **name, ID, and email**
- Prevents unnecessary API calls

---

## Filter System

- Medical condition filters
- Age range filtering
- Active filter tags
- Clear all filters option

---

## Sorting Options

- Name (A → Z / Z → A)
- Age (Low → High / High → Low)
- ID (Ascending / Descending)

---

## Medical Issue Color Coding

```ts
const medicalIssueColors = {
  fever: { bg: "bg-[#DC262666]", border: "border-[#ff0000]" },
  headache: { bg: "bg-[#F57C0B66]", border: "border-[#ea7100]" },
  "sore throat": { bg: "bg-[#EAB30866]", border: "border-[#ba8d00]" },
  "sprained ankle": { bg: "bg-[#10B98166]", border: "border-[#03A972]" }
};
```

---

# ⚡ Performance Optimizations

1. Debounced search requests
2. Optimized images with Next.js Image
3. Pagination limiting API payload
4. Memoization to prevent unnecessary re-renders
5. ClientOnly wrapper for hydration safety
6. Lazy image loading

---

# 📱 Responsive Design

| Breakpoint | Card Columns | Table View | Font Size |
|-------------|--------------|------------|-----------|
| Mobile (<640px) | 1 | Horizontal Scroll | Small |
| Tablet (640px-1024px) | 2 | Normal | Medium |
| Desktop (>1024px) | 4 | Full Width | Large |

---

# 🚢 Deployment

## Deploy to Vercel

### Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Deploy

1. Go to **https://vercel.com**
2. Click **Add New → Project**
3. Import your repository
4. Click **Deploy**

---

## Manual Build

```bash
npm run build
npm start
```

---

# 🤝 Contributing

Contributions are welcome.

Steps:

1. Fork the repo
2. Create a feature branch

```bash
git checkout -b feature/AmazingFeature
```

3. Commit changes

```bash
git commit -m "Add AmazingFeature"
```

4. Push to GitHub

```bash
git push origin feature/AmazingFeature
```

5. Create a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 🙏 Acknowledgments

- Next.js Team
- TailwindCSS
- Lucide Icons
- All contributors
