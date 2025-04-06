import { GoogleGenerativeAI } from "@google/generative-ai";

// Configuration
const GEMINI_CONFIG = {
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || "",
  modelName: "gemini-1.5-pro", 
  useMockResponses: true, // Use mock responses for testing
};

// Log the API key to console (partially hidden for security)
console.log("Gemini API Key exists:", !!GEMINI_CONFIG.apiKey);

// Mock database of scholarship and skills information
const mockData = {
  scholarships: [
    {
      name: "STEM Excellence Scholarship",
      amount: "$5,000",
      deadline: "April 15, 2023",
      matchScore: 92,
      requirements: "3.5 GPA, STEM major, essay submission, two recommendation letters",
      details: "For students pursuing degrees in Science, Technology, Engineering, or Mathematics with demonstrated academic excellence."
    },
    {
      name: "Future Leaders Fund",
      amount: "$2,500",
      deadline: "May 1, 2023",
      matchScore: 87,
      requirements: "Leadership experience, community service, personal statement",
      details: "Supports students who have demonstrated leadership potential through school or community activities."
    },
    {
      name: "Community Service Award",
      amount: "$3,000",
      deadline: "May 30, 2023",
      matchScore: 85,
      requirements: "100+ hours of community service, essay about service impact",
      details: "Recognizes students who have made significant contributions to their communities through volunteer service."
    }
  ],
  skills: [
    {
      name: "Leadership",
      importance: "High",
      description: "Demonstrating ability to guide, motivate, and organize others",
      relevantScholarships: ["Future Leaders Fund", "STEM Excellence Scholarship"],
      improvementTips: "Join clubs, volunteer for leadership positions, organize events, mentor others"
    },
    {
      name: "Public Speaking",
      importance: "Medium",
      description: "Ability to communicate effectively to groups and present ideas clearly",
      relevantScholarships: ["Future Leaders Fund", "Community Service Award"],
      improvementTips: "Join debate clubs, Toastmasters, practice presentations, record yourself speaking"
    },
    {
      name: "Problem Solving",
      importance: "High",
      description: "Ability to analyze situations and develop effective solutions",
      relevantScholarships: ["STEM Excellence Scholarship"],
      improvementTips: "Take part in math competitions, coding challenges, puzzle-solving activities"
    },
    {
      name: "Critical Thinking",
      importance: "High",
      description: "Evaluating information objectively and making reasoned judgments",
      relevantScholarships: ["STEM Excellence Scholarship", "Future Leaders Fund"],
      improvementTips: "Read diverse sources, practice analyzing arguments, engage in debates"
    },
    {
      name: "Time Management",
      importance: "Medium",
      description: "Efficiently organizing tasks and priorities to meet deadlines",
      relevantScholarships: ["All scholarships"],
      improvementTips: "Use planning tools, break large tasks into smaller ones, set specific goals"
    }
  ],
  profile: {
    name: "Student",
    completionScore: 75,
    strengths: ["Leadership", "Problem Solving", "Critical Thinking"],
    areasForImprovement: ["Public Speaking", "Time Management"],
    recommendedScholarships: ["STEM Excellence Scholarship", "Future Leaders Fund"]
  },
  tasks: [
    { name: "Complete personal statement", deadline: "2 days left", priority: "high" },
    { name: "Upload transcript", deadline: "5 days left", priority: "medium" },
    { name: "Request recommendation letter", deadline: "1 week left", priority: "medium" }
  ]
};

/**
 * Generates a response using Gemini API or mock data
 */
function generateResponse(message, history = [], context = {}) {
  console.log("Generating response for:", message);
  
  // Use mock responses for testing
  return mockResponse(message);
}

/**
 * Provides detailed mock responses for scholarship and skills questions
 */
