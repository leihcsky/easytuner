export interface TuningPageSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface GuitarTuningPageCopy {
  heroSubtitle: string;
  chartTitle: string;
  chartIntro: string;
  faqTitle: string;
  whatIs: TuningPageSection;
  howToTune: TuningPageSection;
  whyUse: TuningPageSection;
}

export const GUITAR_TUNING_PAGE_COPY: Record<string, GuitarTuningPageCopy> = {
  "drop-d": {
    heroSubtitle:
      "Drop D tuning (D-A-D-G-B-E) lowers only the 6th string. Use the tuner below with Drop D reference tones or microphone detection to match each string.",
    chartTitle: "Drop D Guitar Tuning Chart",
    chartIntro:
      "Drop D changes one string from standard: the low E becomes D2. Strings 5 through 1 stay at A, D, G, B, and E. Use this chart while tuning with the fretboard above.",
    faqTitle: "Drop D Guitar Tuning FAQ",
    whatIs: {
      title: "What Is Drop D Guitar Tuning?",
      paragraphs: [
        "Drop D guitar tuning is D-A-D-G-B-E — the same as standard tuning except the 6th (lowest) string is tuned down one whole step from E to D. That single change gives you a deep low root on the bottom string while leaving familiar chord shapes on the upper five strings mostly intact.",
        "Drop D is one of the most common alternate tunings in rock and metal. Bands from Foo Fighters to Deftones have used it for heavier riffs and easier power-chord shapes on the bottom three strings.",
      ],
    },
    howToTune: {
      title: "How to Tune Your Guitar to Drop D",
      paragraphs: [
        "If your guitar is already in standard tuning, you only need to retune the 6th string. Select Drop D in the tuner sidebar (or open this page with Drop D pre-selected), tap 🔊 on the 6th string to hear a low D reference tone, then lower the peg until the strobe dial locks on D2.",
        "Strings 2 through 6 in player order (A, D, G, B, E) can stay where they are — double-check them if you have not tuned in a while. Use Tap to tune and pluck each open string; the tuner walks you through every string with auto-advance, or pick strings manually in the sidebar.",
      ],
      bullets: [
        "Start in standard E-A-D-G-B-E if you are unsure of your current pitch.",
        "Lower the 6th string slowly — a full step down to D2 (~73.4 Hz).",
        "Confirm the bottom three strings spell D-A-D for a one-finger power chord.",
      ],
    },
    whyUse: {
      title: "Why Guitarists Use Drop D",
      paragraphs: [
        "The low D string adds weight to riffs and lets you barre the bottom three strings (D-A-D) with one finger for power chords. It is faster to switch from standard than full down-tuning setups, which is why Drop D is a staple for practice, recording, and live rock sets.",
        "Drop D is not the same as Drop C or DADGAD — each tuning changes different strings for a different sound. Use the tuning selector above to compare reference pitches before you commit to a setup. Wondering how Drop D compares to standard EADGBE? Read [Drop D vs Standard Tuning](/guides/drop-d-vs-standard) for sound, genres, and when to use each.",
      ],
    },
  },
  "drop-c": {
    heroSubtitle:
      "Drop C tuning (C-G-C-F-A-D) targets heavy metal and hard rock. Tune all six strings using Drop C reference tones or the built-in microphone tuner below.",
    chartTitle: "Drop C Guitar Tuning Chart",
    chartIntro:
      "Drop C lowers the entire guitar relative to standard, then drops the 6th string further to C2. Heavier string gauges are often used. Reference frequencies are listed below.",
    faqTitle: "Drop C Guitar Tuning FAQ",
    whatIs: {
      title: "What Is Drop C Guitar Tuning?",
      paragraphs: [
        "Drop C guitar tuning is C-G-C-F-A-D. Compared with standard E-A-D-G-B-E, every string is typically lowered, and the 6th string sits a full step below the 5th — giving a very low, slack feel favoured in metal, hardcore, and djent.",
        "Drop C is lower and looser than Drop D. It requires adequate string tension (usually heavier gauges) to avoid floppy strings and intonation problems.",
      ],
    },
    howToTune: {
      title: "How to Tune Your Guitar to Drop C",
      paragraphs: [
        "A common approach is to tune from standard: lower all six strings by two whole steps, then drop the 6th string one more whole step to C2. Use this page's tuner to verify each target — tap reference tones or enable the microphone and tune until each string shows a checkmark.",
        "Work slowly on the low C — overtightening after overshooting can break strings. If the low string feels too loose, consider a heavier gauge set designed for C tuning rather than forcing standard strings.",
      ],
      bullets: [
        "Typical path: E→C (6th), A→G (5th), D→C (4th), G→F (3rd), B→A (2nd), E→D (1st).",
        "Use reference tones for each string before fine-tuning with the mic.",
        "Re-check intonation after strings settle — new tunings often need a second pass.",
      ],
    },
    whyUse: {
      title: "Why Guitarists Use Drop C",
      paragraphs: [
        "Drop C delivers a darker, more aggressive tone for palm-muted chugs and low-end riffing. It is common when Drop D is not low enough but full baritone setups are not practical.",
        "Match your string gauge to the tuning: many players use .011–.056 or thicker. The chart above lists exact pitches so you can confirm each string independently of guesswork.",
      ],
    },
  },
  "open-g": {
    heroSubtitle:
      "Open G tuning (D-G-D-G-B-D) forms a G major chord when strummed open — ideal for slide, blues, and Keith Richards-style rhythm. Tune with reference tones or mic below.",
    chartTitle: "Open G Guitar Tuning Chart",
    chartIntro:
      "Open G retunes four strings from standard. When all strings are open, they sound a G major triad — the foundation of slide and many classic rock riffs.",
    faqTitle: "Open G Guitar Tuning FAQ",
    whatIs: {
      title: "What Is Open G Guitar Tuning?",
      paragraphs: [
        "Open G guitar tuning is D-G-D-G-B-D from the 6th string to the 1st. Unlike Drop D, several strings change pitch — the open strings ring as a G major chord, which is why slide players and blues guitarists love it.",
        "Keith Richards famously removes the low 6th string on some guitars and uses five-string Open G (G-D-G-B-D). This tuner uses the full six-string D-G-D-G-B-D layout most resources teach.",
      ],
    },
    howToTune: {
      title: "How to Tune Your Guitar to Open G",
      paragraphs: [
        "From standard tuning: lower the 6th string to D, keep the 5th at G, lower the 4th to D, keep the 3rd at G, keep the 2nd at B, and lower the 1st to D. The fretboard above highlights each target — use 🔊 to hear each note, then Tap to tune with the microphone.",
        "Because multiple strings move, tune in passes: get the low strings close, then revisit the top strings as tension shifts across the neck. Open G is sensitive to small errors — if an open strum does not sound like a clean G chord, recheck the D and G strings first.",
      ],
      bullets: [
        "6th → D, 5th → G (unchanged), 4th → D, 3rd → G (unchanged), 2nd → B (unchanged), 1st → D.",
        "Strum open when finished — you should hear a clear G major chord.",
        "Slide players often raise action slightly; tuning accurately matters more with a slide.",
      ],
    },
    whyUse: {
      title: "Why Guitarists Use Open G",
      paragraphs: [
        "Open G makes barre chords and slide licks easier — the open strings reinforce the key of G. It appears in blues, country, and rock from Muddy Waters to The Rolling Stones.",
        "It is a different intent than Drop D or DADGAD: Open G is chordal and resonant, not primarily about low-end riff weight. Choose Open G when you want open-position harmony and slide-friendly intervals.",
      ],
    },
  },
  dadgad: {
    heroSubtitle:
      "DADGAD tuning (D-A-D-G-A-D) is a modal, folk-friendly setup used in Celtic and fingerstyle guitar. Match each string with the tuner and chart below.",
    chartTitle: "DADGAD Guitar Tuning Chart",
    chartIntro:
      "DADGAD changes three strings from standard (6th, 2nd, and 1st). The open strings form a Dsus4 sound — neither purely major nor minor — which defines its haunting folk character.",
    faqTitle: "DADGAD Guitar Tuning FAQ",
    whatIs: {
      title: "What Is DADGAD Guitar Tuning?",
      paragraphs: [
        "DADGAD guitar tuning is D-A-D-G-A-D. It is not the same as Double Drop D (D-A-D-G-B-D), which only lowers the two E strings. In DADGAD the 2nd string drops from B to A, creating a suspended, modal colour associated with Irish, Scottish, and contemporary fingerstyle music.",
        "Jimmy Page used DADGAD on tracks like \"Black Mountain Side\"; Pierre Bensusan and many Celtic guitarists built entire repertoires around it. The tuning rewards open strings and moving chord shapes along the neck.",
      ],
    },
    howToTune: {
      title: "How to Tune Your Guitar to DADGAD",
      paragraphs: [
        "From standard E-A-D-G-B-E: lower the 6th to D, leave the 5th on A, leave the 4th on D, leave the 3rd on G, lower the 2nd to A, and lower the 1st to D. Use per-string reference tones on the fretboard, then confirm with the strobe dial.",
        "DADGAD is often tuned by ear because players learn the interlocking D and A drones — but microphone tuning helps lock each string precisely, especially the 2nd string B→A step, which is easy to overshoot.",
      ],
      bullets: [
        "Changed strings: 6th E→D, 2nd B→A, 1st E→D.",
        "Unchanged: 5th A, 4th D, 3rd G.",
        "Do not confuse with Double Drop D — the 2nd string stays B in Double Drop D.",
      ],
    },
    whyUse: {
      title: "Why Guitarists Use DADGAD",
      paragraphs: [
        "DADGAD excels at drone-based fingerstyle, Celtic melodies, and textures that sit between major and minor. The repeated D and A notes across strings create a rich sustain that standard tuning cannot mimic without fretting.",
        "If you are coming from Drop D, remember DADGAD requires retuning the 2nd and 1st strings as well — not just the low string. This page keeps DADGAD targets loaded so you do not accidentally tune to the wrong alternate.",
      ],
    },
  },
};

export function getGuitarTuningPageCopy(slug: string): GuitarTuningPageCopy | undefined {
  return GUITAR_TUNING_PAGE_COPY[slug];
}
