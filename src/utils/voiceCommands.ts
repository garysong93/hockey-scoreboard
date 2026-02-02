export interface VoiceCommand {
  pattern: RegExp;
  action: string;
  team?: 'home' | 'away';
  value?: number | string;
}

// Parse voice input and return matching command
export function parseVoiceCommand(transcript: string): VoiceCommand | null {
  const text = transcript.toLowerCase().trim();

  // Goal commands
  if (/^(home|host)\s*(team\s*)?(goal|score|scored)$/i.test(text)) {
    return { pattern: /home.*goal/i, action: 'goal', team: 'home' };
  }
  if (/^(away|visitor|visiting)\s*(team\s*)?(goal|score|scored)$/i.test(text)) {
    return { pattern: /away.*goal/i, action: 'goal', team: 'away' };
  }

  // Undo goal
  if (/^undo\s*(home|host)?\s*(goal)?$/i.test(text)) {
    const match = text.match(/undo\s*(home|host|away|visitor)?/i);
    if (match && match[1]) {
      const team = /home|host/i.test(match[1]) ? 'home' : 'away';
      return { pattern: /undo.*goal/i, action: 'removeGoal', team };
    }
    return { pattern: /undo/i, action: 'undo' };
  }
  if (/^(remove|subtract)\s*(home|away)?\s*goal$/i.test(text)) {
    const match = text.match(/(remove|subtract)\s*(home|away)?/i);
    const team = match?.[2] === 'away' ? 'away' : 'home';
    return { pattern: /remove.*goal/i, action: 'removeGoal', team };
  }

  // Timer commands
  if (/^(start|go|play|resume)\s*(timer|clock|game)?$/i.test(text)) {
    return { pattern: /start/i, action: 'startTimer' };
  }
  if (/^(stop|pause|freeze|hold)\s*(timer|clock|game)?$/i.test(text)) {
    return { pattern: /stop/i, action: 'stopTimer' };
  }
  if (/^toggle\s*(timer)?$/i.test(text)) {
    return { pattern: /toggle/i, action: 'toggleTimer' };
  }

  // Period commands
  if (/^(next|advance)\s*period$/i.test(text)) {
    return { pattern: /next period/i, action: 'nextPeriod' };
  }
  if (/^(previous|back|last)\s*period$/i.test(text)) {
    return { pattern: /previous period/i, action: 'prevPeriod' };
  }
  if (/^period\s*(one|1)$/i.test(text)) {
    return { pattern: /period 1/i, action: 'setPeriod', value: 1 };
  }
  if (/^period\s*(two|2)$/i.test(text)) {
    return { pattern: /period 2/i, action: 'setPeriod', value: 2 };
  }
  if (/^period\s*(three|3)$/i.test(text)) {
    return { pattern: /period 3/i, action: 'setPeriod', value: 3 };
  }

  // Penalty commands
  const penaltyMatch = text.match(/^(home|away)\s*penalty\s*(\d+)?$/i);
  if (penaltyMatch) {
    const team = penaltyMatch[1].toLowerCase() === 'home' ? 'home' : 'away';
    const playerNumber = penaltyMatch[2] || '';
    return { pattern: /penalty/i, action: 'penalty', team, value: playerNumber };
  }

  // Reset/New game
  if (/^(reset|new)\s*(game|scores?)?$/i.test(text)) {
    return { pattern: /reset/i, action: 'reset' };
  }

  // Empty net
  if (/^(home|away)\s*empty\s*net$/i.test(text)) {
    const team = text.includes('home') ? 'home' : 'away';
    return { pattern: /empty net/i, action: 'emptyNet', team };
  }

  // Timeout
  if (/^(home|away)\s*time\s*out$/i.test(text)) {
    const team = text.includes('home') ? 'home' : 'away';
    return { pattern: /timeout/i, action: 'timeout', team };
  }

  return null;
}

// Get list of available voice commands for help text
export const voiceCommandHelp = [
  { command: '"Home goal" / "Away goal"', description: 'Add a goal' },
  { command: '"Undo" / "Remove home goal"', description: 'Undo last action or remove goal' },
  { command: '"Start" / "Stop" / "Pause"', description: 'Control game timer' },
  { command: '"Next period" / "Period 2"', description: 'Change period' },
  { command: '"Home penalty" / "Away penalty 7"', description: 'Add penalty' },
  { command: '"Home empty net" / "Away empty net"', description: 'Toggle empty net' },
  { command: '"Home timeout" / "Away timeout"', description: 'Call timeout' },
  { command: '"Reset"', description: 'Start new game' },
];
