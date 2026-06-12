interface GuideSection {
  heading?: string;
  paragraphs: string[];
}

export const guideContent: Record<string, GuideSection[]> = {
  "how-to-tune-a-guitar": [
    {
      paragraphs: [
        "Tuning your guitar is the first skill every guitarist should master. A well-tuned guitar sounds better, makes learning easier, and ensures you play in harmony with other musicians.",
      ],
    },
    {
      heading: "Using an Online Tuner",
      paragraphs: [
        "The easiest way to tune your guitar is with a free online tuner like EasyTuner. Simply allow microphone access, select the string you want to tune, and pluck it. The tuner will show you whether the note is flat (too low), sharp (too high), or in tune.",
        "Adjust the tuning peg for that string until the tuner shows the correct note in green. Repeat for all six strings, starting from the lowest (6th) string.",
      ],
    },
    {
      heading: "Tuning by Ear",
      paragraphs: [
        "If you don't have access to a tuner, you can tune relative to a reference pitch. Tune the low E string (6th) to a known reference, then fret the 5th fret of the low E string — it should match the open A string (5th). Continue this pattern: 5th fret of A matches open D, 5th fret of D matches open G. The exception is the B string: the 4th fret of the G string matches open B.",
      ],
    },
    {
      heading: "Tips for Accurate Tuning",
      paragraphs: [
        "Pluck the string firmly but not too hard. Tune up to the note rather than down — if you overshoot, loosen the string and tune up again. Check your tuning after playing for a few minutes, as new strings especially tend to drift.",
      ],
    },
  ],
  "guitar-string-frequencies": [
    {
      paragraphs: [
        "Every guitar string vibrates at a specific frequency measured in Hertz (Hz). Understanding these frequencies helps you tune more accurately and understand how your instrument works.",
      ],
    },
    {
      heading: "Standard Tuning Frequencies",
      paragraphs: [
        "In standard EADGBE tuning, the six strings vibrate at the following frequencies: Low E (6th string) = 82.41 Hz, A (5th string) = 110.00 Hz, D (4th string) = 146.83 Hz, G (3rd string) = 196.00 Hz, B (2nd string) = 246.94 Hz, High E (1st string) = 329.63 Hz.",
        "These frequencies are based on A4 = 440 Hz, the international standard for musical pitch.",
      ],
    },
    {
      heading: "How Frequency Relates to Pitch",
      paragraphs: [
        "When you tighten a string, its frequency increases and the pitch goes higher. When you loosen it, the frequency decreases and the pitch goes lower. A difference of 100 cents equals one semitone (one fret on the guitar).",
        "Our online tuner measures frequency in real-time and shows your deviation in cents, making it easy to achieve precise tuning.",
      ],
    },
  ],
  "standard-guitar-tuning": [
    {
      paragraphs: [
        "Standard guitar tuning (EADGBE) is the most widely used tuning for the six-string guitar. It has been the default tuning for centuries and is the foundation for most guitar music.",
      ],
    },
    {
      heading: "The EADGBE System",
      paragraphs: [
        "From lowest to highest pitch: E2, A2, D3, G3, B3, E4. The strings are tuned in fourths (E to A, A to D, D to G) except for the interval between G and B, which is a major third. This arrangement makes common chord shapes comfortable to play.",
      ],
    },
    {
      heading: "Why Standard Tuning?",
      paragraphs: [
        "Standard tuning offers the best balance of comfortable chord voicings, reasonable string tension, and versatility across genres. Most guitar learning resources, tabs, and instructional materials assume standard tuning.",
        "If you're just starting out, learn standard tuning first before exploring alternatives like Drop D or Open G.",
      ],
    },
  ],
  "drop-d-vs-standard": [
    {
      paragraphs: [
        "Drop D and standard tuning are two of the most popular guitar tunings. Understanding the differences helps you choose the right tuning for your music.",
      ],
    },
    {
      heading: "Standard Tuning (EADGBE)",
      paragraphs: [
        "Standard tuning uses E-A-D-G-B-E. It's versatile for all genres, makes barre chords accessible, and is what most guitarists learn first. The low E string provides a solid bass foundation for chords and riffs.",
      ],
    },
    {
      heading: "Drop D Tuning (DADGBE)",
      paragraphs: [
        "Drop D lowers only the 6th string from E to D, giving you D-A-D-G-B-E. This one-step change unlocks heavier power chords (play the lowest three strings open for a D5 chord) and deeper riffs. It's popular in rock, metal, and alternative music.",
      ],
    },
    {
      heading: "Which Should You Use?",
      paragraphs: [
        "Use standard tuning for general playing, learning, and most songs. Switch to Drop D when you want a heavier sound or need quick access to power chords on the lowest three strings. Many guitarists keep one guitar in each tuning for convenience.",
      ],
    },
  ],
};
