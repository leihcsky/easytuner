export function WhatIsStandardBassTuningSection() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        What Is Standard Bass Tuning?
      </h2>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          Standard 4-string bass tuning is <strong className="font-medium text-gray-800">E-A-D-G</strong>{" "}
          from the lowest (4th) string to the highest (1st) — the same note names as
          the bottom four strings on a guitar, but each pitched{" "}
          <strong className="font-medium text-gray-800">one octave lower</strong>.
          The open strings are E1 (~41.2 Hz), A1 (~55.0 Hz), D2 (~73.4 Hz), and
          G2 (~98.0 Hz).
        </p>
        <p>
          That low fundamental on the E string is what gives the bass its weight in a
          mix. It is also why tuning a bass can feel different from tuning a guitar:
          the microphone must pick up slower-moving waves, and the strobe dial may
          take a moment longer to settle after each pluck.
        </p>
      </div>
    </section>
  );
}

export function HowToTuneBassSection() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        How to Tune a Bass with an Online Tuner
      </h2>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          You can tune by ear with the built-in reference tones or by microphone
          with the strobe dial — many bassists hear the target note first, then
          fine-tune with the mic until the string locks in.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 pt-1">
          Reference tones — tune by ear
        </h3>
        <p>
          Tap <strong className="font-medium text-gray-800">🔊</strong> beside each
          string on the four-string fretboard to hear that string&apos;s bass pitch.
          Pluck the open string and turn the machine head until your note matches the
          reference — beats (wobbling between two pitches) disappear when you are in
          tune. Use <strong className="font-medium text-gray-800">Loop</strong> to
          hold the tone while both hands are free for the tuning peg.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 pt-1">
          Strobe dial — tune with your microphone
        </h3>
        <p>
          Press <strong className="font-medium text-gray-800">Tap to tune</strong>,
          allow microphone access, and pluck near the bridge with a firm attack.
          The strobe dial shows cents sharp or flat; follow{" "}
          <strong className="font-medium text-gray-800">Tune up</strong> or{" "}
          <strong className="font-medium text-gray-800">Tune down</strong> until a ✓
          appears. With <strong className="font-medium text-gray-800">auto-advance</strong>,
          the tuner walks through all four strings from lowest to highest.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 pt-1">
          Getting a clear reading on bass
        </h3>
        <p>
          Pluck one string at a time, stay close to your phone or laptop mic, and
          avoid room rumble from amps or kick drums. If the low E struggles to
          register, pluck again with more attack or move to a quieter spot — bass
          tuners often lock onto the fundamental after one or two clean strikes.
        </p>
      </div>
    </section>
  );
}

export function BassVsGuitarTuningSection() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Bass Tuning vs Guitar Tuning
      </h2>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          A guitarist tuning the bottom four strings E-A-D-G is{" "}
          <strong className="font-medium text-gray-800">not</strong> tuning a bass —
          those guitar strings sound an octave higher (E2 through G3). This page
          targets true bass pitches on a 4-string instrument only.
        </p>
        <p>
          Bass strings are thicker and under higher tension per note than guitar
          strings. After a full E-A-D-G pass, play a simple octave or fifth with
          another player or a recording — small errors on the low E are easier to
          hear in context than on a guitar-centric tuner set to the wrong octave.
        </p>
      </div>
    </section>
  );
}

export function BassTuningFrequencySection() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        How Often Should You Tune Your Bass?
      </h2>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          Tune before every rehearsal, gig, or recording. Long-scale necks and thick
          strings still drift with temperature, humidity, and slap or pick attack.
        </p>
        <p>
          Fresh strings stretch noticeably during the first week — retune after each
          song until they settle. A bass left in a case for a month will need a full
          four-string check; bookmark this page for a quick E-A-D-G pass without a
          hardware pedal.
        </p>
      </div>
    </section>
  );
}
