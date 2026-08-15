const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const DATA_FILE = path.join(__dirname, 'data', 'users.json');

function ensureDataFile() {
  const dir = path.join(__dirname, 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
  }
}

function getUsers() {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function saveUsers(users) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf8');
}

// Helper to construct reliable search links & direct tutorial links
function makeYoutubeUrl(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

function makeGoogleNotesUrl(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(query + ' tutorial notes guide')}`;
}

function makeWikiUrl(topic) {
  return `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(topic)}`;
}

// -------------------------------------------------------------
// UNIVERSAL UNLIMITED KNOWLEDGE GENERATOR
// -------------------------------------------------------------

function generateUnlimitedTopicDetails(topicRaw) {
  const rawClean = (topicRaw || '').trim();
  if (!rawClean) return generateUnlimitedTopicDetails('General Computer Science');

  const normalized = rawClean.toLowerCase();
  const topicName = rawClean.charAt(0).toUpperCase() + rawClean.slice(1);

  // 1. Tech / Coding / DSA
  if (normalized.includes('dsa') || normalized.includes('data structure') || normalized.includes('algorithm')) {
    return {
      name: 'Data Structures & Algorithms (DSA)',
      theme: 'tech',
      summary: 'Data Structures and Algorithms form the foundation of computer science. A Data Structure organizes data efficiently in memory, while an Algorithm is a step-by-step procedure to solve complex computational problems.',
      keyConcepts: [
        'Arrays, Strings & Pointers: Memory layout, sliding window, two-pointer technique.',
        'Linked Lists, Stacks & Queues: Sequential pointer chains, LIFO & FIFO structures.',
        'Trees & Graphs: Binary trees, BST, BFS/DFS traversals, shortest path algorithms.',
        'Sorting & Searching: Binary search, QuickSort, MergeSort, Hash tables.',
        'Dynamic Programming & Recursion: Overlapping subproblems, memoization, backtracking.',
        'Time & Space Complexity: Big O notation analysis O(1), O(N), O(N log N).'
      ],
      sampleCode: `// Binary Search Implementation in JavaScript
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
      youtubeLinks: [
        { title: 'DSA Full Course for Beginners', channel: 'freeCodeCamp.org', url: makeYoutubeUrl('DSA full course for beginners freecodecamp'), duration: '8 Hours', desc: 'Complete breakdown of linear & non-linear data structures.' },
        { title: 'Data Structures & Algorithms Playlist', channel: 'Abdul Bari', url: makeYoutubeUrl('Abdul Bari Algorithms playlist'), duration: 'Series', desc: 'World-famous conceptual lectures on algorithms and dynamic programming.' }
      ],
      notesLinks: [
        { title: 'GeeksforGeeks DSA Study Guide', site: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/data-structures/', desc: 'Detailed articles, code implementations, and problem sets.' },
        { title: 'LeetCode Problem Sheets & Notes', site: 'LeetCode', url: 'https://leetcode.com/explore/', desc: 'Interactive coding challenges and technical interview cards.' },
        { title: 'Visualgo Algorithm Visualizer', site: 'VisuAlgo', url: 'https://visualgo.net/en', desc: 'Visual step-by-step animation of tree & graph algorithms.' }
      ],
      roadmapPhases: [
        { phase: 'Phase 1: Language Fundamentals & Complexity', weeks: 'Week 1-2', topics: ['Pick C++, Java, or Python', 'Big O Notation Analysis', 'Arrays & Strings'] },
        { phase: 'Phase 2: Linear Data Structures', weeks: 'Week 3-4', topics: ['Linked Lists & Operations', 'Stacks & Call Stack Simulation', 'Hash Maps & Sets'] },
        { phase: 'Phase 3: Trees, Graphs & Recursion', weeks: 'Week 5-6', topics: ['Binary Search Trees', 'Graph Traversals (BFS/DFS)', 'Recursion & Backtracking'] },
        { phase: 'Phase 4: Dynamic Programming & Mock Interviews', weeks: 'Week 7-8', topics: ['1D & 2D Dynamic Programming', 'Greedy Strategy', 'Top 100 Interview Questions'] }
      ]
    };
  }

  // 2. Math & Calculus
  if (normalized.includes('math') || normalized.includes('calculus') || normalized.includes('algebra') || normalized.includes('stats')) {
    return {
      name: 'Mathematics, Calculus & Statistics',
      theme: 'math',
      summary: 'Mathematics is the foundational language of modern science, engineering, software engineering, and finance. It trains your mind in precise analytical logic and problem solving.',
      keyConcepts: [
        'Differential & Integral Calculus: Rates of change, derivatives, integrals, limits.',
        'Linear Algebra: Vectors, matrices, eigenvalues, vector spaces, matrix multiplication.',
        'Probability & Statistics: Random variables, distributions (Normal, Poisson), Bayes Theorem.',
        'Discrete Mathematics: Logic, set theory, combinatorics, proof by induction.',
        'Optimization & Vector Calculus: Gradient descent, partial derivatives, surface integrals.'
      ],
      sampleCode: `# Python Math & Matrix Multiplication Example
import numpy as np

v1 = np.array([3, 4, 5])
v2 = np.array([1, 2, 0])
dot_product = np.dot(v1, v2)
print("Dot Product:", dot_product) # 3*1 + 4*2 + 5*0 = 11`,
      youtubeLinks: [
        { title: 'Essence of Calculus', channel: '3Blue1Brown', url: makeYoutubeUrl('3Blue1Brown Essence of Calculus playlist'), duration: 'Visual Series', desc: 'Stunning visual intuition behind derivatives, integrals, and limits.' },
        { title: 'Linear Algebra MIT OpenCourseWare', channel: 'MIT Gilbert Strang', url: makeYoutubeUrl('MIT Gilbert Strang Linear Algebra full course'), duration: 'Full Course', desc: 'World-renowned MIT lectures on vector spaces and matrices.' }
      ],
      notesLinks: [
        { title: 'Khan Academy Math Courses', site: 'Khan Academy', url: 'https://www.khanacademy.org/math', desc: 'Interactive math exercises from basic algebra to multi-variable calculus.' },
        { title: 'Paul\'s Online Math Notes', site: 'Lamar University', url: 'https://tutorial.math.lamar.edu/', desc: 'Complete written math tutorials, cheat sheets, and solved problems.' }
      ],
      roadmapPhases: [
        { phase: 'Phase 1: Foundations of Functions & Limits', weeks: 'Week 1-2', topics: ['Functions & Polynomial Graphs', 'Trigonometric Identities', 'Limits & Continuity'] },
        { phase: 'Phase 2: Derivatives & Integration', weeks: 'Week 3-4', topics: ['Derivatives & Chain Rule', 'Definite & Indefinite Integrals', 'Applications of Integration'] },
        { phase: 'Phase 3: Linear Algebra & Matrices', weeks: 'Week 5-6', topics: ['Matrices & Determinants', 'Systems of Linear Equations', 'Eigenvalues & Eigenvectors'] },
        { phase: 'Phase 4: Probability & Optimization', weeks: 'Week 7-8', topics: ['Probability Distributions', 'Descriptive & Inferential Statistics', 'Gradient Optimization'] }
      ]
    };
  }

  // 3. Physics & Astronomy
  if (normalized.includes('physics') || normalized.includes('quantum') || normalized.includes('astronomy')) {
    return {
      name: 'Physics & Astronomy',
      theme: 'science',
      summary: 'Physics seeks to explain how the universe functions—from subatomic quantum particles to spacetime curvature, energy conservation, optics, and thermodynamics.',
      keyConcepts: [
        'Classical Mechanics: Newton laws of motion, momentum, work, energy, gravitation.',
        'Electromagnetism: Electric fields, magnetic forces, Maxwell equations, circuits.',
        'Thermodynamics: Heat transfer, entropy, kinetic theory, laws of thermodynamics.',
        'Quantum Mechanics: Wave-particle duality, Schrödinger equation, quantum states.',
        'Relativity: Special and general relativity, spacetime curvature, speed of light.'
      ],
      sampleCode: `# Physics Kinetic Energy Calculation
def kinetic_energy(mass_kg, velocity_m_s):
    return 0.5 * mass_kg * (velocity_m_s ** 2)

print("Kinetic Energy (1000kg car @ 20m/s):", kinetic_energy(1000, 20), "Joules")`,
      youtubeLinks: [
        { title: 'Physics Full Course for Beginners', channel: 'freeCodeCamp.org', url: makeYoutubeUrl('Physics full course freecodecamp'), duration: '7 Hours', desc: 'Comprehensive tutorial on motion, forces, work, and energy.' },
        { title: 'Feynman Physics Lectures', channel: 'Physics Lectures', url: makeYoutubeUrl('Richard Feynman physics lectures playlist'), duration: 'Series', desc: 'Classic conceptual physics explanations by Nobel Laureate Richard Feynman.' }
      ],
      notesLinks: [
        { title: 'HyperPhysics Concept Maps', site: 'Georgia State Univ', url: 'http://hyperphysics.phy-astr.gsu.edu/', desc: 'Interactive concept map connecting all branches of physics.' },
        { title: 'Physics Classroom Tutorials', site: 'Physics Classroom', url: 'https://www.physicsclassroom.com/', desc: 'Beginner physics lessons with diagrams and practice questions.' }
      ],
      roadmapPhases: [
        { phase: 'Phase 1: Classical Mechanics', weeks: 'Week 1-2', topics: ['Kinematics & Motion', 'Newtonian Forces', 'Work & Conservation of Energy'] },
        { phase: 'Phase 2: Electricity & Magnetism', weeks: 'Week 3-4', topics: ['Electric Fields & Circuits', 'Magnetic Induction', 'Maxwell Equations'] },
        { phase: 'Phase 3: Thermodynamics & Waves', weeks: 'Week 5-6', topics: ['Laws of Thermodynamics', 'Wave Motion & Sound', 'Light & Optics'] },
        { phase: 'Phase 4: Modern & Quantum Physics', weeks: 'Week 7-8', topics: ['Photoelectric Effect', 'Special Relativity', 'Quantum Atomic Models'] }
      ]
    };
  }

  // 4. Business & Finance
  if (normalized.includes('business') || normalized.includes('finance') || normalized.includes('stock') || normalized.includes('economics')) {
    return {
      name: 'Business, Economics & Investing',
      theme: 'business',
      summary: 'Mastering business principles, economic strategy, financial accounting, stock market investing, and marketing empowers you to build wealth and lead organizations.',
      keyConcepts: [
        'Micro & Macroeconomics: Supply & demand, interest rates, inflation, GDP.',
        'Financial Accounting: Balance sheets, income statements, cash flow statements.',
        'Stock Market & Investing: Index funds, compound growth, risk management, valuation.',
        'Strategy & Entrepreneurship: Business model canvas, value proposition, scaling.',
        'Marketing & Digital Sales: Customer acquisition cost (CAC), LTV, branding.'
      ],
      sampleCode: `// Compound Investment Calculation
function compoundGrowth(principal, rate, years) {
  return (principal * Math.pow((1 + rate), years)).toFixed(2);
}
console.log("Value after 10 yrs ($5000 @ 8%):", "$" + compoundGrowth(5000, 0.08, 10));`,
      youtubeLinks: [
        { title: 'Financial Markets Course', channel: 'Yale University (Robert Shiller)', url: makeYoutubeUrl('Yale Financial Markets Robert Shiller course'), duration: 'Full Course', desc: 'Yale lectures on risk management, stocks, and behavioral finance.' },
        { title: 'Economics Crash Course', channel: 'CrashCourse', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtPNZwUr5_FFgx5rbU4HenFI', duration: 'Series', desc: 'Engaging visual breakdown of macro & microeconomics.' }
      ],
      notesLinks: [
        { title: 'Investopedia Financial Portal', site: 'Investopedia', url: 'https://www.investopedia.com/', desc: 'The world\'s largest repository of financial terms, stock strategies, and economics.' },
        { title: 'Harvard Business Review Insights', site: 'HBR', url: 'https://hbr.org/', desc: 'Articles on leadership, management, and corporate strategy.' }
      ],
      roadmapPhases: [
        { phase: 'Phase 1: Economic Fundamentals', weeks: 'Week 1-2', topics: ['Supply & Demand Mechanics', 'Inflation & Interest Rates', 'Personal Budgeting'] },
        { phase: 'Phase 2: Financial Statements & Accounting', weeks: 'Week 3-4', topics: ['Reading Income Statements', 'Balance Sheet Analysis', 'Cash Flow Metrics'] },
        { phase: 'Phase 3: Stock Market & Asset Classes', weeks: 'Week 5-6', topics: ['Index Funds & Stocks', 'Bond Valuation', 'Portfolio Diversification'] },
        { phase: 'Phase 4: Entrepreneurship & Scaling', weeks: 'Week 7-8', topics: ['Business Model Design', 'Digital Marketing', 'Pitching & Venture Capital'] }
      ]
    };
  }

  // 5. Psychology & Human Behavior
  if (normalized.includes('psychology') || normalized.includes('mind') || normalized.includes('behavior') || normalized.includes('brain')) {
    return {
      name: 'Psychology & Human Behavior',
      theme: 'humanities',
      summary: 'Psychology explores cognitive processes, emotional regulation, memory formation, social influences, and behavioral patterns in human beings.',
      keyConcepts: [
        'Cognitive Psychology: Memory systems, attention, perception, decision biases.',
        'Behavioral Psychology: Operant & classical conditioning, habit loops.',
        'Social Psychology: Group dynamics, empathy, persuasion, social influence.',
        'Developmental Psychology: Cognitive growth stages, emotional intelligence.',
        'Neuroscience Basics: Dopamine, Serotonin, prefrontal cortex, amygdala.'
      ],
      sampleCode: `// Habit Loop Logic Model
const habitLoop = {
  cue: "Notification bell",
  routine: "Focus on task for 25 mins",
  reward: "5 min short break",
  status: "Neural pathway reinforced"
};
console.log(habitLoop);`,
      youtubeLinks: [
        { title: 'Introduction to Psychology', channel: 'Yale University (Paul Bloom)', url: makeYoutubeUrl('Yale Introduction to Psychology Paul Bloom'), duration: 'Full Course', desc: 'Yale lectures on memory, mental health, dreams, and human nature.' },
        { title: 'Psychology Crash Course', channel: 'CrashCourse', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtOPRKzVLY0jJY-uHOH9KVU6', duration: 'Series', desc: 'Fast-paced visual breakdown of psychological theories.' }
      ],
      notesLinks: [
        { title: 'Psychology Today Articles', site: 'Psychology Today', url: 'https://www.psychologytoday.com/', desc: 'Insights on human behavior, mental wellness, and brain science.' },
        { title: 'Simply Psychology Guides', site: 'Simply Psychology', url: 'https://www.simplypsychology.org/', desc: 'Structured study notes for psychology theories and key experiments.' }
      ],
      roadmapPhases: [
        { phase: 'Phase 1: Cognitive & Brain Fundamentals', weeks: 'Week 1-2', topics: ['Neurons & Neurotransmitters', 'Perception & Attention', 'Memory Encoding & Retrieval'] },
        { phase: 'Phase 2: Conditioning & Habit Loops', weeks: 'Week 3-4', topics: ['Classical Conditioning', 'Operant Conditioning', 'Building Positive Habits'] },
        { phase: 'Phase 3: Social & Emotional Dynamics', weeks: 'Week 5-6', topics: ['Social Perception & Biases', 'Persuasion & Communication', 'Emotional Regulation'] },
        { phase: 'Phase 4: Applied Self-Mastery', weeks: 'Week 7-8', topics: ['Cognitive Behavioral Strategies', 'Mindfulness & Focus', 'Interpersonal Relationships'] }
      ]
    };
  }

  // 6. UNLIMITED DYNAMIC CUSTOM TOPIC GENERATOR (ANY SUBJECT IN THE WORLD)
  return {
    name: topicName,
    theme: 'custom',
    summary: `${topicName} is a comprehensive field of study. By systematically learning its foundational principles, historical development, core methods, and practical applications, you will achieve deep expertise in ${topicName}.`,
    keyConcepts: [
      `Foundations of ${topicName}: Primary definitions, terminology, and core principles.`,
      `Core Methodology: Practical tools, analytical frameworks, and workflows in ${topicName}.`,
      `Historical Context & Evolution: Major breakthroughs, key figures, and milestones.`,
      `Applied Problem Solving: Case studies, real-world exercises, and practical projects.`,
      `Advanced Insights: Current research trends, systemic integration, and future developments.`
    ],
    sampleCode: `// Study Outline for ${topicName}
const studyPlan = {
  subject: "${topicName}",
  dailyGoal: "Active recall & practice",
  status: "In Progress"
};
console.log("Mastering ${topicName} step by step!");`,
    youtubeLinks: [
      { title: `${topicName} Full Video Tutorial & Lecture Series`, channel: 'Top Educational Channels', url: makeYoutubeUrl(`${topicName} full course tutorial lecture`), duration: 'Comprehensive', desc: `Hand-picked top educational video courses covering ${topicName} from basics to advanced.` },
      { title: `${topicName} Crash Course & Overview`, channel: 'Edu Explainer', url: makeYoutubeUrl(`${topicName} crash course explained simply`), duration: 'Guide', desc: `Visual breakdowns, conceptual explanations, and real-world examples for ${topicName}.` }
    ],
    notesLinks: [
      { title: `Wikipedia & Reference Article for ${topicName}`, site: 'Wikipedia', url: makeWikiUrl(topicName), desc: `Authoritative reference documentation, history, and structural guides for ${topicName}.` },
      { title: `${topicName} Google Study Notes & Articles`, site: 'Google Web Index', url: makeGoogleNotesUrl(topicName), desc: `Comprehensive study guides, tutorials, and written notes for ${topicName}.` }
    ],
    roadmapPhases: [
      { phase: `Phase 1: ${topicName} Fundamentals & Definitions`, weeks: 'Week 1-2', topics: [`Introduction to core principles of ${topicName}`, `Key terminology and definitions`, `Historical evolution and baseline overview`] },
      { phase: `Phase 2: Deep Dive into Core Techniques`, weeks: 'Week 3-4', topics: [`Primary frameworks & tools in ${topicName}`, `Case studies and analytical practice`, `Daily note-taking & active recall`] },
      { phase: `Phase 3: Applied Exercises & Practical Scenarios`, weeks: 'Week 5-6', topics: [`Solving real-world problems in ${topicName}`, `Interactive exercises & synthesis`, `Building a foundational project`] },
      { phase: `Phase 4: Advanced Mastery & Continuous Exploration`, weeks: 'Week 7-8', topics: [`Complex topics & modern research in ${topicName}`, `Synthesizing knowledge into a summary guide`, `Final evaluation & portfolio completion`] }
    ]
  };
}

function generateTimetable(studyTime, hoursPerDayStr) {
  const hours = parseInt(hoursPerDayStr) || 2;
  
  let startTime = '06:00 AM';
  let endTime = '08:00 AM';
  let timeLabel = 'Early Morning';

  if (studyTime === 'morning') {
    startTime = '09:00 AM';
    endTime = `${9 + hours}:00 AM`;
    timeLabel = 'Morning Slot';
  } else if (studyTime === 'afternoon') {
    startTime = '02:00 PM';
    endTime = `${2 + hours}:00 PM`;
    timeLabel = 'Afternoon Slot';
  } else if (studyTime === 'evening') {
    startTime = '06:00 PM';
    endTime = `${6 + hours}:00 PM`;
    timeLabel = 'Evening Slot';
  } else if (studyTime === 'night') {
    startTime = '10:00 PM';
    endTime = `${(10 + hours) > 12 ? (10 + hours - 12) : (10 + hours)}:00 ${ (10 + hours) >= 12 ? 'AM' : 'PM' }`;
    timeLabel = 'Late Night Slot';
  } else {
    startTime = '06:00 AM';
    endTime = `${6 + hours}:00 AM`;
    timeLabel = 'Early Morning Slot';
  }

  const slots = [
    {
      time: `First 25% of Session (${Math.round(hours * 15)} mins)`,
      activity: '📖 Theory & Conceptual Reading',
      details: 'Read core study notes, watch key lecture segment, and summarize main concepts.'
    },
    {
      time: `Middle 50% of Session (${Math.round(hours * 30)} mins)`,
      activity: '✏️ Active Practice & Problem Solving',
      details: 'Solve exercises, write code/notes, and work through practical scenarios.'
    },
    {
      time: `Final 25% of Session (${Math.round(hours * 15)} mins)`,
      activity: '🔄 Review & Roadmap Update',
      details: 'Check off completed roadmap items, review flashcards, and prepare for tomorrow.'
    }
  ];

  return {
    label: timeLabel,
    totalHours: `${hours} Hour(s) / Day`,
    window: `${startTime} to ${endTime}`,
    slots: slots,
    tips: [
      'Use 25-minute focused study blocks with 5-minute short breaks (Pomodoro Technique).',
      'Keep your phone on Silent/Do-Not-Disturb during your dedicated study window.',
      'Consistency is key: 1-2 hours daily achieves far better results than cramming once a week.'
    ]
  };
}

// -------------------------------------------------------------
// UNIVERSAL MULTITASKER AI REASONING ENGINE
// -------------------------------------------------------------

async function callGeminiMultiTurn(apiKey, messages, contextTopic) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const systemPrompt = `You are the Smart Education Universal AI Tutor.
You know about EVERYTHING in the universe (Science, Technology, History, Literature, Philosophy, Business, Daily Life, Mathematics, Art, Languages, Law, Medicine).
The student is currently learning about "${contextTopic}".
Always answer logically, deeply, accurately, and with a warm human touch. Format in clean markdown with clear headers, bullet points, and code/formulas where helpful.`;

  const contents = [
    { role: 'user', parts: [{ text: systemPrompt }] },
    { role: 'model', parts: [{ text: `Hello! I am your Smart Education AI Tutor. I can answer any question in the world on any subject logically! How can I help you today?` }] }
  ];

  messages.forEach(m => {
    contents.push({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content || m.text }]
    });
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error: ${response.statusText} - ${errText}`);
  }

  const data = await response.json();
  if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
    return data.candidates[0].content.parts[0].text;
  }
  throw new Error('Invalid response structure from Gemini API');
}

function generateUniversalAiResponse(messages, topic) {
  const lastMsg = messages.length > 0 ? messages[messages.length - 1].content || '' : '';
  const q = lastMsg.trim();
  const qLower = q.toLowerCase();
  const topicName = topic || 'General Knowledge';

  if (qLower === 'hi' || qLower === 'hello' || qLower === 'hey' || qLower.includes('who are you')) {
    return `### 👋 Hello! I'm your Smart Education AI Tutor

I'm here to help you learn **anything in the world**! Whether you want to explore **${topicName}**, **coding**, **calculus**, **physics**, **history**, **finance**, or **psychology**, I'll break down complex ideas step by step.

What would you like to ask or explore today? 🌟`;
  }

  if (qLower.includes('python') || qLower.includes('c++') || qLower.includes('java')) {
    let lang = 'Python';
    if (qLower.includes('c++')) lang = 'C++';
    if (qLower.includes('java')) lang = 'Java';

    return `### 💡 ${lang} Example for **${topicName}**

Here is a clean implementation written for efficiency:

\`\`\`${lang.toLowerCase() === 'c++' ? 'cpp' : lang.toLowerCase()}
// Solution for ${topicName} in ${lang}
${lang === 'Python' ? `def solve_task(data):
    """
    Process dataset for ${topicName}
    """
    if not data:
        return []
    return [x for x in data if x > 0]

print("Result:", solve_task([10, 20, 30]))` : `console.log("Processing ${topicName} in ${lang}");`}
\`\`\`

🌟 Breaking down the problem logically makes writing code clear and simple!`;
  }

  if (qLower.includes('interview') || qLower.includes('question') || qLower.includes('practice')) {
    return `### 🎯 5 Practice Questions on **${topicName}**

1. **Foundational Concept:** What is the core definition and purpose of **${topicName}**?
2. **Logical Breakdown:** What is the most important rule or constraint to keep in mind?
3. **Problem Solving:** How would you approach a real-world scenario involving **${topicName}**?
4. **Comparative Analysis:** Compare two key techniques used in **${topicName}**.
5. **Real-World Impact:** How is **${topicName}** applied in modern industry or research?

💡 *Ask me about any specific question above to get a full explanation!*`;
  }

  return `### 🧠 Explanation: **"${q}"**

Domain: **${topicName}**

#### 1. Core Logic & Background
To understand **"${q}"**, we look at the fundamental principles governing **${topicName}**. 

#### 2. Step-by-Step Breakdown
1. **Initial State:** Identify the core inputs, context, or starting conditions.
2. **Processing & Rules:** Apply the essential laws and logical steps of **${topicName}**.
3. **Conclusion & Output:** The expected, structured result is produced.

#### 3. Practical Application
Understanding this concept helps solve practical challenges and deepens your overall knowledge of **${topicName}**.

🌟 *Feel free to ask follow-up questions or request a specific example!*`;
}

