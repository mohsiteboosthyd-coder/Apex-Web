import React, { useState, useEffect, useRef } from 'react';


import App from './App';
// --- Global Styles ---

// We inject these styles into the document head

const GlobalStyles = () => {

  useEffect(() => {

    const style = document.createElement('style');

    style.innerHTML = `

      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap');

     

      body {

        font-family: 'Inter', sans-serif;

        background-color: #f8f9fa; /* Off-white background */

        color: #111827; /* Dark text */

        -webkit-font-smoothing: antialiased;

        -moz-osx-font-smoothing: grayscale;

      }

     

      html {

        scroll-behavior: smooth;

      }



      /* Base animation classes */

      .scroll-animate {

        opacity: 0;

        transform: translateY(50px);

        transition: opacity 1s ease-out, transform 0.8s ease-out;

      }

     

      .scroll-animate-visible {

        opacity: 1;

        transform: translateY(0);

      }

     

      /* Staggered animation delays */

      .delay-1 { transition-delay: 100ms; }

      .delay-2 { transition-delay: 200ms; }

      .delay-3 { transition-delay: 300ms; }

    `;

    document.head.appendChild(style);

    return () => {

      document.head.removeChild(style);

    };

  }, []);

  return null;

};



// --- Custom Hook for Scroll Animation ---

const useScrollAnimation = () => {

  useEffect(() => {

    const targets = document.querySelectorAll('.scroll-animate');

   

    const observer = new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add('scroll-animate-visible');

            observer.unobserve(entry.target);

          }

        });

      },

      {

        threshold: 0.1, // Trigger when 10% is visible

        rootMargin: '0px 0px -50px 0px', // Start animation a bit before it's fully in view

      }

    );



    targets.forEach((target) => {

      observer.observe(target);

    });



    return () => {

      targets.forEach((target) => {

        observer.unobserve(target);

      });

    };

  }, []);

};



// --- SVG Icons ---

// Using inline SVGs for performance and easy styling

const MenuIcon = (props) => (

  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>

  </svg>

);



const CloseIcon = (props) => (

  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>

  </svg>

);



const GithubIcon = (props) => (

  <svg {...props} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">

    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.203 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.85-2.339 4.695-4.566 4.942.359.308.678.92.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />

  </svg>

);



const LinkedInIcon = (props) => (

  <svg {...props} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">

    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />

  </svg>

);



// UPDATED ICON

const ArrowRightIcon = (props) => (

  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>

  </svg>

);



const SparkleIcon = (props) => (

  <svg

    {...props}

    xmlns="http://www.w3.org/2000/svg"

    viewBox="0 0 24 24"

    fill="currentColor"

    aria-hidden="true"

  >

    <path

      fillRule="evenodd"

      d="M9.315 7.584C12.195 3.883 17.69 3.883 20.57 7.584C23.45 11.285 21.87 17.02 18.27 19.333C17.403 19.82 16.43 20.122 15.42 20.247C15.018 20.29 14.613 20.31 14.205 20.31C13.797 20.31 13.392 20.29 12.99 20.247C11.98 20.122 11.007 19.82 10.14 19.333C6.54 17.02 4.96 11.285 7.84 7.584L9.315 7.584ZM12 5.25C10.245 5.25 8.615 6.43 7.972 8.055C7.322 9.7 7.972 11.536 9.315 12.448C10.658 13.36 12.428 13.36 13.772 12.448C15.115 11.536 15.765 9.7 15.122 8.055C14.479 6.43 12.85 5.25 12 5.25ZM5.625 13.5C4.28 13.5 3.164 14.332 2.83 15.539C2.49 16.764 3.1 18.068 4.16 18.79C5.22 19.512 6.563 19.374 7.422 18.44C8.28 17.505 8.28 16.118 7.422 15.183C6.918 14.654 6.285 13.5 5.625 13.5ZM19.013 15.539C18.679 14.332 17.562 13.5 16.218 13.5C15.558 13.5 14.925 14.654 14.422 15.183C13.563 16.118 13.563 17.505 14.422 18.44C15.28 19.374 16.623 19.512 17.683 18.79C18.743 18.068 19.352 16.764 19.013 15.539Z"

      clipRule="evenodd"

    />

  </svg>

);



