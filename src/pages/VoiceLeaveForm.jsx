import React, { useState, useEffect, useRef } from "react";

const VoiceLeaveForm = () => {
  const synth = window.speechSynthesis;
  const recognitionRef = useRef(null);

  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const steps = [
    { key: "leaveType", question: "What type of leave do you want?" },
    { key: "startDate", question: "What is the start date?" },
    { key: "endDate", question: "What is the end date?" },
    { key: "reason", question: "What is the reason for your leave?" },
  ];

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;
    } else {
      alert("Your browser does not support Speech Recognition.");
    }
  }, []);

  const speak = (text) => {
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = resolve;
      synth.speak(utterance);
    });
  };

  const listen = () => {
    return new Promise((resolve) => {
      recognitionRef.current.start();
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript);
      };
    });
  };

  const startConversation = async () => {
    let currentStep = stepIndex;

    while (currentStep < steps.length) {
      const step = steps[currentStep];
      await speak(step.question);
      const response = await listen();

      // Optional: parsing or cleanup
      setFormData((prev) => ({
        ...prev,
        [step.key]: response,
      }));

      currentStep++;
      setStepIndex(currentStep);
    }

    await speak("Thank you! Your leave application has been recorded.");
    // Here you can handle the form data (e.g., send to backend)
    console.log("Leave Form Data:", formData);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-xl font-bold text-gray-800">Voice Leave Assistant</h1>
      <button
        onClick={startConversation}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Start Voice Form
      </button>

      <div className="mt-4 space-y-2">
        <div>Leave Type: {formData.leaveType}</div>
        <div>Start Date: {formData.startDate}</div>
        <div>End Date: {formData.endDate}</div>
        <div>Reason: {formData.reason}</div>
      </div>
    </div>
  );
};

export default VoiceLeaveForm;
