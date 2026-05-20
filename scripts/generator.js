const generateButton = document.querySelector("#generate-prompt");
const copyButton = document.querySelector("#copy-prompt");
const output = document.querySelector("#prompt-output");
const focusSelect = document.querySelector("#focus");
const trackInputs = Array.from(document.querySelectorAll('input[name="track"]'));
const trackSections = Array.from(document.querySelectorAll("[data-track-section]"));

const focusOptions = {
  kroppsoving: [
    "Helhetlig vurdering",
    "Mål og øktplan",
    "Gjennomføring og logg",
    "Fysisk og psykososial helse",
    "Innsats, deltakelse og medvirkning",
    "Refleksjon over egen utvikling",
  ],
  breddeidrett: [
    "Helhetlig vurdering",
    "SMARTØF og mål",
    "Testing og dokumentasjon",
    "Arbeidskravsanalyse og kapasitetsanalyse",
    "Øktplaner og treningsmetoder",
    "Progresjon mellom perioder",
    "Refleksjon, drøfting og justering",
  ],
};

const taskFrames = {
  "Kroppsøving Vg1": {
    subject: "Kroppsøving Vg1",
    frame: "Kroppsøving Vg1 vurderes med vekt på trygg deltakelse, øving mot individuelle mål, innsats, samarbeid, enkel logg og refleksjon over egen utvikling.",
    next: "Neste steg er å gjøre målet, øktplanen og loggen tydeligere, og vise hva eleven lærer av egen innsats.",
    focus: [
      "Vurder om eleven har planlagt minst 2 økter.",
      "Vurder om øktplanen er skrevet før økta og viser mål, innhold og trygg gjennomføring.",
      "Vurder om loggen er personlig, konkret og skrevet slik at den kan brukes til å justere videre trening.",
    ],
  },
  "Kroppsøving Vg2": {
    subject: "Kroppsøving Vg2",
    frame: "Kroppsøving Vg2 vurderes med vekt på helse, fysisk kapasitet, fellesskap, medvirkning og refleksjon over hvordan aktivitet påvirker kropp, psykisk helse og fysisk helse. Eleven skal beskrive utgangspunktet sitt, men ikke skrive kapasitetsanalyse.",
    next: "Neste steg er å forklare tydeligere hvordan aktivitetene påvirker helse, kapasitet, fellesskap og livsstil.",
    focus: [
      "Vurder om eleven har planlagt minst 3 økter.",
      "Vurder om eleven forklarer hvorfor treningsformene passer målet og eget utgangspunkt.",
      "Vurder om eleven bruker begreper som intensitet, belastning, progresjon, variasjon og restitusjon på en forståelig måte.",
    ],
  },
  "Kroppsøving Vg3 - prøverommet": {
    subject: "Kroppsøving Vg3",
    frame: "Dette er Vg3 sin utprøvingsoppgave i Kroppsøving. Eleven skal utfordre seg selv, teste en aktivitet eller treningsform, og lære av erfaringene. Det skal være lov å feile, prøve på nytt og bruke erfaringene uten at feil i seg selv blir vurderingsfelle.",
    next: "Neste steg er å bruke erfaringene fra utprøvingen til å forstå motivasjon, mestring, kropp, grenser og hva som kan gjøre aktivitet meningsfull videre.",
    focus: [
      "Vurder om eleven har planlagt øktene før gjennomføring.",
      "Vurder om eleven beskriver konkrete erfaringer fra utprøvingen.",
      "Vurder om refleksjonen viser læring, ikke bare resultat.",
    ],
  },
  "Kroppsøving Vg3 - sluttoppgave": {
    subject: "Kroppsøving Vg3",
    frame: "Dette er Vg3 sin sluttoppgave i Kroppsøving. Eleven skal bruke det de har lært gjennom videregående til å planlegge, gjennomføre og vurdere egentrening selvstendig, med refleksjon rundt helse, livsstil, kropp, samfunn, motivasjon og medvirkning.",
    next: "Neste steg er å gjøre vurderingen mer selvstendig og drøfte hvordan erfaringene kan støtte en fysisk aktiv og helsefremmende livsstil etter skole.",
    focus: [
      "Vurder om eleven har planlagt minst 4 økter.",
      "Vurder om eleven bruker logg og egne erfaringer som grunnlag for vurdering.",
      "Vurder om eleven drøfter sammenhenger mellom trening, helse, kropp, samfunn og eget liv etter skole.",
    ],
  },
  "Breddeidrett 1 - periode 1": {
    subject: "Breddeidrett 1",
    frame: "Breddeidrett 1 periode 1 handler om å forstå mål, øktplan, enkel testing og logg. Eleven skal gjennomføre minst 4 økter og bruke test, observasjon eller video for å beskrive utgangspunktet.",
    next: "Neste steg er å bruke erfaringer, logg og test fra periode 1 til å justere periode 2.",
    focus: [
      "Vurder om eleven har et enkelt SMARTØF-mål.",
      "Vurder om eleven har valgt en relevant enkel test, observasjon eller video.",
      "Vurder om loggen viser konkrete erfaringer fra hver økt.",
    ],
  },
  "Breddeidrett 1 - periode 2": {
    subject: "Breddeidrett 1",
    frame: "Breddeidrett 1 periode 2 handler om å vise enkel progresjon fra første periode. Eleven skal gjennomføre minst 4 økter og forklare hvordan planen er justert etter erfaringer og test.",
    next: "Neste steg er å forklare tydeligere hva som er videreført, endret og forbedret fra periode 1.",
    focus: [
      "Vurder om periode 2 bygger på erfaringer fra periode 1.",
      "Vurder om eleven viser enkel progresjon i mål, øvelser, belastning eller fokus.",
      "Vurder om eleven sammenligner test, observasjon eller erfaring med første periode.",
    ],
  },
  "Breddeidrett 2 - periode 1": {
    subject: "Breddeidrett 2",
    frame: "Breddeidrett 2 periode 1 handler om å koble arbeidskravsanalyse og kapasitetsanalyse til treningsmetoder. Eleven skal gjennomføre minst 4 økter og velge test eller observasjon som passer målet.",
    next: "Neste steg er å bruke analysen, testen og loggen til å justere metodevalg og belastning mer presist.",
    focus: [
      "Vurder om arbeidskravsanalyse og kapasitetsanalyse er relevante.",
      "Vurder om øktplanene forklarer hva, hvordan og hvorfor.",
      "Vurder om testen faktisk måler noe relevant for aktiviteten og målet.",
    ],
  },
  "Breddeidrett 2 - periode 2": {
    subject: "Breddeidrett 2",
    frame: "Breddeidrett 2 periode 2 handler om å begrunne metodevalg og justere mer presist. Eleven skal gjennomføre minst 4 økter og vise hvordan periode 2 bygger på analyse, test og logg fra periode 1.",
    next: "Neste steg er å gjøre sammenhengen mellom trening, helse, prestasjon og egne forutsetninger enda tydeligere.",
    focus: [
      "Vurder om periode 2 bygger faglig på periode 1.",
      "Vurder om eleven begrunner metodevalg med analyse og egne forutsetninger.",
      "Vurder om re-test, video eller observasjon brukes til å vurdere effekt.",
    ],
  },
  "Breddeidrett 3 - periode 1": {
    subject: "Breddeidrett 3",
    frame: "Breddeidrett 3 periode 1 handler om å bruke dokumentasjon til å videreutvikle ferdigheter. Eleven skal gjennomføre minst 4 økter og vurdere hvor relevant og pålitelig test, videoanalyse, observasjon eller logg er.",
    next: "Neste steg er å bruke dokumentasjonen mer kritisk og justere treningsarbeidet med større selvstendighet.",
    focus: [
      "Vurder om eleven bruker test, video, observasjon eller logg som dokumentasjon.",
      "Vurder om planen viser progresjon, variasjon, belastningsstyring og restitusjon.",
      "Vurder om eleven analyserer kvalitet, belastning, motivasjon og utvikling.",
    ],
  },
  "Breddeidrett 3 - periode 2": {
    subject: "Breddeidrett 3",
    frame: "Breddeidrett 3 periode 2 handler om å optimalisere, drøfte og vurdere selvstendig. Eleven skal gjennomføre minst 4 økter og bruke dokumentasjon til å forklare hva som bør videreføres, endres eller kuttes.",
    next: "Neste steg er å prioritere tiltak selvstendig og begrunne neste treningsrunde uten å bare gjøre mer av alt.",
    focus: [
      "Vurder om eleven drøfter trening, helse, prestasjon, samarbeid og læringsmiljø.",
      "Vurder om test, logg eller observasjon brukes til å begrunne justeringer.",
      "Vurder om eleven viser tydelig progresjon og økt kompleksitet fra tidligere perioder.",
    ],
  },
};

