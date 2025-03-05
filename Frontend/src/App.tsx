import { useState } from 'react';
import { Download, Send, Building2, Loader2, AlertCircle, Info, Cpu } from 'lucide-react';
import axios, { AxiosError } from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Example prompts
  const examplePrompts = [
    "Production level netflix Architecture",
    "Modern architecture to host a portfolio on aws",
    "Highly scalable architecture for a social media platform",
  ];

  // Function to generate image
  const generateImage = async (promptText: string) => {
    if (!promptText.trim()) return;

    setLoading(true);
    setError('');
    setImage(''); // Clear previous image before generating a new one

    try {
      const response = await axios.post('http://localhost:8000/generate-architecture', { userMessage: promptText });

      if (response.data.imageFile) {
        setImage(`http://localhost:8000${response.data.imageFile}`); // Ensure proper URL format
        console.log('Image generated:', response.data.imageFile);
      } else {
        setError('Unexpected response format');
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ error: string }>;
      setError(axiosError.response?.data?.error || 'An error occurred while generating the image');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!image) return;

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      
      const blobUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `architecture-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
      setError('Failed to download image. Please try again.');
    }
  };

  const handleExamplePrompt = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col items-center justify-center px-4 sm:px-6 py-12">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] p-1.5 sm:p-2 rounded-md">
            <Cpu className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <h2 className="font-semibold text-xl text-white">ArchAI</h2>
            <p className="text-xs text-gray-400">Architectural Intelligence</p>
          </div>
          {/* Mobile only branding */}
          <h2 className="font-semibold text-lg text-white sm:hidden">ArchAI</h2>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium mb-6 leading-tight">
            Your Ideas to<br />Architecture
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Transform your architectural concepts into stunning visualizations
          </p>
        </div>

        {/* Input Section */}
        <div className="w-full max-w-2xl mx-auto mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your architectural vision..."
              className="flex-grow px-5 py-3.5 bg-[#1a1a1a] border border-[#333333] text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors rounded-none"
            />
            <button
              onClick={() => generateImage(prompt)}
              disabled={loading || !prompt.trim()}
              className="px-6 py-3.5 bg-white text-black font-medium flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 rounded-none"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Send className="h-5 w-5 mr-2" />}
              Generate
            </button>
          </div>
          
          {/* Example Prompts */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2 text-gray-400">
              <Info className="h-4 w-4" />
              <span className="text-sm">Try these examples:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExamplePrompt(example)}
                  className="text-sm px-3 py-1.5 bg-[#1a1a1a] border border-[#333333] hover:border-white transition-colors text-gray-300 hover:text-white"
                >
                  {example.length > 40 ? example.substring(0, 40) + '...' : example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full max-w-3xl mx-auto mb-8 bg-[#2a1515] border border-[#5c2626] p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-[#e57373] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#e57373] mb-2">{error}</p>
              <p className="text-gray-400 text-sm">Try adding more details about the architecture</p>
            </div>
          </div>
        )}

        {/* Output Section */}
        <div className="w-full max-w-3xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[500px]">
              <Loader2 className="h-8 w-8 text-white animate-spin mb-4" />
              <p className="text-gray-400">Creating your vision...</p>
            </div>
          ) : image ? (
            <div>
              {/* Prompt Display - Above Image */}
              <div className="mb-4 bg-[#1a1a1a] border border-[#333333] p-4">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Your Prompt</h3>
                <p className="text-white">{prompt}</p>
              </div>
              
              {/* Image Container */}
              <div className="bg-[#1a1a1a] border border-[#333333]">
                <div className="w-full h-[500px] relative">
                  <img 
                    src={image} 
                    alt="Generated architecture" 
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </div>
                <div className="p-4 sm:p-5 flex justify-end">
                  <button
                    onClick={handleDownload}
                    className="px-5 py-2.5 bg-white text-black font-medium flex items-center justify-center transition-colors hover:bg-gray-200"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[500px] border border-[#333333] bg-[#1a1a1a]">
              <Building2 className="h-12 w-12 text-[#333333] mb-4" />
              <p className="text-gray-500">
                Enter a prompt to visualize your architectural concept
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
