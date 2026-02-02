import { useState, useEffect, useCallback, useRef } from 'react';
import { useGameStore } from '../stores/gameStore';
import { parseVoiceCommand, type VoiceCommand } from '../utils/voiceCommands';

// TypeScript types for Web Speech API
interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

// Check if browser supports speech recognition
function getSpeechRecognition(): SpeechRecognitionConstructor | null {
  if (typeof window === 'undefined') return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any;
  return win.SpeechRecognition || win.webkitSpeechRecognition || null;
}

const SpeechRecognition = getSpeechRecognition();

export interface UseVoiceControlReturn {
  isListening: boolean;
  isSupported: boolean;
  transcript: string;
  lastCommand: VoiceCommand | null;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  toggleListening: () => void;
}

export function useVoiceControl(): UseVoiceControlReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [lastCommand, setLastCommand] = useState<VoiceCommand | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const {
    addGoal,
    removeGoal,
    startTimer,
    stopTimer,
    toggleTimer,
    nextPeriod,
    prevPeriod,
    setPeriod,
    addPenalty,
    toggleEmptyNet,
    useTimeout,
    newGame,
    undo,
  } = useGameStore();

  const executeCommand = useCallback(
    (command: VoiceCommand) => {
      setLastCommand(command);

      switch (command.action) {
        case 'goal':
          if (command.team) addGoal(command.team);
          break;
        case 'removeGoal':
          if (command.team) removeGoal(command.team);
          break;
        case 'undo':
          undo();
          break;
        case 'startTimer':
          startTimer();
          break;
        case 'stopTimer':
          stopTimer();
          break;
        case 'toggleTimer':
          toggleTimer();
          break;
        case 'nextPeriod':
          nextPeriod();
          break;
        case 'prevPeriod':
          prevPeriod();
          break;
        case 'setPeriod':
          if (typeof command.value === 'number') setPeriod(command.value);
          break;
        case 'penalty':
          if (command.team) {
            addPenalty({
              team: command.team,
              playerNumber: String(command.value || ''),
              duration: 120, // Default 2-minute minor
              type: 'minor',
            });
          }
          break;
        case 'emptyNet':
          if (command.team) toggleEmptyNet(command.team);
          break;
        case 'timeout':
          if (command.team) useTimeout(command.team);
          break;
        case 'reset':
          newGame();
          break;
      }

      // Clear last command after a delay
      setTimeout(() => setLastCommand(null), 3000);
    },
    [
      addGoal,
      removeGoal,
      startTimer,
      stopTimer,
      toggleTimer,
      nextPeriod,
      prevPeriod,
      setPeriod,
      addPenalty,
      toggleEmptyNet,
      useTimeout,
      newGame,
      undo,
    ]
  );

  const startListening = useCallback(() => {
    if (!SpeechRecognition) {
      setError('Voice control is not supported in this browser');
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      setTranscript(interimTranscript || finalTranscript);

      if (finalTranscript) {
        const command = parseVoiceCommand(finalTranscript);
        if (command) {
          executeCommand(command);
        }
        // Clear transcript after processing
        setTimeout(() => setTranscript(''), 2000);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Please enable microphone permissions.');
      } else if (event.error === 'no-speech') {
        // Ignore no-speech errors - just restart
      } else {
        setError(`Voice recognition error: ${event.error}`);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      // Auto-restart if still supposed to be listening
      if (isListening && recognitionRef.current === recognition) {
        try {
          recognition.start();
        } catch {
          // Ignore errors when restarting
        }
      } else {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (err) {
      setError('Failed to start voice recognition');
    }
  }, [executeCommand, isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
    setTranscript('');
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return {
    isListening,
    isSupported: !!SpeechRecognition,
    transcript,
    lastCommand,
    error,
    startListening,
    stopListening,
    toggleListening,
  };
}
