import React, { useState, useEffect, useRef } from 'react';

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
        overflow-x: hidden; /* Prevent potential horizontal scroll */
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

// --- Custom Hook for Scroll Animation (Updated) ---
const useScrollAnimation = (page) => { // Accept page as dependency
  useEffect(() => {
    // Function to set up the observer
    const setupObserver = () => {
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
          threshold: 0.1, 
          rootMargin: '0px 0px -50px 0px', 
        }
      );
  
      targets.forEach((target) => {
        // Reset animation state before observing if needed (optional)
        // target.classList.remove('scroll-animate-visible'); 
        observer.observe(target);
      });
  
      // Return cleanup function for this observer instance
      return () => {
        targets.forEach((target) => {
          if(observer && target) { // Add checks
            observer.unobserve(target);
          }
        });
      };
    };

    // Run setup slightly delayed to allow DOM update after page change
    let currentCleanup = () => {}; // Initialize cleanup function ref
    const timeoutId = setTimeout(() => {
        currentCleanup = setupObserver();
    }, 100); 


    // Cleanup function for the effect
    return () => {
      clearTimeout(timeoutId); // Clear the timeout if effect re-runs before timeout fires
      currentCleanup(); // Run the cleanup from the observer setup
    };

  }, [page]); // Re-run the effect when the page state changes
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

const ArrowRightIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
  </svg>
);

// --- NEW Arrow Left Icon ---
const ArrowLeftIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
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

// --- NEW Mail Icon ---
const MailIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
  </svg>
);


