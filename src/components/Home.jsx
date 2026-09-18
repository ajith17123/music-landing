import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaMusic,
  FaSearch,
  FaInstagram,
  FaFacebookF,
  FaPlay,
  FaArrowRight,
  FaUsers,
  FaGuitar,
  FaDrum,
  FaHeadphones,
  FaSlidersH,
  FaStar,
  FaHeart,
  FaVolumeUp,
  FaChevronRight,
  FaCheckCircle,
  FaGlobe,
  FaCompactDisc
} from 'react-icons/fa';
import '../assets/style/Home.css';

// Local Image Imports
import heroImg from '../assets/images/hero-instrument.jpg';
import galleryAcoustic from '../assets/images/gallery-acoustic.jpg';
import galleryElectric from '../assets/images/gallery-electric.jpg';
import galleryBass from '../assets/images/gallery-bass.jpg';
import galleryGrandpiano from '../assets/images/gallery-grandpiano.jpg';
import gallerySynth from '../assets/images/gallery-synth.jpg';
import galleryDrumset from '../assets/images/gallery-drumset.jpg';
import gallerySnare from '../assets/images/gallery-snare.jpg';
import galleryViolin from '../assets/images/gallery-violin.jpg';
import gallerySaxophone from '../assets/images/gallery-saxophone.jpg';
import galleryTrumpet from '../assets/images/gallery-trumpet.jpg';
import studioSession from '../assets/images/studio-session.jpg';
import micCloseup from '../assets/images/mic-closeup.jpg';
import artist1 from '../assets/images/artist-1.jpg';
import artist2 from '../assets/images/artist-2.jpg';
import artist3 from '../assets/images/artist-3.jpg';

