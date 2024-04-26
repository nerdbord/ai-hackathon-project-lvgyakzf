import React, { useState } from "react";
import { fetchChatCompletion } from "./apiService";
import { saveAs } from "file-saver";
import SpeechToText from "./SpeechTotext";
import { saveResponse } from "./services/supabaseService";

const App: React.FC = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState({});

  const handleTranscription = (transcript: string) => {
    setInput(transcript);
  };

  const handleSubmit = async () => {
    const result = await fetchChatCompletion(input);
    await saveResponse(result);
    setResponse(result);
    //saveResponseToFile(result);
  };
  return (
    <div>
      <SpeechToText onTranscript={handleTranscription} />
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Send</button>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};

export default App;