const SendIcon = (props) => (

  <svg

    {...props}

    viewBox="0 0 24 24"

    fill="currentColor"

    aria-hidden="true"

  >

    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />

  </svg>

);





// --- Header Component (Refined) ---

const Header = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



  const navLinks = [

    { name: 'About', href: '#about' },

    { name: 'Projects', href: '#projects' },

    { name: 'Contact', href: '#contact' },

  ];



  return (

    <header className="bg-white/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 shadow-sm">

      <nav className="container mx-auto px-6 py-5 flex justify-between items-center">

        <a href="#" className="text-2xl font-bold text-indigo-900">

          Mohammed

        </a>

       

        {/* Desktop Nav */}

        <div className="hidden md:flex space-x-10">

          {navLinks.map((link) => (

            <a

              key={link.name}

              href={link.href}

              className="text-gray-700 hover:text-indigo-700 transition duration-300 text-sm font-medium"

            >

              {link.name}

            </a>

          ))}

        </div>

       

        {/* Mobile Menu Button */}

        <button

          id="mobile-menu-btn"

          className="md:hidden text-indigo-900 z-50"

          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}

        >

          {isMobileMenuOpen ? (

            <CloseIcon className="w-6 h-6" />

          ) : (

            <MenuIcon className="w-6 h-6" />

          )}

        </button>

      </nav>

     

      {/* Mobile Menu */}

      <div

        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white transition-transform duration-300 ease-in-out ${

          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'

        }`}

      >

        <div className="flex flex-col items-center justify-center h-full space-y-10">

          {navLinks.map((link) => (

            <a

              key={link.name}

              href={link.href}

              className="text-3xl text-gray-800 hover:text-indigo-700 transition duration-300"

              onClick={() => setIsMobileMenuOpen(false)} // Close menu on click

            >

              {link.name}

            </a>

          ))}

        </div>

      </div>

    </header>

  );

};



// --- Hero Component (NEW DESIGN) ---

const Hero = () => {

  return (

    <section id="hero" className="relative text-black pt-48 pb-32 md:pt-64 md:pb-48 bg-gray-50 overflow-hidden">

      <div className="absolute inset-0 z-0">

        {/* Subtle gradient mesh */}

        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-transparent opacity-50 blur-3xl"></div>

        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-50/50 via-blue-50/50 to-transparent opacity-50 blur-3xl"></div>

      </div>

     

      <div className="container mx-auto px-6 text-left relative z-10 max-w-5xl">

        <h1 className="text-5xl md:text-8xl font-black mb-6 text-indigo-900 leading-tight scroll-animate">

          Web Consultant.

          <br />

          Problem Solver.

        </h1>

        <p className="text-xl md:text-2xl text-gray-700 font-light max-w-2xl scroll-animate delay-1">

          I'm Mohammed, a business-minded partner who builds reliable, high-performance websites that solve real problems.

        </p>

        <a

          href="#projects"

          className="mt-12 inline-block bg-indigo-700 text-white font-bold py-4 px-12 rounded-full shadow-xl hover:bg-indigo-800 transition duration-300 transform hover:scale-105 scroll-animate delay-2"

        >

          View My Work

        </a>

      </div>

    </section>

  );

};



// --- AI Assistant Modal Component (Unchanged) ---



// Utility for exponential backoff

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));



const AiAssistantModal = ({ isOpen, onClose }) => {

  const [messages, setMessages] = useState([]);

  const [inputValue, setInputValue] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef(null);



  // Define the developer's context for the AI

  const developerContext = `

    Name: Mohammed Moheen

    Identity: A problem-solver first and a web consultant second.

    Mission: To be the web consultant he wishes he could have hired—a reliable, honest, business-minded partner.

   

    Origin Story:

    - Started at 17, obsessed with building an internet business while earning a Commerce degree.

    - Self-taught, built and published his first apps.

    - Learned hard lessons early when apps were removed from the Play Store (a real-world education in monetization).



    Experience (7-Year Hands-On Journey, including 4 years of dedicated Web Dev & Design):

    - Built a 360-degree skill set to build real businesses.

    - Web Developing: Built dozens of high-quality, custom sites (WordPress focus).

    - Video Content & Editing: Became a Level 1 Seller on Fiverr, delivering over $10,000 in projects for international clients.

    - YouTube Strategy: Worked directly with successful channel owners, learning the algorithm.

    - Facebook Ads: Self-taught, ran profitable campaigns for targeted traffic.



    The "Big Failure" (A Core Lesson):

    - In 2023, invested thousands and months into an e-commerce business.

    - The business failed due to a technical payment gateway issue, not a bad idea.

    - Result: Went broke, but gained priceless lessons.

    - Lesson 1: You must pick one path to truly master.

    - Lesson 2: Understood the pain of needing a reliable, honest technical partner.



    Current Businesses:

    - Apex Web Partners: A global consultancy focused on helping US businesses.

    - SiteBoost Hyderabad: A local operation for his home city.



    Core Value Proposition:

    - He is not just a "developer"; he's a business-minded partner who understands the entire picture (traffic, video, bottom line).

    - Believes in transparency, hard work, and building things that last.

   

    Target Audience: Business owners tired of being burned by agencies.



    Specialties:

    - Full Website Overhauls (Design, Speed & Content)

    - Web Performance & Speed Optimization

    - Basic SEO & Google Ranking

    - International & Local Client Management

  `;



  // System prompt for the Gemini API

  const systemPrompt = `You are a professional and enthusiastic AI assistant for Mohammed Moheen, a web consultant and problem-solver. Your name is 'Port-folio Bot'.

