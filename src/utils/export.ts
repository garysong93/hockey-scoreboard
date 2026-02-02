import type { GameState, GameEvent } from '../types';

// Dynamic imports for code splitting - these libraries are only loaded when needed
const loadJsPDF = () => import('jspdf').then(m => m.default);
const loadHtml2Canvas = () => import('html2canvas').then(m => m.default);

// Format time as MM:SS
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Get event description for PDF
function getEventDescription(event: GameEvent, homeName: string, awayName: string): string {
  const teamName = event.team === 'home' ? homeName : awayName;

  switch (event.type) {
    case 'goal':
      return `GOAL - ${teamName}`;
    case 'penalty':
      const player = event.details?.playerNumber ? `#${event.details.playerNumber}` : '';
      const penaltyType = event.details?.penaltyType || 'minor';
      return `PENALTY - ${teamName} ${player} (${penaltyType})`;
    case 'period':
      return event.details?.description || `Period ${event.period} Started`;
    case 'timeout':
      return `TIMEOUT - ${teamName}`;
    case 'shot':
      return `Shot - ${teamName}`;
    default:
      return 'Event';
  }
}

export interface ExportData {
  home: GameState['home'];
  away: GameState['away'];
  period: number;
  timeRemaining: number;
  isOvertime: boolean;
  events: GameEvent[];
  exportedAt: string;
}

// Export game data as JSON
export function exportToJSON(state: GameState): void {
  const data: ExportData = {
    home: state.home,
    away: state.away,
    period: state.period,
    timeRemaining: state.timeRemaining,
    isOvertime: state.isOvertime,
    events: state.events,
    exportedAt: new Date().toISOString(),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `hockey-game-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Import game data from JSON
export function importFromJSON(file: File): Promise<ExportData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as ExportData;
        // Basic validation
        if (!data.home || !data.away || typeof data.period !== 'number') {
          throw new Error('Invalid game data format');
        }
        resolve(data);
      } catch (error) {
        reject(new Error('Failed to parse game data'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

// Export scoreboard as PNG
export async function exportToPNG(elementId: string = 'scoreboard'): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Scoreboard element not found');
  }

  // Dynamic import for code splitting
  const html2canvas = await loadHtml2Canvas();

  const canvas = await html2canvas(element, {
    backgroundColor: '#1e293b', // slate-800
    scale: 2, // Higher quality
  });

  const url = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = url;
  link.download = `hockey-scoreboard-${Date.now()}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Export game summary as PDF
export async function exportToPDF(state: GameState, elementId: string = 'scoreboard'): Promise<void> {
  // Dynamic imports for code splitting
  const [jsPDF, html2canvas] = await Promise.all([loadJsPDF(), loadHtml2Canvas()]);

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  let y = margin;

  // Title
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Game Summary', pageWidth / 2, y, { align: 'center' });
  y += 15;

  // Date
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(new Date().toLocaleString(), pageWidth / 2, y, { align: 'center' });
  y += 15;

  // Score box
  pdf.setFillColor(30, 41, 59); // slate-800
  pdf.rect(margin, y, pageWidth - 2 * margin, 30, 'F');

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 255, 255);

  // Home team
  pdf.text(state.home.abbreviation, margin + 20, y + 12, { align: 'center' });
  pdf.setFontSize(24);
  pdf.text(state.home.score.toString(), margin + 20, y + 24, { align: 'center' });

  // VS
  pdf.setFontSize(12);
  pdf.text('VS', pageWidth / 2, y + 18, { align: 'center' });

  // Period
  pdf.setFontSize(10);
  const periodText = state.isOvertime ? 'OT' : `P${state.period}`;
  pdf.text(`${periodText} - ${formatTime(state.timeRemaining)}`, pageWidth / 2, y + 26, { align: 'center' });

  // Away team
  pdf.setFontSize(14);
  pdf.text(state.away.abbreviation, pageWidth - margin - 20, y + 12, { align: 'center' });
  pdf.setFontSize(24);
  pdf.text(state.away.score.toString(), pageWidth - margin - 20, y + 24, { align: 'center' });

  y += 40;
  pdf.setTextColor(0, 0, 0);

  // Stats section
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Game Statistics', margin, y);
  y += 8;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');

  const stats = [
    ['', state.home.abbreviation, state.away.abbreviation],
    ['Goals', state.home.score.toString(), state.away.score.toString()],
    ['Shots', state.home.shots.toString(), state.away.shots.toString()],
    ['Timeouts Used', state.home.timeoutsUsed.toString(), state.away.timeoutsUsed.toString()],
  ];

  const colWidths = [50, 40, 40];
  stats.forEach((row, i) => {
    let x = margin;
    row.forEach((cell, j) => {
      if (i === 0) {
        pdf.setFont('helvetica', 'bold');
      } else {
        pdf.setFont('helvetica', 'normal');
      }
      pdf.text(cell, x + (j === 0 ? 0 : colWidths[j] / 2), y, { align: j === 0 ? 'left' : 'center' });
      x += colWidths[j];
    });
    y += 6;
  });

  y += 10;

  // Events section (excluding shots to keep it concise)
  const significantEvents = state.events.filter(e => e.type !== 'shot');

  if (significantEvents.length > 0) {
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Game Events', margin, y);
    y += 8;

    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');

    significantEvents.forEach((event) => {
      if (y > pdf.internal.pageSize.getHeight() - margin) {
        pdf.addPage();
        y = margin;
      }

      const time = `P${event.period} ${formatTime(event.gameTime)}`;
      const description = getEventDescription(event, state.home.abbreviation, state.away.abbreviation);

      pdf.text(time, margin, y);
      pdf.text(description, margin + 25, y);
      y += 5;
    });
  }

  // Try to add scoreboard screenshot
  try {
    const element = document.getElementById(elementId);
    if (element) {
      const canvas = await html2canvas(element, {
        backgroundColor: '#1e293b',
        scale: 1.5,
      });

      // Add to new page if needed
      if (y > pdf.internal.pageSize.getHeight() - 80) {
        pdf.addPage();
        y = margin;
      } else {
        y += 10;
      }

      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Scoreboard Screenshot', margin, y);
      y += 8;

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pageWidth - 2 * margin;
      const imgHeight = (canvas.height / canvas.width) * imgWidth;

      pdf.addImage(imgData, 'PNG', margin, y, imgWidth, Math.min(imgHeight, 80));
    }
  } catch {
    // Screenshot optional, continue without it
  }

  pdf.save(`hockey-game-summary-${Date.now()}.pdf`);
}
