import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';

const PERSONAS = {
  anshuman: {
    id: 'anshuman',
    name: 'Anshuman Singh',
    title: 'Co-Founder, Scaler Academy',
    subtitle: 'Ex-Facebook Tech Lead • ACM ICPC World Finalist',
    color: '#FF6B35',
    gradient: 'linear-gradient(135deg, #FF6B35 0%, #c0392b 100%)',
    glow: 'rgba(255,107,53,0.18)',
    avatar: 'AS',
    tagline: '"Talk is cheap. Show me the code."',
    description: 'No-nonsense. Outcome-driven. Ecosystem builder.',
    suggestions: [
      'Should I learn AI agents or Backend Development?',
      'Why join Scaler over free YouTube tutorials?',
      'How do I think like a product engineer?',
      "What's the most common mistake junior devs make?",
    ],
  },
  abhimanyu: {
    id: 'abhimanyu',
    name: 'Abhimanyu Saxena',
    title: 'Co-Founder, Scaler Academy',
    subtitle: 'Ex-Software Architect @ Fab.com, New York',
    color: '#00D4AA',
    gradient: 'linear-gradient(135deg, #00D4AA 0%, #0099cc 100%)',
    glow: 'rgba(0,212,170,0.15)',
    avatar: 'AX',
    tagline: '"Knowledge, Capability, Skills — in that order."',
    description: 'Calm. Analytical. Architect of life outcomes.',
    suggestions: [
      "Should I get a Master's degree to stay competitive?",
      'How do I prepare for a senior engineering role?',
      'What motivates you to keep building Scaler?',
      'How do I align my career compass with the right map?',
    ],
  },
  kshitij: {
    id: 'kshitij',
    name: 'Kshitij Mishra',
    title: 'Senior Instructor, Scaler Academy',
    subtitle: 'LLD Expert • Design Patterns Specialist',
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #5b21b6 100%)',
    glow: 'rgba(139,92,246,0.15)',
    avatar: 'KM',
    tagline: '"Refactor first, ask questions later."',
    description: 'Systematic. Precise. The LLD Disciplinarian.',
    suggestions: [
      'Can you explain the Flyweight pattern?',
      'How do I apply SOLID principles to my code?',
      "What's the difference between Adapter and Proxy?",
      'How should I approach a BookMyShow design problem?',
    ],
  },
};

function TypingIndicator() {
  return (
    <div className="typing-indicator">
      <span /><span /><span />
    </div>
  );
}

function MessageBubble({ msg, persona }) {
  const isUser = msg.role === 'user';
  // Bold markdown (**text**) renderer
  const renderContent = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith('**') && part.endsWith('**')
        ? <strong key={i}>{part.slice(2, -2)}</strong>
        : part
    );
  };
  return (
    <div className={`message ${isUser ? 'message--user' : 'message--ai'}`}>
      {!isUser && (
        <div className="msg-avatar" style={{ background: persona.gradient }}>
          {persona.avatar}
        </div>
      )}
      <div className={`bubble ${isUser ? 'bubble--user' : 'bubble--ai'}`}>
        {renderContent(msg.content)}
      </div>
    </div>
  );
}