Your sole purpose is to answer questions from potential clients, recruiters, and collaborators about Mohammed's skills, his entrepreneurial journey, and his business philosophy.

Your main goal is to effectively communicate his value as an experienced web consultant and drive interest in his web services.

You MUST base all your answers *exclusively* on the following detailed context provided about Mohammed:

<context>

${developerContext}

</context>



Rules:

- Be concise, professional, and friendly.

- Always answer as the assistant. Use "I" when referring to yourself as the bot, and "Mohammed" or "he" when referring to the developer.

- Emphasize that he is a "business-minded partner" and "problem-solver," not just a coder.

- Feel free to mention his Fiverr success, his e-commerce failure (and the lessons learned), and his current businesses (Apex Web Partners, SiteBoost Hyderabad).

- If the user asks a question that is irrelevant to Mohammed's professional skills, experience, or services (e.g., "what is the meaning of life?", "what's the weather?", "can you write me a poem?"), you MUST respond with the exact phrase: "I can't answer that."

- For questions *about* him but outside the context (like personal contact info), you should politely state you can't share that and redirect to his professional services (e.g., "I can't share his personal contact details, but you can get in touch through the contact form on this site to discuss a project.").

- Do not make up information. If the context doesn't provide an answer, say so politely.

- Start the conversation by introducing yourself and offering help.

