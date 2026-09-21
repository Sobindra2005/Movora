import  { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MovieCard } from './MovieCard';

const THRILLER_PROMPT = "Suggest me a movie like Interstellar, highly thriller, mind-bending and visually stunning.";

const AGENTS = [
  { id: 'preference', name: 'Preference Analyzer', action: 'Analyzing semantic preferences...' },
  { id: 'researcher', name: 'Movie Researcher', action: 'Scanning cinematic databases...' },
  { id: 'recommendation', name: 'Recommendation Agent', action: 'Synthesizing matches...' },
];

const DEMO_RECOMMENDATIONS_FUNNY = [
  {
    id: 118340,
    title: "Guardians of the Galaxy",
    poster_path: "/r7eQnl1urv3ua6eQ9XNha82cZgW.jpg",
    vote_average: 8.0,
    overview: "Light on the toaster, but heavy on the raccoon and explosions."
  },
  {
    id: 20352,
    title: "Despicable Me",
    poster_path: "/1lXyH1T6F2K7x0a2717pX15N8fO.jpg",
    vote_average: 7.2,
    overview: "They try to steal the moon. Close enough to your chaotic request."
  },
  {
    id: 15999,
    title: "The Brave Little Toaster",
    poster_path: "/6z4q7lHjYVb4n1tB5J0z5qZ3K0.jpg",
    vote_average: 6.9,
    overview: "Your toaster romance awaits. Not enough cheese monologues though."
  }
];


const AIAssistantModal = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState('');
  const [stage, setStage] = useState('results'); // 'input', 'processing', 'results'
  const [currentAgentIndex, setCurrentAgentIndex] = useState(3);
  const [results, setResults] = useState([]);
  const [recommendationMessage, setRecommendationMessage] = useState('');

  // useEffect(() => {
  //   if (isOpen) {
  //     setStage('input');
  //     setDescription('');
  //     setCurrentAgentIndex(0);
  //   }
  // }, [isOpen]);

  if (!isOpen) return null;

  const handleSurpriseMe = (promptText) => {
    setDescription(promptText);
  };

  const handleStartSearch = async () => {
    if (!description.trim()) return;
    
    setStage('processing');
    setCurrentAgentIndex(0);

    try {
    
    } catch (error) {
      console.error("Workflow failed", error);
      // Fallback
      setResults(DEMO_RECOMMENDATIONS_FUNNY);
      setRecommendationMessage("Sorry, the AI agents encountered an error, but here are some fun recommendations anyway!");
      setStage('results');
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[100]  flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-[#141414] border border-gray-700 p-6 rounded-2xl w-full max-w-2xl mx-auto shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="mb-6 flex items-center space-x-4">
          <div>
            <h2 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">AI Matchmaker</h2>
            <p className="text-sm text-gray-400">Describe what you want to watch</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
          {stage === 'input' && (
            <div className="animate-in fade-in duration-300">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., A sci-fi movie with time travel where the protagonist tries to save their family..."
                className="w-full h-32 bg-black/60 border border-gray-600 text-white rounded-xl p-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none mb-4 placeholder:text-gray-500 text-md"
              />

              <div className="flex flex-wrap gap-2 mb-6">

                <button
                  onClick={() => handleSurpriseMe(THRILLER_PROMPT)}
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center space-x-1 font-medium bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2v4" /><path d="M12 18v4" /><path d="M4.93 4.93l2.83 2.83" /><path d="M16.24 16.24l2.83 2.83" /><path d="M2 12h4" /><path d="M18 12h4" /><path d="M4.93 19.07l2.83-2.83" /><path d="M16.24 7.76l2.83-2.83" /></svg>
                  <span>Sci-Fi Thriller</span>
                </button>
              </div>

              <button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
                disabled={!description.trim()}
                onClick={handleStartSearch}
              >
                <span>Find My Movie</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
                </svg>
              </button>
            </div>
          )}

          {stage === 'processing' && (
            <div className="py-20 flex flex-col items-center justify-center animate-in fade-in duration-300">
              <div className="relative w-16 h-16 mb-8">
                <div className="absolute inset-0 border-2 border-white/10 rounded-full"></div>
                <div className="absolute inset-0 border-2 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
              </div>

              <div className="h-12 w-full relative flex items-center justify-center overflow-hidden">
                {AGENTS.map((agent, index) => {
                  const isActive = index === currentAgentIndex;
                  const isDone = index < currentAgentIndex;

                  return (
                    <div
                      key={agent.id}
                      className={`absolute flex flex-col items-center justify-center transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0 scale-100' :
                          isDone ? 'opacity-0 -translate-y-8 scale-95' :
                            'opacity-0 translate-y-8 scale-95'
                        }`}
                    >
                      <h4 className="text-purple-300 font-medium tracking-wide">
                        {agent.name}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {agent.action}
                      </p>
                    </div>
                  );
                })}
                {currentAgentIndex >= AGENTS.length && (
                  <div className="absolute flex flex-col items-center justify-center transition-all duration-500 opacity-100 translate-y-0">
                    <h4 className="text-green-400 font-medium tracking-wide">
                      Complete
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Displaying results...
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {stage === 'results' && (
            <div className="animate-in slide-in-from-bottom-8 duration-500">
              <div className="mb-6 bg-purple-900/30 p-4 rounded-xl border border-purple-500/20">
                <p className="text-sm text-gray-200">{recommendationMessage}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400">Based on your request, here are your personalized AI matches:</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-4" onClick={onClose}>
                {results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>

              <button
                onClick={() => setStage('input')}
                className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-xl transition-all"
              >
                Try Another Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AIAssistantModal;
