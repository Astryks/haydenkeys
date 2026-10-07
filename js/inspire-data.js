// "Get inspired": legendary live performances on official channels, picked
// as the most-watched official upload of each (checked with YouTube oEmbed,
// 2026-10-07). SONGS is matched to library songs; GENERAL is by style.
const INSPIRE_SONGS = {
 "Moonlight Sonata (3rd Movement)": {
  "id": "zucBfXpCA6s",
  "title": "Beethoven \"Moonlight\" Sonata,  III \"Presto Agitato\" Valentina Lisitsa",
  "author_name": "Valentina Lisitsa QOR Records Official channel",
  "views": "69M",
  "blurb": "Valentina Lisitsa's fingers fly like a storm in this fiery performance that has been watched by millions."
 },
 "La Campanella": {
  "id": "MD6xMyuZls0",
  "title": "Paganini-Liszt La Campanella",
  "author_name": "Valentina Lisitsa QOR Records Official channel",
  "views": "13M",
  "blurb": "Listen for the tiny bell notes ringing high on the keyboard as Lisitsa plays this famously tricky encore live in Seoul."
 },
 "Fantaisie-Impromptu": {
  "id": "H4v4Ipl_UJI",
  "title": "Dmitry Shishkin – Fantasy-impromptu in C sharp minor Op. 66 (third stage)",
  "author_name": "Chopin Institute",
  "views": "4M",
  "blurb": "A young pianist plays this whirlwind piece on the big stage of the International Chopin Competition, with hands racing in two different rhythms."
 },
 "Piano Concerto No. 2": {
  "id": "BxX1obB9GKk",
  "title": "Yuja Wang, Gustavo Dudamel, LA Philharmonic – Rachmaninoff: Piano Concerto No.2: II.Adagio sostenuto",
  "author_name": "Deutsche Grammophon - DG",
  "views": "337K",
  "blurb": "Yuja Wang and a full orchestra share one of the most beautiful, dreamy melodies ever written for piano."
 },
 "Chasse-Neige": {
  "id": "Ob8Q2yn8UqM",
  "title": "Liszt Chasse-neige Transcedental Etude #12 Valentina Lisitsa",
  "author_name": "Valentina Lisitsa QOR Records Official channel",
  "views": "353K",
  "blurb": "Liszt wrote this to sound like a swirling snowstorm, and you can hear the flurries build until the whole piano roars."
 },
 "Revolutionary Étude": {
  "id": "TgBz7LnvUaQ",
  "title": "Seong-Jin Cho – Chopin: Etude in C Minor, Op. 10 No. 12 \"Revolutionary\"",
  "author_name": "Deutsche Grammophon - DG",
  "views": "626K",
  "blurb": "Chopin Competition winner Seong-Jin Cho sends the left hand rushing up and down the keys like a crashing wave."
 },
 "Pyramid Song": {
  "id": "lcmbLpCXUGk",
  "title": "Radiohead - Pyramid Song (live in Paris, April 2001)",
  "author_name": "Radiohead",
  "views": "1M",
  "blurb": "Radiohead plays this floating, mysterious song live, led by a piano part with a rhythm that seems to drift in slow motion."
 },
 "Total Eclipse of the Heart": {
  "id": "5yziRK36wTU",
  "title": "Bonnie Tyler - Total Eclipse of the Heart (Live from Tim Rice, 1983)",
  "author_name": "bonnietylerVEVO",
  "views": "7.3M",
  "blurb": "Bonnie Tyler belts it out live while the famous piano part rolls underneath like rising thunder."
 },
 "Bohemian Rhapsody": {
  "id": "vbvyNnw8Qjg",
  "title": "Queen - Bohemian Rhapsody (Live Aid 1985)",
  "author_name": "Live Aid",
  "views": "310M",
  "blurb": "Freddie Mercury sits at the piano in front of 72,000 fans at Live Aid and opens one of the most legendary rock shows ever."
 },
 "Autumn Leaves": {
  "id": "RxnI1nUTzKA",
  "title": "Autumn Leaves - Yohan Kim & Friends Concert Live",
  "author_name": "Yohan Kim",
  "views": "2M",
  "blurb": "Pianist Yohan Kim and friends turn this classic jazz tune into a joyful live jam full of smooth chords and fun solos."
 },
 "Blue Bossa": {
  "id": "WsLuTkirmbQ",
  "title": "Eliane Elias feat. Chick Corea - Blue Bossa (Official Video)",
  "author_name": "Eliane Elias Official",
  "views": "187K",
  "blurb": "Two jazz piano heroes, Eliane Elias and Chick Corea, trade ideas on this breezy Latin tune like friends having a musical chat."
 },
 "There Will Never Be Another You": {
  "id": "jWG1dNvXw3E",
  "title": "\"There Will Never Be Another You\" | ft. Brad Mehldau, Veronica Swift",
  "author_name": "Emmet Cohen",
  "views": "267K",
  "blurb": "Emmet Cohen and Brad Mehldau team up with singer Veronica Swift for a swinging, smiling performance of this standard."
 },
 "Misty": {
  "id": "Vgvr00PkJJU",
  "title": "Erroll Garner \"Misty\" on The Ed Sullivan Show, March 26, 1961",
  "author_name": "The Ed Sullivan Show",
  "views": "66K",
  "blurb": "Erroll Garner, the man who wrote Misty, plays it himself on TV with his famous dreamy, shimmering style."
 },
 "Stella by Starlight": {
  "id": "I-VY-zs2eiY",
  "title": "Robert Glasper - Stella By Starlight (Live At Capitol Studios)",
  "author_name": "RobertGlasperVEVO",
  "views": "1M",
  "blurb": "Robert Glasper plays this old ballad live with fresh modern harmonies that make it sound brand new."
 },
 "My Funny Valentine": {
  "id": "JLOzit7pdpw",
  "title": "Emmet Cohen w/ Ben Wolfe & Victor Lewis | My Funny Valentine",
  "author_name": "Emmet Cohen",
  "views": "27K",
  "blurb": "Emmet Cohen's trio plays this gentle love song with soft touch and lots of sparkle on the keys."
 },
 "Fly Me to the Moon": {
  "id": "6llY-y3mOO8",
  "title": "Cynthia Erivo, Herbie Hancock - Fly Me To The Moon (Live From The 67th GRAMMY Awards)",
  "author_name": "CynthiaErivoVEVO",
  "views": "2M",
  "blurb": "Jazz legend Herbie Hancock plays piano for Cynthia Erivo at the GRAMMY Awards in a classy, soaring version."
 },
 "Take Five": {
  "id": "JXi3rHqnAIU",
  "title": "Desmond: Take Five / The Dave Brubeck Quartet, Live in Belgium, 1964",
  "author_name": "Dave Brubeck",
  "views": "3M",
  "blurb": "The Dave Brubeck Quartet plays its famous tune in five beats per bar, with Brubeck's piano keeping the unusual groove rock steady."
 },
 "All of Me (jazz standard)": {
  "id": "FfB0ExmGFHA",
  "title": "Emmet Cohen w/ Brianna Thomas | All Of Me",
  "author_name": "Emmet Cohen",
  "views": "23K",
  "blurb": "Emmet Cohen's swinging piano and Brianna Thomas's voice make this old favorite bounce with joy."
 },
 "Satin Doll": {
  "id": "wTFPV1pk654",
  "title": "Duke Ellington - Satin Doll (1962)  [official video]",
  "author_name": "StoryvilleRecords",
  "views": "1.6M",
  "blurb": "Duke Ellington himself leads his band from the piano on the classy tune he helped write."
 },
 "Cantaloupe Island": {
  "id": "5KNL0_sis1k",
  "title": "“Cantaloupe Island” (Live, 1990)",
  "author_name": "Herbie Hancock",
  "views": "1.9M",
  "blurb": "Herbie Hancock plays his own funky piano groove live, a riff so catchy it has been sampled by other artists."
 },
 "Gymnopédie No. 1": {
  "id": "Ekvwf8cNUSE",
  "title": "MAKSIM - Gymnopédie - Live in Istanbul",
  "author_name": "MAKSIM",
  "views": "1.6M",
  "blurb": "Pianist MAKSIM plays Satie's calm, floating melody live and shows how a few soft notes can fill a whole room."
 },
 "Prelude in C major, BWV 846": {
  "id": "gVah1cr3pU0",
  "title": "Lang Lang – Bach: The Well-Tempered Clavier: Book 1, 1.Prelude C Major, BWV 846",
  "author_name": "Deutsche Grammophon - DG",
  "views": "2.7M",
  "blurb": "Lang Lang plays Bach's gentle flowing prelude, proving that simple patterns can sound magical."
 },
 "The Blue Danube (waltz)": {
  "id": "WOc_KdkDLKo",
  "title": "Blue Danube Waltz (Looney Tunes)- Schulz-Evler/Strauss - Charlie Albright, Piano",
  "author_name": "Charlie Albright | 찰리 올브라이트",
  "views": "237K",
  "blurb": "Charlie Albright plays a dazzling solo piano version of the famous waltz that makes ten fingers sound like an orchestra."
 },
 "La Vie en rose": {
  "id": "81viyOKgx0w",
  "title": "Emmet Cohen Trio feat. Cyrille Aimée | \"La Vie en rose\"",
  "author_name": "Emmet Cohen",
  "views": "8.1M",
  "blurb": "The Emmet Cohen Trio and singer Cyrille Aimée turn Piaf's classic into a sweet, swinging jazz performance."
 },
 "Für Elise": {
  "id": "yAsDLGjMhFI",
  "title": "Beethoven \"Für Elise\" Valentina Lisitsa  Seoul Philharmonic",
  "author_name": "Valentina Lisitsa QOR Records Official channel",
  "views": "9.8M",
  "blurb": "Valentina Lisitsa plays the world's most famous piano piece live, and it sounds as fresh as the first time you heard it."
 },
 "Clair de Lune": {
  "id": "-Bxpm0EmOMU",
  "title": "Debussy: Clair de lune | Menahem Pressler, piano",
  "author_name": "DW Classical Music",
  "views": "13M",
  "blurb": "Pianist Menahem Pressler, almost 90 years old, plays this moonlit piece in Paris with breathtaking gentleness."
 },
 "Nocturne in E-flat Major, Op. 9 No. 2": {
  "id": "tV5U8kVYS88",
  "title": "Chopin Nocturne E Flat Major Op.9 No.2",
  "author_name": "Valentina Lisitsa QOR Records Official channel",
  "views": "11M",
  "blurb": "Valentina Lisitsa makes Chopin's dreamy night song sing like a voice, with delicate decorations sprinkled on top."
 },
 "Rondo alla Turca": {
  "id": "RGAPTRrAilY",
  "title": "Yuja Wang - Variations on the Turkish March (Odeonsplatz)",
  "author_name": "medici.tv",
  "views": "4.1M",
  "blurb": "Yuja Wang plays a wild, jaw-dropping version of Mozart's Turkish March live in front of a huge outdoor crowd."
 },
 "Angels": {
  "id": "gZkol4rcbgo",
  "title": "Robbie Williams - Angels (One Love Manchester)",
  "author_name": "BBC Music",
  "views": "22M",
  "blurb": "Robbie Williams sings his big piano ballad live for a stadium crowd that sings every word back to him."
 },
 "When the Party's Over": {
  "id": "72BhejMSRFc",
  "title": "Billie Eilish - \"When The Party's Over\" [LIVE @ SiriusXM]",
  "author_name": "SiriusXM",
  "views": "9.6M",
  "blurb": "Finneas plays the soft piano while his sister Billie Eilish sings, showing how much feeling a quiet song can have."
 },
 "Karma Police": {
  "id": "uEk_mtJ_ssM",
  "title": "Radiohead - Karma Police (Glastonbury 1997)",
  "author_name": "BBC Music",
  "views": "868K",
  "blurb": "Radiohead plays this song live at Glastonbury 1997, with the piano chords leading the whole crowd along."
 },
 "Hoppípolla": {
  "id": "nlVA_e6WQhw",
  "title": "Sigur Rós - Hoppípolla & Með blóðnasir  (Live In Ásbyrgi) [Remastered Heima Extra]",
  "author_name": "Sigur Rós",
  "views": "2.1M",
  "blurb": "Sigur Rós plays this joyful, sparkling piano song outdoors in Iceland's dramatic landscape."
 },
 "Million Reasons": {
  "id": "Z8lUW9SKquY",
  "title": "Lady Gaga - Million Reasons (Live At Royal Variety Performance)",
  "author_name": "LadyGagaVEVO",
  "views": "56M",
  "blurb": "Lady Gaga sits at the piano and pours her heart into this ballad at the Royal Variety Performance."
 },
 "Can You Feel the Love Tonight": {
  "id": "Pfqf5CSTeMw",
  "title": "Elton John - Can You Feel The Love Tonight (Estadio do Flamengo, Rio, Brazil 1995)",
  "author_name": "EltonJohnVEVO",
  "views": "556K",
  "blurb": "Elton John plays his Lion King love song live at the piano for a huge crowd in Rio."
 },
 "Dancing Queen": {
  "id": "zOZMdaoNo5A",
  "title": "ABBA - Dancing Queen (Live - ABBA Down Under)",
  "author_name": "AbbaVEVO",
  "views": "18M",
  "blurb": "ABBA performs their happiest hit, with that famous piano slide that makes everyone want to dance."
 },
 "Make You Feel My Love": {
  "id": "LLoyNxjhTzc",
  "title": "Adele - Make You Feel My Love (Live on Letterman)",
  "author_name": "Adele",
  "views": "67M",
  "blurb": "Adele sings this tender song live with just a piano, and every note feels like a warm hug."
 },
 "Clocks": {
  "id": "vKw7yvoZ-Tg",
  "title": "Coldplay - Clocks (Live at Austin City Limits)",
  "author_name": "Coldplay",
  "views": "39M",
  "blurb": "Chris Martin hammers out one of the most famous piano riffs in rock live at Austin City Limits."
 },
 "Piano Man": {
  "id": "8F4MYJIC1sU",
  "title": "Billy Joel & Guests - Piano Man (Gershwin Prize - November 19, 2014)",
  "author_name": "Billy Joel",
  "views": "33M",
  "blurb": "Billy Joel plays his signature song at the piano surrounded by friends and a cheering crowd."
 },
 "Hello": {
  "id": "DfG6VKnjrVw",
  "title": "Adele - Hello (Live at the NRJ Awards)",
  "author_name": "Adele",
  "views": "110M",
  "blurb": "Adele sings her huge ballad live with the piano chords building under her powerful voice."
 },
 "River Flows in You": {
  "id": "KQWt4cimf9c",
  "title": "Yiruma(이루마) - River Flows in You (Sketchbook) | KBS WORLD TV 210226",
  "author_name": "KBS WORLD TV",
  "views": "641K",
  "blurb": "Yiruma, who wrote this beloved piece, plays it live on TV with soft, flowing hands."
 },
 "Have Yourself a Merry Little Christmas": {
  "id": "QAXw5t_a6lM",
  "title": "Have Yourself a Merry Little Christmas (from “Norah Jones is Playing Along” Podcast)",
  "author_name": "norahjonesVEVO",
  "views": "1.5M",
  "blurb": "Norah Jones plays this cozy holiday song at the piano with her warm, gentle voice."
 }
};
const INSPIRE_GENERAL = [
 {
  "id": "2DmfJu3oNDM",
  "title": "Tchaikovsky: Piano Concerto No. 1 | Martha Argerich, Charles Dutoit & the Verbier Festival Orchestra",
  "author_name": "DW Classical Music",
  "views": "6.9M",
  "blurb": "Martha Argerich plays Tchaikovsky's giant concerto with so much fire and speed that the orchestra can barely keep up.",
  "style": "classical"
 },
 {
  "id": "IRQR5foSUSI",
  "title": "Yunchan Lim: Tiny Desk Concert",
  "author_name": "NPR Music",
  "views": "1.5M",
  "blurb": "Young superstar Yunchan Lim plays a mini concert squeezed behind a desk, proving amazing music can happen anywhere.",
  "style": "classical"
 },
 {
  "id": "pnISpahN2dM",
  "title": "Hiromi: Tiny Desk Concert",
  "author_name": "NPR Music",
  "views": "2.8M",
  "blurb": "Hiromi plays with so much energy and joy that she almost bounces off the piano bench.",
  "style": "jazz"
 },
 {
  "id": "tw_S8lqu0wk",
  "title": "Oscar Peterson & Niels-Henning Ørsted Pedersen • 15-07-1979 • World of Jazz",
  "author_name": "World of Jazz",
  "views": "1.6M",
  "blurb": "Oscar Peterson and bassist Niels-Henning Ørsted Pedersen show how two musicians can talk to each other through music.",
  "style": "jazz"
 },
 {
  "id": "ze4xcmBFvaE",
  "title": "Jon Batiste: NPR Music Tiny Desk Concert",
  "author_name": "NPR Music",
  "views": "4.6M",
  "blurb": "Jon Batiste brings a whole party to a tiny office, mixing jazz, gospel, and New Orleans fun.",
  "style": "jazz"
 },
 {
  "id": "GlPlfCy1urI",
  "title": "Elton John - Your Song (Top Of The Pops 1971)",
  "author_name": "EltonJohnVEVO",
  "views": "97M",
  "blurb": "A young Elton John plays his famous love song at the piano, simple and from the heart.",
  "style": "pop"
 },
 {
  "id": "iM4LzEcaTK0",
  "title": "Billy Joel - New York State Of Mind (from Old Grey Whistle Test)",
  "author_name": "billyjoelVEVO",
  "views": "7.2M",
  "blurb": "Billy Joel plays this rich, bluesy piano song live on TV, with fingers rolling through big chords.",
  "style": "rock"
 },
 {
  "id": "uwUt1fVLb3E",
  "title": "Alicia Keys: NPR Music Tiny Desk Concert",
  "author_name": "NPR Music",
  "views": "47M",
  "blurb": "Alicia Keys plays her hits on the piano at NPR's Tiny Desk, showing how a singer and a piano can be one voice.",
  "style": "pop"
 },
 {
  "id": "JPJjwHAIny4",
  "title": "Lady Gaga, Bradley Cooper - Shallow (From A Star Is Born/Live From The Oscars)",
  "author_name": "LadyGagaVEVO",
  "views": "915M",
  "blurb": "Lady Gaga starts at the piano at the Oscars and builds this song into one of the most famous live moments in pop.",
  "style": "pop"
 },
 {
  "id": "cCl7_tXs80Y",
  "title": "Jacob Collier -  Somebody To Love (Live in Lisbon 2022)",
  "author_name": "Jacob Collier",
  "views": "6.6M",
  "blurb": "Jacob Collier improvises at the piano while a whole sold-out theater sings with him in perfect harmony.",
  "style": "pop"
 },
 {
  "id": "qIp9TwSEgFg",
  "title": "Ray Charles - Georgia On My Mind (Live)",
  "author_name": "RayCharlesVEVO",
  "views": "15M",
  "blurb": "Ray Charles sings and plays this soulful classic live, feeling every single note.",
  "style": "blues"
 },
 {
  "id": "ZSx91WBQLpg",
  "title": "Little Richard Performs \"Tutti Frutti\" Live | Concert for the Rock & Roll Hall of Fame 1995",
  "author_name": "Rock & Roll Hall of Fame",
  "views": "15M",
  "blurb": "Little Richard pounds the piano and shouts with pure rock and roll energy at the Rock and Roll Hall of Fame concert.",
  "style": "rock"
 },
 {
  "id": "hN_q-_nGv4U",
  "title": "Ludovico Einaudi - Experience (Live At Fabric, London / 2013)",
  "author_name": "LudovicoEinaudiVEVO",
  "views": "72M",
  "blurb": "Ludovico Einaudi's music builds slowly from a few piano notes into a huge wave of sound, like a movie soundtrack.",
  "style": "film"
 },
 {
  "id": "wlsmFJx5vH0",
  "title": "Chucho Valdés: Tiny Desk Concert",
  "author_name": "NPR Music",
  "views": "323K",
  "blurb": "Cuban piano legend Chucho Valdés mixes jazz with Afro-Cuban rhythms that make the whole room want to move.",
  "style": "world"
 }
];

export { INSPIRE_SONGS, INSPIRE_GENERAL };