`;



  // Function to call Gemini API

  const callGeminiAPI = async (chatHistory) => {

    setIsLoading(true);

    const apiKey = ""; // API key will be injected by the environment

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;



    const payload = {

      contents: chatHistory,

      systemInstruction: {

        parts: [{ text: systemPrompt }],

      },

    };



    let response;

    let retries = 3;

    let delay = 1000;



    for (let i = 0; i < retries; i++) {

      try {

        response = await fetch(apiUrl, {

          method: 'POST',

          headers: { 'Content-Type': 'application/json' },

          body: JSON.stringify(payload),

        });



        if (response.ok) {

          const result = await response.json();

          const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

         

          if (text) {

            return { role: 'model', parts: [{ text }] };

          } else {

            throw new Error('Invalid response structure from API.');

          }

        } else {

          throw new Error(`API request failed with status ${response.status}`);

        }

      } catch (error) {

        if (i === retries - 1) {

          // Last retry failed

          return {

            role: 'model',

            parts: [{ text: "Sorry, I'm having trouble connecting right now. Please try again in a moment." }],

          };

        }

        await sleep(delay);

        delay *= 2; // Exponential backoff

      }

    }

  };



  // Effect to add initial greeting from bot

  useEffect(() => {

    if (isOpen && messages.length === 0) {

      setMessages([

        {

          role: 'model',

          parts: [{ text: "Hello! I'm Port-folio Bot, Mohammed Moheen's AI assistant. How can I help you with questions about his skills, experience, or business approach?" }],

        },

      ]);

    }

  }, [isOpen]); // Dependency on `isOpen`



  // Effect to scroll to bottom of chat

  useEffect(() => {

    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  }, [messages]);



  const handleSend = async (e) => {

    e.preventDefault();

    if (!inputValue.trim() || isLoading) return;



    const userMessage = { role: 'user', parts: [{ text: inputValue }] };

    const newMessages = [...messages, userMessage];

    setMessages(newMessages);

    setInputValue('');



    // Prepare chat history for API

    const apiChatHistory = newMessages.map(msg => ({

      role: msg.role,

      parts: msg.parts

    }));



    const modelResponse = await callGeminiAPI(apiChatHistory);

   

    if (modelResponse) {

      setMessages((prevMessages) => [...prevMessages, modelResponse]);

    }

   

    setIsLoading(false);

  };



  if (!isOpen) return null;



  return (

    <div

      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md"

      onClick={onClose}

    >

      <div

        className="bg-white rounded-lg shadow-2xl w-full max-w-lg h-[70vh] flex flex-col overflow-hidden m-4"

        onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click

      >

        {/* Header */}

        <div className="flex items-center justify-between p-4 border-b border-gray-200">

          <h3 className="text-lg font-semibold text-indigo-900 flex items-center">

            <SparkleIcon className="w-5 h-5 mr-2 text-indigo-600" />

            AI Assistant

          </h3>

          <button

            onClick={onClose}

            className="text-gray-400 hover:text-gray-700"

            aria-label="Close"

          >

            <CloseIcon className="w-6 h-6" />

          </button>

        </div>

       

        {/* Chat Area */}

        <div className="flex-1 p-4 overflow-y-auto space-y-4">

          {messages.map((msg, index) => (

            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>

              <div

                className={`max-w-xs md:max-w-md px-4 py-3 rounded-lg shadow-md ${

                  msg.role === 'user'

                    ? 'bg-indigo-600 text-white'

                    : 'bg-gray-100 text-gray-800'

                }`}

              >

                <p className="whitespace-pre-wrap">{msg.parts[0].text}</p>

              </div>

            </div>

          ))}

          {isLoading && (

            <div className="flex justify-start">

              <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg shadow-md">

                <div className="flex items-center space-x-2">

                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>

                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>

                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>

                </div>

              </div>

            </div>

          )}

          <div ref={chatEndRef} />

        </div>

       

        {/* Input Area */}

        <form onSubmit={handleSend} className="p-4 border-t border-gray-200 bg-white">

          <div className="flex items-center space-x-2">

            <input

              type="text"

              value={inputValue}

              onChange={(e) => setInputValue(e.target.value)}

              placeholder="Ask about my skills..."

              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"

              disabled={isLoading}

            />

            <button

              type="submit"

              className={`p-2 rounded-full text-white transition-colors ${

                isLoading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'

              }`}

              disabled={isLoading}

              aria-label="Send message"

            >

              <SendIcon className="w-5 h-5" />

            </button>

          </div>

        </form>

      </div>

    </div>

  );

};





// --- About Component (NEW DESIGN) ---

const About = ({ onOpenAiModal }) => (

  <section id="about" className="py-24 md:py-40 bg-white">

    <div className="container mx-auto px-6 max-w-6xl">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">

        {/* Left Column: Narrative */}

        <div className="scroll-animate">

          <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-8 leading-snug">

            I'm a business partner first,

            a web consultant second.

          </h2>

          <div className="text-lg text-gray-700 leading-relaxed space-y-6">

            <p>

              Hello! I'm Mohammed Moheen. My 7-year journey wasn't traditional. It was a hands-on obsession with building real businesses online, giving me a 360-degree skill set in development, video editing, and marketing.

            </p>

            <p>

              My biggest failure—a failed e-commerce venture—taught me the painful lesson of needing a reliable technical partner. Today, I am that partner for my clients through my consultancies, Apex Web Partners and SiteBoost Hyderabad.

            </p>

          </div>

        </div>

       

        {/* Right Column: Skills & AI Button */}

        <div className="scroll-animate delay-1">

          <div className="bg-gray-50 p-8 rounded-lg shadow-xl">

            <h3 className="text-2xl font-bold text-indigo-900 mb-6">My Specialties</h3>

            <ul className="space-y-4">

              {[

                'Full Website Overhauls',

                'Web Performance & Speed',

                'Basic SEO & Google Ranking',

                'Client Management',

              ].map(skill => (

                <li key={skill} className="flex items-center text-gray-700">

                  <svg className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>

                  {skill}

                </li>

              ))}

            </ul>

           

            {/* AI Assistant Button */}

            <div className="pt-8 text-center">

              <button

                onClick={onOpenAiModal}

                className="inline-flex items-center justify-center bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-indigo-800 transition duration-300 transform hover:scale-105"

              >

                <SparkleIcon className="w-5 h-5 mr-2" />

                Ask my AI Assistant

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  </section>

);



// --- Projects Component (NEW DESIGN) ---

const projects = [

  {

    title: 'Project Title 1',

    description: 'A brief description of the project, what it does, and the technologies used. I focused on creating a blazingly fast user experience with a clean, modern design.',

    imageUrl: 'https://placehold.co/600x450/1a237e/ffffff?text=Project+1',

    liveUrl: '#',

    githubUrl: '#',

    tags: ['React', 'Tailwind', 'Firebase']

  },

  {

    title: 'Project Title 2',

    description: 'This project involved complex e-commerce integration with Stripe. The main challenge was ensuring secure, seamless transactions and a robust backend.',

    imageUrl: 'https://placehold.co/600x450/1a237e/ffffff?text=Project+2',

    liveUrl: '#',

    githubUrl: '#',

    tags: ['Next.js', 'Stripe', 'GraphQL']

  },

  {

    title: 'Project Title 3',

    description: 'A full-stack application built with Vue.js and a Node.js backend. This demonstrates my ability to handle both front-end and back-end logic.',

    imageUrl: 'https://placehold.co/600x450/1a237e/ffffff?text=Project+3',

    liveUrl: '#',

    githubUrl: '#',

    tags: ['Vue.js', 'Node.js', 'MongoDB']

  },

];



// NEW ProjectCard

const ProjectCard = ({ project, index }) => {

  const isOdd = index % 2 !== 0;



  return (

    <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center scroll-animate ${index > 0 ? 'mt-20 md:mt-32' : ''}`}>

      {/* Image Column */}

      <div className={`rounded-lg overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 ${isOdd ? 'md:order-2' : ''}`}>

        <img

          src={project.imageUrl}

          alt={`${project.title} Screenshot`}

          className="w-full h-auto object-cover"

          onError={(e) => { e.target.src = 'https://placehold.co/600x450/cccccc/969696?text=Image+Error'; }}

        />

      </div>

     

      {/* Text Column */}

      <div className={` ${isOdd ? 'md:order-1' : ''}`}>

        <h3 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-6">{project.title}</h3>

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">{project.description}</p>

        <div className="mb-6">

          {project.tags.map(tag => (

            <span key={tag} className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full">

              {tag}

            </span>

          ))}

        </div>

        <div className="flex flex-wrap gap-4">

          <a

            href={project.liveUrl}

            className="inline-flex items-center text-white bg-indigo-700 hover:bg-indigo-800 py-3 px-6 rounded-full font-medium transition duration-300"

          >

            Live Demo

            <ArrowRightIcon className="w-5 h-5 ml-2" />

          </a>

          <a

            href={project.githubUrl}

            className="inline-flex items-center text-gray-700 hover:text-indigo-700 py-3 px-6 rounded-full font-medium transition duration-300 border border-gray-300 hover:border-indigo-700"

          >

            GitHub

            <GithubIcon className="w-5 h-5 ml-2" />

          </a>

        </div>

      </div>

    </div>

  );

};