const Home = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // 10 Product Gallery Items
  const products = [
    { id: 1, title: 'Acoustic Masterwork', sub: 'Solid Spruce Top Guitar', price: '$1,299', image: galleryAcoustic, category: 'Acoustic', tag: 'Bestseller' },
    { id: 2, title: 'Custom Electric', sub: 'Single-coil Vintage Pickup', price: '$1,850', image: galleryElectric, category: 'Electric', tag: 'New Arrival' },
    { id: 3, title: 'Deep 5-String Bass', sub: 'Active Preamp & Mahogany', price: '$1,420', image: galleryBass, category: 'Bass', tag: 'Top Rated' },
    { id: 4, title: 'Concert Grand Piano', sub: 'Hand-tuned Acoustic Keys', price: '$8,900', image: galleryGrandpiano, category: 'Keyboards', tag: 'Limited' },
    { id: 5, title: 'Polyphonic Analog Synth', sub: '64-step Sequencer Engine', price: '$2,150', image: gallerySynth, category: 'Synthesizers', tag: 'Trending' },
    { id: 6, title: 'Birch Stage Drumset', sub: '7-piece Shell Hardware', price: '$2,790', image: galleryDrumset, category: 'Drums', tag: 'Featured' },
    { id: 7, title: 'Precision Brass Snare', sub: 'Hand-cast Brass Hoop', price: '$680', image: gallerySnare, category: 'Drums', tag: 'Hot' },
    { id: 8, title: 'Orchestral Violin', sub: 'Flamed Maple Wood Polish', price: '$1,950', image: galleryViolin, category: 'Strings', tag: 'Pro Choice' },
    { id: 9, title: 'Alto Jazz Saxophone', sub: 'Gold Lacquered Brass', price: '$2,300', image: gallerySaxophone, category: 'Wind', tag: 'Classic' },
    { id: 10, title: 'Bb Pro Brass Trumpet', sub: 'Monel Valves & Hard Case', price: '$1,120', image: galleryTrumpet, category: 'Wind', tag: 'Popular' }
  ];

  // Core Features
  const features = [
    {
      id: 1,
      tint: 'orange',
      icon: <FaGuitar />,
      title: 'Custom Handcrafted Guitars',
      desc: 'Precision carved tonewoods, custom voicing, and bespoke hardware built by master luthiers for unmatched acoustic warmth.',
      badge: 'Luthier Series'
    },
    {
      id: 2,
      tint: 'blue',
      icon: <FaDrum />,
      title: 'Percussion & Rhythm Hub',
      desc: 'Stage-ready drum shells, precision brass snares, and acoustic tuning built to resonate with deep dynamic impact.',
      badge: 'Pro Percussion'
    },
    {
      id: 3,
      tint: 'purple',
      icon: <FaHeadphones />,
      title: 'Studio Reference Gear',
      desc: 'Flat-response studio monitors, pristine condenser mics, and analog synthesizers designed for uncompromising audio precision.',
      badge: 'Studio Pure'
    }
  ];

  // Testimonials Data
  const testimonials = [
    {
      quote: "SoundCraft instruments possess a soul. The resonance of their handcrafted acoustic guitar elevated our entire album recording session.",
      author: "Elena Rostova",
      role: "Grammy-nominated Vocalist & Producer",
      rating: 5,
      avatar: artist1
    },
    {
      quote: "The zero-drift tuning and warmth of their custom electric guitars are second to none. It feels weightless in performance yet hits with incredible tone.",
      author: "Marcus Vance",
      role: "Lead Guitarist for Zenith Tour",
      rating: 5,
      avatar: artist2
    },
    {
      quote: "As an audio engineer, I demand exact harmonic accuracy. SoundCraft's studio gear delivers pristine clarity every single session.",
      author: "Chloe Bennett",
      role: "Senior Mastering Engineer, Sonic Labs",
      rating: 5,
      avatar: artist3
    }
  ];

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  // Image arrays for the 3 tilted auto-scrolling collage columns (Strictly Instruments)
  const col1Images = [galleryAcoustic, galleryElectric, galleryBass, heroImg, studioSession];
  const col2Images = [galleryGrandpiano, gallerySynth, galleryDrumset, micCloseup, gallerySaxophone];
  const col3Images = [galleryViolin, gallerySnare, galleryTrumpet, galleryAcoustic, galleryElectric];

  // Doubled arrays to achieve seamless infinite 60fps vertical auto-scrolling
  const col1Loop = [...col1Images, ...col1Images];
  const col2Loop = [...col2Images, ...col2Images];
  const col3Loop = [...col3Images, ...col3Images];

  // Image arrays for the 2 slanting horizontal product marquee rows (Strictly Instruments)
  const marqueeRow1Images = [galleryAcoustic, galleryElectric, galleryBass, galleryGrandpiano, gallerySynth, studioSession, heroImg, galleryDrumset];
  const marqueeRow2Images = [galleryDrumset, gallerySnare, galleryViolin, gallerySaxophone, galleryTrumpet, micCloseup, galleryAcoustic, gallerySynth];

  // Doubled arrays for seamless 60fps horizontal infinite marquee scrolling
  const marqueeRow1Loop = [...marqueeRow1Images, ...marqueeRow1Images];
  const marqueeRow2Loop = [...marqueeRow2Images, ...marqueeRow2Images];

  return (
    <div className="app-canvas">
      {/* Outer Shell Wrapper with 28px border-radius */}
      <div className="main-viewport-container">
        
        {/* =================================================================== */}
        {/* NAVBAR */}
        {/* =================================================================== */}
        <header className="navbar">
          <div className="nav-brand">
            <div className="brand-logo-icon">
              <FaMusic />
            </div>
            <span className="brand-name">Sound<span className="brand-highlight">Craft</span></span>
          </div>

          <nav className="nav-links">
            <a href="#home" className="nav-link active">Home</a>
            <a href="#instruments" className="nav-link">Instruments</a>
            <a href="#studio" className="nav-link">Studio Gear</a>
            <a href="#artists" className="nav-link">Artists</a>
          </nav>

          <div className="nav-actions">
            <button className="nav-icon-btn" aria-label="Search">
              <FaSearch />
            </button>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="nav-icon-btn" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="nav-icon-btn" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <button className="nav-cta-btn">
              <span>Catalog</span>
              <FaChevronRight className="btn-arrow" />
            </button>
          </div>
        </header>

        {/* =================================================================== */}
        {/* HERO SECTION WITH TILTED AUTO-SCROLLING IMAGE COLLAGE */}
        {/* =================================================================== */}
        <section className="hero-section" id="home">
          <div className="hero-grid">
            
            {/* Left Column Text & CTAs */}
            <motion.div 
              className="hero-left"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="hero-badge">
                <FaCompactDisc className="badge-spin-icon" />
                <span>Next-Gen Acoustic Craftsmanship</span>
              </div>

              <h1 className="hero-title">
                Play the <br />
                <span className="gradient-text">Sound of Excellence</span>
              </h1>

              <p className="hero-subtitle">
                Handcrafted guitars, analog studio synthesizers, and acoustic masterworks designed for creators who demand pure audio perfection.
              </p>

              <div className="hero-cta-group">
                <button className="primary-pill-btn">
                  <span>Explore Catalog</span>
                  <FaArrowRight className="btn-arrow-icon" />
                </button>
                <button className="secondary-pill-btn">
                  <div className="play-icon-circle">
                    <FaPlay />
                  </div>
                  <span>Listen Samples</span>
                </button>
              </div>

              {/* Live Metric Pill Card */}
              <div className="hero-metric-card">
                <div className="metric-avatar-stack">
                  <div className="metric-avatar avatar-1"><FaUsers /></div>
                  <div className="metric-avatar avatar-2"><FaGlobe /></div>
                  <div className="metric-avatar avatar-3"><FaMusic /></div>
                </div>
                <div className="metric-info">
                  <div className="metric-number">14,200+</div>
                  <div className="metric-label">Instruments Shipped Worldwide</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Tilted Infinite Auto-Scrolling Image Collage Stage */}
            <div className="hero-right-stage">
              <div className="stage-ambient-glow" />

              {/* Tilted Collage Viewport Canvas */}
              <div className="tilted-collage-viewport">
                {/* Edge Vignette Gradient Fade Masks */}
                <div className="collage-fade-mask top-fade" />
                <div className="collage-fade-mask bottom-fade" />

                {/* Tilted Grid Container */}
                <div className="tilted-collage-grid">
                  
                  {/* Column 1 (Auto-Scrolls Upwards) */}
                  <div className="collage-column">
                    <div className="collage-track track-up">
                      {col1Loop.map((imgSrc, idx) => (
                        <div key={`col1-${idx}`} className="collage-card">
                          <img src={imgSrc} alt={`Instrument ${idx}`} className="collage-card-img" />
                          <div className="collage-card-overlay" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 2 (Auto-Scrolls Downwards) */}
                  <div className="collage-column">
                    <div className="collage-track track-down">
                      {col2Loop.map((imgSrc, idx) => (
                        <div key={`col2-${idx}`} className="collage-card">
                          <img src={imgSrc} alt={`Instrument ${idx}`} className="collage-card-img" />
                          <div className="collage-card-overlay" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 3 (Auto-Scrolls Upwards) */}
                  <div className="collage-column">
                    <div className="collage-track track-up-slow">
                      {col3Loop.map((imgSrc, idx) => (
                        <div key={`col3-${idx}`} className="collage-card">
                          <img src={imgSrc} alt={`Instrument ${idx}`} className="collage-card-img" />
                          <div className="collage-card-overlay" />
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Bottom Floating Feature Pill Cards Row */}
          <div className="hero-bottom-cards-row">
            <div className="bottom-feature-card glassmorphism">
              <div className="feature-card-icon orange-tint">
                <FaGuitar />
              </div>
              <div className="feature-card-text">
                <span className="feature-card-title">Create content now</span>
                <span className="feature-card-sub">1000+ instruments available</span>
              </div>
            </div>

            <div className="bottom-feature-card glassmorphism">
              <div className="feature-card-icon blue-tint">
                <FaSearch />
              </div>
              <div className="feature-card-text">
                <span className="feature-card-title">Find our best creators</span>
                <span className="feature-card-sub">Search best audio & gear</span>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 3-COLUMN CORE FEATURES GRID */}
        {/* =================================================================== */}
        <section className="features-section">
          <motion.div 
            className="features-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {features.map((feat) => (
              <motion.div key={feat.id} className="feature-card" variants={itemVariants}>
                <div className={`feature-badge-icon tint-${feat.tint}`}>
                  {feat.icon}
                </div>
                <div className="feature-category-badge">{feat.badge}</div>
                <h3 className="feature-title">{feat.title}</h3>
                <p className="feature-desc">{feat.desc}</p>
                <a href="#catalog" className="feature-link">
                  <span>Explore Series</span>
                  <FaArrowRight className="link-arrow" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* =================================================================== */}
        {/* SLANTING IMAGE MARQUEE SECTION ("Over 5000+ products available to check") */}
        {/* =================================================================== */}
        <section className="slanting-products-section" id="instruments">
          <div className="slanting-header-centered">
            <h2 className="slanting-title">
              Over 5000+ products <br />
              <span className="slanting-highlight">available to check</span>
            </h2>
          </div>

          {/* Slanting Marquee Canvas Viewport */}
          <div className="slanting-marquee-viewport">
            {/* Left & Right Vignette Fade Masks */}
            <div className="marquee-fade-mask left-fade" />
            <div className="marquee-fade-mask right-fade" />

            {/* Slanted Canvas Group */}
            <div className="slanting-marquee-canvas">
              
              {/* Row 1: Enters / Scrolls from Left Side Corner (Left-to-Right) */}
              <div className="marquee-row-track track-from-left">
                {marqueeRow1Loop.map((imgSrc, idx) => (
                  <div key={`mrow1-${idx}`} className="slanting-card">
                    <img src={imgSrc} alt={`Product Item ${idx}`} className="slanting-card-img" />
                    <div className="slanting-card-overlay" />
                    <div className="card-top-left-flame">
                      <span>🔥</span>
                    </div>
                    <div className="card-bottom-right-play">
                      <FaPlay className="mini-play-icon" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 2: Enters / Scrolls from Right Side Corner (Right-to-Left) */}
              <div className="marquee-row-track track-from-right">
                {marqueeRow2Loop.map((imgSrc, idx) => (
                  <div key={`mrow2-${idx}`} className="slanting-card">
                    <img src={imgSrc} alt={`Product Item ${idx}`} className="slanting-card-img" />
                    <div className="slanting-card-overlay" />
                    <div className="card-top-left-flame">
                      <span>{idx % 2 === 0 ? '🔥' : '❤️'}</span>
                    </div>
                    <div className="card-bottom-right-play">
                      <FaPlay className="mini-play-icon" />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECONDARY INTERACTIVE SHOWCASE ("Freedom for Your Acoustic Vision") */}
        {/* =================================================================== */}
        <section className="showcase-section" id="studio">
          <div className="showcase-grid">
            
            {/* Right Media Cards Block with AOS Zoom-In Out Effect */}
            <motion.div 
              className="showcase-media-container"
              initial={{ opacity: 0, scale: 0.75 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ amount: 0.35 }}
            >
              {/* Main Studio Session Card with AOS Zoom-In Out Scale */}
              <motion.div 
                className="showcase-main-card"
                initial={{ opacity: 0, scale: 0.82 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                viewport={{ amount: 0.35 }}
              >
                <img src={studioSession} alt="Studio Session" className="showcase-main-img" />
                <div className="showcase-overlay" />
                
                {/* Center Big Play Button */}
                <button className="showcase-center-play-btn" aria-label="Play Studio Session Video">
                  <div className="play-pulse-ring" />
                  <FaPlay />
                </button>

                {/* Floating Waveform Meter Pill at bottom left */}
                <div className="showcase-meter-pill">
                  <FaVolumeUp className="volume-icon" />
                  <div className="waveform-bars">
                    <span className="bar bar-1" />
                    <span className="bar bar-2" />
                    <span className="bar bar-3" />
                    <span className="bar bar-4" />
                    <span className="bar bar-5" />
                  </div>
                  <span className="meter-text">24-bit / 192kHz Pure Master</span>
                </div>
              </motion.div>

              {/* Overlapping Corner Card with AOS Zoom-In Out Scale */}
              <motion.div 
                className="showcase-corner-card glassmorphism"
                initial={{ opacity: 0, scale: 0.7, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                viewport={{ amount: 0.35 }}
              >
                <img src={micCloseup} alt="Microphone Closeup" className="corner-card-img" />
                <div className="corner-card-info">
                  <span className="corner-card-badge">Question & Answer</span>
                  <span className="corner-card-date">2026-09-18</span>
                  <div className="corner-card-status">
                    <FaCheckCircle className="status-icon" />
                    <span>Acoustic Tuned</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Left Narrative Column */}
            <motion.div 
              className="showcase-left-narrative"
              initial={{ opacity: 0, scale: 0.88, x: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ amount: 0.35 }}
            >
              <h2 className="showcase-title">
                Freedom for <br />
                <span className="gradient-text">Your Creative Ideas</span>
              </h2>

              <p className="showcase-desc">
                Elevate your musical expression with custom audio tracks, studio monitoring precision, and tools designed to monetise and amplify your acoustic story worldwide.
              </p>

              <div className="showcase-cta-row">
                <button className="primary-pill-btn">
                  <span>Get Started</span>
                </button>
                <button className="secondary-pill-btn video-trigger">
                  <div className="play-icon-circle mini">
                    <FaPlay />
                  </div>
                  <span>How it works?</span>
                </button>
              </div>

              {/* Three Feature Pill Widgets with Staggered AOS Zoom-In */}
              <div className="showcase-features-list">
                <motion.div 
                  className="showcase-feature-item"
                  initial={{ opacity: 0, scale: 0.85, x: 20 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  viewport={{ amount: 0.35 }}
                >
                  <div className="item-icon-box purple"><FaMusic /></div>
                  <span>Add audio tracks to your stories</span>
                </motion.div>

                <motion.div 
                  className="showcase-feature-item"
                  initial={{ opacity: 0, scale: 0.85, x: 20 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  viewport={{ amount: 0.35 }}
                >
                  <div className="item-icon-box orange"><FaStar /></div>
                  <span>Make money on content</span>
                </motion.div>

                <motion.div 
                  className="showcase-feature-item"
                  initial={{ opacity: 0, scale: 0.85, x: 20 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  viewport={{ amount: 0.35 }}
                >
                  <div className="item-icon-box blue"><FaSlidersH /></div>
                  <span>Control the plot of stories</span>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* =================================================================== */}
        {/* TESTIMONIAL / CREATOR STORIES SECTION WITH ORBITAL AVATAR CARDS */}
        {/* =================================================================== */}
        <section className="testimonials-section" id="artists">
          <div className="creator-header-centered">
            <h2 className="creator-title">
              <span className="title-blue-dot" />
              Enjoy listening to endless <br />
              stories with our creators
            </h2>
          </div>

          <div className="creator-orbital-canvas">
            
            {/* Background Soft Pink Glow backdrop shape */}
            <div className="creator-ambient-glow" />

            {/* Continuous Loop Connector SVG Line */}
            <svg className="creator-wave-svg" viewBox="0 0 1000 480" fill="none" preserveAspectRatio="none">
              <defs>
                <linearGradient id="creator-loop-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="35%" stopColor="#3b82f6" />
                  <stop offset="70%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <filter id="loop-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <path 
                d="M 120,90 C 280,110 380,75 520,70 C 660,65 740,75 860,95 C 970,115 975,290 850,410 C 720,445 280,445 150,410 C 25,290 35,115 120,90 Z" 
                stroke="url(#creator-loop-gradient)" 
                strokeWidth="2.5" 
                strokeDasharray="8 6"
                filter="url(#loop-glow)"
              />
            </svg>

            {/* Floating Color Accent Dots */}
            <motion.span 
              className="accent-dot dot-red-top"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.span 
              className="accent-dot dot-blue-mid"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
            <motion.span 
              className="accent-dot dot-purple-bottom"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
            <motion.span 
              className="accent-dot dot-red-bottom"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            />

            {/* 4 Orbital Creator Avatar Cards */}
            <div className="creator-cards-row">
              
              {/* Card 1: Far Left (SincerelyQueenie) */}
              <motion.div 
                className="creator-card card-far-left"
                initial={{ opacity: 0, y: 40, scale: 0.85 }}
                whileInView={{ opacity: 0.75, y: 25, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                viewport={{ amount: 0.3 }}
                whileHover={{ opacity: 1, scale: 1.02, y: 15 }}
                onClick={() => setActiveTestimonial(0)}
              >
                <div className="creator-avatar-wrapper">
                  <img src={artist1} alt="SincerelyQueenie" className="creator-avatar-img" />
                </div>
                <h4 className="creator-name">SincerelyQueenie</h4>
                <div className="creator-pill-badge">Creator</div>
              </motion.div>

              {/* Card 2: Middle Left (Girlfriend) */}
              <motion.div 
                className="creator-card card-mid-left"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ amount: 0.3 }}
                whileHover={{ scale: 1.05, y: -6 }}
                onClick={() => setActiveTestimonial(1)}
              >
                <div className="creator-avatar-wrapper">
                  <img src={artist2} alt="Girlfriend" className="creator-avatar-img" />
                </div>
                <h4 className="creator-name">Girlfriend</h4>
                <div className="creator-pill-badge">Creator</div>
              </motion.div>

              {/* Card 3: Middle Right (NoceurASMR) - Tilted card */}
              <motion.div 
                className="creator-card card-mid-right tilted-card"
                initial={{ opacity: 0, y: -10, scale: 0.9, rotate: 0 }}
                whileInView={{ opacity: 1, y: -22, scale: 1, rotate: 4 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ amount: 0.3 }}
                whileHover={{ scale: 1.05, y: -28, rotate: 2 }}
                onClick={() => setActiveTestimonial(2)}
              >
                <div className="creator-avatar-wrapper">
                  <img src={artist3} alt="NoceurASMR" className="creator-avatar-img" />
                </div>
                <h4 className="creator-name">NoceurASMR</h4>
                <div className="creator-pill-badge">Creator</div>
              </motion.div>

              {/* Card 4: Far Right (Foman) */}
              <motion.div 
                className="creator-card card-far-right"
                initial={{ opacity: 0, y: 40, scale: 0.85 }}
                whileInView={{ opacity: 0.75, y: 30, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ amount: 0.3 }}
                whileHover={{ opacity: 1, scale: 1.02, y: 20 }}
                onClick={() => setActiveTestimonial(0)}
              >
                <div className="creator-avatar-wrapper">
                  <img src={heroImg} alt="Foman" className="creator-avatar-img" />
                </div>
                <h4 className="creator-name">Foman</h4>
                <div className="creator-pill-badge">Creator</div>
              </motion.div>

            </div>

            {/* Active Creator Quote Modal / Bubble */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTestimonial}
                className="creator-quote-bubble glassmorphism"
                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              >
                <div className="quote-badge-tag">
                  <FaStar className="star-gold" />
                  <span>Verified Creator Story</span>
                </div>
                <p className="creator-quote-text">"{testimonials[activeTestimonial].quote}"</p>
                <span className="creator-quote-author">— {testimonials[activeTestimonial].author}, {testimonials[activeTestimonial].role}</span>
              </motion.div>
            </AnimatePresence>

          </div>
        </section>

        {/* =================================================================== */}
        {/* FOOTER */}
        {/* =================================================================== */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="nav-brand">
                <div className="brand-logo-icon">
                  <FaMusic />
                </div>
                <span className="brand-name">Sound<span className="brand-highlight">Craft</span></span>
              </div>
              <p className="footer-desc">
                Pioneering acoustic precision, custom handcrafted instruments, and studio reference equipment for creators worldwide.
              </p>
            </div>

            <div className="footer-links-group">
              <div className="footer-col">
                <h4>Instruments</h4>
                <a href="#instruments">Acoustic Guitars</a>
                <a href="#instruments">Electric Guitars</a>
                <a href="#instruments">Bass Guitars</a>
                <a href="#instruments">Grand Pianos</a>
              </div>
              <div className="footer-col">
                <h4>Studio Gear</h4>
                <a href="#studio">Analog Synths</a>
                <a href="#studio">Condenser Mics</a>
                <a href="#studio">Studio Monitors</a>
                <a href="#studio">Percussion Hub</a>
              </div>
              <div className="footer-col">
                <h4>Company</h4>
                <a href="#about">Our Story</a>
                <a href="#luthiers">Master Luthiers</a>
                <a href="#artists">Artist Roster</a>
                <a href="#contact">Support & Tuning</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} SoundCraft Audio Inc. All rights reserved.</span>
            <div className="footer-socials">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Home;
