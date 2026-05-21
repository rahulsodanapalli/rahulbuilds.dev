import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, FolderGit2 } from 'lucide-react';
import useTerminalTyping from '../hooks/useTerminalTyping';

// High-fidelity code blocks
const SNIPPETS = [
  {
    name: "ParameterTelemetry.tsx",
    lang: "typescript",
    label: "React + TS Telemetry",
    code: `// React + TS Component managing parameter monitoring
interface ParamViewProps {
  parameterId: string;
  onAlertTrigger: (value: number) => void;
}

export const ParameterTelemetry: React.FC<ParamViewProps> = ({
  parameterId,
  onAlertTrigger
}) => {
  const [data, setData] = useState<number[]>([]);
  
  useEffect(() => {
    const socket = connectTelemetry(parameterId);
    socket.on("update", (val: number) => {
      setData((prev) => [...prev.slice(-30), val]);
      if (val > 8.5) onAlertTrigger(val);
    });
    return () => socket.disconnect();
  }, [parameterId]);
  
  return <TelemetryChart data={data} threshold={8.5} />;
};`
  },
  {
    name: "regulatoryApi.ts",
    lang: "typescript",
    label: "RTK Query API Gate",
    code: `// RTK Query API slice managing government permits
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const regulatoryApi = createApi({
  reducerPath: 'regulatoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/doe' }),
  tagTypes: ['Permits'],
  endpoints: (builder) => ({
    getPermits: builder.query<Permit[], void>({
      query: () => '/permits/active',
      providesTags: ['Permits'],
    }),
    approvePermit: builder.mutation<Permit, string>({
      query: (permitId) => ({
        url: \`/permits/\${permitId}/approve\`,
        method: 'POST',
      }),
      invalidatesTags: ['Permits'],
    }),
  }),
});`
  },
  {
    name: "complianceSlice.ts",
    lang: "typescript",
    label: "Redux State Reducer",
    code: `// Redux State reducer managing active compliance filters
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ComplianceState {
  activeNode: string | null;
  filters: Record<string, string>;
}

const initialState: ComplianceState = {
  activeNode: null,
  filters: {},
};

export const complianceSlice = createSlice({
  name: 'compliance',
  initialState,
  reducers: {
    setNode: (state, action: PayloadAction<string>) => {
      state.activeNode = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {};
    }
  }
});`
  }
];

export default function CodeShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  const { displayedText } = useTerminalTyping(
    SNIPPETS.map(s => s.code),
    12, // Typing Speed (ms per char)
    6000 // Switching delay
  );

  // Helper to colorize lines (simple regex mapping for premium styling)
  const renderColorizedCode = (text: string) => {
    return text.split('\n').map((line, lineIdx) => {
      // Basic comment formatting
      if (line.startsWith('//')) {
        return <div key={lineIdx} className="text-luxury-gold/50 italic">{line}</div>;
      }
      
      // Keywords/Types formatting
      const words = line.split(/(\s+|\(|\)|\{|\}|\[|\]|<|>|=|\+|-|;|,|\.|\/|\`|\:)/);
      return (
        <div key={lineIdx} className="min-h-[1.5em]">
          {words.map((word, wordIdx) => {
            if (['const', 'let', 'export', 'import', 'from', 'return', 'interface', 'extends', 'as', 'type', 'default', 'function'].includes(word)) {
              return <span key={wordIdx} className="text-luxury-gold font-semibold">{word}</span>;
            }
            if (['string', 'number', 'void', 'boolean', 'FC', 'React', 'PayloadAction'].includes(word)) {
              return <span key={wordIdx} className="text-teal-400 font-medium">{word}</span>;
            }
            if (word.startsWith('"') || word.startsWith("'") || word.startsWith('`')) {
              return <span key={wordIdx} className="text-amber-200/90">{word}</span>;
            }
            if (['useState', 'useEffect', 'createApi', 'fetchBaseQuery', 'createSlice'].includes(word)) {
              return <span key={wordIdx} className="text-sky-300">{word}</span>;
            }
            return <span key={wordIdx} className="text-cream-light/80">{word}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <section 
      id="code" 
      className="relative min-h-screen py-32 bg-cream overflow-hidden px-6 md:px-12 flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <Code2 size={16} className="text-luxury-gold" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-luxury-charcoal/60">
                Interactive Telemetry
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-luxury-black font-sans">
              Code <span className="font-serif italic text-luxury-gold font-normal">Showcase</span> & Syntax
            </h2>
          </div>
          <p className="text-xs md:text-sm text-luxury-charcoal/60 max-w-md lg:text-right font-normal">
            Real, production-grade snippets representing architecture deployed across UAE government regulatory systems.
          </p>
        </div>

        {/* Terminal Widget */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9 }}
          className="w-full bg-luxury-black rounded-3xl overflow-hidden shadow-2xl border border-white/5 flex flex-col h-[520px]"
        >
          {/* Top Bar / Mac-Style Controls */}
          <div className="bg-[#1C1C1C] px-6 py-4 flex items-center justify-between border-b border-white/5 select-none shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] block border border-[#E0443E]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] block border border-[#DEA123]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] block border border-[#1AAB29]" />
            </div>
            
            <div className="flex items-center gap-2 font-mono text-[10px] text-white/40 font-bold uppercase tracking-widest">
              <Terminal size={12} className="text-luxury-gold" />
              <span>bash - live-compiler.exe</span>
            </div>
            
            <div className="flex items-center gap-1 text-[10px] text-white/30 font-mono">
              <span>UTF-8</span>
            </div>
          </div>

          {/* Code Workspace Tabs */}
          <div className="bg-[#141414] px-4 py-2 flex items-center gap-1.5 border-b border-white/5 overflow-x-auto shrink-0 scrollbar-none select-none">
            <div className="flex items-center gap-1.5 text-white/40 mr-4 pl-2 font-mono text-[9px] font-bold uppercase tracking-wider">
              <FolderGit2 size={12} />
              <span>src / slices /</span>
            </div>
            
            {SNIPPETS.map((tab, idx) => {
              const isSelected = activeTab === idx;
              return (
                <button
                  key={tab.name}
                  onClick={() => {
                    // Quick-load code block inside the terminal loop
                    setActiveTab(idx);
                  }}
                  className={`px-4 py-2 rounded-xl text-[10px] font-mono tracking-wide transition-all duration-300 border focus:outline-none flex items-center gap-2 interactive ${
                    isSelected 
                      ? 'bg-luxury-black text-luxury-gold border-white/10 shadow-lg' 
                      : 'bg-transparent text-white/40 border-transparent hover:text-white/70'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full block bg-luxury-gold" />
                  {tab.name}
                </button>
              );
            })}
          </div>

          {/* Output / Editor Area */}
          <div className="p-6 md:p-8 flex-1 overflow-y-auto font-mono text-xs text-left bg-luxury-black relative selection:bg-white/10 leading-relaxed scrollbar-thin">
            <div className="absolute top-2 right-4 text-[9px] text-white/20 select-none">
              AUTO-RUNNING COMPILER // SPEED: 12ms
            </div>
            
            <div className="space-y-0.5">
              {renderColorizedCode(displayedText)}
              
              {/* Caret glow */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-1.5 h-4 bg-luxury-gold ml-1.5 align-middle shadow-[0_0_8px_#C5A880]"
              />
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
