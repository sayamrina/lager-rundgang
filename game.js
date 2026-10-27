// Lager-Rundgang: ein Lernspiel zur Arbeitsschutz-Unterweisung im Lager.
// Jede Station ist ein Szenario mit drei Antworten; die Lagerleiterin erklärt jede Antwort.

const ICONS = {
  pallet: '<svg viewBox="0 0 84 84" aria-hidden="true"><rect x="8" y="58" width="68" height="8" fill="#8C6A43"/><rect x="12" y="66" width="10" height="8" fill="#8C6A43"/><rect x="37" y="66" width="10" height="8" fill="#8C6A43"/><rect x="62" y="66" width="10" height="8" fill="#8C6A43"/><rect x="14" y="22" width="56" height="36" fill="#C9A26B" stroke="#1C262C" stroke-width="2"/><path d="M0 80 H84" stroke="#F5C400" stroke-width="6"/></svg>',
  ladder: '<svg viewBox="0 0 84 84" aria-hidden="true"><path d="M24 80 L36 6 M60 80 L48 6" stroke="#1C262C" stroke-width="5" fill="none"/><path d="M29 66 H55 M31 52 H53 M33 38 H51 M35 24 H49" stroke="#1C262C" stroke-width="4"/><path d="M35 24 H49 M33 38 H51" stroke="#C8102E" stroke-width="4"/></svg>',
  extinguisher: '<svg viewBox="0 0 84 84" aria-hidden="true"><rect x="30" y="22" width="24" height="56" rx="8" fill="#C8102E"/><rect x="34" y="12" width="16" height="12" fill="#1C262C"/><path d="M50 16 C64 16 66 30 64 40" stroke="#1C262C" stroke-width="4" fill="none"/><rect x="4" y="44" width="22" height="34" fill="#C9A26B" stroke="#1C262C" stroke-width="2"/><rect x="58" y="50" width="22" height="28" fill="#C9A26B" stroke="#1C262C" stroke-width="2"/></svg>',
  forklift: '<svg viewBox="0 0 84 84" aria-hidden="true"><rect x="10" y="34" width="38" height="28" fill="#F5C400" stroke="#1C262C" stroke-width="2"/><path d="M18 34 V16 H40 V34" stroke="#1C262C" stroke-width="3" fill="none"/><path d="M56 8 V66 M56 64 H80" stroke="#1C262C" stroke-width="4"/><circle cx="20" cy="68" r="8" fill="#1C262C"/><circle cx="44" cy="68" r="8" fill="#1C262C"/></svg>',
  box: '<svg viewBox="0 0 84 84" aria-hidden="true"><rect x="18" y="38" width="48" height="38" fill="#C9A26B" stroke="#1C262C" stroke-width="2"/><path d="M18 50 H66" stroke="#1C262C" stroke-width="2"/><text x="42" y="70" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="16" fill="#1C262C">20 kg</text><path d="M42 8 V30 M34 22 L42 30 L50 22" stroke="#1C262C" stroke-width="4" fill="none"/></svg>',
  ghs: '<svg viewBox="0 0 84 84" aria-hidden="true"><rect x="16" y="16" width="52" height="52" transform="rotate(45 42 42)" fill="#fff" stroke="#C8102E" stroke-width="6"/><circle cx="42" cy="54" r="9" fill="none" stroke="#1C262C" stroke-width="4"/><path d="M42 20 C50 30 52 38 46 44 C46 38 42 36 42 36 C42 40 36 42 37 46 C30 40 34 28 42 20 Z" fill="#1C262C"/></svg>'
};

