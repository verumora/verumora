import React, { useState } from 'react';
import { Sparkles, Loader2, RefreshCw, Camera } from 'lucide-react';
import { generateProductConcept, generateCopywriting } from '../services/geminiService';
import { LoadingState } from '../types';

const AiDemo: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [imageState, setImageState] = useState<LoadingState>(LoadingState.IDLE);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedCopy, setGeneratedCopy] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setImageState(LoadingState.LOADING);
    setErrorMsg('');
    setGeneratedImage(null);
    setGeneratedCopy(null);

    // We run these independently so if Image fails (due to quota/region), Copy still works.
    const imagePromise = generateProductConcept(prompt)
        .catch(error => {
            console.error("Image Gen Failed:", error);
            // Return null but extract error message for UI
            const msg = error?.message || error?.toString() || "";
            if (msg.includes("403")) setErrorMsg("Image Gen: Access Denied (Check API Key).");
            else if (msg.includes("404")) setErrorMsg("Image Gen: Model Not Found in Region.");
            else setErrorMsg("Image Generation Failed (Service Busy).");
            return null;
        });

    const copyPromise = generateCopywriting(prompt)
        .catch(error => {
            console.error("Copy Gen Failed:", error);
            return "Copy generation unavailable.";
        });

    const [imgResult, copyResult] = await Promise.all([imagePromise, copyPromise]);

    setGeneratedCopy(copyResult);

    if (imgResult) {
        setGeneratedImage(imgResult);
        setImageState(LoadingState.SUCCESS);
        setErrorMsg(''); // Clear error if image worked
    } else {
        // Image failed, but we might have copy
        setImageState(LoadingState.ERROR);
        // Error message is already set in the catch block above
    }
  };

  return (
    <section id="ai-lab" className="py-24 md:py-32 bg-black relative border-y border-neutral-900 scroll-mt-24 md:scroll-mt-32">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-center">
          
          {/* Control Panel */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-neutral-800 rounded-full mb-6 md:mb-8">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] md:text-xs font-mono text-neutral-400 uppercase">Gemini 2.5 Flash (Nano Banana)</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 md:mb-6">
              Visualize <br /> The Future.
            </h2>
            <p className="text-neutral-400 text-sm md:text-lg mb-8 md:mb-12 leading-relaxed">
              Experience our AI Product Shoot service. Describe your product, and watch our neural networks hallucinate a professional studio shot in real-time.
            </p>

            <div className="space-y-6">
              <div className="relative group">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., A futuristic sneaker made of obsidian..."
                  className="w-full bg-neutral-900 border-b-2 border-neutral-800 p-3 md:p-6 text-base md:text-xl outline-none focus:border-white transition-colors placeholder:text-neutral-700 text-white"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600">
                    <Sparkles size={18} className="md:w-5 md:h-5" />
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={imageState === LoadingState.LOADING || !prompt}
                className="w-full bg-white text-black py-4 md:py-6 text-sm md:text-xl font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-4"
              >
                {imageState === LoadingState.LOADING ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" /> Generating Asset...
                  </>
                ) : (
                  'Generate Concept'
                )}
              </button>
              
              {errorMsg && (
                  <div className="mt-4 border border-red-900/50 bg-red-950/20 p-4">
                    <p className="text-red-500 font-mono text-xs md:text-sm font-bold uppercase mb-1">Status Alert</p>
                    <p className="text-red-400 font-mono text-xs md:text-sm">{errorMsg}</p>
                  </div>
              )}
            </div>
          </div>

          {/* Display Area */}
          <div className="relative aspect-square bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-hidden group">
            {generatedImage ? (
              <div className="relative w-full h-full">
                  <img
                    src={generatedImage}
                    alt="AI Generated"
                    className="w-full h-full object-cover animate-in fade-in duration-1000"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6 md:p-8">
                      {generatedCopy && (
                        <>
                            <p className="text-[10px] md:text-xs font-mono text-neutral-400 mb-1 md:mb-2">AI GENERATED COPY</p>
                            <h3 className="text-lg md:text-2xl font-bold uppercase italic">"{generatedCopy}"</h3>
                        </>
                      )}
                  </div>
                  <button 
                    onClick={() => setImageState(LoadingState.IDLE)}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black p-2 rounded-full backdrop-blur-md transition-all"
                  >
                      <RefreshCw size={18} />
                  </button>
              </div>
            ) : (
              <div className="text-center p-8 md:p-12 w-full">
                {imageState === LoadingState.LOADING ? (
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-neutral-800 border-t-white rounded-full animate-spin mb-4 md:mb-6"></div>
                        <p className="font-mono text-xs md:text-sm text-neutral-500 animate-pulse">RENDERING PIXELS...</p>
                    </div>
                ) : (
                    <div className="border border-dashed border-neutral-800 p-8 md:p-12 rounded-full mx-auto w-fit">
                        <Camera className="text-neutral-700 mx-auto mb-4 w-10 h-10 md:w-12 md:h-12" />
                        <p className="text-neutral-600 font-mono text-xs md:text-sm uppercase text-center">Waiting for Input Data</p>
                    </div>
                )}
                {/* Fallback: Show copy even if image failed */}
                {!generatedImage && generatedCopy && (
                    <div className="mt-8 border-t border-neutral-800 pt-6">
                        <p className="text-[10px] font-mono text-neutral-500 mb-2">GENERATED CONCEPT (IMAGE FAILED)</p>
                        <h3 className="text-xl font-bold italic text-neutral-300">"{generatedCopy}"</h3>
                    </div>
                )}
              </div>
            )}
            
            {/* Decorative Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-10" 
                 style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AiDemo;





// import React, { useState } from 'react';
// import { Sparkles, Loader2, RefreshCw, Camera } from 'lucide-react';
// import { generateProductConcept, generateCopywriting } from '../services/geminiService';
// import { LoadingState } from '../types';

// const AiDemo: React.FC = () => {
//   const [prompt, setPrompt] = useState('');
//   const [imageState, setImageState] = useState<LoadingState>(LoadingState.IDLE);
//   const [generatedImage, setGeneratedImage] = useState<string | null>(null);
//   const [generatedCopy, setGeneratedCopy] = useState<string | null>(null);
//   const [errorMsg, setErrorMsg] = useState<string>('');

//   const handleGenerate = async () => {
//     if (!prompt.trim()) return;

//     setImageState(LoadingState.LOADING);
//     setErrorMsg('');
//     setGeneratedImage(null);
//     setGeneratedCopy(null);

//     try {
//       // Parallel execution for speed
//       const [imgResult, copyResult] = await Promise.all([
//           generateProductConcept(prompt),
//           generateCopywriting(prompt)
//       ]);

//       if (imgResult) {
//         setGeneratedImage(imgResult);
//         setGeneratedCopy(copyResult);
//         setImageState(LoadingState.SUCCESS);
//       } else {
//         setErrorMsg("Could not generate image. API Key may be restricted.");
//         setImageState(LoadingState.ERROR);
//       }
//     } catch (error) {
//       setErrorMsg("AI Service Unavailable.");
//       setImageState(LoadingState.ERROR);
//     }
//   };

//   return (
//     <section id="ai-lab" className="py-24 md:py-32 bg-black relative border-y border-neutral-900 scroll-mt-24 md:scroll-mt-32">
//       <div className="container mx-auto px-6">
//         <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-center">
          
//           {/* Control Panel */}
//           <div>
//             <div className="inline-flex items-center gap-2 px-3 py-1 border border-neutral-800 rounded-full mb-6 md:mb-8">
//                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//                 <span className="text-[10px] md:text-xs font-mono text-neutral-400 uppercase">Gemini 2.5 Powered</span>
//             </div>
//             <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 md:mb-6">
//               Visualize <br /> The Future.
//             </h2>
//             <p className="text-neutral-400 text-sm md:text-lg mb-8 md:mb-12 leading-relaxed">
//               Experience our AI Product Shoot service. Describe your product, and watch our neural networks hallucinate a professional studio shot in real-time.
//             </p>

//             <div className="space-y-6">
//               <div className="relative group">
//                 <input
//                   type="text"
//                   value={prompt}
//                   onChange={(e) => setPrompt(e.target.value)}
//                   placeholder="E.g., A futuristic sneaker made of obsidian..."
//                   className="w-full bg-neutral-900 border-b-2 border-neutral-800 p-3 md:p-6 text-base md:text-xl outline-none focus:border-white transition-colors placeholder:text-neutral-700 text-white"
//                 />
//                 <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600">
//                     <Sparkles size={18} className="md:w-5 md:h-5" />
//                 </div>
//               </div>

//               <button
//                 onClick={handleGenerate}
//                 disabled={imageState === LoadingState.LOADING || !prompt}
//                 className="w-full bg-white text-black py-4 md:py-6 text-sm md:text-xl font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-4"
//               >
//                 {imageState === LoadingState.LOADING ? (
//                   <>
//                     <Loader2 className="animate-spin w-5 h-5" /> Generating Asset...
//                   </>
//                 ) : (
//                   'Generate Concept'
//                 )}
//               </button>
              
//               {errorMsg && (
//                   <p className="text-red-500 font-mono text-xs md:text-sm mt-2 border border-red-900/50 p-2 bg-red-950/20">{errorMsg}</p>
//               )}
//             </div>
//           </div>

//           {/* Display Area */}
//           <div className="relative aspect-square bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-hidden group">
//             {imageState === LoadingState.SUCCESS && generatedImage ? (
//               <div className="relative w-full h-full">
//                   <img
//                     src={generatedImage}
//                     alt="AI Generated"
//                     className="w-full h-full object-cover animate-in fade-in duration-1000"
//                   />
//                   <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6 md:p-8">
//                       <p className="text-[10px] md:text-xs font-mono text-neutral-400 mb-1 md:mb-2">AI GENERATED COPY</p>
//                       <h3 className="text-lg md:text-2xl font-bold uppercase italic">"{generatedCopy}"</h3>
//                   </div>
//                   <button 
//                     onClick={() => setImageState(LoadingState.IDLE)}
//                     className="absolute top-4 right-4 bg-black/50 hover:bg-black p-2 rounded-full backdrop-blur-md transition-all"
//                   >
//                       <RefreshCw size={18} />
//                   </button>
//               </div>
//             ) : (
//               <div className="text-center p-8 md:p-12">
//                 {imageState === LoadingState.LOADING ? (
//                     <div className="flex flex-col items-center">
//                         <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-neutral-800 border-t-white rounded-full animate-spin mb-4 md:mb-6"></div>
//                         <p className="font-mono text-xs md:text-sm text-neutral-500 animate-pulse">RENDERING PIXELS...</p>
//                     </div>
//                 ) : (
//                     <div className="border border-dashed border-neutral-800 p-8 md:p-12 rounded-full">
//                         <Camera className="text-neutral-700 mx-auto mb-4 w-10 h-10 md:w-12 md:h-12" />
//                         <p className="text-neutral-600 font-mono text-xs md:text-sm uppercase">Waiting for Input Data</p>
//                     </div>
//                 )}
//               </div>
//             )}
            
//             {/* Decorative Grid */}
//             <div className="absolute inset-0 pointer-events-none opacity-10" 
//                  style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default AiDemo;