// NEW Projects Section

const Projects = () => (

  <section id="projects" className="py-24 md:py-40 bg-gray-50">

    <div className="container mx-auto px-6 max-w-6xl">

      <h2 className="text-4xl md:text-5xl font-bold text-center text-indigo-900 mb-20 md:mb-32 scroll-animate">

        Featured Projects

      </h2>

      <div className="space-y-16">

        {projects.map((project, index) => (

          <ProjectCard key={project.title} project={project} index={index} />

        ))}

      </div>

    </div>

  </section>

);



// --- Contact Component (NEW DESIGN) ---

const Contact = () => (

  <section id="contact" className="text-white py-24 md:py-40 bg-[linear-gradient(135deg,_#000033,_#1a237e)]">

    <div className="container mx-auto px-6 text-center max-w-3xl scroll-animate">

      <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's build something.</h2>

      <p className="text-xl md:text-2xl text-gray-200 mb-12 font-light">

        Tired of agencies that don't get it? I'm ready to be the reliable partner you're looking for.

      </p>

      <a

        href="mailto:your.email@example.com"

        className="inline-block bg-white text-indigo-900 font-bold py-4 px-12 rounded-full shadow-2xl hover:bg-gray-100 transition duration-300 transform hover:scale-105 text-lg"

      >

        Say Hello

      </a>

    </div>

  </section>

);