// --- Header Component (Refined with Glassmorphism & Scroll Effect) ---
const Header = ({ setPage, page }) => { // Added page prop
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // State to track scroll
  const [isOnTop, setIsOnTop] = useState(true); // State to track if at very top

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects-target' }, // Target for all projects page
    { name: 'Contact', href: '#contact' },
  ];

  // Effect to handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      // Check if user is at the very top
      setIsOnTop(window.scrollY < 50); // Small threshold

      // Check if user has scrolled past the viewport height (hero section height)
      if (window.scrollY > window.innerHeight * 0.9) { // Trigger slightly before full scroll
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Run once initially
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleNavLinkClick = (e, linkName, href) => {
    e.preventDefault(); // Prevent default anchor jump

    // Special case for Projects link
    if (linkName === 'Projects') {
      setPage('all-projects');
      setIsMobileMenuOpen(false); // Close mobile menu
      return; // Stop further execution for this link
    }
    
    // Function to scroll to the element
    const scrollToElement = () => {
      // Use querySelector for ID selectors
      const targetElement = document.querySelector(href); 
      if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
      } else {
          // Fallback or scroll to top if target doesn't exist (e.g., #hero)
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // If already on home page, scroll immediately
    if (page === 'home') {
      scrollToElement();
    } else {
      // If on 'all-projects' page, switch back to home first, then scroll
      setPage('home'); 
      // Use timeout to allow state update and re-render before scrolling
      setTimeout(scrollToElement, 50); // Small delay might be needed
    }

    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  // Determine header background based on scroll and page state
  const isGlass = page === 'home' && isOnTop; // Only glass if home page AND at the top

  return (
    // Conditionally apply background and border styles based on scroll state and page
    <header className={`
      fixed top-0 left-0 right-0 z-50 shadow-lg 
      transition-colors duration-300 ease-in-out 
      ${isGlass 
        ? 'bg-white/10 backdrop-blur-lg border-b border-white/20' // Glass effect
        : 'bg-[#1a237e]' // Solid blue otherwise
      }
    `}>
      <nav className="container mx-auto px-6 py-5 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Text/icons remain white in both states */}
          <a href="#" onClick={(e) => handleNavLinkClick(e, 'Home', '#hero')} className="text-2xl font-bold text-white">
            Mohammed
          </a>
          <a 
            href="mailto:apexweb.consulting@outlook.com" 
            className="text-white hover:text-gray-200 transition duration-300"
            aria-label="Email Mohammed"
          >
            <MailIcon className="w-5 h-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/mohammed-moheen-b2a668390/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:text-gray-200 transition duration-300"
            aria-label="LinkedIn Profile"
          >
            <LinkedInIcon className="w-5 h-5" />
          </a>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavLinkClick(e, link.name, link.href)} // Pass link name
              className="text-white hover:text-gray-200 transition duration-300 text-sm font-medium" // Keep text white
            >
              {link.name}
            </a>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-btn"
          className="md:hidden text-white z-50" // Keep button white
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
              onClick={(e) => handleNavLinkClick(e, link.name, link.href)} // Pass link name
              className="text-3xl text-gray-800 hover:text-indigo-700 transition duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header> 
  );
};


// --- Hero Component (GLASSMORPHISM) ---
const Hero = () => {
  // The video URL provided by the user
  const videoUrl = 'https://res.cloudinary.com/dkuyjnoae/video/upload/v1761569464/Diverse_Small_Businesses_Thriving_Online_gyjrvn.mp4';

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      
      {/* Background Container */}
      <div className="absolute z-0 top-0 left-0 w-full h-full">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline // Ensures playback on mobile devices
          className="absolute top-0 left-0 w-full h-full object-cover filter blur-sm" // Reduced blur to blur-sm (4px)
          src={videoUrl}
        >
          Your browser does not support the video tag.
        </video>
        
        {/* Dimming Overlay */}
        <div className="absolute inset-0 bg-black/50"></div> {/* Slightly less dim */}
      </div>

      {/* Glassmorphism Content Box */}
      <div className="container mx-auto px-6 relative z-20 flex items-center justify-center">
        {/* The Glass Pane */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-8 md:p-12 text-center max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight text-white scroll-animate">
            Web Consultant.
            <br />
            Problem Solver.
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-light max-w-xl mx-auto mb-8 scroll-animate delay-1">
            I'm Mohammed Moheen, founder of Apex Web Co. I help US businesses fix their outdated, slow websites and turn them into assets that attract customers and build trust.
          </p>
          <a
            href="#projects-target" // Link to featured projects section
            className="mt-8 inline-block bg-indigo-700 text-white font-bold py-4 px-12 rounded-full shadow-xl hover:bg-indigo-800 transition duration-300 transform hover:scale-105 scroll-animate delay-2"
          >
            View My Work
          </a>
        </div>
      </div>
    </section>
  );
};

// --- AI Assistant Modal Component ---
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const AiAssistantModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

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

  // UPDATED: This now calls our own serverless function
  const callGeminiAPI = async (chatHistory) => {
    setIsLoading(true);

    // This is our Netlify function's endpoint, not the Google API
    const apiUrl = '/api/gemini';

    const payload = {
      contents: chatHistory,
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
    };

    let retries = 3;
    let delay = 1000;

    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const result = await response.json(); // This is the response from *our* function
          const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
          
          if (text) {
            return { role: 'model', parts: [{ text }] };
          } else {
            // Check for a block reason, which is a valid response
            if (result.candidates?.[0]?.finishReason === 'SAFETY') {
              return { role: 'model', parts: [{ text: "I'm sorry, I can't provide a response to that topic." }] };
            }
            throw new Error('Invalid response structure from API function.');
          }
        } else {
          throw new Error(`API function request failed with status ${response.status}`);
        }
      } catch (error) {
        console.error('Error calling Gemini API function:', error);
        if (i === retries - 1) {
          return {
            role: 'model',
            parts: [{ text: "Sorry, I'm having trouble connecting right now. Please try again in a moment." }],
          };
        }
        await sleep(delay);
        delay *= 2;
      }
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'model',
          parts: [{ text: "Hello! I'm Port-folio Bot, Mohammed Moheen's AI assistant. How can I help you with questions about his skills, experience, or business approach?" }],
        },
      ]);
    }
  }, [isOpen]);

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
        onClick={(e) => e.stopPropagation()}
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


