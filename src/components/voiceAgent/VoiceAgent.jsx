import React, { useEffect, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import { BsStars } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";

const VoiceAgent = () => {
  const [conversation, setConversation] = useState([]);
  const [finalData, setFinalData] = useState(null);
  const [status, setStatus] = useState("Ready to start");
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState("");

  // Check browser support
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError("Speech recognition not supported in this browser. Please use Chrome or Edge.");
    }
    if (!('speechSynthesis' in window)) {
      setError("Speech synthesis not supported in this browser.");
    }
  }, []);

  // Speak text with natural human-like voice
  const speakText = (text, onDone) => {
    if (!window.speechSynthesis) {
      setError("Speech synthesis not available");
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel(); // Cancel any ongoing speech
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    utterance.volume = 0.9;

    const sentences = text.split(/(?<=[.!?])\s+/);
    if (sentences.length > 1) {
      utterance.text = sentences.join(" "); 
      sentences.forEach((sentence, i) => {
        if (i < sentences.length - 1) {
          utterance.text = utterance.text.replace(
            sentence, 
            sentence + (i % 2 === 0 ? " " : "  ")
          );
        }
      });
    }

    const setVoice = () => {
      const voices = synth.getVoices();
      const preferred = voices.find(v => 
        v.name.includes("Google US English") || 
        v.name.includes("Microsoft Zira") ||
        v.name.includes("Samantha") ||
        v.name.includes("Karen") ||
        v.name.match(/English.*Female/i)
      );
      if (preferred) {
        utterance.voice = preferred;
        if (preferred.name.includes("Google")) {
          utterance.rate = 0.9;
          utterance.pitch = 1.1;
        } else if (preferred.name.includes("Zira")) {
          utterance.rate = 1.0;
          utterance.pitch = 1.05;
        }
      }
    };

    if (synth.getVoices().length === 0) {
      synth.onvoiceschanged = setVoice;
    } else {
      setVoice();
    }

    utterance.onstart = () => setStatus("🔊 Speaking...");
    utterance.onend = () => {
      setStatus("🎤 Ready to listen...");
      if (onDone) setTimeout(onDone, 100);
    };
    utterance.onerror = (e) => {
      console.error("Speech synthesis error:", e);
      setStatus("Speech error occurred");
      if (onDone) onDone();
    };

    setTimeout(() => {
      synth.speak(utterance);
    }, 100);
  };

  const listenOnce = () => {
    return new Promise((resolve, reject) => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        reject(new Error("Speech recognition not supported"));
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      recognition.maxAlternatives = 3;

      let finalTranscript = "";
      let silenceTimeout;
      let hasSpoken = false;
      let lastSpokeTime = Date.now();

      const resetTimeout = () => {
        clearTimeout(silenceTimeout);
        const silenceDuration = hasSpoken ? 
          (Date.now() - lastSpokeTime > 3000 ? 1500 : 2000) :
          4000;
        
        silenceTimeout = setTimeout(() => {
          recognition.stop();
        }, silenceDuration);
      };

      recognition.onresult = (event) => {
        let interimTranscript = "";
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            const bestAlternative = Array.from(result)
              .sort((a, b) => b.confidence - a.confidence)[0];
            finalTranscript += bestAlternative.transcript + " ";
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        if (interimTranscript.trim()) {
          hasSpoken = true;
          lastSpokeTime = Date.now();
          setStatus(`🎤 Listening: "${interimTranscript}"`);
        }
        
        resetTimeout();
      };

      recognition.onstart = () => {
        setStatus("🎤 Listening... (speak now)");
        resetTimeout();
      };

      recognition.onend = () => {
        clearTimeout(silenceTimeout);
        setStatus("Processing...");
        resolve(finalTranscript.trim());
      };

      recognition.onerror = (e) => {
        console.error("Speech recognition error:", e.error);
        clearTimeout(silenceTimeout);
        setStatus(`Recognition error: ${e.error}`);
        resolve("");
      };

      try {
        recognition.start();
      } catch (e) {
        console.error("Failed to start recognition:", e);
        reject(e);
      }
    });
  };

  const sendToGemini = async (previousQuestion, userResponse, leaveData = {}) => {
    try {
      const res = await fetch("http://localhost:5000/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          previousQuestion,
          userResponse,
          leaveData,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Backend error: ${res.status} ${res.statusText} - ${errorText}`);
      }

      const data = await res.json();
      
      if (!data || typeof data !== 'object') {
        throw new Error("Invalid response format from backend");
      }

      return data;
    } catch (error) {
      console.error("Backend call failed:", error);
      throw error;
    }
  };

  const runVoiceStep = async (prevQ = "", prevA = "", dataSoFar = {}) => {
    try {
      setStatus("🤖 Thinking...");
      
      const response = await sendToGemini(prevQ, prevA, dataSoFar);

      const { nextQuestion, leaveData, isComplete, smallTalk } = response;

      // Add Q&A to conversation history
      if (prevQ && prevA) {
        setConversation((prev) => [...prev, 
          { 
            speaker: "user", 
            message: prevA, 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
          }
        ]);
      }

      if (isComplete && leaveData) {
        setFinalData(leaveData);
        setStatus("✅ Leave application completed!");
        console.log("🎯 Final Leave Object:", leaveData);
        
        const completionMessages = [
          "Perfect! Your leave application is all set. Is there anything else I can help you with?",
          "All done! Your leave request has been processed successfully.",
          "Great! I've submitted your leave application. You should receive confirmation shortly."
        ];
        
        const completionMessage = smallTalk ? `${smallTalk} ${completionMessages[Math.floor(Math.random() * completionMessages.length)]}` 
                   : completionMessages[Math.floor(Math.random() * completionMessages.length)];
        
        setConversation((prev) => [...prev, 
          { 
            speaker: "agent", 
            message: completionMessage, 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
          }
        ]);
        
        speakText(completionMessage, () => {
          setIsActive(false);
        });
        return;
      }

      if (nextQuestion) {
        const fullMessage = smallTalk ? `${smallTalk} ${nextQuestion}` : nextQuestion;
        
        // Add agent's message to conversation
        setConversation((prev) => [...prev, 
          { 
            speaker: "agent", 
            message: fullMessage, 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
          }
        ]);
        
        speakText(fullMessage, async () => {
          try {
            const userResponse = await listenOnce();
            if (userResponse.trim()) {
              await runVoiceStep(nextQuestion, userResponse, leaveData || dataSoFar);
            } else {
              setStatus("I didn't catch that. Let me ask again...");
              const retryMessage = "Sorry, I didn't quite get that. " + nextQuestion;
              setConversation((prev) => [...prev, 
                { 
                  speaker: "agent", 
                  message: retryMessage, 
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                }
              ]);
              speakText(retryMessage, async () => {
                const retryResponse = await listenOnce();
                if (retryResponse.trim()) {
                  await runVoiceStep(nextQuestion, retryResponse, leaveData || dataSoFar);
                } else {
                  setStatus("No response detected. Please try again later.");
                  setIsActive(false);
                }
              });
            }
          } catch (error) {
            console.error("Listening error:", error);
            setStatus("Error during listening. Please try again.");
            setIsActive(false);
          }
        });
      } else {
        throw new Error("No next question received from backend");
      }
    } catch (error) {
      console.error("Voice step error:", error);
      setError(`Error: ${error.message}`);
      setStatus("Error occurred");
      setIsActive(false);
    }
  };

  const startConversation = () => {
    setError("");
    setFinalData(null);
    setConversation([]);
    setIsActive(true);
    
    const welcomeMessage = "Hello! I am Sarah I'll be helping you with your leave application today. Just a moment while I get everything ready...";
    
    // Add initial welcome message to conversation
    setConversation([{ 
      speaker: "agent", 
      message: welcomeMessage, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }]);
    
    speakText(welcomeMessage, () => {
      setTimeout(() => {
        runVoiceStep();
      }, 10);
    });
  };

  const stopConversation = () => {
    setIsActive(false);
    setStatus("Stopped");
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    const stopMessage = "Alright, I've stopped the process. You can come back anytime to continue your leave application.";
    
    // Add stop message to conversation
    setConversation((prev) => [...prev, 
      { 
        speaker: "agent", 
        message: stopMessage, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }
    ]);
    
    speakText(stopMessage);
  };

  return (
    <div className='min-h-screen bg-blue-50 pb-20 px-5 md:pt-4 pt-2 flex flex-col'>
      <header className='text-center mb-3 md:mb-8'>
        <h1 className='text-xl md:text-2xl font-semibold text-blue-800'>
          Hello, I'm Here to Assist You with Your Leave Application
        </h1>
      </header>

      <div className='flex-1 flex flex-col md:px-20'>
        {/* Agent and User Cards */}
        <div className='flex flex-col md:flex-row gap-4 mb-4 md:mb-8'>
          {/* AI Agent Card */}
          <div className='w-full md:w-1/2'>
            <div className='bg-white rounded-xl shadow-md p-4 md:p-6 text-center border-l-4 border-blue-500'>
              <img 
                src="/OG/agent.png" 
                alt="AI Assistant Avatar"
                className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full object-cover border-4 border-blue-100 shadow-lg"
              />
              <h2 className='text-lg md:text-xl font-medium text-blue-700 mt-3 md:mt-4'>Hi, I am Sarah</h2>
              <p className='text-blue-500 text-sm md:text-base mt-1 md:mt-2'>AI Leave Application Assistant</p>
              <div className='mt-3 md:mt-4 flex justify-center'>
                <span className='inline-block w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full mr-2 animate-pulse'></span>
                <span className='text-xs md:text-sm text-gray-500'>Online</span>
              </div>
            </div>
          </div>

          {/* User Card */}
          <div className='w-full md:w-1/2'>
            <div className='bg-white rounded-xl shadow-md p-4 md:p-6 text-center border-r-4 border-blue-300'>
              <img 
                src="/OG/user.jpg" 
                alt="User Avatar"
                className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full object-cover border-4 border-blue-100 shadow-lg"
              />
              <h2 className='text-lg md:text-xl font-medium text-blue-700 mt-3 md:mt-4'>Ankeet Kumar Sah</h2>
              <p className='text-blue-500 text-sm md:text-base mt-1 md:mt-2'>Employee ID: E12345</p>
              <div className='mt-2 md:mt-4'>
                <span className='text-xs md:text-sm text-gray-500'>Ready to assist you</span>
              </div>
            </div>
          </div>
        </div>

        {/* Conversation Panel */}
        <div className='flex-1 bg-white rounded-xl shadow-md p-4 md:p-4 md:py-2 mb-4 border-t-4 border-blue-400'>
          <div className='h-full flex flex-col'>
            <h3 className='text-base md:text-lg font-medium text-blue-800 mb-3 md:mb-4 pb-2 border-b border-blue-100'>
              Conversation
            </h3>
            <div className='flex-1 overflow-y-auto space-y-3 md:space-y-4 max-h-[40vh] md:max-h-[50vh]'>
              {conversation.length === 0 ? (
                <div className='text-center text-gray-400 py-8'>
                  <RiRobot2Line className='mx-auto text-4xl mb-2' />
                  <p>No conversation yet. Start by clicking the button below.</p>
                </div>
              ) : (
                conversation.map((item, index) => (
                  <div key={index} className={`flex ${item.speaker === 'user' ? 'justify-end' : ''}`}>
                    {item.speaker === 'agent' && (
                      <div className='mr-3 md:mr-4 flex-shrink-0'>
                        <img 
                          src="/OG/agent.png" 
                          alt="AI Assistant Avatar"
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-blue-100"
                        />
                      </div>
                    )}
                    <div className={`rounded-lg p-3 md:p-4 max-w-[80%] ${
                      item.speaker === 'agent' 
                        ? 'bg-blue-50 text-blue-800' 
                        : 'bg-blue-100 text-blue-900'
                    }`}>
                      <p className='text-sm md:text-base'>{item.message}</p>
                      <p className={`text-xs mt-1 ${
                        item.speaker === 'agent' 
                          ? 'text-blue-400' 
                          : 'text-blue-500 text-right'
                      }`}>
                        {item.time}
                      </p>
                    </div>
                    {item.speaker === 'user' && (
                      <div className='ml-3 md:ml-4 flex-shrink-0'>
                        <img 
                          src="/OG/user.jpg" 
                          alt="User Avatar"
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-blue-100"
                        />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Call Controls */}
        <div className='bg-white rounded-xl shadow-md p-3 md:p-4 flex justify-center items-center sticky bottom-0 z-10'>
          {!isActive ? (
            <button 
              onClick={startConversation} 
              className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 md:py-3 md:px-8 rounded-full shadow-md transition duration-300 flex items-center text-sm md:text-base'
            >
              <FaMicrophone className="mr-2" />
              Start Conversation
            </button>
          ) : (
            <button 
              onClick={stopConversation} 
              className='bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 md:py-3 md:px-8 rounded-full shadow-md transition duration-300 flex items-center text-sm md:text-base'
            >
              <FaMicrophone className="mr-2" />
              Stop Conversation
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceAgent;