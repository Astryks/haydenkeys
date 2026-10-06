// Item 60: optional "World songs" — five popular songs in each of 10
// other languages. Chords are each song's main repeating loop, checked
// against at least two independent chord sources (researched
// 2026-10-05); "needs-verification" where they didn't fully agree. No
// lyrics. Generated from the research notes — edit freely.

const WORLD_LANGUAGES = [
  {
    "name": "French",
    "slug": "french",
    "flag": "🇫🇷"
  },
  {
    "name": "Spanish",
    "slug": "spanish",
    "flag": "🇪🇸"
  },
  {
    "name": "Portuguese (Brazil)",
    "slug": "portuguese",
    "flag": "🇧🇷"
  },
  {
    "name": "Italian",
    "slug": "italian",
    "flag": "🇮🇹"
  },
  {
    "name": "German",
    "slug": "german",
    "flag": "🇩🇪"
  },
  {
    "name": "Hindi",
    "slug": "hindi",
    "flag": "🇮🇳"
  },
  {
    "name": "Japanese",
    "slug": "japanese",
    "flag": "🇯🇵"
  },
  {
    "name": "Korean",
    "slug": "korean",
    "flag": "🇰🇷"
  },
  {
    "name": "Mandarin Chinese",
    "slug": "mandarin",
    "flag": "🇨🇳"
  },
  {
    "name": "Arabic",
    "slug": "arabic",
    "flag": "🌍"
  }
];

// Library songs that also belong to a language's list (not duplicated).
const WORLD_ALSO = {"Despacito": "Spanish"};

const WORLD_SONGS = [
  {
    "title": "Les Champs-Elysées",
    "artist": "Joe Dassin",
    "genre": "World — French",
    "popularityRank": 201,
    "year": 1969,
    "key": "C major (commonly taught; original in E)",
    "chords": [
      "C",
      "E7",
      "Am",
      "C7",
      "F",
      "C",
      "D7",
      "G7"
    ],
    "degreeSequence": "I - III7 - vi - I7 - IV - I - II7 - V7",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "French",
    "notes": "Joe Dassin's French version of the English song 'Waterloo Road' became a lasting hymn to Paris."
  },
  {
    "title": "Je veux",
    "artist": "Zaz",
    "genre": "World — French",
    "popularityRank": 202,
    "year": 2010,
    "key": "D minor",
    "chords": [
      "Dm",
      "C",
      "Bb",
      "A"
    ],
    "degreeSequence": "i - VII - VI - V",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "French",
    "notes": "Zaz's breakout 2010 single; this is the falling verse loop (the 'Andalusian cadence'), and the chorus adds Am and Gm."
  },
  {
    "title": "Papaoutai",
    "artist": "Stromae",
    "genre": "World — French",
    "popularityRank": 203,
    "year": 2013,
    "key": "Bb minor",
    "chords": [
      "Gb",
      "Ebm",
      "Ab",
      "Bbm"
    ],
    "degreeSequence": "VI - iv - VII - i",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "French",
    "notes": "Stromae's international hit about an absent father; the chorus loop (the verses use other chords)."
  },
  {
    "title": "La Vie en rose",
    "artist": "Édith Piaf",
    "genre": "World — French",
    "popularityRank": 204,
    "year": 1946,
    "key": "F major",
    "chords": [
      "F",
      "Gm",
      "C7",
      "F"
    ],
    "degreeSequence": "I - ii - V7 - I",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "French",
    "notes": "Piaf's signature song (written 1945, popular from 1946), simplified to its I-ii-V7 loop; full versions add Gm7 and passing chords."
  },
  {
    "title": "Non, je ne regrette rien",
    "artist": "Édith Piaf",
    "genre": "World — French",
    "popularityRank": 205,
    "year": 1960,
    "key": "G major",
    "chords": [
      "G",
      "D",
      "G",
      "C",
      "Caug",
      "C6",
      "D"
    ],
    "degreeSequence": "I - V - I - IV - IVaug - IV6 - V",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "French",
    "notes": "Piaf's 1960 recording spent seven weeks at number one in France; refrain simplified (D/F# and Am/D played as plain D)."
  },
  {
    "title": "La Bamba",
    "artist": "Ritchie Valens",
    "genre": "World — Spanish",
    "popularityRank": 206,
    "year": 1958,
    "key": "C major",
    "chords": [
      "C",
      "F",
      "G"
    ],
    "degreeSequence": "I - IV - V",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Spanish",
    "notes": "A Mexican son jarocho folk song that Valens turned into a rock-and-roll hit, revived by Los Lobos in 1987."
  },
  {
    "title": "Guantanamera",
    "artist": "Joseíto Fernández",
    "genre": "World — Spanish",
    "popularityRank": 207,
    "year": 1929,
    "key": "G major (commonly taught)",
    "chords": [
      "G",
      "C",
      "D7",
      "C"
    ],
    "degreeSequence": "I - IV - V7 - IV",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Spanish",
    "notes": "Probably the best-known Cuban song, covered by Celia Cruz, Compay Segundo, Pete Seeger and many others; simplified refrain loop."
  },
  {
    "title": "Bailando",
    "artist": "Enrique Iglesias ft. Descemer Bueno & Gente de Zona",
    "genre": "World — Spanish",
    "popularityRank": 208,
    "year": 2014,
    "key": "E minor",
    "chords": [
      "Em",
      "C",
      "G",
      "D"
    ],
    "degreeSequence": "i - VI - III - VII",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Spanish",
    "notes": "A global Latin hit with a record 41 weeks at No. 1 on Billboard's Hot Latin Songs; the pre-chorus (Am-C-Em-D) is left out."
  },
  {
    "title": "Vivir Mi Vida",
    "artist": "Marc Anthony",
    "genre": "World — Spanish",
    "popularityRank": 209,
    "year": 2013,
    "key": "B minor (commonly taught)",
    "chords": [
      "Bm",
      "G",
      "D",
      "A"
    ],
    "degreeSequence": "i - VI - III - VII",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Spanish",
    "notes": "A Latin Grammy-winning salsa anthem adapted from Khaled's 'C'est la vie'; also often charted in C minor."
  },
  {
    "title": "Mas Que Nada",
    "artist": "Jorge Ben",
    "genre": "World — Portuguese (Brazil)",
    "popularityRank": 210,
    "year": 1963,
    "key": "G minor",
    "chords": [
      "Gm7",
      "Cm7",
      "D7",
      "Gm7"
    ],
    "degreeSequence": "i - iv7 - v7 - i",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Portuguese (Brazil)",
    "notes": "Jorge Ben's samba, later a worldwide hit for Sergio Mendes & Brasil '66; the simplified main loop."
  },
  {
    "title": "Ai Se Eu Te Pego",
    "artist": "Michel Teló",
    "genre": "World — Portuguese (Brazil)",
    "popularityRank": 211,
    "year": 2011,
    "key": "C major (commonly taught; recorded in B)",
    "chords": [
      "C",
      "G",
      "Am",
      "F"
    ],
    "degreeSequence": "I - V - vi - IV",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Portuguese (Brazil)",
    "notes": "Michel Teló's sertanejo hit went to No. 1 across Europe and Latin America — the same 1-5-6-4 as Lesson 1."
  },
  {
    "title": "Trem-Bala",
    "artist": "Ana Vilela",
    "genre": "World — Portuguese (Brazil)",
    "popularityRank": 212,
    "year": 2016,
    "key": "A major (recorded in B major)",
    "chords": [
      "A",
      "D",
      "A",
      "E"
    ],
    "degreeSequence": "I - IV - I - V",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Portuguese (Brazil)",
    "notes": "Went viral online and became one of the most popular first songs for learners in Brazil."
  },
  {
    "title": "Tempo Perdido",
    "artist": "Legião Urbana",
    "genre": "World — Portuguese (Brazil)",
    "popularityRank": 213,
    "year": 1986,
    "key": "E minor",
    "chords": [
      "C",
      "Am7",
      "Bm",
      "Em"
    ],
    "degreeSequence": "VI - iv7 - v - i",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Portuguese (Brazil)",
    "notes": "Often called Legião Urbana's most-played song; the intro and verse loop."
  },
  {
    "title": "Evidências",
    "artist": "Chitãozinho & Xororó",
    "genre": "World — Portuguese (Brazil)",
    "popularityRank": 214,
    "year": 1990,
    "key": "E major",
    "chords": [
      "E",
      "A",
      "F#m",
      "B7"
    ],
    "degreeSequence": "I - IV - ii - V7",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Portuguese (Brazil)",
    "notes": "Often called Brazil's unofficial karaoke anthem; the simplified chorus loop."
  },
  {
    "title": "Nel blu, dipinto di blu (Volare)",
    "artist": "Domenico Modugno",
    "genre": "World — Italian",
    "popularityRank": 215,
    "year": 1958,
    "key": "C major (commonly taught)",
    "chords": [
      "Edim",
      "Dm",
      "A7",
      "Dm",
      "G",
      "C"
    ],
    "degreeSequence": "iii° - ii - VI7 - ii - V - I",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Italian",
    "notes": "Won Sanremo 1958 and became one of the best-known Italian songs worldwide; this is the opening of the 'Volare' chorus, simplified (the full chorus goes on through Em7, Am, C7, F and G7)."
  },
  {
    "title": "Bella Ciao",
    "artist": "Traditional (Italian partisan song)",
    "genre": "World — Italian",
    "popularityRank": 216,
    "year": 1945,
    "key": "A minor (commonly taught)",
    "chords": [
      "Am",
      "Dm",
      "Am",
      "E7",
      "Am"
    ],
    "degreeSequence": "i - iv - i - V7 - i",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Italian",
    "notes": "A worldwide anthem of the anti-fascist resistance that became popular again through La casa de papel; simplified, with the Am7 passing chord left out."
  },
  {
    "title": "L'Italiano",
    "artist": "Toto Cutugno",
    "genre": "World — Italian",
    "popularityRank": 217,
    "year": 1983,
    "key": "A minor",
    "chords": [
      "Am",
      "E7",
      "Am",
      "Dm",
      "Am",
      "E7"
    ],
    "degreeSequence": "i - V7 - i - iv - i - V7",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Italian",
    "notes": "Premiered at Sanremo 1983 and became an international symbol of Italian identity; the chorus loop, simplified (the song later moves up a half step to Bb minor)."
  },
  {
    "title": "Felicità",
    "artist": "Al Bano & Romina Power",
    "genre": "World — Italian",
    "popularityRank": 218,
    "year": 1982,
    "key": "C major",
    "chords": [
      "C",
      "Am",
      "Dm",
      "G7"
    ],
    "degreeSequence": "I - vi - ii - V7",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Italian",
    "notes": "An international hit from Sanremo 1982 and the duo's best-known song; the same four-chord loop for verse and chorus."
  },
  {
    "title": "Sarà perché ti amo",
    "artist": "Ricchi e Poveri",
    "genre": "World — Italian",
    "popularityRank": 219,
    "year": 1981,
    "key": "E major",
    "chords": [
      "E",
      "C#m",
      "A",
      "B"
    ],
    "degreeSequence": "I - vi - IV - V",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Italian",
    "notes": "One of Ricchi e Poveri's biggest hits and still a party favourite across Europe."
  },
  {
    "title": "99 Luftballons",
    "artist": "Nena",
    "genre": "World — German",
    "popularityRank": 220,
    "year": 1983,
    "key": "D major (recorded in E major)",
    "chords": [
      "D",
      "Em",
      "G",
      "A"
    ],
    "degreeSequence": "I - ii - IV - V",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "German",
    "notes": "Cold War protest song that reached No. 2 on the US Billboard Hot 100 — one of the most successful German-language songs ever."
  },
  {
    "title": "Atemlos durch die Nacht",
    "artist": "Helene Fischer",
    "genre": "World — German",
    "popularityRank": 221,
    "year": 2013,
    "key": "C major",
    "chords": [
      "F",
      "C",
      "G",
      "Am"
    ],
    "degreeSequence": "IV - I - V - vi",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "German",
    "notes": "A huge Schlager hit and a fixture at German parties; the refrain loop (the verses use C - Am - G - C)."
  },
  {
    "title": "Tage wie diese",
    "artist": "Die Toten Hosen",
    "genre": "World — German",
    "popularityRank": 222,
    "year": 2012,
    "key": "D major",
    "chords": [
      "D",
      "G",
      "Em",
      "G",
      "A",
      "D"
    ],
    "degreeSequence": "I - IV - ii - IV - V - I",
    "confidence": "needs-verification",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "German",
    "notes": "An unofficial anthem at German football celebrations; the chorus progression (the two sources found may not be fully independent)."
  },
  {
    "title": "Auf uns",
    "artist": "Andreas Bourani",
    "genre": "World — German",
    "popularityRank": 223,
    "year": 2014,
    "key": "C major (commonly taught; recorded in D)",
    "chords": [
      "C",
      "Am",
      "G",
      "F",
      "G",
      "C"
    ],
    "degreeSequence": "I - vi - V - IV - V - I",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "German",
    "notes": "The anthem of Germany's 2014 World Cup win; verse loop plus chorus loop, simplified."
  },
  {
    "title": "Stille Nacht, heilige Nacht",
    "artist": "Franz Xaver Gruber & Joseph Mohr",
    "genre": "World — German",
    "popularityRank": 224,
    "year": 1818,
    "key": "C major",
    "chords": [
      "C",
      "G7",
      "C",
      "F",
      "C",
      "G7",
      "C"
    ],
    "degreeSequence": "I - V7 - I - IV - I - V7 - I",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "German",
    "notes": "'Silent Night' — the Austrian carol, among the most widely sung Christmas songs in the world. Public domain."
  },
  {
    "title": "Tum Hi Ho",
    "artist": "Arijit Singh (music: Mithoon)",
    "genre": "World — Hindi",
    "popularityRank": 225,
    "year": 2013,
    "key": "E minor (commonly taught; recorded in F minor)",
    "chords": [
      "Em",
      "Am",
      "D",
      "Bm"
    ],
    "degreeSequence": "i - iv - VII - v",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Hindi",
    "notes": "The Aashiqui 2 ballad that made Arijit Singh a star — one of the most-streamed Bollywood songs of the 2010s."
  },
  {
    "title": "Channa Mereya",
    "artist": "Arijit Singh (music: Pritam)",
    "genre": "World — Hindi",
    "popularityRank": 226,
    "year": 2016,
    "key": "A minor (commonly taught)",
    "chords": [
      "Am",
      "F",
      "Dm",
      "C",
      "G"
    ],
    "degreeSequence": "i - VI - iv - III - VII",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Hindi",
    "notes": "The heartbreak anthem from Ae Dil Hai Mushkil; the chorus loop."
  },
  {
    "title": "Kesariya",
    "artist": "Arijit Singh (music: Pritam)",
    "genre": "World — Hindi",
    "popularityRank": 227,
    "year": 2022,
    "key": "C major (commonly taught)",
    "chords": [
      "F",
      "C",
      "F",
      "C",
      "F",
      "G"
    ],
    "degreeSequence": "IV - I - IV - I - IV - V",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Hindi",
    "notes": "The love song from Brahmastra, a huge viral hit in 2022; the chorus loop (verse: C - G - Am - F - G)."
  },
  {
    "title": "Agar Tum Saath Ho",
    "artist": "Alka Yagnik & Arijit Singh (music: A. R. Rahman)",
    "genre": "World — Hindi",
    "popularityRank": 228,
    "year": 2015,
    "key": "Eb major",
    "chords": [
      "Ab",
      "Eb",
      "Bb",
      "Eb"
    ],
    "degreeSequence": "IV - I - V - I",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Hindi",
    "notes": "A. R. Rahman's duet from Tamasha, one of the most celebrated Bollywood ballads of its decade; simplified chorus loop."
  },
  {
    "title": "Pal Pal Dil Ke Paas",
    "artist": "Kishore Kumar (music: Kalyanji-Anandji)",
    "genre": "World — Hindi",
    "popularityRank": 229,
    "year": 1973,
    "key": "G major (commonly taught)",
    "chords": [
      "Em",
      "D",
      "G",
      "D",
      "C",
      "G"
    ],
    "degreeSequence": "vi - V - I - V - IV - I",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Hindi",
    "notes": "An evergreen Kishore Kumar song from the film Blackmail; the main chorus (mukhra) loop."
  },
  {
    "title": "Ue o Muite Arukō (Sukiyaki)",
    "artist": "Kyu Sakamoto",
    "genre": "World — Japanese",
    "popularityRank": 230,
    "year": 1961,
    "key": "G major",
    "chords": [
      "G",
      "Em",
      "G",
      "Bm",
      "Em7",
      "Am7",
      "D7"
    ],
    "degreeSequence": "I - vi - I - iii - vi7 - ii7 - V7",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Japanese",
    "notes": "The only Japanese-language song ever to reach No. 1 on the US Billboard Hot 100 (1963)."
  },
  {
    "title": "Lemon",
    "artist": "Kenshi Yonezu",
    "genre": "World — Japanese",
    "popularityRank": 231,
    "year": 2018,
    "key": "B major",
    "chords": [
      "E",
      "B",
      "F#",
      "G#m"
    ],
    "degreeSequence": "IV - I - V - vi",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Japanese",
    "notes": "Theme of the drama 'Unnatural' and one of the biggest-selling Japanese digital singles; the chorus's opening loop."
  },
  {
    "title": "Marigold",
    "artist": "Aimyon",
    "genre": "World — Japanese",
    "popularityRank": 232,
    "year": 2018,
    "key": "D major",
    "chords": [
      "D",
      "A",
      "Bm",
      "A",
      "G",
      "D",
      "G",
      "A"
    ],
    "degreeSequence": "I - V - vi - V - IV - I - IV - V",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Japanese",
    "notes": "Aimyon's breakthrough hit and a long-running streaming success in Japan; slash chords simplified to root position."
  },
  {
    "title": "Sekai ni Hitotsu Dake no Hana",
    "artist": "SMAP",
    "genre": "World — Japanese",
    "popularityRank": 233,
    "year": 2003,
    "key": "A major",
    "chords": [
      "A",
      "D",
      "E",
      "C#7",
      "F#m",
      "B7",
      "E"
    ],
    "degreeSequence": "I - IV - V - III7 - vi - II7 - V",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Japanese",
    "notes": "Written by Noriyuki Makihara; it sold over 3 million copies, one of Japan's best-selling singles."
  },
  {
    "title": "Plastic Love",
    "artist": "Mariya Takeuchi",
    "genre": "World — Japanese",
    "popularityRank": 234,
    "year": 1984,
    "key": "F major (D minor)",
    "chords": [
      "Gm9",
      "C7b9",
      "Am7",
      "Dm7"
    ],
    "degreeSequence": "ii9 - V7b9 - iii7 - vi7",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Japanese",
    "notes": "A city pop song that became a global internet phenomenon in the late 2010s; the jazzy verse loop."
  },
  {
    "title": "Spring Day",
    "artist": "BTS",
    "genre": "World — Korean",
    "popularityRank": 235,
    "year": 2017,
    "key": "Eb major",
    "chords": [
      "Eb",
      "Gm",
      "Cm",
      "Ab"
    ],
    "degreeSequence": "I - iii - vi - IV",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Korean",
    "notes": "One of BTS's best-loved and longest-charting Korean songs; the chorus adds a passing Fm."
  },
  {
    "title": "Love Scenario",
    "artist": "iKON",
    "genre": "World — Korean",
    "popularityRank": 236,
    "year": 2018,
    "key": "E minor",
    "chords": [
      "C",
      "D",
      "Bm",
      "Em"
    ],
    "degreeSequence": "VI - VII - v - i",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Korean",
    "notes": "A huge 2018 hit that topped Korean charts for weeks and became a children's singalong."
  },
  {
    "title": "Through the Night",
    "artist": "IU",
    "genre": "World — Korean",
    "popularityRank": 237,
    "year": 2017,
    "key": "Eb major",
    "chords": [
      "Ab",
      "Bb",
      "Gm",
      "Cm"
    ],
    "degreeSequence": "IV - V - iii - vi",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Korean",
    "notes": "IU's signature ballad from the album Palette; the verse loop (the full song adds sus4 color)."
  },
  {
    "title": "Stay With Me",
    "artist": "Chanyeol & Punch",
    "genre": "World — Korean",
    "popularityRank": 238,
    "year": 2016,
    "key": "C minor",
    "chords": [
      "Cm",
      "Ab",
      "Eb",
      "Bb"
    ],
    "degreeSequence": "i - VI - III - VII",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Korean",
    "notes": "Main theme of the hit drama 'Goblin' (Guardian: The Lonely and Great God)."
  },
  {
    "title": "Eight",
    "artist": "IU feat. SUGA",
    "genre": "World — Korean",
    "popularityRank": 239,
    "year": 2020,
    "key": "Db major",
    "chords": [
      "Gb",
      "Db",
      "Bbm",
      "Ab"
    ],
    "degreeSequence": "IV - I - vi - V",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Korean",
    "notes": "A 2020 chart-topper produced by and featuring BTS's SUGA."
  },
  {
    "title": "The Moon Represents My Heart (Yuèliàng Dàibiǎo Wǒ de Xīn)",
    "artist": "Teresa Teng",
    "genre": "World — Mandarin Chinese",
    "popularityRank": 240,
    "year": 1977,
    "key": "C major",
    "chords": [
      "C",
      "Em",
      "F",
      "C",
      "Am",
      "F",
      "D",
      "G"
    ],
    "degreeSequence": "I - iii - IV - I - vi - IV - II - V",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Mandarin Chinese",
    "notes": "Teresa Teng's 1977 recording became one of the best-known Mandarin love songs across the Chinese-speaking world."
  },
  {
    "title": "Tián Mì Mì",
    "artist": "Teresa Teng",
    "genre": "World — Mandarin Chinese",
    "popularityRank": 241,
    "year": 1979,
    "key": "C major",
    "chords": [
      "C",
      "G",
      "C",
      "G",
      "C",
      "Am",
      "G"
    ],
    "degreeSequence": "I - V - I - V - I - vi - V",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Mandarin Chinese",
    "notes": "A signature Teresa Teng hit, later the title song of the 1996 film 'Comrades: Almost a Love Story'."
  },
  {
    "title": "Sunny Day (Qíng Tiān)",
    "artist": "Jay Chou",
    "genre": "World — Mandarin Chinese",
    "popularityRank": 242,
    "year": 2003,
    "key": "G major",
    "chords": [
      "Em",
      "C",
      "G",
      "D"
    ],
    "degreeSequence": "vi - IV - I - V",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Mandarin Chinese",
    "notes": "One of the most-played Mandarin songs by people learning an instrument; the intro and verse loop."
  },
  {
    "title": "Fairy Tale (Tóng Huà)",
    "artist": "Michael Wong",
    "genre": "World — Mandarin Chinese",
    "popularityRank": 243,
    "year": 2005,
    "key": "G major (commonly taught)",
    "chords": [
      "G",
      "Em",
      "C",
      "D"
    ],
    "degreeSequence": "I - vi - IV - V",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Mandarin Chinese",
    "notes": "Michael Wong's 2005 ballad became a karaoke standard across the Mandarin-speaking world."
  },
  {
    "title": "Mouse Loves Rice (Lǎoshǔ Ài Dàmǐ)",
    "artist": "Yang Chengang",
    "genre": "World — Mandarin Chinese",
    "popularityRank": 244,
    "year": 2004,
    "key": "F major",
    "chords": [
      "F",
      "C",
      "Dm",
      "Bb",
      "F",
      "Dm",
      "Bb",
      "C"
    ],
    "degreeSequence": "I - V - vi - IV - I - vi - IV - V",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Mandarin Chinese",
    "notes": "A 2004 internet-era hit that spread virally across China."
  },
  {
    "title": "Tamally Maak",
    "artist": "Amr Diab",
    "genre": "World — Arabic",
    "popularityRank": 245,
    "year": 2000,
    "key": "A minor (commonly taught; recorded in C minor)",
    "chords": [
      "Am",
      "Dm",
      "G",
      "C",
      "Am",
      "Dm",
      "G",
      "E"
    ],
    "degreeSequence": "i - iv - VII - III - i - iv - VII - V",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Arabic",
    "notes": "Title track of Amr Diab's best-selling album, one of the most famous Arabic pop love songs. Western minor (Nahawand-like) scale, no quarter-tones."
  },
  {
    "title": "Habibi Ya Nour El Ein",
    "artist": "Amr Diab",
    "genre": "World — Arabic",
    "popularityRank": 246,
    "year": 1996,
    "key": "A minor (commonly taught; recorded in C minor)",
    "chords": [
      "Am",
      "Dm",
      "E",
      "Dm",
      "E",
      "Am"
    ],
    "degreeSequence": "i - iv - V - iv - V - i",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Arabic",
    "notes": "A huge pan-Arab hit, widely covered; minor scale with a major V (Nahawand), no quarter-tones. The core loop only."
  },
  {
    "title": "Ya Lili",
    "artist": "Balti feat. Hamouda",
    "genre": "World — Arabic",
    "popularityRank": 247,
    "year": 2020,
    "key": "G minor",
    "chords": [
      "Gm",
      "F",
      "Cm",
      "Dm"
    ],
    "degreeSequence": "i - VII - iv - v",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Arabic",
    "notes": "A Tunisian song that went viral worldwide with billions of views; plain natural minor, one loop throughout."
  },
  {
    "title": "Ya Rayah",
    "artist": "Dahmane El Harrachi (famous cover by Rachid Taha)",
    "genre": "World — Arabic",
    "popularityRank": 248,
    "year": 1973,
    "key": "A minor (commonly taught)",
    "chords": [
      "Am",
      "E",
      "Dm",
      "E",
      "Am"
    ],
    "degreeSequence": "i - V - iv - V - i",
    "confidence": "needs-verification",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Arabic",
    "notes": "An Algerian chaabi song about emigration, an international hit through Rachid Taha's 1990s cover. The chord sources found may share an origin."
  },
  {
    "title": "Lamma Bada Yatathanna",
    "artist": "Traditional Andalusian muwashshah (sung by Fairuz and many others)",
    "genre": "World — Arabic",
    "popularityRank": 249,
    "year": null,
    "key": "A minor (commonly taught)",
    "chords": [
      "Am",
      "Dm",
      "E",
      "Am"
    ],
    "degreeSequence": "i - iv - V - i",
    "confidence": "confirmed",
    "oneFiveSixFourMatch": false,
    "difficulty": "Advanced",
    "world": "Arabic",
    "notes": "One of the most famous classical Arabic muwashshahat, from al-Andalus. Maqam Nahawand fits Western minor; its 10/8 rhythm is simplified here."
  }
];

export { WORLD_LANGUAGES, WORLD_SONGS, WORLD_ALSO };
