import { GoogleGenAI, Type } from "@google/genai";

// --- Configuration ---
const API_KEY = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

// --- UI Elements ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn') as HTMLButtonElement;
const mobileMenu = document.getElementById('mobile-menu') as HTMLDivElement;
const aiInput = document.getElementById('ai-input') as HTMLInputElement;
const aiSubmit = document.getElementById('ai-submit') as HTMLButtonElement;
const aiResults = document.getElementById('ai-results') as HTMLDivElement;
const aiLoader = document.getElementById('ai-loader') as HTMLDivElement;
const navbar = document.getElementById('navbar') as HTMLElement;
const newsletterForm = document.getElementById('newsletter-form') as HTMLFormElement;
const contactForm = document.getElementById('contact-form') as HTMLFormElement;
const themeToggleBtn = document.getElementById('theme-toggle') as HTMLButtonElement;
const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile') as HTMLButtonElement;

// --- Theme Logic ---
function initTheme() {
  const html = document.documentElement;
  // Check local storage or system preference
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
}

function toggleTheme() {
  const html = document.documentElement;
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.theme = 'light';
  } else {
    html.classList.add('dark');
    localStorage.theme = 'dark';
  }
}

// Initialize theme immediately
initTheme();

// Theme Event Listeners
if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener('click', toggleTheme);


// --- Mobile Menu Logic ---
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
  });
}

// --- Scroll Effect for Navbar ---
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('shadow-md');
    // We adjust background opacity via classes in HTML, but here we enforce backdrop logic
    if (document.documentElement.classList.contains('dark')) {
         navbar.classList.remove('bg-white/80', 'dark:bg-neutral-950/80');
         navbar.classList.add('bg-white/95', 'dark:bg-neutral-950/95');
    } else {
         navbar.classList.remove('bg-white/80');
         navbar.classList.add('bg-white/95');
    }
  } else {
    navbar.classList.remove('shadow-md', 'bg-white/95', 'dark:bg-neutral-950/95');
    navbar.classList.add('bg-white/80', 'dark:bg-neutral-950/80');
  }
});

// --- Scroll Reveal Animation ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.1, 
  rootMargin: "0px 0px -50px 0px" 
});

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});

// --- Form Handling (Mock) ---

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('button');
    const input = newsletterForm.querySelector('input');
    const successMsg = document.getElementById('newsletter-success');
    
    if(btn) {
      const originalText = btn.innerText;
      btn.innerText = "Subscribing...";
      btn.disabled = true;
      
      setTimeout(() => {
        newsletterForm.classList.add('hidden');
        if (successMsg) successMsg.classList.remove('hidden');
      }, 1500);
    }
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    const successMsg = document.getElementById('contact-success');
    
    if (btn) {
      btn.innerText = "Sending...";
      btn.disabled = true;
      
      setTimeout(() => {
        contactForm.reset();
        btn.innerText = "Send Message";
        btn.disabled = false;
        if (successMsg) {
           successMsg.classList.remove('hidden');
           setTimeout(() => successMsg.classList.add('hidden'), 5000);
        }
      }, 1500);
    }
  });
}


// --- Gemini AI Logic ---

async function generateBusinessStrategy(query: string) {
  if (!query) return;

  // UI State: Loading
  aiResults.innerHTML = '';
  aiLoader.classList.remove('hidden');
  if(aiSubmit) {
      aiSubmit.disabled = true;
      aiSubmit.innerHTML = `<span class="loading-dots">Thinking</span>`;
  }

  try {
    // Call Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a creative business strategist. 
      For the user's input: "${query}", generate 3 short, punchy marketing slogans and 5 strategic keyword concepts.
      Return strictly a JSON object with two arrays: "slogans" and "keywords".
      Keep slogans under 6 words. Keep keywords single words.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            slogans: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const data = JSON.parse(response.text || '{"slogans":[], "keywords":[]}');
    renderResults(data);

  } catch (error) {
    console.error("Gemini Error:", error);
    aiResults.innerHTML = `<div class="text-red-400 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">Connection error. Please try again.</div>`;
  } finally {
    // UI State: Reset
    aiLoader.classList.add('hidden');
    if (aiSubmit) {
        aiSubmit.disabled = false;
        aiSubmit.innerHTML = `<span>Generate</span><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`;
    }
  }
}

function renderResults(data: { slogans: string[], keywords: string[] }) {
  const container = document.createDocumentFragment();

  if (data.slogans.length === 0 && data.keywords.length === 0) {
     aiResults.innerHTML = `<div class="text-gray-400 italic">No results generated. Try a different prompt.</div>`;
     return;
  }

  // Render Slogans (Large Pills)
  data.slogans.forEach((slogan, index) => {
    const el = document.createElement('div');
    const colors = ['bg-brand-blue', 'bg-brand-red', 'bg-brand-yellow', 'bg-brand-green'];
    const colorClass = colors[index % colors.length];
    
    // Add animation classes
    el.className = `${colorClass} text-white px-8 py-4 rounded-full font-bold text-lg md:text-xl shadow-lg transform transition-all duration-500 hover:scale-105 cursor-default opacity-0 translate-y-4 animate-in`;
    
    // Use setTimeout for stagger effect in vanilla JS
    setTimeout(() => {
        el.classList.remove('opacity-0', 'translate-y-4');
    }, index * 100);
    
    el.textContent = slogan;
    container.appendChild(el);
  });

  // Render Keywords (Small Pills)
  data.keywords.forEach((keyword, index) => {
    const el = document.createElement('div');
    el.className = `bg-gray-800 dark:bg-white/10 text-white border border-gray-700 dark:border-white/10 px-5 py-2 rounded-full font-mono text-sm shadow-md hover:bg-white hover:text-black transition-colors duration-300 cursor-default opacity-0 translate-y-4`;
    
     setTimeout(() => {
        el.classList.remove('opacity-0', 'translate-y-4');
    }, (data.slogans.length * 100) + (index * 50));

    el.textContent = `#${keyword}`;
    container.appendChild(el);
  });

  aiResults.appendChild(container);
}

// --- Event Listeners ---

if (aiSubmit && aiInput) {
  aiSubmit.addEventListener('click', () => {
    generateBusinessStrategy(aiInput.value);
  });

  aiInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      generateBusinessStrategy(aiInput.value);
    }
  });
}