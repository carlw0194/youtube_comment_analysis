# YouTube Comment Analysis SaaS - User Interface Design Document (UIDD)

## 1. Exact Layout Structure

```
|=============================================================================|
|  [Logo]                           YouTube Comment Analyzer                  |
|=============================================================================|
| URL: [ Paste YouTube Video URL here                          ] [Analyze] 🔍 |
|-----------------------------------------------------------------------------|
| Filters: [Date Range ▾]    [Sentiment ▾]    [Keywords 🔎                ]   |
|=============================================================================|
|                           Dashboard Overview                                |
|-----------------------------------------------------------------------------|
| [Sentiment Gauge]      | [Total Comments]      | [Top 3 Trending Topics]    |
| Positive: 56% 🔵       | Comments: 345         | 1. Audio 🔊                |
| Negative: 24% 🔴       |                       | 2. Editing 🎬              |
| Neutral:  20% ⚪️       |                       | 3. Humor 😂                |
|=============================================================================|
|                        Detailed Analytics Panel                             |
|-----------------------------------------------------------------------------|
| Sentiment Over Time 📈                         Topic Clusters 🌐            |
| [Line Chart Placeholder]                       [Bubble Chart Placeholder]   |
|                                                                             |
|-----------------------------------------------------------------------------|
|                             Comments Table 📝                               |
|-----------------------------------------------------------------------------|
| [🔍 Search comments ]     Sort by: [ Date ▾ ] | Filter: [ All sentiments ▾ ]|
|-----------------------------------------------------------------------------|
| #  | Author      | Sentiment   | Comment Text              | Date Posted    |
|----|-------------|-------------|---------------------------|----------------|
| 1  | John Doe    | 🔵 Positive | Loved your editing skills!| 2025-03-05     |
| 2  | Jane Smith  | 🔴 Negative | Audio quality could improve|2025-03-04     |
| .. | ...         | ...         | ...                       | ...            |
|=============================================================================|
|                         AI Recommendations 🤖                               |
|-----------------------------------------------------------------------------|
| 🔸 Many users request improved audio quality – consider upgrading mic. 🎙️   |
| 🔸 Positive response to humor segments – include more comedic elements. 😂  |
| 🔸 Frequent mentions of editing style – maintain consistent editing quality.|
|=============================================================================|
| Footer: [ Support ] [ Docs ] [ Terms ]                       [Report Issue] |
|=============================================================================|

## 2. Component Details

### Header Section
- **Top Bar**: Contains logo on left, application title centered
- **URL Input**: Prominent central URL input field with placeholder text "Paste YouTube Video URL here" and an "Analyze" button with search icon
- **Filter Bar**: Secondary row with filter options:
  - Date Range dropdown
  - Sentiment dropdown
  - Keywords search field

### Dashboard Overview Panel
- **Three-column Layout**:
  1. **Sentiment Gauge**: Visual representation of sentiment distribution
     - Positive percentage with blue indicator
     - Negative percentage with red indicator
     - Neutral percentage with white/gray indicator
  2. **Total Comments**: Simple counter showing total analyzed comments
  3. **Top Trending Topics**: Numbered list of top 3 topics with relevant emoji icons

### Detailed Analytics Panel
- **Two-column Layout**:
  1. **Sentiment Over Time**: Line chart showing sentiment trends over time with chart title and graph icon
  2. **Topic Clusters**: Bubble chart or word cloud visualization with title and globe icon

### Comments Table
- **Search and Filter Row**:
  - Search comments field with magnifying glass icon
  - Sort by dropdown (defaulted to Date)
  - Filter dropdown for sentiment selection
- **Table Structure**:
  - Column headers: #, Author, Sentiment, Comment Text, Date Posted
  - Sentiment indicators using colored dots (blue for positive, red for negative)
  - Pagination (implied)

### AI Recommendations Panel
- **Bulleted List Format**:
  - Each recommendation prefixed with orange diamond bullet point (🔸)
  - Recommendations include emoji icons for visual emphasis
  - Clear, actionable insights based on comment analysis

### Footer
- **Simple Bar Layout**:
  - Left-aligned links: Support, Docs, Terms
  - Right-aligned "Report Issue" button

## 3. Visual Style

### Colors
- **Primary Action Color**: Blue (#0066FF) for buttons and highlights
- **Sentiment Indicators**:
  - Positive: Blue (🔵)
  - Negative: Red (🔴)
  - Neutral: White/Gray (⚪️)
- **Borders and Dividers**: Light gray lines for section separation
- **Background**: White for main content areas

### Typography
- **Headings**: Bold, centered for section titles
- **Content**: Regular weight for data and text
- **Table Text**: Compact, legible font for tabular data

### Icons and Visual Elements
- **Emoji Icons**: Used strategically to enhance understanding:
  - 🔍 for search functions
  - 📈 for charts and trends
  - 🌐 for topic clusters
  - 📝 for comments section
  - 🤖 for AI recommendations
  - Topic-specific emojis (🔊, 🎬, 😂, etc.)

## 4. Interaction Guidelines

### User Input
- **URL Submission**: Single-field entry with clear call-to-action button
- **Filtering**: Dropdown selectors for quick refinement of data
- **Search**: Dedicated search field for comments with real-time filtering

### Data Visualization
- **Charts**: Interactive elements that respond to hover/click
- **Table**: Sortable columns, filterable content
- **Recommendations**: Clearly separated, scannable insights

## 5. Responsive Considerations
- **Layout Adjustments**:
  - Two-column sections collapse to single column on smaller screens
  - Table becomes scrollable horizontally on mobile
  - Filter options collapse into dropdown menu on mobile

## 6. Accessibility Features
- **Color Contrast**: Ensure all text meets WCAG AA standards
- **Screen Reader Support**: Proper labels for all interactive elements
- **Keyboard Navigation**: Full support for tab navigation through interface

## 7. Implementation Notes
- **Border Structure**: Clear borders and dividers to separate functional areas
- **Consistent Spacing**: Equal padding within sections
- **Alignment**: Proper alignment of elements within their containers
- **Table Layout**: Fixed-width columns with text wrapping for comment content
