// Generated from the media research (2026-10-06): freely licensed Wikimedia
// Commons photos (bundled in assets/people/, credited under each photo)
// and YouTube IDs verified with YouTube's oEmbed endpoint.
const PEOPLE = {
 "cristofori": {
  "person": "Bartolomeo Cristofori",
  "artist": "Unknown author",
  "license": "Public domain",
  "licenseUrl": null,
  "pageUrl": "https://commons.wikimedia.org/wiki/File:BartolomeoCristofori.jpg",
  "file": "BartolomeoCristofori.jpg",
  "img": "assets/people/cristofori.webp"
 },
 "beethoven": {
  "person": "Ludwig van Beethoven",
  "artist": "Joseph Karl Stieler",
  "license": "Public domain",
  "licenseUrl": null,
  "pageUrl": "https://commons.wikimedia.org/wiki/File:Joseph_Karl_Stieler%27s_Beethoven_mit_dem_Manuskript_der_Missa_solemnis.jpg",
  "file": "Joseph Karl Stieler's Beethoven mit dem Manuskript der Missa solemnis.jpg",
  "img": "assets/people/beethoven.webp"
 },
 "nina-simone": {
  "person": "Nina Simone",
  "artist": "Gerrit de Bruin",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "pageUrl": "https://commons.wikimedia.org/wiki/File:Nina_Simone_-1969.jpg",
  "file": "Nina Simone -1969.jpg",
  "img": "assets/people/nina-simone.webp"
 },
 "glenn-gould": {
  "person": "Glenn Gould",
  "artist": "Richard Avedon",
  "license": "Public domain",
  "licenseUrl": null,
  "pageUrl": "https://commons.wikimedia.org/wiki/File:Glenn_Gould_1961_(cropped).jpg",
  "file": "Glenn Gould 1961 (cropped).jpg",
  "img": "assets/people/glenn-gould.webp"
 },
 "chopin": {
  "person": "Frédéric Chopin",
  "artist": "Louis-Auguste Bisson",
  "license": "Public domain",
  "licenseUrl": null,
  "pageUrl": "https://commons.wikimedia.org/wiki/File:Frederic_Chopin_photo.jpeg",
  "file": "Frederic Chopin photo.jpeg",
  "img": "assets/people/chopin.webp"
 },
 "elton-john": {
  "person": "Elton John",
  "artist": "Raph_PH",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "pageUrl": "https://commons.wikimedia.org/wiki/File:EltonDocBFILFF101024_(4_of_17)_(cropped).jpg",
  "file": "EltonDocBFILFF101024 (4 of 17) (cropped).jpg",
  "img": "assets/people/elton-john.webp"
 },
 "herbie-hancock": {
  "person": "Herbie Hancock",
  "artist": "Library of Congress Life",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "pageUrl": "https://commons.wikimedia.org/wiki/File:Herbie_Hancock_2023.jpg",
  "file": "Herbie Hancock 2023.jpg",
  "img": "assets/people/herbie-hancock.webp"
 },
 "mozart": {
  "person": "Wolfgang Amadeus Mozart",
  "artist": "Johann Nepomuk della Croce",
  "license": "Public domain",
  "licenseUrl": null,
  "pageUrl": "https://commons.wikimedia.org/wiki/File:The_Mozart_Family_-_Wolfgang_Amadeus_Mozart_headshot.jpg",
  "file": "The Mozart Family - Wolfgang Amadeus Mozart headshot.jpg",
  "img": "assets/people/mozart.webp"
 },
 "erard": {
  "person": "Sébastien Érard",
  "artist": "H. Pottin",
  "license": "Public domain",
  "licenseUrl": null,
  "pageUrl": "https://commons.wikimedia.org/wiki/File:S%C3%A9bastien_%C3%89rard.jpg",
  "file": "Sébastien Érard.jpg",
  "img": "assets/people/erard.webp"
 },
 "liszt": {
  "person": "Franz Liszt",
  "artist": "Herman Biow",
  "license": "Public domain",
  "licenseUrl": null,
  "pageUrl": "https://commons.wikimedia.org/wiki/File:Franz_Liszt_by_Herman_Biow-_1843.png",
  "file": "Franz Liszt by Herman Biow- 1843.png",
  "img": "assets/people/liszt.webp"
 },
 "john-cage": {
  "person": "John Cage",
  "artist": "Rob Bogaerts for Anefo",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "pageUrl": "https://commons.wikimedia.org/wiki/File:John_Cage_(1988).jpg",
  "file": "John Cage (1988).jpg",
  "img": "assets/people/john-cage.webp"
 }
};
// Song videos (official artist / label / "Topic" channels only, each
// checked with YouTube's oEmbed): acoustic versions where one exists.
const VIDEOS = {
 "piano-action": {
  "id": "qRHK0hYcwlQ",
  "title": "What makes a Steinway different: Action",
  "author_name": "Steinway & Sons UK"
 },
 "prepared-piano": {
  "id": "u8rUK_HgRM4",
  "title": "Margaret Leng Tan demonstrates John Cage's prepared piano",
  "author_name": "Neuma Records"
 },
 "liszt": {
  "id": "tSqGEmbzAJo",
  "title": "Seong-Jin Cho - Liszt: Consolations, S. 172: No. 3 Lento placido in D Flat Major (World Piano Day)",
  "author_name": "Deutsche Grammophon - DG"
 },
 "chopin": {
  "id": "9Wcgm-JLzM4",
  "title": "Grigory Sokolov – Chopin: Nocturne in A Flat Major, Op. 32 No. 2, Lento",
  "author_name": "Deutsche Grammophon - DG"
 },
 "the-a-team": {"id": "xADSSBs34is", "title": "Ed Sheeran - The A Team (Acoustic Boat Sessions)", "author_name": "Ed Sheeran"},
 "perfect": {"id": "9vDIzVuDzTs", "title": "Perfect (Acoustic)", "author_name": "Ed Sheeran - Topic"},
 "viva-la-vida": {"id": "vUnWFsc5WBU", "title": "Chris Martin “Viva la Vida” (Acoustic) on the Howard Stern Show (2016)", "author_name": "The Howard Stern Show"},
 "country-roads": {"id": "IUmnTfsY3hI", "title": "John Denver - Take Me Home, Country Roads (from The Wildlife Concert)", "author_name": "JohnDenverVEVO"},
 "linger": {"id": "sDK0xdiHBcQ", "title": "The Cranberries - Linger (Acoustic Version)", "author_name": "TheCranberriesVEVO"},
 "love-story": {"id": "8xg3vE8Ie_E", "title": "Taylor Swift - Love Story", "author_name": "Taylor Swift"},
 "let-it-be": {"id": "CGj85pVzRJs", "title": "The Beatles - Let It Be (Official Music Video) [Remastered 2015]", "author_name": "TheBeatlesVEVO"},
 "stand-by-me": {"id": "UiTwbwxbG2U", "title": "Stand by Me (Remastered 2015)", "author_name": "Ben E. King - Topic"},
 "someone-like-you": {"id": "NAc83CF8Ejk", "title": "Adele - Someone Like You (Live in Her Home)", "author_name": "Adele"},
 "no-woman-no-cry": {"id": "mZ6VezKMoRY", "title": "Bob Marley & The Wailers - No Woman, No Cry (Live At The Rainbow 4th June 1977)", "author_name": "BobMarleyVEVO"},
 "dont-stop-believin": {"id": "VcjzHMhBtf0", "title": "Journey - Don't Stop Believin' (Escape Tour 1981: Live In Houston)", "author_name": "journeyVEVO"},
 "my-funny-valentine": {"id": "tczRmxcEoow", "title": "Chet Baker - My Funny Valentine (Remastered 2004)", "author_name": "Chet Baker - Topic"},
 "jazz-loop": {"id": "otFVFLtRF_s", "title": "Herbie Hancock - Cantaloupe Island (Remastered 1999)", "author_name": "Herbie Hancock - Topic"}
};
const SONG_VIDEOS = {
 "The A Team": "the-a-team",
 "Perfect": "perfect",
 "Viva La Vida": "viva-la-vida",
 "Take Me Home, Country Roads": "country-roads",
 "Linger": "linger",
 "Love Story": "love-story",
 "Let It Be": "let-it-be",
 "Stand By Me": "stand-by-me",
 "Someone Like You": "someone-like-you",
 "No Woman No Cry": "no-woman-no-cry",
 "Don't Stop Believin'": "dont-stop-believin",
 "My Funny Valentine": "my-funny-valentine"
};
export { PEOPLE, VIDEOS, SONG_VIDEOS };
