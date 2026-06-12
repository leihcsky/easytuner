import Link from "next/link";

export function HowToTuneSection() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Tune a Guitar</h2>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          Tuning a guitar with our online tuner takes just a few minutes. Start by
          allowing microphone access, then select the lowest string and pluck it
          firmly. Watch the tuner needle — if it reads flat, tighten the string; if
          sharp, loosen it. Repeat until the display shows &ldquo;In Tune.&rdquo;
        </p>
        <p>
          Work through each string from lowest to highest. For the most accurate
          results, tune in a quiet room and pluck near the 12th fret. New strings
          may need several passes as they settle.
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
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Guitar Tuning Quality</h2>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          A well-tuned guitar sounds richer, stays in tune longer during playing,
          and makes chords ring clearly. Even slight detuning can make open chords
          sound muddy and barre chords feel uncomfortable.
        </p>
        <p>
          Our tuner measures pitch in real time and shows your deviation in cents —
          one cent is 1/100 of a semitone. Aim for within ±5 cents of the target
          pitch on every string. The green &ldquo;In Tune&rdquo; indicator means
          your string is accurate enough for practice and performance.
        </p>
        <p>
          After tuning, play a few chords to double-check. If something sounds off,
          revisit the problem string rather than re-tuning everything from scratch.
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
