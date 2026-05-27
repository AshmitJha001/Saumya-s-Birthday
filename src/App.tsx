import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight, 
  PenTool, 
  Stethoscope, 
  FileText, 
  Award,
  Music,
  Calendar
} from 'lucide-react';
import { musicBoxInstance } from './utils/musicBox';

// Dynamic asset resolution for AI generated images
const babyImg = new URL('./assets/images/saumya_baby_1779901177672.png', import.meta.url).href;
const painterImg = new URL('./assets/images/saumya_painter_1779901199911.png', import.meta.url).href;
const doctorImg = new URL('./assets/images/saumya_doctor_1779901217409.png', import.meta.url).href;
const journalistImg = new URL('./assets/images/saumya_journalist_1779901234114.png', import.meta.url).href;
const divaImg = new URL('./assets/images/saumya_diva_1779901250562.png', import.meta.url).href;

const COMIC_PAGES = [
  {
    age: 'Age 1',
    title: 'A Little Seed is Sown',
    description: 'Under a warm sunshine, a beautiful journey began. Saumya, a tiny, laughing baby, arrived like a radiant ray of spring light, nested snugly in a warm garden of blooming golden yellow petals.',
    image: babyImg,
    dream: 'A canvas of endless horizons...',
    quote: 'Sleeping safe under the summer breeze, wondering what wonderful dreams I will gather as I grow up!',
    icon: Sparkles,
    badgeColor: 'bg-yellow-101 text-yellow-703',
  },
  {
    age: 'Age 6',
    title: 'The Young Wand Painter',
    description: 'With eyes full of wonder, little Saumya seized a giant paint-brush. "I want to be a painter who paints house walls!" she cheered, transforming every gray wall into a beautiful canvas of rainbow sunshine.',
    image: painterImg,
    dream: 'Dream 1: Splash of Joy & Colors 🎨',
    quote: 'I want to be a painter who paints house walls and fills every home with brilliant yellow rainbows!',
    icon: PenTool,
    badgeColor: 'bg-amber-100 text-amber-700',
  },
  {
    age: 'Age 11',
    title: 'The Tender Doctor',
    description: 'A few years passed, and her gentle heart beat for others. Wearing a tiny stethoscope and a white lab coat, she dreamed: "I will become a compassionate doctor, healing the wounds of the world and making everyone smile!"',
    image: doctorImg,
    dream: 'Dream 2: The Gift of Healing 🩺',
    quote: 'I want to be a doctor to heal the pain, keep hearts beating, and bring the warmth of sunflowers to everyone in need.',
    icon: Stethoscope,
    badgeColor: 'bg-emerald-100 text-emerald-800',
  },
  {
    age: 'Age 15',
    title: 'The Courageous Writer',
    description: 'In the teenage years, her voice found power. Armed with deep curiosity, a notebook, and a retro mic, she dreamed: "I want to be a fearless journalist, penning the truths, sharing beautiful stories, and exploring the wonders of our world!"',
    image: journalistImg,
    dream: 'Dream 3: Words of Power 🎙️',
    quote: 'I want to be a journalist, telling the stories of people, fighting for truth, and showing the gorgeous details of life!',
    icon: FileText,
    badgeColor: 'bg-teal-100 text-teal-800',
  },
  {
    age: 'Age 18',
    title: 'The Golden Diva\'s Dawn',
    description: 'And today, on May 28th, she emerges as an elegant, wonderful, and inspiring 18-year-old Diva! Surrounded by a majestic field of blooming sunflowers under the glowing golden hour, her story has just truly begun.',
    image: divaImg,
    dream: 'A Beautiful Present & Radiant Future 🌻✨',
    quote: 'Your every wish will come true and whatever you dream of or you will become, you will make everyone proud. You are extraordinary!',
    icon: Award,
    badgeColor: 'bg-red-100 text-red-800 border-red-200',
  }
];

