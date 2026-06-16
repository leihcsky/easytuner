import Link from "next/link";

export function HowToTuneSection() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        How to Tune a Guitar with an Online Tuner
      </h2>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          EasyTuner gives you two ways to tune: <strong className="font-medium text-gray-800">by ear</strong>{" "}
          using built-in reference tones, or <strong className="font-medium text-gray-800">by microphone</strong>{" "}
          with real-time pitch feedback on the strobe dial. Many players use both — hear
          the target note first, then fine-tune with the mic until the string locks in.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 pt-1">
          Reference tones — tune by ear
        </h3>
        <p>
          Tap the <strong className="font-medium text-gray-800">🔊 speaker icon</strong>{" "}
          beside any string on the fretboard to play that string&apos;s target pitch
          (for example low E or A). Listen carefully, then pluck the same open string
          on your guitar and turn the tuning peg until both pitches match — when they
          are in tune, the two notes blend together with no wobbling &ldquo;beat&rdquo;
          between them.
        </p>
        <p>
          Turn on <strong className="font-medium text-gray-800">Loop</strong> below the
          fretboard to hold the reference tone while you adjust the peg, which makes
          ear-tuning much easier. Reference tones are also useful if you are learning
          standard tuning for the first time and want to memorise what each string
          should sound like before using the microphone.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 pt-1">
          Strobe dial — tune with your microphone
        </h3>
        <p>
          Press <strong className="font-medium text-gray-800">Tap to tune</strong>, allow
          microphone access, and pluck the highlighted open string. The{" "}
          <strong className="font-medium text-gray-800">strobe dial</strong> shows your
          pitch in real time: rotating stripes mean you are still out of tune, they slow
          down as you get closer to the target, and they settle when you are within a
          few cents of the correct note. The display also shows how many{" "}
          <strong className="font-medium text-gray-800">cents</strong> sharp or flat you
          are (1 cent = 1/100 of a semitone), plus plain-language{" "}
          <strong className="font-medium text-gray-800">Tune up</strong> or{" "}
          <strong className="font-medium text-gray-800">Tune down</strong> hints so you
          know which way to turn the peg. A ✓ appears on the fretboard when that string
          is locked in.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 pt-1">
          Work through all six strings
        </h3>
        <p>
          With <strong className="font-medium text-gray-800">auto-advance</strong> enabled
          (default), the tuner moves to the next string after each one is tuned, from
          lowest to highest. Turn it off in the sidebar if you prefer to jump between
          strings yourself. For best results, tune in a quiet room, pluck firmly near
          the 12th fret, and give new strings a second pass once they have stretched.
        </p>

        <Link
          href="/guides/how-to-tune-a-guitar"
          className="inline-flex text-brand-600 font-medium hover:text-brand-700"
        >
          Read the full tuning guide →
        </Link>
      </div>
    </section>
  );
}

export function TuningQualitySection() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Why Tuning Quality Matters
      </h2>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          A well-tuned guitar sounds richer, stays in tune longer during playing,
          and makes chords ring clearly. Even slight detuning can make open chords
          sound muddy and barre chords feel uncomfortable — an online guitar tuner
          helps you catch small errors before they become a habit.
        </p>
        <p>
          EasyTuner shows your deviation in cents on the strobe dial — one cent is
          1/100 of a semitone. When a string is close enough to the target pitch,
          it locks with a ✓ on the fretboard. The progress bar tracks how many
          strings are done so you never lose your place mid-session.
        </p>
        <p>
          Each open string in standard tuning vibrates at a specific frequency in
          Hertz — for example low E near 82 Hz and high E near 330 Hz. See our{" "}
          <Link
            href="/guides/guitar-string-frequencies"
            className="text-brand-600 font-medium hover:text-brand-700"
          >
            guitar string frequencies chart
          </Link>{" "}
          for the full EADGBE Hz reference and how cents relate to pitch.
        </p>
        <p>
          After tuning, strum a few chords to double-check. If something still
          sounds off, revisit that string rather than resetting every peg from
          scratch.
        </p>
      </div>
    </section>
  );
}

export function TuningFrequencySection() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        How Often Should You Tune Your Guitar?
      </h2>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          Tune your guitar before every practice session or performance. Temperature
          changes, humidity, and playing itself can shift string tension enough to
          affect sound quality within minutes.
        </p>
        <p>
          Brand-new strings stretch significantly during the first few days — check
          tuning after every song until they stabilize. Guitars that sit unused for
          weeks will almost certainly need a full tuning when picked up again.
        </p>
        <p>
          If you notice buzzing, dull chords, or notes that clash when playing with
          others, your guitar likely needs tuning. Keeping a tuner handy makes this
          a quick habit rather than a chore.
        </p>
      </div>
    </section>
  );
}
