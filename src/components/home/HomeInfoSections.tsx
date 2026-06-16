import Link from "next/link";

export function HowToTuneSection() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        How to Tune a Guitar with an Online Tuner
      </h2>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          This online guitar tuner is built around a visual fretboard. Tap the
          speaker icon beside any string to hear its target pitch, then press{" "}
          <strong className="font-medium text-gray-800">Tap to tune</strong> and
          allow microphone access. Pluck the highlighted open string — the strobe
          dial shows whether you are sharp or flat, and on-screen hints tell you
          to tune up or tune down until a checkmark appears on that string.
        </p>
        <p>
          With <strong className="font-medium text-gray-800">auto-advance</strong>{" "}
          enabled (default), the tuner walks you through each string in order, from
          lowest to highest. Turn it off in the sidebar if you prefer to pick strings
          yourself. For best results, tune in a quiet room, pluck firmly, and give
          new strings a second pass after they stretch.
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