// --- Footer Component (Refined) ---

const Footer = () => (

  <footer className="bg-white text-gray-600 py-16">

    <div className="container mx-auto px-6 text-center md:flex md:justify-between md:items-center max-w-6xl">

       <div className="text-lg font-bold text-indigo-900 mb-4 md:mb-0">

         Mohammed

       </div>

      <div className="flex justify-center space-x-8 mb-4 md:mb-0">

        <a href="#" className="hover:text-indigo-700 transition duration-300" aria-label="GitHub">

          <GithubIcon className="w-6 h-6" />

        </a>

        <a href="#" className="hover:text-indigo-700 transition duration-300" aria-label="LinkedIn">

          <LinkedInIcon className="w-6 h-6" />

        </a>

      </div>

       <p className="text-sm">&copy; {new Date().getFullYear()} Mohammed Moheen. All rights reserved.</p>

    </div>

  </footer>

);



// --- Main App Component ---

export default function App() {

  // Activate scroll animation hook

  useScrollAnimation();



  // State for AI Modal

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);



  return (

    <>

      <GlobalStyles />

      <Header />

      <main>

        <Hero />

        <About onOpenAiModal={() => setIsAiModalOpen(true)} />

        <Projects />

        <Contact />

      </main>

      <Footer />

     

      {/* Render AI Modal */}

      <AiAssistantModal

        isOpen={isAiModalOpen}

        onClose={() => setIsAiModalOpen(false)}

      />

    </>

  );

export default function App() {
  // ... all your component code inside ...
}


