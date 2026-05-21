import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TermIcon, FolderGit2, Activity, Play } from 'lucide-react';
import useTerminalTyping from '../hooks/useTerminalTyping';

// High-fidelity production-grade snippets
const SNIPPETS = [
  {
    name: "ParameterTelemetry.tsx",
    lang: "typescript",
    label: "React + TS Telemetry Monitor",
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
    label: "RTK Query API Endpoint Gates",
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
    label: "Redux State Store Slice",
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
    12, // Custom Typing Speed (ms per char)
    6000 // Transition timing delay
  );

  const handleTabClick = (idx: number) => {
    setActiveTab(idx);
  };

  // High-fidelity luxury light-theme syntax highlighter
  const renderColorizedCode = (text: string) => {
    return text.split('\n').map((line, lineIdx) => {
      if (line.trim().startsWith('//')) {
        return <div key={lineIdx} className="text-muted/50 italic select-none font-mono">{line}</div>;
      }

      const words = line.split(/(\s+|\(|\)|\{|\}|\[|\]|<|>|=|\+|-|;|,|\.|\/|\`|\:)/);
      return (
        <div key={lineIdx} className="min-h-[1.5em] font-mono text-deep-black">
          {words.map((word, wordIdx) => {
            if (['const', 'let', 'export', 'import', 'from', 'return', 'interface', 'extends', 'as', 'type', 'default', 'function'].includes(word)) {
              return <span key={wordIdx} className="text-burnt-orange font-semibold font-mono">{word}</span>;
            }
            if (['string', 'number', 'void', 'boolean', 'FC', 'React', 'PayloadAction'].includes(word)) {
              return <span key={wordIdx} className="text-deep-black font-bold font-mono">{word}</span>;
            }
            if (word.startsWith('"') || word.startsWith("'") || word.startsWith('`')) {
              return <span key={wordIdx} className="text-secondary-gray font-mono italic">{word}</span>;
            }
            if (['useState', 'useEffect', 'createApi', 'fetchBaseQuery', 'createSlice'].includes(word)) {
              return <span key={wordIdx} className="text-burnt-orange/80 font-bold font-mono">{word}</span>;
            }
            return <span key={wordIdx} className="text-deep-black font-mono">{word}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <section
      id="code"
      className="relative min-h-screen py-32 bg-cream overflow-hidden px-6 md:px-12 flex items-center bg-noise border-b border-border-cream"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">

        {/* Section Header */}
        <div className="mb-20 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-burnt-orange font-sans">
                COMPILATION MONITOR & CORE ENGINE
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-light tracking-tight text-deep-black">
              Code <span className="italic font-normal text-burnt-orange">Showcase</span>
            </h2>
          </div>
          <p className="text-sm text-body max-w-sm lg:text-right font-sans font-light leading-relaxed">
            Clean, modular snippets representing enterprise architectures built on top of TypeScript, RTK Query, and state caches.
          </p>
        </div>

        {/* Terminal Widget */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9 }}
          className="w-full bg-card-white rounded-2xl overflow-hidden shadow-minimal border border-border-cream flex flex-col h-[520px]"
        >
          {/* Top Bar / Mac-Style Controls */}
          <div className="bg-cream px-6 py-4 flex items-center justify-between border-b border-border-cream select-none shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-deep-black/10 border border-border-cream block" />
              <span className="w-2.5 h-2.5 rounded-full bg-deep-black/10 border border-border-cream block" />
              <span className="w-2.5 h-2.5 rounded-full bg-deep-black/10 border border-border-cream block" />
            </div>

            <div className="flex items-center gap-2 font-sans text-[10px] text-secondary-gray font-semibold uppercase tracking-wider">
              <TermIcon size={12} className="text-burnt-orange" />
              <span>live-compiler.ts</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-muted/60 font-sans select-none font-medium">
              <Activity size={12} className="text-burnt-orange animate-pulse" />
              <span>STATUS: STABLE</span>
            </div>
          </div>

          {/* Code Workspace Tabs */}
          <div className="bg-cream/40 px-4 py-2.5 flex items-center gap-1.5 border-b border-border-cream overflow-x-auto shrink-0 scrollbar-none select-none">
            <div className="flex items-center gap-1.5 text-muted/50 mr-4 pl-2 font-sans text-[10px] font-bold uppercase tracking-wider">
              <FolderGit2 size={12} className="text-burnt-orange" />
              <span>src / slices /</span>
            </div>

            {SNIPPETS.map((tab, idx) => {
              const isSelected = activeTab === idx;
              return (
                <button
                  key={tab.name}
                  onClick={() => handleTabClick(idx)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-mono tracking-wider transition-all duration-300 border focus:outline-none flex items-center gap-2 ${isSelected
                      ? 'bg-deep-black text-cream border-deep-black font-semibold'
                      : 'bg-card-white text-secondary-gray border-border-cream/80 hover:text-burnt-orange'
                    }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full block ${isSelected ? 'bg-burnt-orange animate-pulse' : 'bg-secondary-gray/20'}`} />
                  {tab.name}
                </button>
              );
            })}
          </div>

          {/* Output / Editor Area */}
          <div className="p-6 md:p-8 flex-1 overflow-y-auto font-mono text-[12px] text-left bg-card-white relative selection:bg-burnt-orange/10 leading-relaxed scrollbar-none">
            <div className="absolute top-3 right-5 text-[9px] text-muted/40 select-none flex items-center gap-1.5 font-bold font-sans tracking-wide">
              <Play size={10} className="text-burnt-orange animate-pulse" />
              <span>LIVE CORE VIEW</span>
            </div>

            <div className="space-y-0.5">
              {renderColorizedCode(displayedText)}

              {/* Caret Block */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-1.5 h-4 bg-burnt-orange ml-1.5 align-middle"
              />
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