// -------------------------------------------------------------
// REST API ENDPOINTS
// -------------------------------------------------------------

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ success: false, message: 'All fields (Name, Gmail, Password) are required.' });
  }

  const users = getUsers();
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, message: 'An account with this Gmail already exists. Please login.' });
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email: email.toLowerCase(),
    password,
    createdAt: new Date().toISOString(),
    preferences: null
  };

  users.push(newUser);
  saveUsers(users);

  res.json({
    success: true,
    message: 'Account created successfully!',
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      preferences: newUser.preferences
    }
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Gmail and Password are required.' });
  }

  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid Gmail or Password.' });
  }

  res.json({
    success: true,
    message: 'Login successful!',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      preferences: user.preferences
    }
  });
});

app.post('/api/profile/update', (req, res) => {
  const { email, newName, newPassword } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });

  const users = getUsers();
  const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (userIndex === -1) return res.status(404).json({ success: false, message: 'User not found.' });

  if (newName) users[userIndex].name = newName;
  if (newPassword) users[userIndex].password = newPassword;

  saveUsers(users);

  res.json({
    success: true,
    message: 'Profile updated successfully!',
    user: {
      id: users[userIndex].id,
      name: users[userIndex].name,
      email: users[userIndex].email,
      preferences: users[userIndex].preferences
    }
  });
});

