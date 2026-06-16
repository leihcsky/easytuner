export function WhatIsStandardUkuleleTuningSection() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        What Is Standard Ukulele Tuning?
      </h2>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          Standard ukulele tuning is <strong className="font-medium text-gray-800">G-C-E-A</strong>{" "}
          from the 4th string to the 1st. On soprano, concert, and tenor ukuleles
          the open pitches are typically G4 (~392 Hz), C4 (~262 Hz), E4 (~330 Hz),
          and A4 (~440 Hz).
        </p>
        <p>
          The unusual part is <strong className="font-medium text-gray-800">re-entrant tuning</strong>:
          the 4th-string G is tuned <em>higher</em> than the 3rd-string C, so the
          strings do not run low-to-high in pitch like a guitar. That high G is what
          gives the ukulele its bright, chiming character in chords and strums.
        </p>
      </div>
    </section>
  );
}

export function HowToTuneUkuleleSection() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        How to Tune a Ukulele with an Online Tuner
      </h2>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          Tune by ear with reference tones, by microphone with the strobe dial, or
          both — hear G-C-E-A first, then lock each string with the mic.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 pt-1">
          Reference tones — tune by ear
        </h3>
        <p>
          Tap <strong className="font-medium text-gray-800">🔊</strong> beside each
          string on the four-string fretboard to hear the correct ukulele pitch.
          Pluck the matching open string and turn the tuning peg until the two notes
          blend with no beating. Enable <strong className="font-medium text-gray-800">Loop</strong>{" "}
          to sustain the reference while you adjust — especially helpful on the quiet
          nylon strings.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 pt-1">
          Strobe dial — tune with your microphone
        </h3>
        <p>
          Press <strong className="font-medium text-gray-800">Tap to tune</strong>,
          allow microphone access, and pluck one string clearly. The strobe dial
          shows cents sharp or flat; follow{" "}
          <strong className="font-medium text-gray-800">Tune up</strong> or{" "}
          <strong className="font-medium text-gray-800">Tune down</strong> until a ✓
          locks on the fretboard.{" "}
          <strong className="font-medium text-gray-800">Auto-advance</strong> moves
          through all four strings in order when you want a full G-C-E-A pass.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 pt-1">
          Getting a clear reading on ukulele
        </h3>
        <p>
          Nylon and fluorocarbon strings are softer and quieter than steel guitar
          strings. Pluck firmly with your fingertip or felt pick, hold the ukulele
          close to your device mic, and tune in a quiet room. New strings drift
          quickly — expect to revisit each peg two or three times on the first day.
        </p>
      </div>
    </section>
  );
}

export function UkuleleVsGuitarTuningSection() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Ukulele Tuning vs Guitar Tuning
      </h2>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          A guitar&apos;s top four strings are D-G-B-E in pitch order (low to high).
          Ukulele G-C-E-A is <strong className="font-medium text-gray-800">not</strong>{" "}
          the same layout: the high G on the 4th string breaks the low-to-high pattern.
          Using a guitar tuner mindset on a uke — expecting the 4th string to be the
          lowest note — is a common reason beginners tune the G string an octave too low.
        </p>
        <p>
          This page targets standard re-entrant G4-C4-E4-A4 used on most soprano,
          concert, and tenor ukuleles. Baritone ukuleles are usually tuned D-G-B-E
          (like a guitar capo at the 5th fret) and need a different tuning reference.
        </p>
      </div>
    </section>
  );
}

export function UkuleleTuningFrequencySection() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        How Often Should You Tune Your Ukulele?
      </h2>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          Tune before every practice session. Nylon stretches with playing and
          shifts with heat and humidity — a uke that sounded fine yesterday may need
          a full G-C-E-A check today.
        </p>
        <p>
          Brand-new strings are the worst offenders: retune after every song for the
          first few days until they hold pitch. Keeping this page bookmarked makes a
          quick four-string check faster than hunting for a clip-on tuner in a gig bag.
        </p>
      </div>
    </section>
  );
}
