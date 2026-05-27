/**
 * Web Audio API Music Box Synthesizer
 * Plays "Happy Birthday" with smooth custom chime synthesis, low-pass warmth, and echo.
 */

interface Note {
  note: string;
  freq: number;
  duration: number; // in beats
}

const MELODY: Note[] = [
  { note: 'D4', freq: 293.66, duration: 0.75 },
  { note: 'D4', freq: 293.66, duration: 0.25 },
  { note: 'E4', freq: 329.63, duration: 1.0 },
  { note: 'D4', freq: 293.66, duration: 1.0 },
  { note: 'G4', freq: 392.00, duration: 1.0 },
  { note: 'F#4', freq: 369.99, duration: 2.0 },

  { note: 'D4', freq: 293.66, duration: 0.75 },
  { note: 'D4', freq: 293.66, duration: 0.25 },
  { note: 'E4', freq: 329.63, duration: 1.0 },
  { note: 'D4', freq: 293.66, duration: 1.0 },
  { note: 'A4', freq: 440.00, duration: 1.0 },
  { note: 'G4', freq: 392.00, duration: 2.0 },

  { note: 'D4', freq: 293.66, duration: 0.75 },
  { note: 'D4', freq: 293.66, duration: 0.25 },
  { note: 'D5', freq: 587.33, duration: 1.0 },
  { note: 'B4', freq: 493.88, duration: 1.0 },
  { note: 'G4', freq: 392.00, duration: 1.0 },
  { note: 'F#4', freq: 369.99, duration: 1.0 },
  { note: 'E4', freq: 329.63, duration: 2.0 },

  { note: 'C5', freq: 523.25, duration: 0.75 },
  { note: 'C5', freq: 523.25, duration: 0.25 },
  { note: 'B4', freq: 493.88, duration: 1.0 },
  { note: 'G4', freq: 392.00, duration: 1.0 },
  { note: 'A4', freq: 440.00, duration: 1.0 },
  { note: 'G4', freq: 392.00, duration: 2.0 },
];

export class MusicBox {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private delayFeedback: GainNode | null = null;
  private isPlaying: boolean = false;
  private currentTimeout: any = null;
  private noteIndex: number = 0;
  private tempo: number = 100; // BPM
  private onNotePlayedCallback?: (note: string) => void;

  constructor() {
    // Lazy initialized when user interacts
  }

  public init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    this.ctx = new AudioContextClass();
    
    // Setup Nodes
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime); // Gentle default volume

    // Custom Delay (for magical chimes/echo)
    this.delayNode = this.ctx.createDelay(1.0);
    this.delayNode.delayTime.setValueAtTime(0.35, this.ctx.currentTime);

    this.delayFeedback = this.ctx.createGain();
    this.delayFeedback.gain.setValueAtTime(0.4, this.ctx.currentTime); // feedback amount

    // Connect feedback path
    this.delayNode.connect(this.delayFeedback);
    this.delayFeedback.connect(this.delayNode);

    // Filter to warm up sound (reduce harsh high-end oscillators)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

    // Direct and delayed paths output to destination
    this.masterGain.connect(filter);
    filter.connect(this.ctx.destination);

    // Add depth with delay output
    this.masterGain.connect(this.delayNode);
    this.delayNode.connect(filter);
  }

  public setVolume(val: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(val, this.ctx.currentTime);
    }
  }

  public setCallback(cb: (note: string) => void) {
    this.onNotePlayedCallback = cb;
  }

  public play() {
    this.init();
    if (this.isPlaying) return;
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.playNext();
  }

  public pause() {
    this.isPlaying = false;
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  public stop() {
    this.pause();
    this.noteIndex = 0;
  }

  public isCurrentlyPlaying() {
    return this.isPlaying;
  }

  public playChime(freq: number, startTime: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    // We combine a Sine oscillator (pure tone) and a Triangle oscillator (woodwind-like) for chime texture
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    // Add a soft over-tone harmonic
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, startTime);

    // Envelopes: Plucky & crisp attack, slow decaying chimes
    chimeGain.gain.setValueAtTime(0, startTime);
    // Instant attack for snappy music box click
    chimeGain.gain.linearRampToValueAtTime(0.8, startTime + 0.01);
    // Exponential decay
    chimeGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration - 0.05);

    // Volume level for overtone
    const overtoneGain = this.ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.15, startTime);

    // Connect oscillator 1 to general chime and 2 via overtone gain
    osc1.connect(chimeGain);
    osc2.connect(overtoneGain);
    overtoneGain.connect(chimeGain);

    chimeGain.connect(this.masterGain);

    osc1.start(startTime);
    osc2.start(startTime);

    osc1.stop(startTime + duration);
    osc2.stop(startTime + duration);
  }

  public playGlissando() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const glissandoNotes = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50]; // C5 to C6 arpeggio
    glissandoNotes.forEach((freq, idx) => {
      this.playChime(freq, now + idx * 0.08, 0.4);
    });
  }

  public playSparkle() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    // Fast magical sparkle chord
    const sparkleNotes = [783.99, 987.77, 1174.66, 1567.98]; // G5, B5, D6, G6
    sparkleNotes.forEach((freq, idx) => {
      this.playChime(freq, now + idx * 0.04, 0.6);
    });
  }

  private playNext() {
    if (!this.isPlaying || !this.ctx) return;

    const currentNote = MELODY[this.noteIndex];
    const beatDuration = (60 / this.tempo) * currentNote.duration;
    const now = this.ctx.currentTime;

    // Play synthesized chimes
    this.playChime(currentNote.freq, now, beatDuration);

    if (this.onNotePlayedCallback) {
      this.onNotePlayedCallback(currentNote.note);
    }

    // Advance to next note
    this.noteIndex = (this.noteIndex + 1) % MELODY.length;

    // Schedule next frame
    this.currentTimeout = setTimeout(() => {
      this.playNext();
    }, beatDuration * 1000);
  }
}

export const musicBoxInstance = new MusicBox();
