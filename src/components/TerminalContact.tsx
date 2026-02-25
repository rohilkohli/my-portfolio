import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Send, CheckCircle } from 'lucide-react';

export function TerminalContact() {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<string[]>([
    '> System initialized...',
    '> Connection established.',
    "> Type 'help' for available commands or just say hi."
  ]);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const activateAdminMode = () => {
    document.body.classList.add('admin-mode-active');
    setLogs(prev => [
      ...prev,
      '> ADMIN_MODE accepted.',
      '> Triggering full-stack glitch layer...',
      '> Primary spectrum shifted to neon orange for 5s.',
      '> Special Recognition: Nawab Protocol // UNLOCKED'
    ]);

    window.setTimeout(() => {
      document.body.classList.remove('admin-mode-active');
      setLogs(prev => [...prev, '> Admin mode ended. Cyan systems restored.']);
    }, 5000);
  };



  useEffect(() => {
    return () => {
      document.body.classList.remove('admin-mode-active');
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setLogs(prev => [...prev, `> User: ${userMessage}`]);
    setInput('');

    // Command handling
    const command = userMessage.toLowerCase();

    if (command === 'help') {
      setLogs(prev => [
        ...prev,
        '> Available commands:',
        '  - help: Show this list',
        '  - clear: Clear terminal',
        '  - about: Who am I?',
        '  - projects: List my works',
        '  - email: Get contact email',
        '  - github: Open GitHub profile',
        '  - [any text]: Send me a message'
      ]);
      return;
    }

    if (command === 'clear') {
      setLogs(['> Terminal cleared.', '> Ready.']);
      return;
    }

    if (command === 'about') {
      setLogs(prev => [
        ...prev,
        '> Rohil Kohli',
        '> Software Developer & B.Tech Student at BITS Pilani.',
        '> Passionate about building digital experiences that matter.'
      ]);
      return;
    }

    if (command === 'projects') {
      setLogs(prev => [
        ...prev,
        '> Fetching projects...',
        '  1. Fintech Dashboard',
        '  2. Neon Commerce',
        '  3. AI Assistant',
        '  4. Crypto Exchange',
        '  5. Spatial Audio',
        '  6. Health Tracker',
        "> Type 'help' for more."
      ]);
      return;
    }

    if (command === 'email') {
      setLogs(prev => [...prev, '> Contact: hello@portfolio.design']);
      return;
    }

    if (command === 'github') {
      setLogs(prev => [...prev, '> Opening GitHub...']);
      window.open('https://github.com/rohilkohli', '_blank');
      return;
    }

    if (command === 'admin_mode' || command === 'unlock_nawab' || command === 'bits_mode') {
      activateAdminMode();
      return;
    }

    // Default: Send message simulation
    setStatus('sending');

    // Simulate sending
    setTimeout(() => {
      setLogs(prev => [...prev, '> Transmitting data packets...', '> Encrypting message...']);

      setTimeout(() => {
        setLogs(prev => [...prev, '> Message sent successfully.', '> Status: 200 OK']);
        setStatus('sent');

        setTimeout(() => {
          setStatus('idle');
          setLogs(prev => [...prev, '> Ready for next command.']);
        }, 3000);
      }, 1500);
    }, 800);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden font-mono text-sm shadow-2xl">
      {/* Terminal Header */}
      <div className="bg-[#1a1a1a] px-4 py-2 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[#00f0ff]" />
          <span className="text-white/60 text-xs">contact_protocol.exe</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 h-64 flex flex-col">
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-1 mb-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-2"
        >
          {logs.map((log, i) => (
            <motion.div
              key={`${log}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${log.startsWith('> User:') ? 'text-[#00f0ff]' : 'text-white/70'}`}
            >
              {log}
            </motion.div>
          ))}
          {status === 'sending' && (
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-[#00f0ff]"
            >
              _ Processing...
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="flex gap-2 items-center border-t border-white/10 pt-4">
          <span className="text-[#00f0ff] font-bold">{'>'}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={status === 'sent' ? 'Message sent.' : 'Type your message...'}
            disabled={status !== 'idle'}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/30 focus:ring-0"
            autoFocus
          />
          <button
            type="submit"
            disabled={status !== 'idle' || !input.trim()}
            className="text-white/40 hover:text-[#00f0ff] disabled:opacity-30 disabled:hover:text-white/40 transition-colors"
          >
            {status === 'sent' ? <CheckCircle size={18} /> : <Send size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
}
