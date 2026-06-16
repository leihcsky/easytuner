export function HowToTuneBassSection() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        How to Tune a Bass with an Online Tuner
      </h2>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          This online bass tuner uses the same visual layout as our guitar tuner.
          Tap the speaker icon beside any string to hear its target pitch, then
          press <strong className="font-medium text-gray-800">Tap to tune</strong>{" "}
          and allow microphone access. Pluck the open string — the strobe dial
          shows sharp or flat in cents, with tune up or tune down hints until a
          checkmark appears on that string.
        </p>
        <p>
          With <strong className="font-medium text-gray-800">auto-advance</strong>{" "}
          enabled (default), the tuner walks you through each string in order, from
          lowest to highest. Turn it off in the sidebar if you want to pick strings
          yourself. Bass fundamentals are lower and quieter — pluck firmly near the
          bridge and stay close to your mic for the best reading.
        </p>
      </div>
    </section>
  );
}

export function BassTuningQualitySection() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Why Bass Tuning Quality Matters
      </h2>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          A detuned bass drags the whole band down — low notes feel muddy and
          grooves lose their punch. An online bass tuner helps you lock in before
          practice or a gig without carrying extra hardware.
        </p>
        <p>
          EasyTuner shows cents deviation on the strobe dial and locks each string
          with a ✓ on the fretboard when you are in tune. The progress bar tracks
          all four strings so you can finish a full E-A-D-G pass in one session.
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
          Tune before every rehearsal, recording, or show. Thick bass strings still
          drift with temperature changes, humidity, and aggressive playing.
        </p>
        <p>
          New strings stretch more at first — expect to retune several times during
          the first few sessions. A bass that has sat in its case for weeks will
          almost always need a full tuning when you pick it up again.
        </p>
      </div>
    </section>
  );
}