const STATIONS = [
  {
    title: 'Verkehrsweg', place: 'Station 1, Hauptgang am Tor', icon: 'pallet',
    pt: [150, 195], sign: [172, 195],
    scene: 'Eine Palette steht zur Hälfte auf dem gelb markierten Fußweg. Gleich kommt die nächste Lieferung.',
    question: 'Was tust du?',
    options: [
      { text: 'Ich gehe vorsichtig um die Palette herum. Sie wird schon bald abgeholt.', ok: false,
        say: 'Verständlich, aber so bleibt die Gefahr für alle anderen bestehen. Wer die Palette übersieht, stolpert oder muss auf den Fahrweg der Stapler ausweichen.' },
      { text: 'Ich sorge dafür, dass die Palette vom Weg kommt, und sage meiner Vorgesetzten Bescheid.', ok: true,
        say: 'Genau. Verkehrs- und Fluchtwege müssen immer frei bleiben, so steht es in der ASR A1.8. Wenn du sie nicht selbst sicher bewegen kannst, meldest du es sofort.' },
      { text: 'Ich klebe Warnband darum, damit alle sie sehen.', ok: false,
        say: 'Warnband macht die Palette sichtbar, aber der Weg bleibt blockiert. Markieren ersetzt nicht das Freiräumen.' }
    ]
  },
  {
    title: 'Leiter am Regal', place: 'Station 2, Regalgang West', icon: 'ladder',
    pt: [70, 131], sign: [48, 131],
    scene: 'Du brauchst einen Karton aus dem obersten Regalfach. Die Stehleiter ist etwas zu kurz.',
    question: 'Wie kommst du sicher an den Karton?',
    options: [
      { text: 'Ich stelle mich auf die oberste Stufe, dann reicht es gerade.', ok: false,
        say: 'Genau das führt zu den meisten Leiterunfällen. Die obersten Stufen einer Stehleiter sind nicht zum Stehen gedacht, dort fehlt der Halt.' },
      { text: 'Ich steige auf den untersten Regalboden, das geht schneller.', ok: false,
        say: 'Regale sind keine Leitern. Die Böden sind nicht für dein Gewicht ausgelegt und du hast keinen sicheren Griff.' },
      { text: 'Ich hole eine Leiter in passender Höhe und prüfe sie kurz, bevor ich hochsteige.', ok: true,
        say: 'Richtig. Die Leiter muss zur Arbeitshöhe passen, und vor der Benutzung schaust du sie dir an. Die obersten zwei Stufen einer Stehleiter betrittst du nicht, das regelt die TRBS 2121 Teil 2.' }
    ]
  },
  {
    title: 'Feuerlöscher', place: 'Station 3, Mittelgang', icon: 'extinguisher',
    pt: [200, 112], sign: [200, 136],
    scene: 'Vor dem Feuerlöscher stapeln sich leere Kartons. Man sieht nur noch das Schild darüber.',
    question: 'Ist das ein Problem?',
    options: [
      { text: 'Nein, das Schild zeigt ja, wo der Feuerlöscher ist.', ok: false,
        say: 'Im Brandfall zählt jede Sekunde. Wenn du erst Kartons wegräumen musst, verlierst du genau die Zeit, in der ein Entstehungsbrand noch zu löschen wäre.' },
      { text: 'Ja. Ich räume die Kartons weg, der Feuerlöscher muss frei zugänglich sein.', ok: true,
        say: 'Richtig. Feuerlöscher müssen jederzeit gut erreichbar und gekennzeichnet sein, so verlangt es die ASR A2.2. Kurz wegräumen schützt alle.' },
      { text: 'Nur wenn die Kartons brennbar sind.', ok: false,
        say: 'Es geht nicht nur um das Material. Jedes Hindernis vor dem Löscher kostet im Ernstfall Zeit.' }
    ]
  },
  {
    title: 'Gabelstapler', place: 'Station 4, Regalgang Ost', icon: 'forklift',
    pt: [330, 131], sign: [352, 131],
    scene: 'Ein Kollege fährt mit dem Stapler vorbei und bietet an, dich auf der Gabel zur Rampe mitzunehmen.',
    question: 'Wie reagierst du?',
    options: [
      { text: 'Ich lehne ab. Auf der Gabel fährt niemand mit.', ok: true,
        say: 'Genau richtig. Personen dürfen nur auf dafür vorgesehenen Plätzen mitfahren, nie auf der Gabel oder der Last. Das regelt die DGUV Vorschrift 68.' },
      { text: 'Ich steige auf, wenn er langsam fährt.', ok: false,
        say: 'Auch langsam reicht ein kurzes Bremsen, und du fällst vor das Fahrzeug. Das Risiko hängt nicht vom Tempo ab.' },
      { text: 'Ich steige auf und halte mich am Hubgerüst fest.', ok: false,
        say: 'Am Hubgerüst bewegen sich Ketten und Teile. Dort kannst du dir die Hände einklemmen. Mitfahren auf der Gabel ist verboten.' }
    ]
  },
  {
    title: 'Heben und Tragen', place: 'Station 5, Packplatz', icon: 'box',
    pt: [250, 170], sign: [228, 170],
    scene: 'Ein Karton mit 20 Kilogramm steht auf dem Boden und muss auf den Packtisch.',
    question: 'Wie hebst du ihn an?',
    options: [
      { text: 'Rücken beugen, Beine gestreckt lassen und mit den Armen hochziehen.', ok: false,
        say: 'So landet die ganze Last auf deiner Lendenwirbelsäule. Genau das führt auf Dauer zu Rückenschmerzen.' },
      { text: 'Schnell und mit Schwung hochreißen, dann ist es schneller vorbei.', ok: false,
        say: 'Ruckartige Bewegungen belasten Bandscheiben und Muskeln besonders stark. Langsam und gleichmäßig ist sicherer.' },
      { text: 'In die Knie gehen, Rücken gerade, Last nah am Körper und ohne Verdrehen anheben.', ok: true,
        say: 'Sehr gut. Die Kraft kommt aus den Beinen, die Last bleibt nah am Körper und du drehst dich mit den Füßen, nicht mit dem Rücken.' }
    ]
  },
  {
    title: 'Gefahrstoffe', place: 'Station 6, Gefahrstofflager', icon: 'ghs',
    pt: [330, 190], sign: [300, 172],
    scene: 'Auf einem Kanister siehst du dieses Piktogramm: eine Flamme über einem Kreis.',
    question: 'Was bedeutet es?',
    options: [
      { text: 'Entzündbar', ok: false,
        say: 'Fast. Für entzündbare Stoffe gibt es die Flamme ohne Kreis. Der Kreis darunter macht den Unterschied.' },
      { text: 'Oxidierend, also brandfördernd', ok: true,
        say: 'Richtig. Die Flamme über dem Kreis kennzeichnet oxidierende Stoffe nach der CLP-Verordnung. Sie können einen Brand verstärken, deshalb lagert man sie getrennt von brennbaren Stoffen.' },
      { text: 'Explosiv', ok: false,
        say: 'Explosive Stoffe erkennst du an einer explodierenden Bombe im Piktogramm. Hier ist es die Flamme über dem Kreis, also oxidierend.' }
    ]
  }
];

