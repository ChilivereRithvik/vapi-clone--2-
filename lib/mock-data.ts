// Mock data for the Citizen Services application

export interface Call {
  id: string;
  caller: string;
  intent: string;
  result: "Completed" | "Transferred" | "Abandoned";
  duration: string;
  date: string;
  agent: string;
  transcript?: string;
}

export interface Scheme {
  id: string;
  name: string;
  level: "Central" | "State";
  tags: string[];
  department: string;
  lastSynced: string;
  description: string;
  eligibility: string[];
  documents: string[];
  applyLink: string;
}

export interface FollowUp {
  id: string;
  caller: string;
  scheme: string;
  dueDate: string;
  channel: "Phone" | "SMS" | "WhatsApp";
  notes: string;
  status: "Due Today" | "Pending Docs" | "Waiting Citizen" | "Escalated";
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "Agent" | "Supervisor" | "Admin" | "Analyst";
  status: "Active" | "Inactive";
}

// Mock data
export const mockCalls: Call[] = [
  {
    id: "1",
    caller: "•••1234",
    intent: "Pension Inquiry",
    result: "Completed",
    duration: "4:32",
    date: "2024-01-15 10:30",
    agent: "Agent Smith",
    transcript: `Agent: Hello, this is Agent Smith from Citizen Services. How can I help you today?

Caller: Hi, I wanted to know about pension eligibility. I'm 58 years old and wondering if I can apply.

Agent: I'd be happy to help you with pension information. For most pension schemes, the minimum age is 60 years. However, there are some early retirement options available. Can you tell me about your employment history?

Caller: I've been working in a private company for 25 years. Do I need any specific documents?

Agent: Yes, you'll need your Aadhaar card, employment certificates, salary slips for the last 6 months, and a bank account statement. I'm sending you a detailed list via SMS.

Caller: That's very helpful. Thank you so much.

Agent: You're welcome! Is there anything else I can help you with today?

Caller: No, that covers everything. Thank you.

Agent: Have a great day!`,
  },
  {
    id: "2",
    caller: "•••5678",
    intent: "Healthcare Scheme",
    result: "Transferred",
    duration: "2:15",
    date: "2024-01-15 10:25",
    agent: "Bot",
    transcript: `Bot: Hello! I'm here to help you with government schemes. What can I assist you with today?

Caller: I need information about health insurance schemes.

Bot: I can help with basic information about health insurance schemes. For detailed eligibility and application process, I'll transfer you to a specialist agent. Please hold on.

Caller: Okay, thank you.

Bot: Transferring you now to Agent Johnson who specializes in healthcare schemes.`,
  },
  {
    id: "3",
    caller: "•••9012",
    intent: "Education Grant",
    result: "Completed",
    duration: "6:45",
    date: "2024-01-15 10:20",
    agent: "Agent Johnson",
    transcript: `Agent: Good morning, this is Agent Johnson. How can I assist you today?

Caller: I'm calling about education grants for my daughter. She's starting college next year.

Agent: That's wonderful! There are several education grant schemes available. Can you tell me about your family's annual income and your daughter's academic performance?

Caller: Our annual income is around 2 lakh rupees, and she scored 85% in her 12th grade.

Agent: Excellent! She qualifies for multiple schemes. The Merit-based Education Grant provides up to ₹50,000 per year for students with above 80% marks from families with income below ₹3 lakhs.

Caller: That sounds perfect! What documents do we need?

Agent: You'll need her mark sheets, income certificate, caste certificate if applicable, bank account details, and Aadhaar cards for both you and your daughter. I'm sending you the complete application form and document checklist.

Caller: Thank you so much! When is the deadline?

Agent: The deadline is March 31st, so you have plenty of time. Make sure to apply early as it's processed on a first-come, first-served basis.

Caller: I really appreciate your help. This will make a huge difference for our family.

Agent: I'm glad I could help! Best of luck to your daughter with her studies.`,
  },
  {
    id: "4",
    caller: "•••3456",
    intent: "Housing Subsidy",
    result: "Abandoned",
    duration: "1:23",
    date: "2024-01-15 10:15",
    agent: "Bot",
  },
  {
    id: "5",
    caller: "•••7890",
    intent: "Employment Scheme",
    result: "Completed",
    duration: "3:18",
    date: "2024-01-15 10:10",
    agent: "Agent Davis",
  },
  {
    id: "6",
    caller: "•••2468",
    intent: "Food Security",
    result: "Transferred",
    duration: "2:55",
    date: "2024-01-15 10:05",
    agent: "Agent Wilson",
  },
  {
    id: "7",
    caller: "•••1357",
    intent: "Disability Benefits",
    result: "Completed",
    duration: "5:12",
    date: "2024-01-15 10:00",
    agent: "Agent Brown",
  },
  {
    id: "8",
    caller: "•••8024",
    intent: "Rural Development",
    result: "Completed",
    duration: "4:08",
    date: "2024-01-15 09:55",
    agent: "Bot",
  },
  {
    id: "9",
    caller: "•••6135",
    intent: "Senior Citizen Scheme",
    result: "Transferred",
    duration: "3:42",
    date: "2024-01-15 09:50",
    agent: "Agent Miller",
  },
  {
    id: "10",
    caller: "•••9753",
    intent: "Women Empowerment",
    result: "Completed",
    duration: "4:55",
    date: "2024-01-15 09:45",
    agent: "Agent Garcia",
  },
];

