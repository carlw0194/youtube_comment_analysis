# YouTube Comment Analysis SaaS - User Interface Design Document (UIDD)

## 1. Layout Structure  
- **Header:**  
  - Input field for the YouTube video URL and an “Analyze” button.  
  - Quick filters (date range, sentiment type, keyword search) and a status indicator for API connectivity.
- **Left Sidebar:**  
  - Navigation for video history, saved filters, and profile/logout options.  
  - Option for toggling between light and dark mode.
- **Main Dashboard:**  
  - Multiple panels including sentiment analysis charts, time-series graphs, topic clustering visuals, a detailed comments table, and an AI recommendations panel.
- **Footer:**  
  - Minimal with links to support, documentation, and a “Report Issue” button for user feedback.

## 2. Core Components  
- **Data Input Panel:** For URL submission and quick filter options.  
- **Visualization Panels:**  
  - Pie/Gauge charts for overall sentiment.  
  - Line graphs for time-series sentiment analysis.  
  - Word clouds and heatmaps for topic clustering.  
  - A sortable, filterable comments table.
- **Actionable Insights Panel:** Displays key takeaways and recommendations.

## 3. Interaction Patterns  
- **Hover & Click States:**  
  - Tooltips and expanded details on chart hover.  
  - Click-to-expand panels for deep dives.
- **Drill-Down Filters:**  
  - Clicking a chart segment updates related tables and displays more granular data.
- **Feedback Loop:**  
  - A “Report Issue” button allows users to quickly provide feedback.

## 4. Visual Design Elements & Color Scheme  
- **Primary Colors:**  
  - Blue (#007BFF) for primary actions.  
  - White (#FFFFFF) and Gray (#F8F9FA) for a clean look.  
  - Green/Red indicators for positive/negative sentiment.
- **Dark Mode:**  
  - Dark backgrounds (#1E1E1E) with light text (#FFFFFF).  
  - Adapted chart colors for high contrast.
- **Accessibility:**  
  - Follow WCAG 2.1 guidelines with minimum contrast ratios (4.5:1 for text, 3:1 for large text).  
  - ARIA roles on all interactive elements and clear keyboard navigation.

## 5. Mobile, Web App, Desktop Considerations  
- **Responsive Design:**  
  - Mobile-first approach with defined breakpoints (e.g., mobile < 768px, tablet 768–1024px, desktop > 1024px).  
  - Collapsible sidebar and stackable panels for smaller screens.
- **Performance:**  
  - Asynchronous data loading to ensure smooth performance on all devices.

## 6. Typography  
- **Primary Fonts:** Inter or Roboto (sans-serif).  
- **Hierarchy:**  
  - Headings: 18px–24px, Bold.  
  - Body Text: 14px–16px, Regular.  
  - Tooltips/Labels: 12px, Medium weight.

## 7. Accessibility  
- **Standards:**  
  - WCAG 2.1 compliant; ensure proper ARIA labeling, keyboard navigability, and screen reader support.  
- **User Customization:**  
  - Options to adjust text size and contrast.  
- **Feedback Mechanism:**  
  - Easy-to-access “Report Issue” button for user-driven improvements.