const $ = (id) => document.getElementById(id);
const plan = $('plan'), route = $('route'), walker = $('walker');
const missionEl = $('mission'), sayEl = $('say'), scoreEl = $('score');
const mouth = $('mouth'), voiceBtn = $('voiceBtn');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let current = -1;
let done = [];
let firstTry = [];
let missed = false;
let walkerLen = route.getTotalLength();
let voiceOn = 'speechSynthesis' in window;

// Länge entlang der Bodenmarkierung, an der eine Station liegt
function lengthAt([x, y]) {
  const total = route.getTotalLength();
  let best = 0, bestD = Infinity;
  for (let l = 0; l <= total; l += 1) {
    const p = route.getPointAtLength(l);
    const d = (p.x - x) ** 2 + (p.y - y) ** 2;
    if (d < bestD) { bestD = d; best = l; }
  }
  return best;
}
const stationLen = STATIONS.map((s) => lengthAt(s.pt));

function drawStations() {
  const g = $('stations');
  g.innerHTML = STATIONS.map((s, i) => {
    const cls = ['station', done[i] ? 'done' : '', i === current ? 'current' : ''].join(' ');
    const [x, y] = s.sign;
    return `<g class="${cls}"><rect x="${x - 11}" y="${y - 11}" width="22" height="22" rx="3"/>
      <text x="${x}" y="${y + 5}" text-anchor="middle">${i + 1}</text></g>`;
  }).join('');
  $('legend').innerHTML = STATIONS.map((s, i) =>
    `<li class="${done[i] ? 'done' : ''}"><b>${i + 1}</b>${s.title}</li>`).join('');
  const n = done.filter(Boolean).length;
  scoreEl.textContent = `${n} von ${STATIONS.length} Stationen`;
}