// --- About Component (Sticky) ---
const About = ({ onOpenAiModal }) => (
  // REMOVED id="about" from here. Added sticky, top-0, and z-10. Header is z-50 so this will stick *under* it.
  <section className="py-24 md:py-40 bg-white sticky top-0 z-10">
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

// --- All Projects Data ---
const allProjectsData = [
    {
      title: 'Care Point Clinic',
      description: 'A Best Multi Specialty Clinic in their city',
      imageUrl: 'https://i.postimg.cc/43KYG9cf/Screenshot-2025-11-11-203349.png',
      liveUrl: 'https://www.behance.net/gallery/235714309/Doctor-Appointment-Telemedicine-Website-UIUX-Design',
      tags: ['Web Design', 'Behance', 'Healthcare']
    },
    {
      title: 'Trevorz Barber Shop',
      description: 'A No #1 Barber Shop in their city.',
      imageUrl: 'https://i.postimg.cc/C5bSyLMF/Screenshot-2025-11-06-010530.png',
      liveUrl: 'https://www.behance.net/gallery/235882623/Barbershop-Website-Exclusive-Mens-SPA?tracking_source=search_projects|barber+website&l=4',
      tags: ['Web Design', 'Behance', 'Barber Shop']
    },
    {
      title: 'Harbour Property Group',
      description: 'Designed and built a client-focused website for Harbour Property Group, specialists in making UK property investment easy and accessible for international investors.',
      imageUrl: 'https://i.postimg.cc/HWQNDkXt/Screenshot-2025-10-27-173118.png',
      liveUrl: 'https://harbour.weblexia.in',
      tags: ['Web Design', 'WordPress', 'Investment']
    },
    {
      title: 'PLNR Personal Finances',
      description: 'Built the digital presence for PLNR, a completely independent, fee-only financial advisor in India. The website highlights their commitment to unbiased advice, offering a full suite of personal finance services without generating commissions or referral fees.',
      imageUrl: 'https://i.postimg.cc/HLmwMX6y/Screenshot-2025-10-27-174809.png',
      liveUrl: 'https://plnr.in/',
      tags: ['Web Design', 'Finance', 'Consulting']
    },
    {
      title: 'ZAMZAM Cars',
      description: 'Developed the digital storefront for Zam Zam Cars, a trusted provider of quality, multi-city car rental services in India, featuring a comprehensive fleet of luxury and standard vehicles for corporate and personal travel.',
      imageUrl: 'https://i.postimg.cc/02xKcPY8/Screenshot-2025-10-27-174832.png',
      liveUrl: 'https://zamzamcars.in/',
      tags: ['Web Development', 'Rental Service', 'Digital Storefront']
    },
    {
      title: 'Carrerfour Supermarket',
      description: 'A promotional Italian-language website for Carrefour, showcasing the supermarket\'s commitment to quality, convenience, and a wide range of house brands for daily shopping.',
      imageUrl: 'https://i.postimg.cc/QCyb0WQW/Screenshot-2025-10-29-142044.png',
      liveUrl: 'https://carrerfour.weblexia.in/', // Added URL
      tags: ['Web Design', 'Supermarket', 'Promotion']
    },
    {
      title: 'LSS',
      description: 'A German-language site specializing in the curation and trade of high-quality facsimiles and historical library registers, dedicated to preserving and making accessible the heritage of rare manuscripts for collectors and institutions worldwide.',
      imageUrl: 'https://i.postimg.cc/KvCfTBcH/Screenshot-2025-10-29-142058.png',
      liveUrl: 'https://digitalama.weblexia.in/#about', // Added URL
      tags: ['Web Design', 'Manuscripts', 'German']
    },
    {
      title: 'BIITS (B-Informative IT Services)',
      description: 'A professional website for BIITS (B-Informative IT Services), an award-winning Business Intelligence and Digital Consulting company, offering services like Data Warehousing, Data Integration, Advanced Analytics, and Software Development.',
      imageUrl: 'https://i.postimg.cc/P5Z4QJP3/Screenshot-2025-10-29-142105.png',
      liveUrl: 'https://biits.weblexia.in/', // Added URL
      tags: ['Web Development', 'Business Intelligence', 'Consulting']
    },
  ];

// --- Project Card Component (Reusable) ---
const ProjectCard = ({ project, index }) => {
  const isOdd = index % 2 !== 0;

  return (
    // Added scroll-animate class for animations on the All Projects page too
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center scroll-animate ${index > 0 ? 'mt-16 md:mt-24' : ''}`}>
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
          {project.liveUrl && project.liveUrl !== '#' && ( // Only show button if URL exists and is not '#'
            <a 
              href={project.liveUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-white bg-indigo-700 hover:bg-indigo-800 py-3 px-6 rounded-full font-medium transition duration-300"
            >
              Live Demo
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Featured Projects Section (Shows only first 3) ---
const FeaturedProjects = ({ setPage }) => ( 
  // Changed ID slightly so header link doesn't conflict
  <section id="projects-target" className="py-24 md:py-40 bg-gray-50 relative z-20"> 
    <div className="container mx-auto px-6 max-w-6xl">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-indigo-900 mb-20 md:mb-32 scroll-animate">
        Featured Projects
      </h2>
      <div className="space-y-16">
        {/* Slice the array to show only the first 3 projects */}
        {allProjectsData.slice(0, 3).map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
      {/* View More Button */}
      <div className="text-center mt-20 md:mt-24 scroll-animate delay-3">
          <button
            onClick={() => setPage('all-projects')}
            className="inline-flex items-center text-indigo-700 hover:text-white border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-full text-lg px-8 py-3 text-center transition duration-300"
          >
            View More Projects
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
      </div>
    </div> {/* This closing div was missing */}
  </section> 
); // Fixed: Added closing parenthesis

// --- NEW All Projects Page Component ---
const AllProjectsPage = ({ setPage }) => (
    <section id="all-projects" className="py-32 md:py-40 bg-gray-50"> {/* Added padding top */}
        <div className="container mx-auto px-6 max-w-6xl">
             {/* Back Button */}
            <div className="mb-12 md:mb-16">
                <button
                    onClick={() => setPage('home')}
                    className="inline-flex items-center text-indigo-700 hover:text-indigo-900 font-medium transition duration-300 group"
                >
                    <ArrowLeftIcon className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                    Back to Home
                </button>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-center text-indigo-900 mb-20 md:mb-32 scroll-animate">
                All Projects
            </h2>
            <div className="space-y-16">
                {allProjectsData.map((project, index) => (
                    <ProjectCard key={project.title} project={project} index={index} />
                ))}
            </div>
        </div>
    </section>
);

// --- Contact Component (NEW DESIGN) ---
const Contact = () => (
  // Added relative and z-30 to slide over the Projects section
  <section id="contact" className="text-white py-24 md:py-40 bg-[linear-gradient(135deg,_#000033,_#1a237e)] relative z-30">
    <div className="container mx-auto px-6 text-center max-w-3xl scroll-animate">
      <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's build something.</h2>
      <p className="text-xl md:text-2xl text-gray-200 mb-12 font-light">
        Tired of agencies that don't get it? I'm ready to be the reliable partner you're looking for.
      </p>
      <a
        href="mailto:apexweb.consulting@outlook.com"
        className="inline-block bg-white text-indigo-900 font-bold py-4 px-12 rounded-full shadow-2xl hover:bg-gray-100 transition duration-300 transform hover:scale-105 text-lg"
      >
        Say Hello
      </a>
    </div>
  </section>
);

// --- Footer Component (Refined) ---
const Footer = () => (
  // Added relative and z-30
  <footer className="bg-white text-gray-600 py-16 relative z-30">
    <div className="container mx-auto px-6 text-center md:flex md:justify-between md:items-center max-w-6xl">
       <div className="text-lg font-bold text-indigo-900 mb-4 md:mb-0">
         Mohammed
       </div>
      <div className="flex justify-center space-x-8 mb-4 md:mb-0">
        <a 
          href="https://www.linkedin.com/in/mohammed-moheen-b2a668390/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-indigo-700 transition duration-300" 
          aria-label="LinkedIn"
        >
          <LinkedInIcon className="w-6 h-6" />
        </a>
      </div>
       <p className="text-sm">&copy; {new Date().getFullYear()} Mohammed Moheen. All rights reserved.</p>
    </div>
  </footer>
);

// --- Main App Component ---
export default function App() {
  // State for current page view
  const [page, setPage] = useState('home'); // 'home' or 'all-projects'
  
  // Activate scroll animation hook, pass page as dependency
  useScrollAnimation(page); 

  // State for AI Modal
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);


  return (
    <>
      <GlobalStyles />
      {/* Pass setPage and page to Header */}
      <Header setPage={setPage} page={page}/> 
      
      {page === 'home' ? (
        <main>
          <Hero />
          {/* Wrap sticky sections in a relative div to manage z-index context */}
          <div className="relative">
            {/* Add a new div with the ID for the anchor link to target */}
            <div id="about" className="relative pt-1"> 
              <About onOpenAiModal={() => setIsAiModalOpen(true)} />
            </div>
            {/* Pass setPage */}
            <FeaturedProjects setPage={setPage} /> 
            <div id="contact" className="relative"> {/* Added target div for contact */}
              <Contact />
            </div>
          </div>
        </main>
      ) : (
        <main>
            {/* Pass setPage */}
            <AllProjectsPage setPage={setPage} /> 
        </main>
      )}

      <Footer />
      
      {/* Render AI Modal */}
      <AiAssistantModal 
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
    </>
  );
}
