interface GuideImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

interface GuideSection {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
  image?: GuideImage;
}

export const guideContent: Record<string, GuideSection[]> = {
  "how-to-tune-a-guitar": [
    {
      paragraphs: [
        "Learning how to tune a guitar is the single most important habit you can build as a player. Even perfect finger technique cannot save a guitar that is even slightly out of tune — chords sound muddy, melodies clash with backing tracks, and your ear learns the wrong pitches. The good news is that tuning does not require expensive hardware. With a quiet room, a smartphone or laptop, and EasyTuner's free online guitar tuner at easytuner.org, you can bring a six-string guitar to concert pitch in just a few minutes.",
        "This guide walks you through the entire process using the tools built into EasyTuner: reference tones you can hear by ear, real-time microphone feedback on the strobe dial, cent-by-cent accuracy readouts, and auto-advance that guides you string by string through standard EADGBE tuning. Whether you are picking up a guitar for the first time or refreshing skills after a long break, follow the steps below and you will have a reliably tuned instrument ready to play.",
      ],
      image: {
        src: "/guides/how-to-tune-a-guitar/01-hero-guitar-tuning.webp",
        alt: "Acoustic guitar beside a laptop showing the EasyTuner online guitar tuner",
        width: 1200,
        height: 630,
        caption:
          "A quiet room, your guitar, and EasyTuner on any device — all you need to tune in minutes.",
      },
    },
    {
      heading: "What Is Standard Guitar Tuning (EADGBE)?",
      paragraphs: [
        "Before you touch a tuning peg, it helps to know what \"in tune\" actually means for a six-string guitar. Standard tuning — written EADGBE from the lowest (thickest) string to the highest (thinnest) — is the default for nearly all beginner lessons, song tabs, and instructional videos. Each letter names the open pitch of that string when it is not fretted.",
        "In scientific pitch notation, the six open strings are E2, A2, D3, G3, B3, and E4. The low E vibrates at roughly 82 Hz; the high E rings near 330 Hz. See [Guitar String Frequencies](/guides/guitar-string-frequencies) for the full Hz chart. Every other common tuning — [Drop D](/guitar-tunings/drop-d), DADGAD, open chords — is a variation on this foundation, so mastering standard tuning first pays off everywhere else. For what EADGBE means and why it is the default, read [Standard Guitar Tuning](/guides/standard-guitar-tuning). EasyTuner loads EADGBE by default on the [home page](/), and the fretboard labels each string with its full target note so you always know which pitch you are aiming for.",
      ],
    },
    {
      heading: "What You Need Before You Start",
      paragraphs: [
        "Gather a few basics and tuning becomes straightforward instead of frustrating.",
      ],
      bullets: [
        "A six-string guitar with turning pegs that move smoothly — stiff or slipping pegs make fine adjustments difficult.",
        "A phone, tablet, or computer with a built-in microphone and a modern browser (Chrome, Safari, Firefox, or Edge).",
        "A reasonably quiet space. Fans, traffic, and television audio can confuse pitch detection.",
        "Optional but helpful: fresh strings, which hold pitch better once they have settled after a day or two of playing.",
      ],
    },
    {
      heading: "Open EasyTuner and Allow Microphone Access",
      paragraphs: [
        "Navigate to the [EasyTuner home page](/) — the online guitar tuner loads immediately with standard EADGBE selected. You will see a visual fretboard showing all six strings, a tuning chart listing each target note, and a large strobe dial below. If you play alternate tunings regularly, use the tuning selector in the sidebar to switch (for example Drop D or DADGAD); this guide focuses on standard tuning, which is where every guitarist should start.",
        "When you are ready for microphone-based tuning, press the Tap to tune button. Your browser will ask for microphone permission — choose Allow. EasyTuner processes audio locally in your browser; nothing is uploaded to a server. Once the mic is active, the highlighted string on the fretboard tells you which open string to pluck next. If you prefer to tune entirely by ear first, skip the microphone for now and use the reference-tone speakers described in the next section.",
      ],
      image: {
        src: "/guides/how-to-tune-a-guitar/03-easytuner-interface.webp",
        alt: "EasyTuner home page showing the guitar fretboard, tuning chart, Tap to tune button, and strobe dial",
        width: 1200,
        height: 720,
        caption:
          "The EasyTuner interface: fretboard, tuning chart, Tap to tune, and the strobe dial.",
      },
    },
    {
      heading: "Tune by Ear with Built-In Reference Tones",
      paragraphs: [
        "Ear training and electronic tuning complement each other. EasyTuner places a speaker icon beside every string on the fretboard. Tap it to hear a clean reference tone at the exact target pitch — low E2 on the 6th string, A2 on the 5th, and so on up to high E4 on the 1st string. Listen closely to the sustained note, then pluck the same open string on your guitar.",
        "Turn the corresponding tuning peg slowly. As the string pitch approaches the reference, you will hear the two notes start to blend. When they match, the beating or wobbling sound between them disappears. If you are unsure which direction to turn, remember: tightening the string (turning the peg so the string wraps tighter) raises the pitch; loosening lowers it.",
        "Enable the Loop toggle below the fretboard to keep the reference tone playing continuously while both hands are free to adjust the peg. Loop is especially useful on the low E string, where pitch changes can be subtle and easy to overshoot. Many experienced players tune the 6th string by ear first, then use the microphone for precision on the remaining strings — EasyTuner supports that hybrid workflow without switching apps.",
      ],
    },
    {
      heading: "Fine-Tune with the Strobe Dial and Microphone",
      paragraphs: [
        "Reference tones get you close; the strobe dial locks you in. After pressing Tap to tune and plucking the highlighted open string, watch the circular display. Rotating stripes mean your pitch is still off — the faster they spin, the further you are from the target. As you approach the correct note, the stripes slow down and eventually freeze when you are within a few cents of perfect pitch.",
        "Below the dial, EasyTuner shows the detected note name, your deviation in cents (one cent equals one hundredth of a semitone, or roughly one fret divided into a hundred parts), and plain-language guidance: Tune up if the string is flat (too low) or Tune down if it is sharp (too high). Aim for the green in-tune zone — typically within about five cents of the target. When a string is locked in, a checkmark appears beside it on the fretboard and the progress bar advances.",
        "Pluck with a firm, consistent attack near the middle of the string or over the 12th fret — not so hard that the note warbles, not so softly that the mic barely registers. Let the note ring for at least a second so the tuner can stabilise its reading. If the display jumps wildly, check for background noise or try moving closer to your device's microphone.",
      ],
    },
    {
      heading: "String-by-String: Lowest to Highest",
      paragraphs: [
        "With auto-advance enabled (the default setting), EasyTuner moves to the next string automatically after each one is tuned, working from the 6th string up to the 1st. This order is intentional: lower strings carry more tension influence on the neck, so tuning them first helps the higher strings stay stable. You can turn off auto-advance in the sidebar if you want to jump between strings freely — useful when only one string slipped out during a session.",
        "Work through each string using the steps above. Use the chart below as a quick reference while you play:",
      ],
      bullets: [
        "6th string (thickest) — Low E / E2 (~82 Hz). Turn the peg at the headstock end of this string until the strobe settles on E or the reference tone matches.",
        "5th string — A / A2 (~110 Hz). Pluck the open 5th string only; avoid accidentally hitting adjacent strings.",
        "4th string — D / D3 (~147 Hz). Check that the tuner reads D, not a nearby note like D# — playing the wrong string is a common beginner mistake.",
        "3rd string — G / G3 (~196 Hz). The wound G string can take a moment to stabilise; pluck twice if the first reading flickers.",
        "2nd string — B / B3 (~247 Hz). Plain steel strings react quickly; make small peg adjustments to avoid overshooting.",
        "1st string (thinnest) — High E / E4 (~330 Hz). Go slowly — this string is easy to snap if you tune too high. Stop if you hear excessive tension.",
      ],
      image: {
        src: "/guides/how-to-tune-a-guitar/06-tuning-peg-headstock.webp",
        alt: "Hand turning a guitar tuning peg on the headstock to adjust string pitch",
        width: 1000,
        height: 667,
        caption:
          "Turn the peg slowly for the highlighted string — small movements make a big difference on the thin strings.",
      },
    },
    {
      heading: "Track Your Progress and Verify the Full Set",
      paragraphs: [
        "EasyTuner's fretboard gives you at-a-glance feedback: untuned strings appear neutral, strings that are close show partial progress, and fully tuned strings display a checkmark. The bar above the fretboard fills as you complete the set. When all six strings show checkmarks, strum a few open chords — E major, G major, D major — and listen for beating or dissonance between notes that should sound consonant.",
        "If one chord still sounds wrong, isolate individual strings again rather than assuming the whole guitar is fine. Often a single string has drifted by ten or twenty cents while the others held. Re-pluck that string with the microphone active and nudge the peg until the checkmark returns. Playing for five to ten minutes can pull strings slightly flat, especially on a new set — a quick second pass through all six strings after a short warm-up is normal professional practice, not a sign of failure.",
      ],
    },
    {
      heading: "Common Problems and How to Fix Them",
      paragraphs: [
        "Even with a good tuner, a few recurring issues trip up beginners. Recognising them saves time.",
      ],
      bullets: [
        "Wrong octave detected — If the tuner shows a note far from your target (for example B when you expect E), you may be plucking the wrong string or the string is so far out of tune it registers as a different pitch entirely. Rough-tune by ear with the reference speaker first, then switch to the mic.",
        "Peg slips after tuning — Older guitars sometimes have worn tuners that do not hold tension. Tune slightly sharp, press the string into the nut slot, then back down to pitch. Consider having tuners serviced if slipping persists.",
        "Background noise interference — Air conditioners and conversation can confuse pitch detection. Move to a quieter spot or hold the guitar closer to the mic.",
        "New strings won't stay put — Stretch each string gently by pulling it away from the fretboard after tuning, then re-tune. Repeat two or three times during the first day.",
        "Browser blocked the microphone — Click the lock or camera icon in your browser's address bar and reset the microphone permission to Allow, then reload EasyTuner.",
      ],
    },
    {
      heading: "Best Practices for Accurate, Long-Lasting Tuning",
      paragraphs: [
        "Small technique habits make a measurable difference. Always tune up to the note rather than down: if you overshoot sharp, loosen the string below the target and approach again from below. Strings settle more reliably under increasing tension than decreasing tension.",
        "Tune before every practice session and again after vigorous bending or heavy strumming. Temperature and humidity shift wooden necks enough to matter, particularly when moving a guitar between rooms or taking it outdoors. Store the guitar in a case when not in use to slow environmental drift.",
        "If you do not have microphone access — on a shared computer, for example — you can still use EasyTuner's reference tones exclusively, or tune relative to a single known string: match the 5th fret of the low E to the open A string, then continue the fifth-fret method up the neck (with the exception that the 4th fret of the G string matches open B). Electronic tuning is faster and more precise, but ear skills built through reference tones stay valuable for decades.",
      ],
    },
    {
      heading: "When to Explore Alternate Tunings",
      paragraphs: [
        "Once standard EADGBE feels comfortable, you might lower the 6th string for [Drop D](/guitar-tunings/drop-d), explore [DADGAD](/guitar-tunings/dadgad) for folk fingerstyle, or try [open G](/guitar-tunings/open-g) for slide playing. EasyTuner includes dedicated pages for popular alternate tunings under Guitar Tunings in the navigation — each page loads the correct string targets, reference tones, and fretboard layout for that tuning so you are not guessing note names.",
        "Not sure whether to stay in standard or drop the 6th string? Read [Drop D vs Standard Tuning](/guides/drop-d-vs-standard) for a side-by-side comparison. Return to standard tuning before learning new songs from mainstream tabs, and always re-tune fully when switching between tunings. A guitar that sounds great in Drop D will sound wrong playing standard-tuned repertoire until every string is brought back to EADGBE.",
      ],
    },
    {
      heading: "Start Tuning Now",
      paragraphs: [
        "Tuning a guitar is not a one-time lesson — it is a ritual that connects you to the instrument before every song. With EasyTuner's reference tones, strobe dial, cent readout, tune-up and tune-down hints, auto-advance, and visual progress tracking, you have everything needed to go from silent strings to a concert-ready EADGBE setup in one sitting. Open the tuner, allow your microphone, pluck the low E, and work your way up. Within minutes your chords will ring clear, your practice will train your ear correctly, and you will be ready to play.",
      ],
    },
  ],
  "guitar-string-frequencies": [
    {
      paragraphs: [
        "Most guitarists learn the six open-string names — E, A, D, G, B, E — before they ever see a number beside them. That is enough to get through your first lessons. But behind each letter sits a physical measurement: how many times per second that string vibrates back and forth. That measurement is frequency, expressed in Hertz (Hz).",
        "Knowing the frequencies for standard tuning is not academic trivia. It explains why your low E feels harder for a phone microphone to track than your high E, why tuners talk in cents as well as note names, and why two guitars can both read \"in tune\" yet sound slightly different. This reference covers the Hz values for EADGBE, where those numbers come from, and how they connect to what you see on EasyTuner's strobe dial when you tune.",
      ],
    },
    {
      heading: "What Hertz Actually Means on a Guitar String",
      paragraphs: [
        "One Hertz equals one complete vibration cycle per second. Pluck the open low E string and, if it is tuned correctly, the string body moves back and forth roughly 82 times every second. Your ear interprets that rate as a pitch — a low, steady E. Pluck the high E and the rate jumps to about 330 vibrations per second. Same note letter, different octave, very different frequency.",
        "Several factors set a string's natural frequency: its length (nut to bridge), tension (how hard you have turned the peg), and mass per unit length (string gauge and whether it is wound). Shorten the vibrating length by fretting, and frequency rises. Tighten the peg, frequency rises again. This is why tuning is really the act of adjusting tension until each open string lands on its target Hz.",
      ],
    },
    {
      heading: "The A4 = 440 Hz Reference",
      paragraphs: [
        "Modern tuners — including browser-based tools like EasyTuner — calculate guitar pitches from a single anchor: A above middle C (written A4) at 440 Hz. That convention, formalised as ISO 16, is what most digital tuners, piano tuners, and recording software assume by default. Every other note in the chromatic scale is derived mathematically from that anchor using equal temperament, where each semitone is an equal ratio rather than a slightly uneven natural interval.",
        "You may occasionally hear orchestras tune to A4 = 442 Hz for brightness, or encounter historical pitches slightly flat of 440. For guitar practice, session work, and playing along with most backing tracks, 440 is the practical standard. EasyTuner's reference tones and microphone detection both use this system, so the E2 target on your screen is the E2 defined relative to A4 = 440 — not an approximate guess.",
      ],
    },
    {
      heading: "Standard EADGBE Frequency Chart",
      paragraphs: [
        "The table below lists the six open strings in standard tuning, numbered from the 6th (lowest) to the 1st (highest). Frequencies are shown to two decimal places, which is more precision than your ear can separate but matches what a good electronic tuner displays.",
      ],
      bullets: [
        "6th string — E2 — 82.41 Hz (low E, the thickest string)",
        "5th string — A2 — 110.00 Hz",
        "4th string — D3 — 146.83 Hz",
        "3rd string — G3 — 196.00 Hz",
        "2nd string — B3 — 246.94 Hz",
        "1st string — E4 — 329.63 Hz (high E, one octave above the 6th string's E)",
      ],
    },
    {
      heading: "How the Six Frequencies Relate to Each Other",
      paragraphs: [
        "Standard guitar tuning is mostly a chain of perfect fourths: E to A, A to D, D to G. Each step multiplies frequency by roughly 4/3 (about 1.333). The exception is the gap from G to B, which is a major third — a slightly smaller jump — and that is part of why open C and G chord shapes feel natural under your fingers.",
        "Octaves always double the frequency. E4 at 329.63 Hz is exactly twice E3 (164.81 Hz), which is twice E2 (82.41 Hz). If you play the 12th-fret harmonic on the low E string, you are hearing the same pitch class as the open high E, though produced differently. Recognising octave relationships helps when a tuner briefly flashes the wrong E — the microphone caught a harmonic before the fundamental settled.",
        "Drop D tuning changes only one entry in the chart: the 6th string becomes D2 at approximately 73.42 Hz. Everything else stays identical to standard tuning. EasyTuner loads the correct targets automatically when you switch tunings on the [home page](/) or on a dedicated [Drop D tuner](/guitar-tunings/drop-d) page.",
      ],
    },
    {
      heading: "Cents: Finer Steps Than Whole Hertz",
      paragraphs: [
        "Hertz is useful for identifying which note you are near, but guitar tuning demands finer resolution. Musicians use cents: one cent is one hundredth of a semitone. One semitone spans 100 cents, and on a guitar fretboard one semitone equals one fret.",
        "The relationship is logarithmic, not linear. On a low string, a deviation of 5 Hz might be dozens of cents — clearly out of tune. On the high E string, the same 5 Hz might be only a handful of cents. That is why EasyTuner shows cents on the strobe dial rather than asking you to memorise acceptable Hz windows per string. When the display reads within about ±5 cents of the target and the stripes stop spinning, you are in the zone most players consider musically in tune.",
        "Reference tones on the fretboard are generated at the exact target frequency for each string. When you compare by ear, you are matching Hz for Hz. When you use Tap to tune, the microphone estimates the frequency of the vibrating string in real time and converts that reading into note name plus cent deviation.",
      ],
    },
    {
      heading: "Why the Low E String Behaves Differently",
      paragraphs: [
        "At 82 Hz, the low E sits near the bottom of what many built-in laptop and phone microphones capture cleanly. The fundamental wave is long and slow; small background rumble — air conditioning, traffic, desk vibration — can compete with it. Guitar pickups and dedicated clip-on tuners work closer to the source partly for this reason.",
        "Pitch detection algorithms also contend with harmonics. A vibrating string produces a fundamental frequency plus overtones at integer multiples. Microphones sometimes lock onto a strong overtone before the fundamental is clear, which can make a tuner think you are an octave high until the note decays. EasyTuner applies instrument-aware processing for guitar strings, but the physics still reward a firm pluck, a quiet room, and patience on the 6th string. If readings bounce, try plucking nearer the 12th fret and let the note sustain.",
      ],
    },
    {
      heading: "When Exact Hz Matters — and When It Does Not",
      paragraphs: [
        "Recording alongside fixed-pitch instruments (piano, synth, quantized tracks) benefits from tuning closely to 440-based references. If everyone is within a few cents, chords stack cleanly.",
        "Purely acoustic jamming sometimes tolerates a wider spread. What matters most is that the six strings agree with each other — internal intonation — even if the whole guitar is a few cents sharp or flat relative to absolute pitch. Temperature shifts, humidity, and string age pull individual strings at different rates. Checking the chart mentally is less useful than running through the strings again after ten minutes of playing.",
        "Capo placement raises every string's sounding pitch by the same number of semitones. Clamp at the 2nd fret and your open shapes sound a whole step higher; the physical open-string frequencies you measure are no longer the EADGBE values in this chart. Tune open first, then capo, then fine-tune if needed.",
      ],
    },
    {
      heading: "Using This Chart with EasyTuner",
      paragraphs: [
        "You do not need to memorise six decimal places. Keep the chart as a reference when something looks wrong: if you expect E2 but the dial suggests a note far away, the string may be an entire step out, or the wrong string was plucked. The tuning chart on the [home page](/) lists the same targets in note-name form (E2, A2, D3, G3, B3, E4) beside each string.",
        "For a full walkthrough of the tuning workflow — reference tones, microphone permission, auto-advance, and troubleshooting — see our guide [How to Tune a Guitar](/guides/how-to-tune-a-guitar). To hear and match these frequencies yourself, open the [free guitar tuner](/), tap the speaker beside any string, and compare the sustained tone to your open string while watching the cent readout lock in.",
      ],
    },
  ],
  "standard-guitar-tuning": [
    {
      paragraphs: [
        "Ask a room of guitarists what tuning they use and most will answer with six letters: E-A-D-G-B-E. That layout — called standard tuning — is the baseline the instrument is built around, the default in tuners and tab sites, and the reference point every alternate tuning modifies. If Drop D changes one string and DADGAD changes three, standard tuning is what they are changing from.",
        "This article explains what EADGBE actually means: which notes belong to which strings, why the intervals are arranged the way they are, and which musical traditions treat this layout as home base. It is a concept guide, not a tuning walkthrough — for microphone steps and peg-by-peg practice, see [How to Tune a Guitar](/guides/how-to-tune-a-guitar); for the Hz values behind each string, see [Guitar String Frequencies](/guides/guitar-string-frequencies).",
      ],
    },
    {
      heading: "How to Read E-A-D-G-B-E",
      paragraphs: [
        "The name lists the open-string pitches from lowest to highest, reading left to right across the six strings as you look down at the guitar in playing position. The 6th string — thickest, nearest your face when you hold the instrument — is low E. The 1st string — thinnest, closest to the floor — is high E. Between them sit A, D, G, and B.",
        "Musicians often add octave numbers to remove ambiguity, because the letter E appears twice. In scientific pitch notation the full standard set is E2, A2, D3, G3, B3, E4. The high E vibrates at roughly twice the frequency of the E an octave below it on the 4th string (not the 6th — that is two octaves down from high E). EasyTuner labels each string with these full names on the fretboard and tuning chart so you always know which octave you are targeting.",
      ],
    },
    {
      heading: "The Interval Map: Mostly Fourths, One Third",
      paragraphs: [
        "Standard tuning is almost a ladder of perfect fourths — five semitones between adjacent strings — with a single deliberate break.",
      ],
      bullets: [
        "E → A (6th to 5th string): perfect fourth",
        "A → D (5th to 4th): perfect fourth",
        "D → G (4th to 3rd): perfect fourth",
        "G → B (3rd to 2nd): major third (four semitones — the exception)",
        "B → E (2nd to 1st): perfect fourth",
      ],
    },
    {
      heading: "Why the G-to-B Gap Exists",
      paragraphs: [
        "An all-fourths tuning (like E-A-D-G-C-F, mirroring a bass guitar's fourths layout) would be logically tidy, but awkward for common guitar chords. Stacking fourths everywhere pushes familiar open shapes — G major, C major, D major — into stretches that do not fit the hand comfortably on a six-string neck tuned to concert pitch.",
        "Narrowing the interval between the 3rd and 2nd strings to a major third pulls the B string closer to G in pitch space. That shift is what makes open C and G chords playable with natural fingerings, and it keeps barre-chord templates consistent as you move across the neck. The compromise is asymmetry: scale patterns and arpeggios must account for the one string that breaks the fourths pattern — every guitarist learns that B-string shift eventually.",
        "The layout also balances tension across the neck. String gauges step down from thick to thin; matching each string to a musically useful pitch at playable tension was part of how the modern six-string settled into EADGBE rather than a purely mathematical spacing.",
      ],
    },
    {
      heading: "A Short History (Without Myths)",
      paragraphs: [
        "Guitars have not always been six-string instruments tuned EADGBE. Medieval and Renaissance plucked strings used various courses and tunings; the modern classical guitar tradition contributed technique and repertoire before the steel-string and electric instruments diverged.",
        "EADGBE on a six-string became the practical worldwide default over the nineteenth and twentieth centuries as the instrument spread through classical publishing, folk transmission, blues, jazz, and finally rock and pop recording. Not because a single authority declared it, but because it worked for teaching, composition, and factory setup at scale. Alternate tunings never disappeared — they orbit this centre.",
        "You do not need historical detail to play, but knowing that EADGBE is a convention rather than a law of nature explains why tabs assume it and why switching tunings requires relearning some shapes.",
      ],
    },
    {
      heading: "What Stays the Same in Every Key",
      paragraphs: [
        "Standard tuning fixes the relationship between strings, not the key of a song. You can play in A minor, E major, or B flat mixolydian without retuning — you move fretted shapes and root positions along the neck. Open strings provide convenient drones and chord tones in keys that fit the open notes (E, A, D, G, B and their relatives).",
        "Capo placement transposes those shapes without changing the physical tuning. Clamp at the 3rd fret and an open G shape sounds as B flat; the strings still read EADGBE when you remove the capo. Alternate tunings, by contrast, change the open-string notes themselves and therefore rewrite which shapes are easy.",
      ],
    },
    {
      heading: "Styles and Situations That Assume EADGBE",
      paragraphs: [
        "If instructional material does not name a tuning, it means standard. That covers most beginner courses, classical guitar exam syllabi (on nylon-string instruments tuned the same way), jazz chord-melody arrangements, country flatpicking, blues rhythm work, and the majority of rock and pop transcriptions.",
        "Fingerstyle acoustic often stays in EADGBE even when players use alternate tunings for specific albums — standard remains the teaching language. Metal and hard rock frequently branch into Drop D, Drop C, or lower, but those are deliberate departures; the riffs you learn first are still mapped to EADGBE on a practice guitar.",
        "Ensemble playing reinforces the default. Piano, bass, and horns in concert pitch align with a guitar tuned to A4 = 440 Hz standard references. When everyone shares that centre, unison lines and charts transpose predictably.",
      ],
    },
    {
      heading: "Standard Tuning Among Alternates",
      paragraphs: [
        "Alternate tunings are best understood as edits to EADGBE. Drop D lowers only the 6th string — five strings untouched. Open G re-voices several strings for slide-friendly chords. DADGAD replaces three strings for a modal, folk-oriented palette. Each choice trades the universal chord dictionary for a specialised sound.",
        "For a direct comparison of the most common first alternate, read [Drop D vs Standard Tuning](/guides/drop-d-vs-standard). EasyTuner's [home page](/) loads EADGBE by default; the tuning selector switches targets for Drop D, Drop C, open G, DADGAD, and others while keeping the same tuner interface. Return to standard before working through mainstream tabs so your open strings match the writer's assumptions.",
      ],
    },
    {
      heading: "When You Are Ready to Tune",
      paragraphs: [
        "Understanding EADGBE does not replace hearing each string at the correct pitch. EasyTuner's [free online guitar tuner](/) on the home page targets E2, A2, D3, G3, B3, and E4 with reference tones and microphone detection — the same notes described here, verified on the strobe dial in cents rather than by guesswork.",
        "Follow the full process in [How to Tune a Guitar](/guides/how-to-tune-a-guitar): allow the microphone, work string by string with auto-advance, and use the fretboard checkmarks to confirm the set. Keep this page as the map of what those letters mean; use the tuning guide as the route to get there.",
      ],
    },
  ],
  "drop-d-vs-standard": [
    {
      paragraphs: [
        "Standard tuning and Drop D are closer cousins than many beginners realise. Five of the six strings stay exactly the same. Only the lowest string moves — from E down to D. That single step changes the bottom of your chord voicings, the weight of your riffs, and which song transcriptions will sound right when you play along.",
        "Guitarists argue about tunings constantly, but the practical question is simpler: do you need what Drop D offers for the music you are playing right now, or is [standard EADGBE](/guides/standard-guitar-tuning) still the better default? This guide compares both side by side — how they sound, what each makes easier, where they appear in real songs, and how to switch between them using EasyTuner without guesswork.",
      ],
    },
    {
      heading: "At a Glance: EADGBE vs D-A-D-G-B-E",
      paragraphs: [
        "Before diving into genres and technique, here is the structural difference in plain terms.",
      ],
      bullets: [
        "Standard tuning (EADGBE): 6th string E2 (~82.4 Hz), then A2, D3, G3, B3, E4.",
        "Drop D (D-A-D-G-B-E): 6th string lowered to D2 (~73.4 Hz); strings 5–1 unchanged.",
        "Strings changed: one (the low E only) in Drop D.",
        "Typical retune time from standard: under a minute if the other five strings are already settled.",
        "Chord shapes on strings 5–1: identical to standard; only low-string note names and fingerings shift.",
        "One-finger power chord on bottom three strings: not possible open in standard; Drop D gives D5 (D–A–D) with one barre.",
      ],
    },
    {
      heading: "What Standard Tuning Does Best",
      paragraphs: [
        "EADGBE is the default for a reason. It balances comfortable chord shapes across the neck, predictable intervals between strings, and compatibility with the vast majority of tabs, lessons, and instructional material. If you are learning your first open chords, practising barre shapes, or working through a general songbook, standard tuning is almost certainly where you should be.",
        "The low E root matters for music that relies on that pitch. Blues turnaround figures, folk bass lines, and countless rock riffs assume an open low E or an E-root power chord at the bottom. Full-step bends and familiar scale patterns are mapped to this layout on every beginner chart.",
        "Standard tuning also keeps string tension and neck relief in the range most factory setups expect. You are not slackening the entire instrument — only the occasional alternate tuning touches one string in Drop D's case, which is part of why it is so popular as a first step away from EADGBE.",
      ],
    },
    {
      heading: "What Drop D Adds — and What It Costs",
      paragraphs: [
        "Drop D trades the low E for a low D. You lose the open low E string as a drone and as the root of E-based power chords played across the bottom two strings — but you gain a deeper floor for D-root riffs and a symmetrical bottom three strings tuned D–A–D.",
        "Barre the lowest three strings at any fret in Drop D and you get a movable power chord with the root on the 6th string. In standard tuning, the interval between the 6th and 5th strings is a fourth, so a two-string power chord on the bottom pair is E5 (E–B), not a root-fifth-root stack on three strings. That ergonomic difference is why Drop D shows up in rock, alternative, and metal: fast, heavy chord movement along the low neck.",
        "The cost is context switching. Songs written for standard tuning will sound wrong if you leave the 6th string dropped — an open G chord still works, but anything assuming a low E will not. You also need to remember to return to standard before practising mainstream material, or keep a second guitar dedicated to Drop D if you switch often.",
      ],
    },
    {
      heading: "Sound and Feel: Can You Hear the Difference?",
      paragraphs: [
        "On paper the change is one note. In practice the whole instrument can feel different under your picking hand. The low D rings with more sub-bass weight on smaller speakers; on a decent amp or acoustic body, riffs that emphasise the open 6th string gain a darker, more grounded character compared with low E.",
        "Because strings 5 through 1 are unchanged, melodies, solos, and upper-register chord voicings feel familiar. Many players describe Drop D as \"standard with a heavier floor\" rather than a completely new instrument — which is accurate. DADGAD, open G, and Drop C change more strings and reshape chord vocabulary far more aggressively.",
        "If you are comparing recordings, match the tuning before judging tone. A Drop D song played in standard will sound brighter and may force wrong note choices on the low string; conversely, standard repertoire in Drop D will clash on any phrase that depends on open low E.",
      ],
    },
    {
      heading: "Genres and Songs That Favour Each",
      paragraphs: [
        "Standard tuning spans virtually every genre: pop, country, jazz comping, fingerstyle folk, and most classic rock curriculum. When a song does not specify an alternate tuning, assume EADGBE.",
        "Drop D clusters in rock, grunge, alternative, and metal — anywhere riffs sit on the low D string or use one-finger power chords along the bottom three. Examples often cited include Everlong (Foo Fighters), Moby Dick (Led Zeppelin), Dear Prudence (The Beatles), and a long list of heavier modern tracks. Not every band stays in Drop D for a whole set; some drop only for specific songs.",
        "Neither tuning is \"better\" for songwriting. Standard offers maximum compatibility; Drop D offers a specific low-end toolkit. Choose based on the piece you are learning, not on genre loyalty alone.",
      ],
    },
    {
      heading: "Switching Between Standard and Drop D",
      paragraphs: [
        "The fastest path from standard to Drop D: leave strings 5 through 1 alone, lower the 6th string one whole step until it reads D2. EasyTuner makes this straightforward — select Drop D from the tuning menu on the [home page](/) or open the dedicated [Drop D tuner](/guitar-tunings/drop-d) page, tap the speaker beside the 6th string for a reference tone, then fine-tune with Tap to tune until the strobe dial locks and the checkmark appears.",
        "Going back to standard is the reverse: raise the 6th string from D2 to E2. Always verify all six strings after a switch; vibrations from adjusting the low string can knock others slightly out. A second pass after a minute of playing is normal.",
        "If you frequently alternate, note your bridge saddle and intonation are set up for standard tension profiles. Large deviations (Drop C, full step down across all strings) demand heavier strings; Drop D usually works fine on a typical light or medium set.",
      ],
    },
    {
      heading: "Do Not Confuse Drop D With These Tunings",
      paragraphs: [
        "Search results mix similar names. Keep these separate:",
      ],
      bullets: [
        "Drop D (D-A-D-G-B-E): only the 6th string drops from standard.",
        "Double Drop D (D-A-D-G-B-D): 6th and 1st strings both lowered to D — a different tuning with a different chord map.",
        "DADGAD: strings 1, 2, and 6 are altered — common in Celtic and folk fingerstyle, not a metal power-chord shortcut.",
        "Drop C (C-G-C-F-A-D): entire guitar lowered; much slacker tension; not comparable to Drop D for a quick one-string switch.",
      ],
    },
    {
      heading: "Which Should You Use?",
      paragraphs: [
        "Stay in standard EADGBE if you are a beginner, working through general lessons, learning songs from tabs that do not mention Drop D, or playing styles that need open low E. It is the lingua franca of the guitar.",
        "Reach for Drop D when you are learning a song written in it, writing riffs that benefit from a low D drone, or want one-finger power chords on the bottom three strings without retuning the entire neck. It is an easy experiment — one string, a few minutes, and you will hear immediately whether the tuning fits your idea.",
        "Many gigging players use both: standard on one guitar, Drop D on another, to avoid mid-set retunes. Home practice with one instrument works fine; just rebuild the habit of checking the 6th string before you start.",
      ],
    },
    {
      heading: "Try Drop D with EasyTuner",
      paragraphs: [
        "You do not need new gear to compare tunings. Open EasyTuner's [Drop D tuner](/guitar-tunings/drop-d) page, load the D-A-D-G-B-E targets, and walk through all six strings with reference tones or the microphone strobe dial — the same workflow as standard tuning, with updated note labels on the fretboard and chart.",
        "For the full Hz breakdown of how D2 differs from E2, see our [Guitar String Frequencies](/guides/guitar-string-frequencies) guide. For step-by-step standard tuning instructions, see [How to Tune a Guitar](/guides/how-to-tune-a-guitar). Once you have tried Drop D on a song or two, you will know whether it earns a permanent slot beside EADGBE in your routine.",
      ],
    },
  ],
};
