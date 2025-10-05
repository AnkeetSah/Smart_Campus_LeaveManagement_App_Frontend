import React, { useEffect, useState, useRef } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import { BsStars } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "framer-motion";
import ApplyLeaveHeader from "../../components/StudentLeaveForm/ApplyLeaveHeader";
import useAuthStore from "../../store/useAuthStore";
import useLeaveApplicationStore from "../../store/useLeaveApplicationStore";
import LeaveSummary from "./LeaveSummary";
import api from "../../services/api";
const VoiceAgent = ({moveToForm,onClose}) => {
  const { user } = useAuthStore();
  const [conversation, setConversation] = useState([]);
  const [finalData, setFinalData] = useState(null);
  const [status, setStatus] = useState("Ready to start");
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);

  const typingTimeoutRef = useRef(null);
  const conversationEndRef = useRef(null);
  const notificationSoundRef = useRef(null);
   const { formData, resetForm, setErrors,  setIsSubmitting,setFormData} =
    useLeaveApplicationStore();
   
 

  // Initialize notification sound
  useEffect(() => {
    if (typeof Audio !== "undefined") {
      notificationSoundRef.current = new Audio('./OG/notify.mp3');
      notificationSoundRef.current.volume = 0.3;
    }

    // Check browser support
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setError("Speech recognition not supported in this browser. Please use Chrome or Edge.");
    }
    if (!("speechSynthesis" in window)) {
      setError("Speech synthesis not supported in this browser.");
    }
  }, []);

  // Play notification when AI stops speaking
  useEffect(() => {
    if (!isSpeaking && isActive && notificationSoundRef.current) {
      // notificationSoundRef.current.currentTime = 0;
      // notificationSoundRef.current.play().catch(e => console.log("Sound play prevented:", e));
    }
  }, [isSpeaking, isActive]);

  // Typing animation effect
  useEffect(() => {
    if (isTyping && typingText && currentTypingIndex < typingText.length) {
      const estimatedSpeechDuration = (typingText.length / 12) * 1000;
      const typingSpeed = Math.max(20, estimatedSpeechDuration / typingText.length);

      typingTimeoutRef.current = setTimeout(() => {
        setCurrentTypingIndex((prev) => prev + 1);
      }, typingSpeed);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [isTyping, typingText, currentTypingIndex]);

  const startTypingAndSpeaking = (text, onComplete) => {
    setIsTyping(true);
    setTypingText(text);
    setCurrentTypingIndex(0);
    speakText(text, onComplete);
  };

  const speakText = (text, onDone) => {
    if (!window.speechSynthesis) {
      setError("Speech synthesis not available");
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    utterance.volume = 0.9;

    const setVoice = () => {
      const voices = synth.getVoices();
      const preferred = voices.find(
        (v) => v.name.includes("Google US English") || 
               v.name.includes("Microsoft Zira") || 
               v.name.includes("Samantha")
      );
      if (preferred) utterance.voice = preferred;
    };

    if (synth.getVoices().length === 0) {
      synth.onvoiceschanged = setVoice;
    } else {
      setVoice();
    }

    utterance.onstart = () => {
      setStatus("🔊 Speaking...");
      setIsSpeaking(true);
    };
    utterance.onend = () => {
      setStatus("🎤 Ready to listen...");
      setIsTyping(false);
      setTypingText("");
      setCurrentTypingIndex(0);
       notificationSoundRef.current.currentTime = 0;
      notificationSoundRef.current.play().catch(e => console.log("Sound play prevented:", e));
      if (onDone) setTimeout(onDone, 100);
    };
    utterance.onerror = (e) => {
      console.error("Speech synthesis error:", e);
      setStatus("Speech error occurred");
      setIsTyping(false);
      setTypingText("");
      setCurrentTypingIndex(0);
      if (onDone) onDone();
    };

    setTimeout(() => synth.speak(utterance), 100);
  };

  const listenOnce = () => {
    return new Promise((resolve, reject) => {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

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
        const silenceDuration = hasSpoken
          ? Date.now() - lastSpokeTime > 3000
            ? 1500
            : 2000
          : 4000;

        silenceTimeout = setTimeout(() => {
          recognition.stop();
        }, silenceDuration);
      };

      recognition.onresult = (event) => {
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            const bestAlternative = Array.from(result).sort(
              (a, b) => b.confidence - a.confidence
            )[0];
            finalTranscript += bestAlternative.transcript + " ";
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        if (interimTranscript.trim()) {
          hasSpoken = true;
          lastSpokeTime = Date.now();
          setStatus(`🎤 Listening: "${interimTranscript}"`);
          setIsUserSpeaking(true);
        }

        resetTimeout();
      };

      recognition.onstart = () => {
        setStatus("🎤 Listening... (speak now)");
        setIsUserSpeaking(false);
        resetTimeout();
      };

      recognition.onend = () => {
        clearTimeout(silenceTimeout);
        setIsUserSpeaking(false);
        setStatus("Processing...");
        resolve(finalTranscript.trim());
      };

      recognition.onerror = (e) => {
        console.error("Speech recognition error:", e.error);
        clearTimeout(silenceTimeout);
        setIsUserSpeaking(false);
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

  const sendToGemini = async (
    previousQuestion,
    userResponse,
    leaveData = {}
  ) => {
   try {
  const res = await api.post("/api/voice-agent/ask", {
    previousQuestion,
    userResponse,
    leaveData,
    user: {
      name: user ? user.name : "User",
      rollNumber: user ? user.rollNumber : "N/A",
    },
  });

  if (!res.data || typeof res.data !== "object") {
    throw new Error("Invalid response format from backend");
  }

  return res.data;
} catch (error) {
  console.error(
    "Backend call failed:",
    error.response
      ? `${error.response.status} ${error.response.statusText} - ${error.response.data}`
      : error.message
  );
  throw error;
}

  };

  const addMessageToConversation = (speaker, message) => {
    const newMessage = {
      speaker,
      message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      id: Date.now() + Math.random(),
    };

    setConversation((prev) => [...prev, newMessage]);
    return newMessage;
  };

 const runVoiceStep = async (prevQ = "", prevA = "", dataSoFar = {}) => {
  try {
    setStatus("🤖 Thinking...");
    setIsSpeaking(false);

    // 1️⃣ Ask Gemini
    const { nextQuestion, leaveData, isComplete, smallTalk } =
      await sendToGemini(prevQ, prevA, dataSoFar);

    // Store the user's last answer in conversation
    if (prevQ && prevA) addMessageToConversation("user", prevA);

    // 2️⃣ If conversation complete → wrap up
    if (isComplete && leaveData) {
      setFinalData(leaveData);
      setStatus("✅ Leave application completed!");

      const completions = [
        "Perfect! Your leave application is now ready to submit. You can either review and modify it, or submit it right away with a single click."
      ];

      const finalMessage = `${smallTalk ? smallTalk + " " : ""}${
        completions[Math.floor(Math.random() * completions.length)]
      }`;

      startTypingAndSpeaking(finalMessage, () => {
        addMessageToConversation("agent", finalMessage);
        setIsActive(false);
      });
      return;
    }

    // 3️⃣ Otherwise → ask next question
    if (!nextQuestion) throw new Error("No next question from Gemini");

    const questionToAsk = `${smallTalk ? smallTalk + " " : ""}${nextQuestion}`;

    startTypingAndSpeaking(questionToAsk, async () => {
      addMessageToConversation("agent", questionToAsk);

      const userResponse = (await listenOnce()).trim();
      if (userResponse) {
        await runVoiceStep(nextQuestion, userResponse, leaveData || dataSoFar);
      } else {
        setStatus("I didn't catch that. Let me ask again...");
        await runVoiceStep(nextQuestion, "", leaveData || dataSoFar);
      }
    });
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

    const welcomeMessage =
      "Hello! I am Sarah, I'll be helping you with your leave application today. Just a moment while I get everything ready...";

    startTypingAndSpeaking(welcomeMessage, () => {
      addMessageToConversation("agent", welcomeMessage);
      setTimeout(() => {
        runVoiceStep();
      }, 500);
    });
  };

  const stopConversation = () => {
    setIsActive(false);
    setStatus("Stopped");
    setIsTyping(false);
    setTypingText("");
    setCurrentTypingIndex(0);
    setIsUserSpeaking(false);

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    const stopMessage =
      "Alright, I've stopped the process. You can come back anytime to continue your leave application.";

    startTypingAndSpeaking(stopMessage, () => {
      addMessageToConversation("agent", stopMessage);
    });
  };

   useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
  <div className="min-h-screen
   bg-gradient-to-br 
from-blue-200 via-sky-200 to-indigo-300 
dark:from-gray-950 dark:via-gray-900 dark:to-indigo-900 
   font-sans relative  transition-all duration-500">
     {/* <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20 px-5 md:pt-4 pt-2 flex flex-col"> */}
        <ApplyLeaveHeader content={"Choose Another Method"} url={'/dashboard/student/apply-leave'} />  
      <header className="text-center mb-3 md:mb-8">
        <h1 className="text-xl md:text-3xl font-bold text-blue-800 dark:text-blue-300 mb-2">
          AI Leave Application Assistant
        </h1>
        <p className="text-blue-600 dark:text-blue-200  text-sm md:text-base">
          Hello, I'm here to assist you with your leave application
        </p>
      </header>

      <div className="flex-1 flex flex-col px-3 md:px-20">
        {/* Agent and User Cards */}
        <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-8">
          {/* AI Agent Card */}
          <div className="w-full md:w-1/2">
            <div className="bg-white dark:bg-gray-800/90 rounded-xl shadow-lg p-4 md:p-6 text-center border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <motion.div 
                  className="relative w-24 h-24 md:w-32 md:h-32 mx-auto"
                  initial={false}
                  animate={isSpeaking ? {
                    scale: [1, 1.03, 1],
                    transition: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  } : {
                    scale: 1
                  }}
                >
                  <img
                    src="/OG/agent.png"
                    alt="AI Assistant Avatar"
                    className="w-full h-full rounded-full object-cover shadow-lg border-4 border-blue-100"
                  />
                  
                  {isSpeaking && (
                    <motion.div
                      className="absolute inset-0 border-4 border-blue-400 rounded-full opacity-0"
                      animate={{
                        scale: [1, 1.2],
                        opacity: [0, 0.4, 0],
                        transition: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeOut"
                        }
                      }}
                    />
                  )}
                </motion.div>
                
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>

              <h2 className="text-lg md:text-xl font-semibold text-blue-700 dark:text-blue-400 mt-3 md:mt-4">
                Hi, I am Sarah
              </h2>
              <p className="text-blue-500 dark:text-blue-300 text-sm md:text-base mt-1 md:mt-2">
                AI Leave Application Assistant
              </p>
              <div className="mt-3 md:mt-4 flex justify-center items-center">
                <span
                  className={`inline-block w-2 h-2 md:w-3 md:h-3 rounded-full mr-2 ${
                    isActive ? "bg-green-500 animate-pulse" : "bg-gray-400"
                  }`}
                ></span>
                <span className="text-xs md:text-sm text-gray-600">
                  {isActive ? "Active" : "Offline"}
                </span>
              </div>
            </div>
          </div>

          {/* User Card */}
          <div className="w-full md:w-1/2">
            <div className="bg-white dark:bg-gray-800/90 rounded-xl shadow-lg p-4 md:p-6 text-center border-r-4 border-indigo-400 hover:shadow-xl transition-shadow duration-300">
              <motion.div 
                className="relative w-24 h-24 md:w-32 md:h-32 mx-auto"
                initial={false}
                animate={isUserSpeaking ? {
                  scale: [1, 1.03, 1],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                } : {
                  scale: 1
                }}
              >
                <img
                  src="/OG/user.png"
                  alt="User Avatar"
                  className="w-full h-full rounded-full object-cover shadow-lg border-4 border-indigo-100"
                />
                
                {isUserSpeaking && (
                  <motion.div
                    className="absolute inset-0 border-4 border-indigo-400 rounded-full opacity-0"
                    animate={{
                      scale: [1, 1.2],
                      opacity: [0, 0.4, 0],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut"
                      }
                    }}
                  />
                )}
              </motion.div>
              
              <h2 className="text-lg md:text-xl font-semibold text-indigo-700 mt-3 md:mt-4">
               {user ? user.name : "User" }
              </h2>
              <p className="text-indigo-500 text-sm md:text-base mt-1 md:mt-2">
                Roll No : {user ? user.rollNumber : "N/A"}
              </p>
              <div className="mt-2 md:mt-4">
                <span className="text-xs md:text-sm text-gray-600">
                  {isUserSpeaking ? "Speaking..." : "Ready to assist you"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        {(status || error) && (
          <div className="mb-4">
            <div
              className={`p-3 rounded-lg dark:border-blue-800 text-center text-sm md:text-base font-medium ${
                error
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : "bg-blue-100 dark:bg-blue-900/50  text-blue-700 dark:text-gray-200 border border-blue-200"
              }`}
            >
              {error || status}
            </div>
          </div>
        )}

        {/* Conversation Panel */}
<div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 mb-4 border-t-4 border-blue-400 dark:border-blue-600 transition-colors duration-300">
  <div className="h-full flex flex-col">
    <div className="flex items-center justify-between mb-3 md:mb-4 pb-2 border-b border-blue-100 dark:border-blue-700">
      <h3 className="text-base md:text-lg font-semibold text-blue-800 dark:text-blue-400 flex items-center">
        <RiRobot2Line className="mr-2" />
        Conversation
      </h3>
      {isActive && (
        <div className="flex items-center text-green-600 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Live
        </div>
      )}
    </div>

    <div className="flex-1 overflow-y-auto space-y-3 md:space-y-4 max-h-[40vh] md:max-h-[50vh] scrollbar-thin scrollbar-thumb-blue-200 dark:scrollbar-thumb-blue-700 scrollbar-track-gray-100 dark:scrollbar-track-gray-700 transition-colors duration-300">
      {conversation.length === 0 && !isTyping ? (
        <div className="text-center text-gray-400 dark:text-gray-400 py-8">
          <RiRobot2Line className="mx-auto text-4xl mb-2" />
          <p>
            No conversation yet. Start by clicking the button below.
          </p>
        </div>
      ) : (
        <>
          {conversation.map((item, index) => (
            <div
              key={item.id || index}
              className={`flex ${item.speaker === "user" ? "justify-end" : ""} animate-fadeIn`}
            >
              {item.speaker === "agent" && (
                <div className="mr-3 md:mr-4 flex-shrink-0">
                  <img
                    src="/OG/agent.png"
                    alt="AI Assistant Avatar"
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-blue-100 dark:border-blue-700"
                  />
                </div>
              )}
              <div
                className={`rounded-lg p-3 md:p-4 max-w-[80%] shadow-sm ${
                  item.speaker === "agent"
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border border-blue-100 dark:border-blue-700"
                    : "bg-indigo-50 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 border border-indigo-100 dark:border-indigo-700"
                }`}
              >
                <p className="text-sm md:text-base leading-relaxed">
                  {item.message}
                </p>
                <p
                  className={`text-xs mt-2 ${
                    item.speaker === "agent"
                      ? "text-blue-400 dark:text-blue-300"
                      : "text-indigo-400 dark:text-indigo-300 text-right"
                  }`}
                >
                  {item.time}
                </p>
              </div>
              {item.speaker === "user" && (
                <div className="ml-3 md:ml-4 flex-shrink-0">
                  <img
                    src="/OG/user.png"
                    alt="User Avatar"
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-indigo-100 dark:border-indigo-700"
                  />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex animate-fadeIn">
              <div className="mr-3 md:mr-4 flex-shrink-0">
                <img
                  src="/OG/agent.png"
                  alt="AI Assistant Avatar"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-blue-100 dark:border-blue-700"
                />
              </div>
              <div className="bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border border-blue-100 dark:border-blue-700 rounded-lg p-3 md:p-4 max-w-[80%] shadow-sm">
                <p className="text-sm md:text-base leading-relaxed">
                  {typingText.substring(0, currentTypingIndex)}
                  <span className="animate-pulse">|</span>
                </p>
                <div className="flex items-center mt-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 dark:bg-blue-300 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-400 dark:bg-blue-300 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-400 dark:bg-blue-300 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <div ref={conversationEndRef} />
    </div>
  </div>
</div>


        {/* Final Data Display */}
        {finalData && (
          <LeaveSummary moveToForm={moveToForm} finalData={finalData} />
)}
        

        {/* Call Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg px-4 py-3 flex justify-center items-center sticky bottom-0 z-10 border-t-4 border-blue-400 dark:border-blue-600 transition-colors duration-300">
  {!isActive ? (
    <button
      onClick={startConversation}
      disabled={!!error}
      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 dark:disabled:from-gray-600 dark:disabled:to-gray-700 text-white font-semibold py-3 px-8 md:py-4 md:px-10 rounded-full shadow-lg transition duration-300 flex items-center text-sm md:text-base transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
    >
      <FaMicrophone className="mr-2 text-lg" />
      Start Conversation
      <IoSparkles className="ml-2 text-lg" />
    </button>
  ) : (
    <button
      onClick={stopConversation}
      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 dark:from-red-500 dark:to-red-600 dark:hover:from-red-600 dark:hover:to-red-700 text-white font-semibold py-3 px-8 md:py-4 md:px-10 rounded-full shadow-lg transition duration-300 flex items-center text-sm md:text-base transform hover:scale-105"
    >
      <FaMicrophoneSlash className="mr-2 text-lg" />
      Stop Conversation
    </button>
  )}
</div>

      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-blue-200::-webkit-scrollbar-thumb {
          background-color: #bfdbfe;
          border-radius: 6px;
        }
        .scrollbar-track-gray-100::-webkit-scrollbar-track {
          background-color: #f3f4f6;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
      `}</style>
    </div>
  );
};

export default VoiceAgent;