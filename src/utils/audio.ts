let audioCtx: AudioContext | null = null;

export const playTacticalScan = () => {
  if (!audioCtx) {
    audioCtx = new window.AudioContext();
  }

  const t = audioCtx.currentTime;
  
  // High-pitched quick scan sound (two high blips)
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.type = 'square';
  osc.frequency.setValueAtTime(800, t);
  osc.frequency.exponentialRampToValueAtTime(1200, t + 0.1);
  osc.frequency.setValueAtTime(800, t + 0.15);
  osc.frequency.exponentialRampToValueAtTime(1200, t + 0.25);

  gainNode.gain.setValueAtTime(0, t);
  gainNode.gain.linearRampToValueAtTime(0.05, t + 0.05); // Quiet
  gainNode.gain.linearRampToValueAtTime(0, t + 0.1);
  gainNode.gain.setValueAtTime(0, t + 0.15);
  gainNode.gain.linearRampToValueAtTime(0.05, t + 0.2);
  gainNode.gain.linearRampToValueAtTime(0, t + 0.25);

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.start(t);
  osc.stop(t + 0.3);
};

export const playEvolutionHype = () => {
  if (!audioCtx) {
    audioCtx = new window.AudioContext();
  }

  const t = audioCtx.currentTime;
  
  // Deep cinematic bass swell
  const bassOsc = audioCtx.createOscillator();
  const bassGain = audioCtx.createGain();

  bassOsc.type = 'sine';
  bassOsc.frequency.setValueAtTime(40, t);
  bassOsc.frequency.linearRampToValueAtTime(50, t + 2);

  bassGain.gain.setValueAtTime(0, t);
  bassGain.gain.linearRampToValueAtTime(0.2, t + 1);
  bassGain.gain.linearRampToValueAtTime(0, t + 3);

  bassOsc.connect(bassGain);
  bassGain.connect(audioCtx.destination);

  bassOsc.start(t);
  bassOsc.stop(t + 3);

  // High ambient chord
  const chordFilter = audioCtx.createBiquadFilter();
  chordFilter.type = 'lowpass';
  chordFilter.frequency.setValueAtTime(1000, t);
  chordFilter.frequency.exponentialRampToValueAtTime(4000, t + 1.5);

  const freqs = [329.63, 415.30, 493.88]; // E minor chord
  freqs.forEach((freq) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.value = freq;
    
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.05, t + 1);
    gain.gain.linearRampToValueAtTime(0, t + 3);
    
    osc.connect(gain);
    gain.connect(chordFilter);
    osc.start(t);
    osc.stop(t + 3);
  });

  chordFilter.connect(audioCtx.destination);
};