export default function Home() {
  const [activePersona, setActivePersona] = useState('anshuman');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const persona = PERSONAS[activePersona];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const switchPersona = (id) => {
    if (id === activePersona) { setSidebarOpen(false); return; }
    setActivePersona(id);
    setMessages([]);
    setError(null);
    setInput('');
    setSidebarOpen(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendMessage = async (text) => {
    const content = (text || input).trim();
    if (!content || isTyping) return;
    setInput('');
    setError(null);
    const updated = [...messages, { role: 'user', content }];
    setMessages(updated);
    setIsTyping(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated, persona: activePersona }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');
      setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
    } catch (e) {
      setError(e.message || 'Failed to get a response. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      <Head>
        <title>Scaler Personas | AI Chatbot</title>
        <meta name="description" content="Chat with Scaler Academy's team — Anshuman Singh, Abhimanyu Saxena & Kshitij Mishra. AI-powered persona chatbot." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div className="app" style={{ '--pc': persona.color, '--pg': persona.gradient, '--pglow': persona.glow }}>

        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && <div className="backdrop" onClick={() => setSidebarOpen(false)} />}

        {/* ── SIDEBAR ── */}
        <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
          <div className="sidebar-header">
            <div className="logo">
              <span className="logo-icon">⚡</span>
              <span className="logo-text">Scaler Personas</span>
            </div>
            <p className="logo-sub">Choose your mentor</p>
          </div>

          <nav className="persona-nav">
            {Object.values(PERSONAS).map((p) => (
              <button
                key={p.id}
                id={`sidebar-btn-${p.id}`}
                className={`pcard ${activePersona === p.id ? 'pcard--active' : ''}`}
                onClick={() => switchPersona(p.id)}
                style={{ '--cc': p.color, '--cglow': p.glow }}
                aria-pressed={activePersona === p.id}
              >
                <div className="pcard-avatar" style={{ background: p.gradient }}>{p.avatar}</div>
                <div className="pcard-info">
                  <span className="pcard-name">{p.name}</span>
                  <span className="pcard-role">{p.title}</span>
                </div>
                {activePersona === p.id && <div className="pcard-dot" />}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <p>Powered by Google Gemini</p>
            <p>© 2025 Scaler Academy</p>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="main">

          {/* Header */}
          <header className="topbar">
            <button id="hamburger" className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Menu">
              <span /><span /><span />
            </button>
            <div className="topbar-persona">
              <div className="topbar-avatar" style={{ background: persona.gradient }}>{persona.avatar}</div>
              <div>
                <h1 className="topbar-name">{persona.name}</h1>
                <p className="topbar-sub">{persona.subtitle}</p>
              </div>
            </div>
            <div className="topbar-tabs">
              {Object.values(PERSONAS).map((p) => (
                <button
                  key={p.id}
                  id={`tab-${p.id}`}
                  className={`ttab ${activePersona === p.id ? 'ttab--active' : ''}`}
                  onClick={() => switchPersona(p.id)}
                  style={{ '--tc': p.color }}
                >
                  {p.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </header>

          {/* Chat / Welcome */}
          <div className="chat-area">
            {messages.length === 0 ? (
              <div className="welcome">
                <div className="welcome-glow" style={{ background: persona.glow }} />
                <div className="welcome-avatar" style={{ background: persona.gradient }}>{persona.avatar}</div>
                <h2 className="welcome-name">{persona.name}</h2>
                <p className="welcome-title">{persona.title}</p>
                <p className="welcome-tagline">{persona.tagline}</p>
                <p className="welcome-desc">{persona.description}</p>
                <div className="chips-section">
                  <p className="chips-label">Try asking →</p>
                  <div className="chips">
                    {persona.suggestions.map((s, i) => (
                      <button
                        key={i}
                        id={`chip-${activePersona}-${i}`}
                        className="chip"
                        onClick={() => sendMessage(s)}
                      >{s}</button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="messages">
                {messages.map((m, i) => (
                  <MessageBubble key={i} msg={m} persona={persona} />
                ))}
                {isTyping && (
                  <div className="message message--ai">
                    <div className="msg-avatar" style={{ background: persona.gradient }}>{persona.avatar}</div>
                    <div className="bubble bubble--ai"><TypingIndicator /></div>
                  </div>
                )}
                {error && (
                  <div className="error-banner">
                    <span>⚠️</span><p>{error}</p>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            )}
          </div>

          {/* Quick chips during chat */}
          {messages.length > 0 && !isTyping && (
            <div className="quick-chips">
              {persona.suggestions.slice(0, 2).map((s, i) => (
                <button key={i} id={`qchip-${activePersona}-${i}`} className="chip chip--sm" onClick={() => sendMessage(s)}>{s}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="input-area">
            <div className="input-row">
              <textarea
                ref={inputRef}
                id="chat-input"
                className="chat-input"
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={`Ask ${persona.name.split(' ')[0]} anything...`}
                disabled={isTyping}
              />
              <button
                id="send-button"
                className="send-btn"
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
                aria-label="Send"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <p className="input-hint">Enter to send · Shift+Enter for newline</p>
          </div>
        </main>
      </div>
    </>
  );
}
