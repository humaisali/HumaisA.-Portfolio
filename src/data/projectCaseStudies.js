// EDIT HERE: Replace each project's sample case study with your real information.
// Set isPlaceholder to false only after replacing the sample content and metrics.
// Existing screenshots, project descriptions, and links remain in index.js.
export const projectCaseStudies = {
  "ai-career-coach": {
    isPlaceholder: true,
    role: "Full-stack developer & product designer",
    duration: "6 weeks",
    team: "Solo project",
    audience: "Students and early-career developers",
    problem: "Developers often spread their work across a resume, GitHub profile, and personal website. Reviewing these separately makes it difficult to spot an inconsistent story or decide which improvement deserves attention first.",
    goals: ["Bring the three sources into one review flow.", "Turn broad career advice into specific, actionable next steps.", "Make the analysis easy to scan and revisit."],
    solution: "The proposed experience starts with a guided intake for profile links and a resume. The application normalizes the supplied information, asks the AI to review it against a consistent structure, and presents the response as strengths, gaps, and recommended actions.",
    journey: ["Add a GitHub profile and portfolio URL.", "Upload a resume and choose the target role.", "Review the generated strengths and improvement areas.", "Use a prioritized checklist to update the profile."],
    architecture: [
      { title: "Profile intake", detail: "React forms collect links, a target role, and a resume file." },
      { title: "Document processing", detail: "A Node.js service validates input and extracts readable PDF content." },
      { title: "Career analysis", detail: "Gemini receives normalized context and a structured review prompt." },
      { title: "Review dashboard", detail: "The interface groups feedback into clear sections and next steps." },
    ],
    decisions: [
      { title: "Structured output over a wall of text", detail: "Separate strengths, gaps, and actions so readers can find the next useful step quickly." },
      { title: "One review context", detail: "Combine the supplied sources before analysis to reduce repeated or contradictory advice." },
    ],
    challenges: [
      { title: "Messy resume extraction", problem: "Multi-column resumes can produce text in an unexpected order.", solution: "Normalize spacing, show an extraction preview, and let the user retry with a different file." },
      { title: "Vague AI feedback", problem: "A general prompt can produce advice that is hard to act on.", solution: "Request evidence from the supplied material and group recommendations by priority." },
    ],
    metrics: [{ value: "35%", label: "Less review time", detail: "Illustrative comparison with a manual review." }, { value: "12", label: "Pilot participants", detail: "Sample usability-test group." }, { value: "4.6/5", label: "Clarity rating", detail: "Example post-session feedback score." }],
    lessons: "The most useful output is not the longest review. In this sample case study, prioritizing a small set of concrete actions made the experience easier to understand than presenting every possible issue at once.",
    roadmap: ["Save and compare successive profile reviews.", "Export an actionable improvement plan.", "Add role-specific review criteria."],
  },
  "ai-study-assistant": {
    isPlaceholder: true,
    role: "Full-stack developer & UX designer",
    duration: "5 weeks",
    team: "Solo project",
    audience: "University students and self-directed learners",
    problem: "Students can have plenty of lecture material but no clear way to turn it into a revision session. Reading a long document repeatedly takes time, and a summary alone does not help them check what they have understood.",
    goals: ["Make document upload simple and predictable.", "Keep explanations tied to the supplied learning material.", "Move naturally from reading to active practice."],
    solution: "A document-first workspace brings summaries, explanations, and quizzes into the same study flow. The proposed interface shows clear upload and processing states, then lets learners choose how they want to work with their material.",
    journey: ["Upload a supported study document.", "Choose a summary or a detailed explanation.", "Generate a quiz from the document.", "Review answers and revisit difficult topics."],
    architecture: [
      { title: "Study workspace", detail: "React handles uploads, mode selection, and quiz interactions." },
      { title: "File extraction", detail: "The server validates the file and extracts its text." },
      { title: "Learning generation", detail: "Gemini receives the document context and the selected learning task." },
      { title: "Practice & review", detail: "Generated questions and explanations return to the study interface." },
    ],
    decisions: [
      { title: "Document-first navigation", detail: "Keep the learner's source material central while switching between study modes." },
      { title: "Separate reading from practice", detail: "Use different presentation patterns for summaries and interactive quiz questions." },
    ],
    challenges: [
      { title: "Different document formats", problem: "PDFs, slides, and plain text do not share a single extraction format.", solution: "Convert supported files into a consistent text representation before generation." },
      { title: "Long processing waits", problem: "Large uploads can leave students unsure whether the app is still working.", solution: "Use explicit upload, extraction, and generation states with actionable failure messages." },
    ],
    metrics: [{ value: "40%", label: "Faster revision setup", detail: "Illustrative preparation-time improvement." }, { value: "18", label: "Study sessions", detail: "Sample pilot evaluation sessions." }, { value: "87%", label: "Task completion", detail: "Example upload-to-quiz completion rate." }],
    lessons: "This example emphasizes that a learning tool needs more than generated text. Clear state changes, useful question feedback, and a quick path back to the material make the experience feel like a study workflow.",
    roadmap: ["Track quiz progress across sessions.", "Add spaced-repetition flashcards.", "Support a searchable library of study documents."],
  },
  postcraft: {
    isPlaceholder: true,
    role: "Full-stack developer & product designer",
    duration: "4 weeks",
    team: "Solo project",
    audience: "Developers sharing projects on LinkedIn",
    problem: "Turning a technical build into a clear public update can be surprisingly difficult. Developers may know their implementation well but struggle to choose a hook, explain the value, and keep a post concise.",
    goals: ["Turn a short brief into a useful first draft.", "Provide several opening angles without repeating the same post.", "Keep the final text easy to review and personalize."],
    solution: "The sample product flow uses a focused project brief, optional tone preferences, and separate output areas for the post, hooks, and hashtags. The developer stays in control of the final wording before sharing anything.",
    journey: ["Describe the project and its main value.", "Choose the intended tone and audience.", "Generate a post with alternative hooks.", "Edit the draft and copy the final text."],
    architecture: [
      { title: "Project brief", detail: "A React form collects the context and writing preferences." },
      { title: "Generation endpoint", detail: "Express validates and organizes the brief into a prompt." },
      { title: "Writing engine", detail: "Gemini creates the draft, hook options, and hashtags." },
      { title: "Draft editor", detail: "The interface separates each output for review and editing." },
    ],
    decisions: [
      { title: "Editable drafts", detail: "Treat generated copy as a starting point and make personal revisions easy." },
      { title: "Separate hook variations", detail: "Let users compare opening lines without losing the rest of their draft." },
    ],
    challenges: [
      { title: "Generic-sounding content", problem: "A short input can produce a post that could describe almost any project.", solution: "Ask for the concrete problem, technical choices, and main learning in the brief." },
      { title: "Inconsistent output structure", problem: "Posts, hooks, and hashtags can arrive mixed together.", solution: "Use a defined response structure and validate it before rendering the result." },
    ],
    metrics: [{ value: "3×", label: "Faster first draft", detail: "Illustrative comparison with writing from scratch." }, { value: "24", label: "Drafts reviewed", detail: "Sample review set for the prototype." }, { value: "92%", label: "Successful generation", detail: "Example completion rate in a test run." }],
    lessons: "A good drafting tool should help someone sound more like themselves. This sample case study prioritizes specific inputs and easy editing over a large number of automatic writing controls.",
    roadmap: ["Save reusable voice preferences.", "Add a draft history and revision comparison.", "Offer post templates for launches and learning updates."],
  },
  codesage: {
    isPlaceholder: true,
    role: "Full-stack developer",
    duration: "5 weeks",
    team: "Solo project",
    audience: "Developers learning and reviewing code",
    problem: "An unfamiliar code snippet can be difficult to understand, especially when explanations, possible bugs, and optimization advice are scattered across different tools. Newer developers also need help distinguishing a serious issue from a minor suggestion.",
    goals: ["Explain code in a readable sequence.", "Make potential bugs easy to identify and prioritize.", "Keep optimization suggestions separate from correctness issues."],
    solution: "A code-input workspace sends a snippet to an analysis service and organizes the response into explanation, bugs, and improvements. Severity labels and clear headings give the reader a manageable route through the findings.",
    journey: ["Paste a code snippet into the editor.", "Choose the kind of analysis needed.", "Read the explanation and prioritized findings.", "Revise the code and run another review."],
    architecture: [
      { title: "Code workspace", detail: "React captures the snippet and displays analysis modes." },
      { title: "Analysis service", detail: "Express checks the input and prepares the review request." },
      { title: "AI review", detail: "Gemini returns explanations and suggested findings." },
      { title: "Results panel", detail: "The UI groups results by purpose and severity." },
    ],
    decisions: [
      { title: "Separate analysis categories", detail: "Avoid mixing an explanation with bug reports and performance suggestions." },
      { title: "Keep the original snippet visible", detail: "Make it easy to compare feedback against the code under review." },
    ],
    challenges: [
      { title: "Overconfident findings", problem: "AI analysis can flag a problem that depends on missing context.", solution: "Present suggestions as review findings and explain the assumptions behind them." },
      { title: "Dense result screens", problem: "A long answer can overwhelm the reader.", solution: "Use short sections, severity labels, and progressive disclosure for supporting detail." },
    ],
    metrics: [{ value: "30%", label: "Faster code review", detail: "Illustrative time improvement on a sample task." }, { value: "50", label: "Snippets evaluated", detail: "Example prototype evaluation set." }, { value: "4.5/5", label: "Explanation rating", detail: "Sample clarity score from test participants." }],
    lessons: "The presentation of a finding matters as much as the finding itself. This example favors explicit reasoning and a clear connection to the input over a long, undifferentiated AI response.",
    roadmap: ["Add side-by-side revision comparisons.", "Support saved analysis sessions.", "Expand language-specific analysis options."],
  },
  "github-devfinder": {
    isPlaceholder: true,
    role: "Frontend developer & UI designer",
    duration: "3 weeks",
    team: "Solo project",
    audience: "Developers exploring GitHub profiles",
    problem: "Understanding a developer's public work often means opening several GitHub pages and interpreting scattered numbers. A profile overview is more useful when repository information and activity can be compared at a glance.",
    goals: ["Make profile lookup fast and straightforward.", "Present language and repository data through readable charts.", "Handle missing users and unavailable data gracefully."],
    solution: "A username search opens a dashboard that combines profile details, language charts, stars, and activity. The sample interface keeps summary information at the top, with deeper visualizations below for exploration.",
    journey: ["Enter a GitHub username.", "Review the profile summary and repository statistics.", "Explore language charts and contribution activity.", "Follow a repository link for more context."],
    architecture: [
      { title: "Username search", detail: "A React search field validates and submits the username." },
      { title: "GitHub data", detail: "A data layer requests public profile and repository information." },
      { title: "Data preparation", detail: "Results are grouped into totals and chart-friendly datasets." },
      { title: "Analytics dashboard", detail: "Recharts and summary cards present the profile visually." },
    ],
    decisions: [
      { title: "Readable charts over decoration", detail: "Use clear labels and consistent units so the data is understandable at a glance." },
      { title: "Honest empty states", detail: "Distinguish a profile with no public activity from an unavailable API response." },
    ],
    challenges: [
      { title: "API request limits", problem: "Repeated searches can run into external service limits.", solution: "Cache recent responses and explain when a request needs to be retried later." },
      { title: "Uneven profile data", problem: "Some profiles have very little public repository information.", solution: "Render useful partial results and avoid implying that missing data is zero activity." },
    ],
    metrics: [{ value: "1.2s", label: "Cached lookup", detail: "Illustrative response time for a repeat search." }, { value: "20", label: "Profiles tested", detail: "Sample set of different public profiles." }, { value: "90%", label: "Task completion", detail: "Example successful profile-lookup rate." }],
    lessons: "A dashboard should communicate the limits of its data as clearly as its charts. This sample case study focuses on empty states, loading feedback, and transparent handling of external API failures.",
    roadmap: ["Compare two profiles side by side.", "Add repository sorting and filtering.", "Offer exportable profile summaries."],
  },
  "fida-hussain-portfolio": {
    isPlaceholder: true,
    role: "Frontend developer & web designer",
    duration: "3 weeks",
    team: "Client collaboration",
    audience: "Recruiters and prospective clients",
    problem: "A professional's work can be difficult to assess when their background, projects, and contact information are spread across different places. A personal website needs to make that story clear without overwhelming the visitor.",
    goals: ["Communicate a clear professional identity.", "Make work samples easy to browse on any screen.", "Provide an obvious next step for interested visitors."],
    solution: "The sample design organizes the client's story into a focused introduction, background, work examples, and contact area. Consistent typography, responsive spacing, and restrained animation give each section a clear purpose.",
    journey: ["Meet the professional through a concise introduction.", "Explore their background and selected work.", "Open relevant external project links.", "Use the contact options to start a conversation."],
    architecture: [
      { title: "Content model", detail: "Profile and project content are organized into reusable data structures." },
      { title: "React components", detail: "Sections share consistent cards, buttons, and typography." },
      { title: "Responsive styling", detail: "Tailwind layouts adapt the presentation to different screen sizes." },
      { title: "Visitor interaction", detail: "Navigation, animation, and contact affordances complete the experience." },
    ],
    decisions: [
      { title: "Content before effects", detail: "Make the professional story readable before adding visual motion." },
      { title: "Reusable sections", detail: "Keep content and presentation separate so future updates stay manageable." },
    ],
    challenges: [
      { title: "Uneven content lengths", problem: "Long titles and descriptions can break a layout that only works with short copy.", solution: "Test components with varied content and let layouts expand naturally." },
      { title: "Animation on small screens", problem: "Desktop interactions can become distracting or awkward on mobile.", solution: "Simplify motion and preserve clear, comfortably sized touch targets." },
    ],
    metrics: [{ value: "95", label: "Performance score", detail: "Illustrative Lighthouse score, not a measured result." }, { value: "3", label: "Screen sizes tested", detail: "Sample mobile, tablet, and desktop review." }, { value: "100%", label: "Core flows reviewed", detail: "Example completion of a navigation checklist." }],
    lessons: "This example shows how a small set of consistent components can make a portfolio easier to maintain. The strongest design decisions are the ones that make the client's work and contact information easier to find.",
    roadmap: ["Add richer project case studies.", "Introduce a simple content editing workflow.", "Improve image delivery and page metadata."],
  },
};

// Shared sample sections. Add process/gallery to an individual entry above to override them.
export const sampleDevelopmentProcess = [
  { phase: "01", title: "Discovery & scope", description: "Define the target audience, map the core user journey, and choose a small set of outcomes for the first version.", deliverable: "Problem statement and feature priorities" },
  { phase: "02", title: "Design & prototype", description: "Sketch the main screens, test the content hierarchy, and establish reusable interface patterns before implementation.", deliverable: "Wireframes and interactive prototype" },
  { phase: "03", title: "Build & integrate", description: "Implement the core flow, connect the required services, and add loading, empty, and error states alongside the happy path.", deliverable: "Working application and integrations" },
  { phase: "04", title: "Test & refine", description: "Review the experience on mobile and desktop, check keyboard navigation, and refine the interface using feedback from sample tasks.", deliverable: "Usability review and release checklist" },
];

// Replace src with a path such as /projects/my-project/dashboard.png to show a real image.
export const sampleGallery = [
  { src: "", caption: "Primary workflow", description: "Add a screenshot of the main task or interaction here." },
  { src: "", caption: "Results & mobile experience", description: "Add a results screen, mobile view, or another important product state here." },
];