export const mockSchemes: Scheme[] = [
  {
    id: "1",
    name: "Pradhan Mantri Jan Arogya Yojana",
    level: "Central",
    tags: ["Healthcare", "Insurance"],
    department: "Health & Family Welfare",
    lastSynced: "2024-01-15 09:00",
    description:
      "Health insurance scheme providing coverage up to ₹5 lakh per family per year.",
    eligibility: [
      "Annual income below ₹2.5 lakh",
      "Valid Aadhaar card",
      "Resident of India",
    ],
    documents: ["Aadhaar Card", "Income Certificate", "Ration Card"],
    applyLink: "https://pmjay.gov.in",
  },
  {
    id: "2",
    name: "PM-KISAN",
    level: "Central",
    tags: ["Agriculture", "Direct Transfer"],
    department: "Agriculture & Farmers Welfare",
    lastSynced: "2024-01-15 08:45",
    description: "Direct income support to farmers with ₹6,000 per year.",
    eligibility: [
      "Small and marginal farmers",
      "Valid bank account",
      "Land ownership records",
    ],
    documents: ["Land Records", "Bank Account Details", "Aadhaar Card"],
    applyLink: "https://pmkisan.gov.in",
  },
  {
    id: "3",
    name: "Mahatma Gandhi NREGA",
    level: "Central",
    tags: ["Employment", "Rural Development"],
    department: "Rural Development",
    lastSynced: "2024-01-15 08:30",
    description: "Guaranteed 100 days of employment in rural areas.",
    eligibility: [
      "Rural household",
      "Adult member willing to work",
      "Job card holder",
    ],
    documents: ["Job Card", "Bank Account Details", "Address Proof"],
    applyLink: "https://nrega.nic.in",
  },
  {
    id: "4",
    name: "Beti Bachao Beti Padhao",
    level: "Central",
    tags: ["Women Empowerment", "Education"],
    department: "Women & Child Development",
    lastSynced: "2024-01-15 08:15",
    description:
      "Scheme to improve child sex ratio and promote girls' education.",
    eligibility: ["Girl child", "School enrollment", "Bank account"],
    documents: [
      "Birth Certificate",
      "School Certificate",
      "Bank Account Details",
    ],
    applyLink: "https://wcd.nic.in",
  },
  {
    id: "5",
    name: "Ayushman Bharat Digital Mission",
    level: "Central",
    tags: ["Healthcare", "Digital"],
    department: "Health & Family Welfare",
    lastSynced: "2024-01-15 08:00",
    description: "Digital health ecosystem for all citizens.",
    eligibility: ["Indian citizen", "Valid mobile number", "Aadhaar card"],
    documents: ["Aadhaar Card", "Mobile Number Verification"],
    applyLink: "https://abdm.gov.in",
  },
  {
    id: "6",
    name: "Pension Scheme",
    level: "Central",
    tags: ["Pension", "Retirement"],
    department: "Pension & Social Security",
    lastSynced: "2024-01-15 07:45",
    description: "Scheme providing pension benefits to eligible citizens.",
    eligibility: [
      "Age above 60 years",
      "Valid Aadhaar card",
      "Resident of India",
    ],
    documents: ["Aadhaar Card", "Birth Certificate", "Employment History"],
    applyLink: "https://pension.gov.in",
  },
];

export const mockFollowUps: FollowUp[] = [
  {
    id: "1",
    caller: "•••1234",
    scheme: "PM-KISAN",
    dueDate: "2024-01-15",
    channel: "Phone",
    notes: "Need to verify bank account details for direct transfer",
    status: "Due Today",
  },
  {
    id: "2",
    caller: "•••5678",
    scheme: "PMJAY",
    dueDate: "2024-01-15",
    channel: "SMS",
    notes: "Document verification pending - income certificate required",
    status: "Due Today",
  },
  {
    id: "3",
    caller: "•••9012",
    scheme: "NREGA",
    dueDate: "2024-01-16",
    channel: "WhatsApp",
    notes: "Job card application status update needed",
    status: "Pending Docs",
  },
  {
    id: "4",
    caller: "•••3456",
    scheme: "Beti Bachao Beti Padhao",
    dueDate: "2024-01-17",
    channel: "Phone",
    notes: "School enrollment confirmation needed from parent",
    status: "Waiting Citizen",
  },
  {
    id: "5",
    caller: "•••7890",
    scheme: "ABDM",
    dueDate: "2024-01-18",
    channel: "SMS",
    notes: "Mobile number verification failed multiple times",
    status: "Escalated",
  },
  {
    id: "6",
    caller: "•••2468",
    scheme: "PM-KISAN",
    dueDate: "2024-01-15",
    channel: "Phone",
    notes: "Land records verification required for farmer registration",
    status: "Pending Docs",
  },
  {
    id: "7",
    caller: "•••1357",
    scheme: "PMJAY",
    dueDate: "2024-01-16",
    channel: "WhatsApp",
    notes: "Family member addition to health insurance card",
    status: "Waiting Citizen",
  },
  {
    id: "8",
    caller: "•••8024",
    scheme: "Pension Scheme",
    dueDate: "2024-01-14",
    channel: "Phone",
    notes: "Age verification documents missing - birth certificate needed",
    status: "Escalated",
  },
];

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@gov.in",
    role: "Agent",
    status: "Active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@gov.in",
    role: "Supervisor",
    status: "Active",
  },
  {
    id: "3",
    name: "Michael Davis",
    email: "michael.davis@gov.in",
    role: "Agent",
    status: "Active",
  },
  {
    id: "4",
    name: "Emily Wilson",
    email: "emily.wilson@gov.in",
    role: "Admin",
    status: "Active",
  },
  {
    id: "5",
    name: "Robert Brown",
    email: "robert.brown@gov.in",
    role: "Analyst",
    status: "Active",
  },
];