function walkTo(target) {
  const from = walkerLen;
  const place = (l) => {
    const p = route.getPointAtLength(l);
    walker.setAttribute('transform', `translate(${p.x} ${p.y})`);
  };
  if (reduceMotion || from === target) { walkerLen = target; place(target); return; }
  const dur = Math.min(1400, 300 + Math.abs(target - from) * 4);
  const t0 = performance.now();
  const step = (t) => {
    const k = Math.min(1, (t - t0) / dur);
    const e = k < .5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
    walkerLen = from + (target - from) * e;
    place(walkerLen);
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Die Lagerleiterin spricht: Text in der Sprechblase, Stimme über die Sprachausgabe des Browsers
let mouthTimer = null;
function speak(text) {
  sayEl.textContent = text;
  if (!voiceOn) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'de-DE';
  const de = speechSynthesis.getVoices().find((v) => v.lang && v.lang.startsWith('de'));
  if (de) u.voice = de;
  u.rate = 1.02;
  u.onstart = () => {
    clearInterval(mouthTimer);
    let open = false;
    mouthTimer = setInterval(() => { open = !open; mouth.setAttribute('ry', open ? 6 : 2); }, 140);
  };
  u.onend = u.onerror = () => { clearInterval(mouthTimer); mouth.setAttribute('ry', 2); };
  speechSynthesis.speak(u);
}

function showStart() {
  current = -1;
  done = STATIONS.map(() => false);
  firstTry = STATIONS.map(() => false);
  drawStations();
  walkTo(0);
  missionEl.innerHTML = `
    <p class="place">Unterweisung Arbeitsschutz, etwa 5 Minuten</p>
    <h1>Rundgang durch das Lager</h1>
    <p>Du bist neu im Team und gehst mit Jana die gelbe Bodenmarkierung entlang. An sechs Stationen wartet jeweils eine Situation aus dem Lageralltag. Wähle, was du tun würdest. Jana erklärt dir jede Antwort, auch die falschen.</p>
    <button class="next" id="startBtn">Rundgang starten</button>`;
  $('startBtn').addEventListener('click', () => goTo(0));
  sayEl.textContent = 'Hallo, ich bin Jana und leite das Lager. Schön, dass du da bist. Lass uns gemeinsam schauen, worauf es hier ankommt.';
}

function goTo(i) {
  current = i;
  missed = false;
  const s = STATIONS[i];
  drawStations();
  walkTo(stationLen[i]);
  missionEl.innerHTML = `
    <p class="place">${s.place}</p>
    <h2 tabindex="-1" id="mTitle">${s.title}</h2>
    <div class="scene">${ICONS[s.icon]}<p>${s.scene}</p></div>
    <p><b>${s.question}</b></p>
    <ul class="options">${s.options.map((o, k) =>
      `<li><button class="opt" data-k="${k}"><span class="key">${'ABC'[k]}</span><span>${o.text}</span></button></li>`).join('')}
    </ul>
    <div id="after"></div>`;
  $('mTitle').focus({ preventScroll: true });
  missionEl.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => answer(b)));
  speak(`${s.scene} ${s.question}`);
}

function answer(btn) {
  const s = STATIONS[current];
  const o = s.options[+btn.dataset.k];
  speak(o.say);
  if (!o.ok) {
    missed = true;
    btn.classList.add('wrong');
    btn.disabled = true;
    return;
  }
  btn.classList.add('right');
  missionEl.querySelectorAll('.opt').forEach((b) => { b.disabled = true; });
  done[current] = true;
  firstTry[current] = !missed;
  drawStations();
  const last = current === STATIONS.length - 1;
  $('after').innerHTML = `<button class="next" id="nextBtn">${last ? 'Rundgang abschließen' : `Weiter zu Station ${current + 2}`}</button>`;
  $('nextBtn').addEventListener('click', () => (last ? showResult() : goTo(current + 1)));
}

function showResult() {
  current = -1;
  drawStations();
  walkTo(route.getTotalLength());
  const n = firstTry.filter(Boolean).length;
  const review = STATIONS.filter((_, i) => !firstTry[i]);
  missionEl.innerHTML = `
    <p class="place">Rundgang abgeschlossen</p>
    <h2 tabindex="-1" id="mTitle">${n} von ${STATIONS.length} Stationen beim ersten Versuch richtig</h2>
    ${review.length
      ? `<p>Diese Stationen lohnt es sich noch einmal anzuschauen:</p>
         <ul class="result-list">${review.map((s) => `<li><b>${s.title}:</b> ${s.options.find((o) => o.ok).text}</li>`).join('')}</ul>`
      : '<p>Du hast alle Situationen sicher gelöst.</p>'}
    <button class="next" id="againBtn">Rundgang neu starten</button>`;
  $('mTitle').focus({ preventScroll: true });
  $('againBtn').addEventListener('click', showStart);
  speak(review.length
    ? `Gut gemacht. ${n} von sechs Situationen hast du sofort richtig gelöst. Schau dir die markierten Stationen noch einmal an.`
    : 'Hervorragend. Du hast alle sechs Situationen sofort richtig gelöst. Willkommen im Team.');
}

voiceBtn.addEventListener('click', () => {
  voiceOn = !voiceOn && 'speechSynthesis' in window;
  voiceBtn.setAttribute('aria-pressed', String(voiceOn));
  voiceBtn.textContent = voiceOn ? 'Stimme an' : 'Stimme aus';
  if (!voiceOn && 'speechSynthesis' in window) speechSynthesis.cancel();
});
if (!('speechSynthesis' in window)) {
  voiceBtn.setAttribute('aria-pressed', 'false');
  voiceBtn.textContent = 'Stimme aus';
  voiceBtn.disabled = true;
}

walkerLen = 0;
showStart();