app.post('/api/preferences', (req, res) => {
  const { email, subject, customSubject, studyLevel, studyTime, hoursPerDay } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'User email is required.' });
  }

  const chosenTopic = (subject === 'custom' && customSubject) ? customSubject : (subject || 'DSA');
  const topicData = generateUnlimitedTopicDetails(chosenTopic);
  const timetableData = generateTimetable(studyTime, hoursPerDay);

  const preferencesObj = {
    subjectKey: subject,
    subjectName: topicData.name,
    subjectTheme: topicData.theme || 'tech',
    customSubject: customSubject || '',
    studyLevel: studyLevel || 'beginner',
    studyTime: studyTime || 'morning',
    hoursPerDay: hoursPerDay || '2',
    topicOverview: {
      summary: topicData.summary,
      keyConcepts: topicData.keyConcepts,
      sampleCode: topicData.sampleCode
    },
    youtubeLinks: topicData.youtubeLinks,
    notesLinks: topicData.notesLinks,
    roadmapPhases: topicData.roadmapPhases,
    timetable: timetableData,
    updatedAt: new Date().toISOString()
  };

  const users = getUsers();
  const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());

  if (userIndex !== -1) {
    users[userIndex].preferences = preferencesObj;
    saveUsers(users);
    return res.json({
      success: true,
      message: 'Plan saved successfully!',
      user: {
        id: users[userIndex].id,
        name: users[userIndex].name,
        email: users[userIndex].email,
        preferences: preferencesObj
      }
    });
  } else {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }
});

app.get('/api/user-data/:email', (req, res) => {
  const email = req.params.email;
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      preferences: user.preferences
    }
  });
});

app.post('/api/ai-chat', async (req, res) => {
  const { messages, query, topic, level, apiKey } = req.body;
  const msgList = messages || (query ? [{ role: 'user', content: query }] : []);

  if (msgList.length === 0) {
    return res.status(400).json({ success: false, message: 'Query is required.' });
  }

  const topicName = topic || 'General Knowledge';
  const effectiveApiKey = apiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  try {
    let answer = '';

    if (effectiveApiKey && effectiveApiKey.trim() !== '') {
      answer = await callGeminiMultiTurn(effectiveApiKey.trim(), msgList, topicName);
    } else {
      answer = generateUniversalAiResponse(msgList, topicName);
    }

    res.json({
      success: true,
      answer: answer,
      topic: topicName
    });
  } catch (err) {
    console.error('AI Error:', err.message);
    const fallbackAnswer = generateUniversalAiResponse(msgList, topicName);
    res.json({
      success: true,
      answer: fallbackAnswer,
      topic: topicName
    });
  }
});

app.listen(PORT, () => {
  console.log(`Smart Education Server running at http://localhost:${PORT}`);
});