export default function App() {
  // Navigation & States
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [currentNoteName, setCurrentNoteName] = useState<string>('');
  
  // Confetti / Particles
  const [particles, setParticles] = useState<Array<{ id: number; left: number; top: number; delay: number; size: number; rotation: number }>>([]);
  const [sunflowerFloater, setSunflowerFloater] = useState<Array<{ id: number; left: number; top: number; speed: number; scale: number; rotSp: number }>>([]);

  // Interactive Cake
  const [candles, setCandles] = useState<boolean[]>([true, true, true, true, true]); // 5 candle flames
  const [isCakeBlown, setIsCakeBlown] = useState<boolean>(false);

  // Countdown calculations (Saumya's Birthday is May 28th)
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, isBirthday: false });

  // Load sound callbacks
  useEffect(() => {
    musicBoxInstance.setCallback((note: string) => {
      setCurrentNoteName(note);
      // Trigger a light splash particle
      setTimeout(() => setCurrentNoteName(''), 550);
    });

    // Create random floating sunflowers on entry screen
    const flowers = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      top: Math.random() * 95,
      speed: 10 + Math.random() * 15,
      scale: 0.5 + Math.random() * 1.2,
      rotSp: 5 + Math.random() * 20
    }));
    setSunflowerFloater(flowers);

    // Dynamic countdown logic
    const interval = setInterval(() => {
      const now = new Date();
      const currentYear = now.getFullYear();
      // Saumya's birthday is May 28th
      const birthday = new Date(currentYear, 4, 28, 0, 0, 0); // 4 is May in JS Date (0-indexed)
      
      const diff = birthday.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isBirthday: true });
      } else {
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds, isBirthday: false });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle entry button click
  const handleEnterApp = () => {
    setHasEntered(true);
    // Start audio
    musicBoxInstance.play();
    setIsAudioPlaying(true);
    // Sparkle sound
    musicBoxInstance.playSparkle();
    
    // Shoot celebratory particles
    triggerCelebrationConfetti();
  };

  const handleAudioToggle = () => {
    const isPlaying = musicBoxInstance.toggle();
    setIsAudioPlaying(isPlaying);
  };

  const handlePageChange = (direction: 'next' | 'prev') => {
    let nextIndex = currentPage;
    if (direction === 'next') {
      nextIndex = (currentPage + 1) % COMIC_PAGES.length;
    } else {
      nextIndex = (currentPage - 1 + COMIC_PAGES.length) % COMIC_PAGES.length;
    }
    setCurrentPage(nextIndex);
    musicBoxInstance.playGlissando();
    triggerCelebratorySparks();
  };

  // Create sparks for touchpoints
  const triggerCelebrationConfetti = () => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      top: 60 + Math.random() * 30, // shoot up from lower section
      delay: Math.random() * 0.3,
      size: 8 + Math.random() * 15,
      rotation: Math.random() * 360
    }));
    setParticles(newParticles);
    setTimeout(() => {
      setParticles([]);
    }, 4000);
  };

  const triggerCelebratorySparks = () => {
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      left: 30 + Math.random() * 40,
      top: 40 + Math.random() * 30,
      delay: Math.random() * 0.1,
      size: 8 + Math.random() * 12,
      rotation: Math.random() * 360
    }));
    setParticles(newParticles);
    setTimeout(() => {
      setParticles([]);
    }, 1500);
  };

  // Cut/Blow Candle
  const handleBlowCandle = (index: number) => {
    const next = [...candles];
    if (next[index]) {
      next[index] = false;
      setCandles(next);
      // Play a quick magical vibe
      musicBoxInstance.playChime(659.25 + index * 100, 0, 0.4);
      
      // If all blown out, trigger big sparkle
      if (next.every(c => !c)) {
        setIsCakeBlown(true);
        musicBoxInstance.playSparkle();
        triggerCelebrationConfetti();
      }
    }
  };

  const restartCake = () => {
    setCandles([true, true, true, true, true]);
    setIsCakeBlown(false);
  };

  return (
    <div id="saumya-birthday-app" className="min-h-screen bg-[#fffdf0] text-amber-955 font-sans relative overflow-x-hidden selection:bg-yellow-200">
      
      {/* Decorative Floating Sunflowers Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {sunflowerFloater.map(item => (
          <div
            key={item.id}
            id={`sunflower-float-${item.id}`}
            style={{
              left: `${item.left}%`,
              top: `${item.top}%`,
              animation: `float-slow ${item.speed}s linear infinite`,
              transform: `scale(${item.scale}) rotate(${item.rotSp}deg)`,
              opacity: 0.15,
            }}
            className="absolute transition-transform duration-1000"
          >
            🌻
          </div>
        ))}
      </div>

      {/* Confetti particles */}
      {particles.length > 0 && (
        <div id="particle-shower" className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
          {particles.map(p => (
            <div
              key={p.id}
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                transform: `rotate(${p.rotation}deg)`,
                animationDelay: `${p.delay}s`,
              }}
              className="absolute bg-yellow-400 rounded-full animate-ping border border-amber-300 opacity-90 flex items-center justify-center text-[10px]"
            >
              🌻
            </div>
          ))}
        </div>
      )}

      {/* MUSIC CHIMES LIVE ACCENT PANEL */}
      {isAudioPlaying && currentNoteName && (
        <div id="audio-visual-pulse" className="fixed top-4 left-4 z-50 bg-yellow-400 text-amber-950 text-xs px-3 py-1.5 rounded-full font-mono shadow-md border border-yellow-300 flex items-center gap-1.5 animate-bounce">
          <Music className="w-3.5 h-3.5 animate-spin" />
          <span>Note: {currentNoteName} 🌻♪</span>
        </div>
      )}

      {/* ---------------- 1. LET'S DIVE IN SCREEN ---------------- */}
      {!hasEntered ? (
        <div id="diving-intro-screen" className="fixed inset-0 bg-gradient-to-br from-[#fffdeb] via-[#fef9df] to-[#ffefa8] flex flex-col justify-center items-center z-50 p-6 text-center">
          
          {/* Big decorative circular bloom */}
          <div className="relative mb-8 group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
            <div className="relative max-w-sm rounded-full overflow-hidden border-4 border-amber-400 shadow-2xl bg-white p-6 transform hover:scale-105 transition-all duration-300">
              <span className="text-8xl md:text-9xl block animate-spin" style={{ animationDuration: '20s' }}>🌻</span>
            </div>
            
            {/* Absolute side petals */}
            <span className="absolute -top-3 -left-3 text-4xl animate-bounce">🌻</span>
            <span className="absolute -bottom-3 -right-3 text-4xl animate-bounce" style={{ animationDelay: '0.4s' }}>✨</span>
            <span className="absolute top-1/2 -right-6 text-4xl animate-ping" style={{ animationDuration: '3s' }}>🎈</span>
          </div>

          <div className="max-w-xl mx-auto space-y-6">
            <div className="space-y-2">
              <p className="text-amber-600 font-mono tracking-widest text-xs font-bold uppercase">A Wonderful Growth Journey</p>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-amber-900 leading-tight mb-2">
                Let's Dive in <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-800 drop-shadow-sm font-serif italic">
                  Diva's 18th Birthday
                </span>
              </h1>
            </div>

            <p className="text-amber-800 text-sm md:text-base leading-relaxed font-medium bg-amber-50/50 rounded-xl p-4 border border-amber-100 max-w-md mx-auto">
              Welcome to your magical milestone celebration! We've hand-crafted a beautiful gallery of sunflowers, dreams, and music to celebrate your 18th. Let the visual travel begin!
            </p>

            {/* Countdown / Birthday Status Banner */}
            <div className="flex justify-center gap-2 text-xs font-semibold text-amber-900 bg-yellow-100 border border-yellow-200 px-4 py-2.5 rounded-full max-w-xs mx-auto shadow-sm">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>
                {timeLeft.isBirthday ? (
                  <span className="text-emerald-700 font-bold animate-pulse">🎉 IT IS OFFICIALLY YOUR BIRTHDAY SAUMYA! 🎉</span>
                ) : (
                  <span>Big Day Starts in: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s 🌻</span>
                )}
              </span>
            </div>

            <div className="pt-4">
              <button
                id="enter-garden-btn"
                onClick={handleEnterApp}
                className="cursor-pointer inline-flex items-center gap-3 px-8 py-4 bg-amber-550 bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:shadow-amber-500/30 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 select-none"
              >
                <span>Enter Saumya's Magical Garden</span>
                <Sparkles className="w-5 h-5 animate-pulse" />
              </button>
              <p className="text-[10px] text-amber-600/70 mt-2 font-mono">🔊 Unmute your device volume to hear the custom chime soundtrack</p>
            </div>
          </div>

          <div className="absolute bottom-6 text-xs text-amber-700/60 font-mono">
            Crafted for Saumya • Birthday Special
          </div>
        </div>
      ) : (
        /* ---------------- APP MAIN COZY VIEW ---------------- */
        <div id="main-cozy-layout" className="relative z-10">
          
          {/* HEADER NAV */}
          <header id="app-header" className="sticky top-0 bg-[#fffdf0]/95 backdrop-blur-md border-b border-yellow-200/50 z-40 px-4 py-3.5 shadow-sm">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <div className="flex items-center gap-3">
                <div id="header-logo" className="text-3xl animate-spin" style={{ animationDuration: '12s' }}>🌻</div>
                <div>
                  <h1 className="text-xl md:text-2xl font-black tracking-wide text-amber-950 flex items-center gap-2">
                    Saumya's Divine 18th
                    <span className="text-xs bg-amber-500 text-white p-1 rounded-sm px-2 animate-bounce font-mono">28/05</span>
                  </h1>
                  <p className="text-xs text-amber-700">A garden of dreams, canvases, and golden sunflowers</p>
                </div>
              </div>

              {/* Music Player Actions */}
              <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-end">
                <div className="flex items-center gap-2 bg-[#fbeea7]/40 border border-yellow-300 rounded-full py-1 px-3.5 pr-2 shadow-inner">
                  <span className="text-xs font-bold text-amber-900 font-mono flex items-center gap-1">
                    <Music className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                    <span>Lullaby</span>
                  </span>
                  
                  <button
                    id="toggle-music-btn"
                    onClick={handleAudioToggle}
                    title={isAudioPlaying ? "Pause music" : "Play music"}
                    className="cursor-pointer p-1.5 rounded-full bg-amber-500 text-white hover:bg-amber-600 shadow-sm transition-all duration-200"
                  >
                    {isAudioPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    id="reset-music-btn"
                    onClick={() => {
                      musicBoxInstance.stop();
                      musicBoxInstance.play();
                      setIsAudioPlaying(true);
                      musicBoxInstance.playSparkle();
                    }}
                    title="Restart song"
                    className="cursor-pointer p-1.5 rounded-full bg-white text-amber-600 hover:bg-neutral-150 border border-yellow-200 shadow-inner"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  id="header-sparkle-btn"
                  onClick={() => {
                    musicBoxInstance.playSparkle();
                    triggerCelebratorySparks();
                  }}
                  className="cursor-pointer bg-white border border-yellow-300 rounded-full p-2 text-amber-600 hover:bg-yellow-50 hover:text-amber-700 shadow-sm transition"
                  title="Throw Sparkles"
                >
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </button>
              </div>

            </div>
          </header>

          <main className="max-w-6xl mx-auto px-4 py-8 space-y-12 pb-24 z-10 relative">

            {/* HERO STATEMENT */}
            <section id="hero-statement" className="text-center space-y-4 max-w-3xl mx-auto py-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-200/50 border border-yellow-300 rounded-full text-xs font-bold text-amber-800 uppercase tracking-widest animate-pulse">
                <span>The Story of Our Sunflower Diva</span>
                <span>✨</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-amber-955 tracking-tight font-serif">
                Growing Up with Saumya 🌻
              </h2>
              <p className="text-amber-850 text-sm md:text-base leading-relaxed">
                Flip through the beautifully illustrated comic panels below to embark on a beautiful time-travel of Saumya's goals as she turns 18. Each story captures the sweet, vibrant color of her dreams!
              </p>
            </section>


            {/* ---------------- 2. COMIC SECTION ---------------- */}
            <section id="comic-book-viewport" className="relative bg-[#fffef4] border-2 md:border-4 border-amber-900 shadow-2xl rounded-3xl overflow-hidden max-w-5xl mx-auto p-4 md:p-8">
              
              {/* Retro Paper Overlay Texture */}
              <div className="absolute inset-0 bg-[radial-gradient(#eedc9c_0.5px,transparent_0.5px)] [background-size:16px_16px] pointer-events-none opacity-20"></div>

              {/* Comic Book Binder Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-r from-transparent via-amber-900/10 to-transparent hidden lg:block"></div>

              {/* Grid content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative z-10">
                
                {/* Image Panel (Left Side on Desktop) */}
                <div className="relative group">
                  {/* Speech Bubble Above Image */}
                  <div className="absolute -top-3 -right-2 bg-yellow-50 border-2 border-amber-950 text-amber-950 font-sans md:text-sm text-xs rounded-2xl py-2 px-4 shadow-[3px_3px_0px_rgba(120,53,4,1)] z-10 max-w-xs animate-bounce" style={{ pointerEvents: 'none' }}>
                    <div className="relative font-bold">
                      "{COMIC_PAGES[currentPage].quote}"
                      <div className="absolute bottom-[-18px] right-6 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-amber-950 border-r-[10px] border-r-transparent"></div>
                      <div className="absolute bottom-[-14px] right-[25px] w-0 h-0 border-l-[9px] border-l-transparent border-t-[9px] border-t-yellow-50 border-r-[9px] border-r-transparent"></div>
                    </div>
                  </div>

                  {/* Aesthetic Vintage Card frame */}
                  <div className="bg-white border-4 border-amber-950 p-4 rounded-2xl shadow-[8px_8px_0px_rgba(120,53,4,1)] transform rotate-[-0.5deg] group-hover:rotate-0 transition-transform duration-300">
                    <div className="relative bg-amber-100 rounded-lg overflow-hidden border-2 border-amber-950 aspect-square">
                      <img 
                        src={COMIC_PAGES[currentPage].image} 
                        alt={COMIC_PAGES[currentPage].title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover select-none"
                      />
                      {/* Age Flag */}
                      <span className={`absolute top-3 left-3 font-mono font-bold text-xs uppercase px-3 py-1.5 rounded-md border-2 border-amber-950 shadow-[2px_2px_0px_rgba(120,53,4,1)] ${COMIC_PAGES[currentPage].badgeColor}`}>
                        {COMIC_PAGES[currentPage].age}
                      </span>
                    </div>
                    {/* Comic label footer */}
                    <div className="pt-3 flex justify-between items-center text-xs font-bold text-amber-900 border-t border-yellow-250 mt-2 font-mono">
                      <span>🌻 PANEL #{currentPage + 1} OF 5</span>
                      <span>SAUMYA'S LOG</span>
                    </div>
                  </div>
                </div>

                {/* Narrative Details (Right Side on Desktop) */}
                <div className="flex flex-col justify-between space-y-6">
                  
                  {/* Comic Header Text Panel */}
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-1.5 bg-yellow-101 border-2 border-amber-950 px-3 py-1 rounded-full text-xs font-bold text-amber-950 shadow-[2px_2px_0px_rgba(120,53,4,1)]">
                      {React.createElement(COMIC_PAGES[currentPage].icon, { className: "w-4 h-4 text-amber-600" })}
                      <span>{COMIC_PAGES[currentPage].dream}</span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-black text-amber-950 uppercase tracking-tight">
                      {COMIC_PAGES[currentPage].title}
                    </h3>

                    {/* Fun speech badge descriptor */}
                    <div className="bg-amber-50 border-2 border-amber-950 p-4 md:p-6 rounded-2xl shadow-[4px_4px_0px_rgba(120,53,4,1)] relative">
                      <div className="absolute top-[-10px] left-6 font-mono font-bold text-[10px] uppercase bg-amber-500 border-2 border-amber-950 text-white px-2 py-0.5 rounded">
                        Narrator Speech
                      </div>
                      <p className="text-sm md:text-base text-amber-950 leading-relaxed font-serif pt-1">
                        {COMIC_PAGES[currentPage].description}
                      </p>
                    </div>
                  </div>

                  {/* Growth Sprout Timeline indicator */}
                  <div className="space-y-2">
                    <span className="text-xs font-extrabold text-amber-805 uppercase tracking-widest font-mono block">Saumya's Sprout Timeline 🌿</span>
                    <div className="flex justify-between items-center gap-2 relative h-4 bg-amber-200/50 border border-amber-900/20 rounded-full px-1">
                      {/* Interactive stem filling up */}
                      <div 
                        style={{ width: `${(currentPage / (COMIC_PAGES.length - 1)) * 100}%` }}
                        className="absolute left-1 top-1 bottom-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-300 z-0"
                      />
                      
                      {COMIC_PAGES.map((page, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setCurrentPage(idx);
                            musicBoxInstance.playGlissando();
                            triggerCelebratorySparks();
                          }}
                          className={`w-6 h-6 rounded-full border-2 border-amber-950 font-bold text-[10px] flex items-center justify-center relative z-10 cursor-pointer transform hover:scale-110 active:scale-90 transition ${
                            currentPage === idx 
                              ? 'bg-amber-500 text-white shadow-[2px_2px_0px_rgba(120,53,4,1)] scale-110' 
                              : 'bg-white text-amber-900'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center gap-4 pt-4 border-t-2 border-amber-950/20">
                    <button
                      id="prev-page-btn"
                      onClick={() => handlePageChange('prev')}
                      className="cursor-pointer flex items-center gap-2 px-5 py-3 bg-white border-2 border-amber-950 rounded-xl font-bold text-sm shadow-[4px_4px_0px_rgba(120,53,4,1)] hover:bg-amber-50 hover:shadow-[2px_2px_0px_rgba(120,53,4,1)] active:translate-y-0.5 active:shadow-none transition-all duration-200 select-none"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    {currentPage === COMIC_PAGES.length - 1 ? (
                      <button
                        id="final-cheers-btn"
                        onClick={() => {
                          triggerCelebrationConfetti();
                          musicBoxInstance.playSparkle();
                          document.getElementById('birthday-interactive-cake')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="cursor-pointer flex items-center gap-2 px-5 py-3 bg-amber-500 text-white border-2 border-amber-950 rounded-xl font-bold text-sm shadow-[4px_4px_0px_rgba(120,53,4,1)] hover:bg-amber-600 hover:shadow-[2px_2px_0px_rgba(120,53,4,1)] hover:translate-y-0.5 active:shadow-none transition-all duration-200 select-none animate-pulse"
                      >
                        <span>Cut The Cake! 🎂</span>
                        <Sparkles className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        id="next-page-btn"
                        onClick={() => handlePageChange('next')}
                        className="cursor-pointer flex items-center gap-2 px-5 py-3 bg-amber-500 text-white border-2 border-amber-950 rounded-xl font-bold text-sm shadow-[4px_4px_0px_rgba(120,53,4,1)] hover:bg-amber-600 hover:shadow-[2px_2px_0px_rgba(120,53,4,1)] active:translate-y-0.5 active:shadow-none transition-all duration-200 select-none"
                      >
                        <span>Next Dream</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                </div>

              </div>
              
              {/* Grand finale quote highlight at bottom of comic on the last page */}
              {currentPage === COMIC_PAGES.length - 1 && (
                <div id="grand-blessing-banner" className="mt-8 border-4 border-dashed border-yellow-400 bg-yellow-101 p-6 rounded-2xl text-center space-y-3 animate-fade-in relative overflow-hidden">
                  <div className="absolute right-[-20px] top-[-20px] text-7xl opacity-10 select-none pointer-events-none">🌻</div>
                  <span className="text-3xl block">✨👑✨</span>
                  <p className="text-lg md:text-xl font-serif italic text-amber-950 font-bold px-4">
                    "Your every wish will come true, and whatever you dream of or whatever you become, you will make everyone proud."
                  </p>
                  <p className="text-xs font-sans font-extrabold tracking-widest text-amber-700 uppercase">
                    — From Ashmit & Everyone Who Cherishes You!
                  </p>
                </div>
              )}

            </section>


            {/* ---------------- 3. INTERACTIVE BIRTHDAY CAKE SECTION ---------------- */}
            <section id="birthday-interactive-cake" className="bg-[#fefbe9] border border-yellow-200 shadow-xl rounded-3xl p-6 md:p-10 max-w-2xl mx-auto space-y-8 scroll-mt-20">
              
              <div className="text-center space-y-2">
                <span className="text-4xl">🎂</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-amber-955">
                  Saumya's Virtual Birthday Cake
                </h3>
                <p className="text-sm text-amber-800 max-w-xl mx-auto">
                  Celebrate Saumya's 18th Milestone! **Blow out the five magical birthday candles** by clicking each flame. Once all candles are blown, a beautiful celebration of stardust will greet you!
                </p>
              </div>

              <div className="flex flex-col items-center justify-center">
                
                {/* Visual Interactive Cake Card */}
                <div className="w-full max-w-md flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-yellow-100 shadow-lg min-h-[350px] relative overflow-hidden transition-all duration-300">
                  
                  {/* Floating music sparks if blown out */}
                  {isCakeBlown && (
                    <div className="absolute inset-0 bg-[#fffdf0]/95 z-30 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                      <span className="text-6xl animate-bounce mb-3">🌻🎉✨</span>
                      <h4 className="text-xl font-black text-amber-900">Happy 18th Birthday, Saumya!</h4>
                      <p className="text-xs text-amber-800 mt-2 max-w-xs leading-relaxed">
                        All five candles are blown out! May every beautiful dream of yours as a painter, doctor, journalist, or anything you put your soul into, translate into absolute stardust. We are all deeply proud of you!
                      </p>
                      <button
                        onClick={restartCake}
                        className="cursor-pointer mt-6 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
                      >
                        Light Candles Again 🕯️
                      </button>
                    </div>
                  )}

                  {/* Toppings Layer Visualizer */}
                  <div className="flex justify-center gap-1.5 mb-6 z-0">
                    {['🍒 Fresh Cherry', '✨ Gold Sparkles', '🍫 Sweet Choco'].map((top, idx) => (
                      <span key={idx} className="bg-amber-100/80 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-200">
                        {top}
                      </span>
                    ))}
                  </div>

                  {/* The Candle Flames */}
                  <div className="flex justify-center items-end gap-5 h-20 mb-[-10px] relative z-20">
                    {candles.map((isOn, index) => (
                      <div key={index} className="flex flex-col items-center group relative cursor-pointer" onClick={() => handleBlowCandle(index)}>
                        {isOn ? (
                          <>
                            {/* Animated Flame */}
                            <div className="w-3.5 h-6 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full animate-pulse shadow-[0_0_10px_#f59e0b] group-hover:scale-125 transition-transform" />
                            {/* Inner Flame Sparkle core */}
                            <div className="absolute top-1.5 w-1.5 h-3 bg-white rounded-full opacity-80" />
                          </>
                        ) : (
                          // Smoke trail puff
                          <div className="w-1 h-4 bg-neutral-200/50 rounded-full animate-ping" />
                        )}
                        {/* Candle Wax Body */}
                        <div className={`w-3 h-14 border border-amber-900/30 rounded-t-sm shadow-sm transition-all duration-300 ${
                          index % 2 === 0 ? 'bg-yellow-300' : 'bg-amber-400'
                        } ${!isOn ? 'opacity-70 mt-4' : ''}`}>
                          {/* Spiral strips decoration */}
                          <div className="w-full h-1/2 bg-amber-600/10 mt-2 rotate-12" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Visual Layered Cake tiers */}
                  <div className="w-56 h-10 bg-[#fde047] rounded-full border-t-4 border-[#fbcfe8] shadow-md z-10 flex items-center justify-center text-[10px] font-mono text-amber-800 tracking-wider">
                    - PISTACHIO & VIBRANT VANILLA -
                  </div>
                  <div className="w-64 h-12 bg-amber-400 rounded-full border-t-8 border-[#fcd34d] mt-[-8px] z-9 shadow-lg flex items-center justify-center">
                    {/* Visual sunflowers on cake bodies */}
                    <div className="flex gap-4 text-xs select-none pointer-events-none">
                      <span>🌻</span><span>🌻</span><span>🌻</span><span>🌻</span>
                    </div>
                  </div>

                  {/* Custard base table plate */}
                  <div className="w-72 h-4 bg-neutral-200 border-b-4 border-neutral-300 rounded-full mt-[-4px] z-8" />
                  
                  <span className="text-[10px] font-bold text-amber-600 mt-6 font-mono bg-yellow-50 px-3 py-1 rounded-full border border-yellow-101 animate-pulse">🕯️ CLICK THE CANDLES TO BLOW THEM OUT</span>
                </div>

              </div>

            </section>

          </main>

          {/* COZY COMPACT FOOTER */}
          <footer className="bg-amber-950 text-yellow-100 border-t border-amber-900 py-12 px-4 text-center space-y-4">
            <div className="text-4xl animate-bounce">🌻</div>
            <p className="text-xs tracking-widest text-amber-300 font-mono uppercase">HAPPY 18th BIRTHDAY SAUMYA • 28/05</p>
            <p className="text-xs text-amber-200 max-w-md mx-auto leading-relaxed">
              May every wall you paint, every person you heal, and every message you write fill this beautiful universe with brilliant, proud colors.
            </p>
            <p className="text-[10px] text-amber-500/65 font-mono">Handmade with actual AI digital drawings & sweet synthesized music box soundscapes • AI Studio Build 2026</p>
          </footer>

        </div>
      )}

    </div>
  );
}