const getCheckedValue = (name) => {
  const checked = document.querySelector(`input[name="${name}"]:checked`);
  return checked ? checked.value : "";
};

const getTrack = () => getCheckedValue("track") || "kroppsoving";

const setFocusOptions = (track) => {
  if (!focusSelect) return;

  focusSelect.replaceChildren(
    ...focusOptions[track].map((label) => {
      const option = document.createElement("option");
      option.value = label;
      option.textContent = label;
      return option;
    })
  );
};

const updateTrackUI = () => {
  const track = getTrack();

  trackSections.forEach((section) => {
    section.hidden = section.dataset.trackSection !== track;
  });

  setFocusOptions(track);
};

const applyInitialTrackFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const track = params.get("vei");
  const oppgave = params.get("oppgave");

  if (track) {
    const trackInput = document.querySelector(`input[name="track"][value="${track}"]`);
    if (trackInput) trackInput.checked = true;
  }

  if (oppgave) {
    const taskInput = document.querySelector(`input[value="${oppgave}"]`);
    if (taskInput) taskInput.checked = true;
  }
};

const buildPrompt = () => {
  const track = getTrack();
  const taskKey = track === "kroppsoving" ? getCheckedValue("peTask") : getCheckedValue("breddeStep");
  const task = taskFrames[taskKey];
  const focus = focusSelect.value;
  const startReflection = document.querySelector("#start-reflection").value.trim();
  const studentText = document.querySelector("#student-text").value.trim();
  const competenceBlock = task.focus.map((line) => `- ${line}`).join("\n");

  return `Du er en tydelig, støttende og faglig sterk lærer i ${task.subject}.

Gi veiledende tilbakemelding på elevens egentreningsarbeid.

Faglig ramme:
${task.frame}

Kontekst:
- Vei: ${track === "kroppsoving" ? "Kroppsøving" : "Breddeidrett"}
- Oppgave/periodesteg: ${taskKey}
- Fokusområde: ${focus}

Eleven har levert to deler. Les dem i sammenheng og legg merke til hva som har endret seg fra starten til slutten av perioden.

Startrefleksjon — skrevet før treningsperioden:
"""
${startReflection || "Startrefleksjon er ikke limt inn."}
"""

Øktplan, logg og sluttrefleksjon — skrevet etter perioden:
"""
${studentText || "Arbeid og sluttrefleksjon er ikke limt inn."}
"""

Vurder arbeidet opp mot disse punktene:
1. Mål: Er målet tydelig, relevant og mulig å bruke til å styre treningen?
2. Øktplan: Er øktplanen skrevet før økta og tydelig på hva, hvordan og hvorfor?
3. Gjennomføring: Viser teksten at økta ble gjennomført med fokus og passende tilpasning?
4. Logg: Er loggen konkret, personlig og nyttig for senere justering?
5. Utvikling: Sammenlign startrefleksjonen med sluttrefleksjonen — ser eleven sin egen utvikling?
6. Neste steg: ${task.next}

Særlig viktig for denne oppgaven:
${competenceBlock}

Skriv tilbakemeldingen slik:
- Først: 3 konkrete styrker i arbeidet.
- Deretter: 3 konkrete forbedringspunkter.
- Så: ett tydelig forslag til hva eleven bør gjøre i neste periode — basert på hva startrefleksjonen viste og hva som faktisk skjedde.
- Til slutt: en veiledende nivåvurdering/karakter, men presiser at dette ikke er endelig vurdering og at lærer vurderer samlet kompetanse.

Vær konkret, elevvennlig og utviklingsorientert. Ikke skriv generelle råd hvis du kan peke på noe i teksten.`;
};

trackInputs.forEach((input) => {
  input.addEventListener("change", updateTrackUI);
});

generateButton?.addEventListener("click", () => {
  output.value = buildPrompt();
});

copyButton?.addEventListener("click", async () => {
  if (!output.value) return;

  try {
    await navigator.clipboard.writeText(output.value);
    copyButton.textContent = "Kopiert";
    window.setTimeout(() => {
      copyButton.textContent = "Kopier";
    }, 1600);
  } catch {
    output.focus();
    output.select();
  }
});

applyInitialTrackFromUrl();
updateTrackUI();