function mockResponse(message) {
  // Simulate API delay
  return new Promise(resolve => {
    setTimeout(() => {
      // Convert to lowercase for easier matching
      const lowerMessage = message.toLowerCase();
      
      // SCHOLARSHIP-RELATED RESPONSES
      if (lowerMessage.includes('scholarship') && lowerMessage.includes('match')) {
        resolve(`Based on your profile, here are your top scholarship matches:

1. STEM Excellence Scholarship (92% match)
   - Amount: $5,000
   - Deadline: April 15, 2023 (14 days left)
   - Requirements: 3.5 GPA, STEM major, essay, two recommendation letters

2. Future Leaders Fund (87% match)
   - Amount: $2,500
   - Deadline: May 1, 2023 (30 days left)
   - Requirements: Leadership experience, community service, personal statement

3. Community Service Award (85% match)
   - Amount: $3,000
   - Deadline: May 30, 2023 (59 days left)
   - Requirements: 100+ hours of community service, impact essay

Would you like specific tips to improve your chances for any of these scholarships?`);
      } 
      else if (lowerMessage.includes('improve') && lowerMessage.includes('scholarship')) {
        resolve(`Here are strategies to improve your scholarship chances:

1. Complete your profile (currently 75%)
   - Add more academic achievements
   - Detail extracurricular activities
   - Highlight leadership roles

2. Strengthen your essays
   - Be specific about your goals
   - Tell a compelling personal story
   - Show impact, not just activities

3. Obtain strong recommendation letters
   - Ask teachers who know you well
   - Provide them with specific achievements to mention
   - Give them plenty of time (at least 3 weeks)

4. Highlight skills that match the scholarship
   - Leadership for Future Leaders Fund
   - Problem-solving for STEM Excellence
   - Community impact for Service Award

Would you like me to help you develop a specific area?`);
      }
      else if (lowerMessage.includes('deadline')) {
        resolve(`Your upcoming scholarship deadlines:

🔴 URGENT (within 2 weeks):
   - STEM Excellence Scholarship: April 15, 2023 (14 days left)
   - Complete personal statement: 2 days left

🟠 APPROACHING (within 1 month):
   - Future Leaders Fund: May 1, 2023 (30 days left)
   - Upload transcript: 5 days left
   - Request recommendation letter: 1 week left

🟢 FUTURE (beyond 1 month):
   - Community Service Award: May 30, 2023 (59 days left)

I can set up reminders for any of these deadlines. Would you like me to help you prioritize your application tasks?`);
      }
      else if (lowerMessage.includes('essay') || lowerMessage.includes('personal statement')) {
        resolve(`Tips for writing an outstanding scholarship essay:

1. Answer the prompt precisely
   - Stay focused on the specific question
   - Use concrete examples, not generalizations

2. Tell your unique story
   - Share personal experiences that shaped you
   - Connect your past to your future goals
   - Be authentic and genuine

3. Structure effectively
   - Strong opening that grabs attention
   - Clear thesis and supporting points
   - Meaningful conclusion that reinforces your message

4. Technical quality
   - Proofread carefully for grammar and spelling
   - Follow word count limits exactly
   - Use active voice and specific language

Would you like help with a specific section of your essay?`);
      }
      
      // SKILLS-RELATED RESPONSES
      else if (lowerMessage.includes('showcase') && lowerMessage.includes('leadership')) {
        resolve(`Great question about showcasing leadership skills! Here's how to effectively highlight your leadership experience:

1. Concrete examples over claims
   - Instead of "I am a leader," describe: "I organized a team of 5 students to raise $2,000 for our school's STEM program"
   - Use the STAR method: Situation, Task, Action, Result

2. Highlight different leadership styles
   - Leading from the front (president, captain)
   - Supporting leadership (mentor, facilitator)
   - Project leadership (organized specific initiatives)

3. Quantify your impact
   - Number of people led/affected
   - Measurable achievements (amounts raised, goals met)
   - Time commitment (sustained leadership over time)

4. Connect to scholarship values
   - For Future Leaders Fund: emphasize innovation and vision
   - For Community Service Award: highlight how you mobilized others

Your profile shows leadership as one of your strengths. Would you like help describing a specific leadership experience for your applications?`);
      }
      else if (lowerMessage.includes('skills') && lowerMessage.includes('valued')) {
        resolve(`The most valued skills for scholarship applications are:

1. Leadership (High Importance)
   - Relevant for: Future Leaders Fund, STEM Excellence Scholarship
   - Shows: Initiative, ability to inspire others, organizational ability
   - Tip: Focus on outcomes achieved through your leadership

2. Problem Solving (High Importance)
   - Relevant for: STEM Excellence Scholarship
   - Shows: Analytical thinking, creativity, perseverance
   - Tip: Describe complex problems you've solved with specific approaches

3. Critical Thinking (High Importance)
   - Relevant for: Most academic scholarships
   - Shows: Ability to analyze information, make reasoned judgments
   - Tip: Highlight research projects or complex analyses you've conducted

4. Communication (Medium-High Importance)
   - Relevant for: All scholarships
   - Shows: Ability to convey ideas clearly and persuasively
   - Tip: Emphasize public speaking, writing achievements, or presentations

Your profile shows strengths in Leadership, Problem Solving, and Critical Thinking. Would you like specific advice on how to highlight these in your applications?`);
      }
      else if (lowerMessage.includes('improve') && lowerMessage.includes('public speaking')) {
        resolve(`Here are practical ways to improve your public speaking skills:

1. Join structured programs
   - Toastmasters International (community chapters available)
   - Debate club or speech team at your school
   - Model UN or similar simulation programs

2. Start small and build up
   - Practice in front of friends or family first
   - Record yourself speaking and review
   - Volunteer for small presentation opportunities

3. Technical improvement tactics
   - Focus on eliminating filler words (um, like)
   - Practice proper breathing and pacing
   - Work on making eye contact and using gestures

4. Overcome anxiety
   - Preparation is key - know your material thoroughly
   - Visualization and positive self-talk
   - Exposure therapy: speak more often to build confidence

Public speaking is listed as an area for improvement in your profile. Strengthening this skill would particularly help with the Future Leaders Fund scholarship. Would you like specific exercises to practice?`);
      }
      else if (lowerMessage.includes('skills') && lowerMessage.includes('stem')) {
        // Find the STEM-related skill
        const stemSkill = mockData.skills.find(skill => 
          skill.name.toLowerCase().includes('problem') || skill.relevantScholarships.includes('STEM Excellence Scholarship')
        );
        
        // Create a rich card response with the skill data
        const skillCardData = JSON.stringify(stemSkill);
        
        resolve(`Key skills valued for STEM scholarships include problem-solving, analytical thinking, and technical proficiency.

Here's a detailed look at one of the most important skills:

[SKILL_CARD]${skillCardData}[/SKILL_CARD]

This skill is particularly valued by the STEM Excellence Scholarship. Would you like to see more skills that are important for STEM scholarships?`);
      }
      else if (lowerMessage.includes('scholarship') && lowerMessage.includes('stem')) {
        // Find the STEM scholarship
        const stemScholarship = mockData.scholarships.find(s => s.name.includes('STEM'));
        
        // Create a rich card response
        const scholarshipCardData = JSON.stringify(stemScholarship);
        
        resolve(`I found a great STEM-focused scholarship that matches your profile:

[SCHOLARSHIP_CARD]${scholarshipCardData}[/SCHOLARSHIP_CARD]

This scholarship has a 92% match with your profile. You have all the necessary qualifications, but to improve your chances, I recommend highlighting your problem-solving skills and technical achievements.

Would you like tips on applying for this scholarship?`);
      }
      else if (lowerMessage.includes('leadership') && !lowerMessage.includes('showcase')) {
        // Create a rich card for leadership skills
        const leadershipSkill = mockData.skills.find(skill => skill.name.toLowerCase() === 'leadership');
        const skillCardData = JSON.stringify(leadershipSkill);
        
        resolve(`Leadership is one of your top skills according to your profile. Here's what makes it valuable for scholarships:

[SKILL_CARD]${skillCardData}[/SKILL_CARD]

Your leadership skill is a great match for the Future Leaders Fund scholarship. Would you like to see more details about this scholarship opportunity?`);
      }
      
      // TOPIC CATEGORY RESPONSES
      else if (lowerMessage.includes('tell me about scholarships')) {
        resolve(`Scholarships are financial awards that help students pay for education without requiring repayment. Here's what you should know:

Types of scholarships available:
- Merit-based (academic achievements)
- Need-based (financial circumstances)
- Identity-based (background, heritage)
- Talent-based (arts, sports, specific skills)
- Field-specific (intended major or career)

Your scholarship matches:
- STEM Excellence Scholarship: 92% match
- Future Leaders Fund: 87% match
- Community Service Award: 85% match

Key application components:
- Personal essays
- Letters of recommendation
- Academic transcripts
- Demonstration of extracurriculars
- Evidence of financial need (when applicable)

Would you like more information about:
1. Your specific scholarship matches
2. Application strategies
3. Essay writing tips
4. Scholarship search methods`);
      }
      else if (lowerMessage.includes('tell me about skills')) {
        resolve(`Skills are a crucial component of strong scholarship applications. Here's an overview:

Your current skill strengths:
- Leadership (High proficiency)
- Problem Solving (High proficiency)
- Critical Thinking (High proficiency)

Areas for improvement:
- Public Speaking (Medium proficiency)
- Time Management (Medium proficiency)

How skills impact scholarships:
- They demonstrate your potential beyond grades
- They show how you'll contribute to a campus community
- They indicate your preparation for future success
- They differentiate you from other applicants

Skills particularly valued for your matched scholarships:
- Future Leaders Fund: Leadership, communication
- STEM Excellence: Problem solving, analytical thinking
- Community Service Award: Collaboration, empathy

Would you like to:
1. Learn how to improve a specific skill
2. Get advice on showcasing your skills in applications
3. Understand which skills matter most for particular scholarships
4. Take a skills assessment`);
      }
      else if (lowerMessage.includes('tell me about deadlines')) {
        resolve(`Managing scholarship deadlines is critical for success. Here's your current deadline situation:

Upcoming scholarship deadlines:
- STEM Excellence Scholarship: April 15, 2023 (14 days left) ⚠️
- Future Leaders Fund: May 1, 2023 (30 days left)
- Community Service Award: May 30, 2023 (59 days left)

Related task deadlines:
- Complete personal statement: 2 days left ⚠️
- Upload transcript: 5 days left
- Request recommendation letter: 1 week left

Deadline management strategies:
- Create a scholarship calendar with all deadlines
- Set multiple reminders (2 weeks, 1 week, 3 days before)
- Break down applications into smaller tasks with mini-deadlines
- Prioritize based on match percentage and deadline proximity
- Allow buffer time for unexpected delays

Would you like me to:
1. Help you create a deadline schedule
2. Prioritize your current applications
3. Set up reminders for specific deadlines
4. Provide tips for last-minute applications`);
      }
      else if (lowerMessage.includes('tell me about applications')) {
        resolve(`The scholarship application process involves several components:

Key application elements:
1. Application forms
   - Personal/contact information
   - Academic history
   - Activities and achievements

2. Essays and personal statements
   - Your story and motivations
   - Career goals and aspirations
   - Why you deserve the scholarship

3. Supporting documents
   - Official transcripts
   - Standardized test scores
   - Letters of recommendation
   - Financial information (for need-based)

Application status:
- You've applied to Future Leaders Fund
- STEM Excellence Scholarship application in progress (14 days left)
- Community Service Award not started

Tips for strong applications:
- Tailor each application to the specific scholarship
- Highlight relevant experiences and skills
- Follow instructions precisely
- Submit well before deadlines
- Review thoroughly before submission

Would you like help with:
1. Completing a specific application
2. Essay review and feedback
3. Gathering supporting documents
4. Following up after submission`);
      }
      // DEFAULT RESPONSE
      else {
        resolve(`I can help with various aspects of your scholarship journey:

1. Scholarship matching and recommendations
2. Application strategies and essay tips
3. Skill development for stronger applications
4. Deadline management and task prioritization

I see you have the STEM Excellence Scholarship deadline coming up in 14 days. Would you like help preparing that application?

You can also ask me about specific skills like leadership or public speaking, or how to improve your scholarship chances overall.`);
      }
    }, 1000);
  });
}

export { generateResponse, GEMINI_CONFIG }; 