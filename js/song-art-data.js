// Album artwork links from Apple's iTunes Search, looked up once at build
// time (title|artist -> {img, url}). Images load from Apple's CDN; the
// library falls back to a coloured tile with the first letter offline.
const SONG_ART = {
 "Creep|Radiohead": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/28/7a/7c/287a7ca9-ed95-1a21-e3bb-4559a1a0ac0e/191404134351.png/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/creep-acoustic/1679849414?i=1679849823&uo=4"
 },
 "Linger|The Cranberries": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/b6/c8/85/b6c885de-fde6-d40d-c95a-d89ede4270ae/06UMGIM09433.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/linger/1440735255?i=1440735263&uo=4"
 },
 "Love Story|Taylor Swift": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/c3/d0/1c/c3d01c88-73e7-187e-fd62-e1744de979a6/21UMGIM09915.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/love-story-taylors-version/1552791073?i=1552791427&uo=4"
 },
 "Bad Guy|Billie Eilish": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/1a/37/d1/1a37d1b1-8508-54f2-f541-bf4e437dda76/19UMGIM05028.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/bad-guy/1450695723?i=1450695739&uo=4"
 },
 "Last Christmas|Wham!": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/47/55/0c/47550cd6-7ef5-bf86-c194-c7695d63c759/dj.xuditatj.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/last-christmas/282658449?i=282658482&uo=4"
 },
 "All I Want for Christmas Is You|Mariah Carey": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/c6/b7/27/c6b727f7-3a32-6b43-cee2-05bb71daf1cf/dj.itfmdeif.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/all-i-want-for-christmas-is-you/585972750?i=585972803&uo=4"
 },
 "Die With a Smile|Lady Gaga, Bruno Mars": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/11/ae/f2/11aef294-f57c-bab9-c9fc-529162984e62/24UMGIM85348.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/die-with-a-smile/1762656724?i=1762656732&uo=4"
 },
 "Blinding Lights|The Weeknd": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/61/e7/3f/61e73f94-018d-5f50-50ec-8521952bc72e/20UM1IM11629.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/blinding-lights-remix/1542842760?i=1542842761&uo=4"
 },
 "Shape of You|Ed Sheeran": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/15/e6/e8/15e6e8a4-4190-6a8b-86c3-ab4a51b88288/190295851286.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/shape-of-you/1193701079?i=1193701392&uo=4"
 },
 "Sweater Weather|The Neighbourhood": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/28/71/00/287100fb-5c31-0195-5343-e6b3625886d0/886443969834.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/sweater-weather/635016635?i=635016640&uo=4"
 },
 "Starboy|The Weeknd, Daft Punk": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b5/92/bb/b592bb72-52e3-e756-9b26-9f56d08f47ab/16UMGIM67864.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/starboy-feat-daft-punk/1440870373?i=1440870375&uo=4"
 },
 "As It Was|Harry Styles": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/2a/19/fb/2a19fb85-2f70-9e44-f2a9-82abe679b88e/886449990061.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/as-it-was/1615584999?i=1615585008&uo=4"
 },
 "Someone You Loved|Lewis Capaldi": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/92/d7/8f/92d78fb1-df3d-049e-c81d-7022808b151f/19UMGIM02973.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/someone-you-loved/1452618876?i=1452619054&uo=4"
 },
 "Sunflower|Post Malone, Swae Lee": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4b/30/2c/4b302cb6-7a14-5464-4e97-0577e9d0be49/18UMGIM82277.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/sunflower-spider-man-into-the-spider-verse/1445949265?i=1445949267&uo=4"
 },
 "One Dance|Drake, Wizkid, Kyla": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/f2/0d/8b/f20d8bff-a927-ae98-6784-20a1f51cb23e/16UMGIM27642.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/one-dance-feat-wizkid-kyla/1440841363?i=1440841384&uo=4"
 },
 "Perfect|Ed Sheeran": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/15/e6/e8/15e6e8a4-4190-6a8b-86c3-ab4a51b88288/190295851286.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/perfect/1193701079?i=1193701400&uo=4"
 },
 "Stay|The Kid Laroi, Justin Bieber": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/89/59/6a/89596ab9-fa3c-8d08-4d95-a6450fa2013c/886449400515.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/stay/1574968878?i=1574968888&uo=4"
 },
 "Believer|Imagine Dragons": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/11/7a/b8/117ab805-6811-8929-18b9-0fad7baf0c25/17UMGIM98210.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/believer/1411625594?i=1411628233&uo=4"
 },
 "I Wanna Be Yours|Arctic Monkeys": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/69/9c/b5/699cb5d6-115c-ff73-9d26-e57ea4350d72/887828031795.png/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/i-wanna-be-yours/663097964?i=663098065&uo=4"
 },
 "Heat Waves|Glass Animals": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/da/8b/77/da8b7731-6f4f-eacf-5e74-8b23389eefa1/20UMGIM03371.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/heat-waves/1508562310?i=1508562516&uo=4"
 },
 "Yellow|Coldplay": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f5/93/8c/f5938c49-964c-31d1-4b33-78b634f71fb7/190295978075.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/yellow/1122782080?i=1122782283&uo=4"
 },
 "The Night We Met|Lord Huron": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/55/41/4a/55414a18-861a-79d1-e575-5bf8cf205dbe/886445056839_Cover.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/the-night-we-met/1806531135?i=1806531961&uo=4"
 },
 "Closer|The Chainsmokers, Halsey": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/41/f8/38/41f8380b-9b56-d5d4-31f7-a6411c0c9aaa/886446102054.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/closer-feat-halsey/1170699510?i=1170699703&uo=4"
 },
 "Riptide|Vance Joy": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/7a/1c/65/7a1c6571-34e9-bb77-32be-90c72ba003c0/075679920355.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/riptide/1022164257?i=1022164261&uo=4"
 },
 "Levitating|Dua Lipa": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/6c/11/d6/6c11d681-aa3a-d59e-4c2e-f77e181026ab/190295092665.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/levitating/1538003494?i=1538003843&uo=4"
 },
 "Lucid Dreams|Juice WRLD": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/75/9b/af/759baf5f-f3c9-b8c7-d3cf-55a3079914b9/18UMGIM24792.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/lucid-dreams/1447177477?i=1447177630&uo=4"
 },
 "Photograph|Ed Sheeran": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/2d/36/f9/2d36f9a7-2c3e-ce0f-7fb6-036feecb221f/825646974450.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/photograph/1050204616?i=1050204626&uo=4"
 },
 "You Belong With Me|Taylor Swift": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/c3/d0/1c/c3d01c88-73e7-187e-fd62-e1744de979a6/21UMGIM09915.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/you-belong-with-me-taylors-version/1552791073?i=1552791558&uo=4"
 },
 "Lover|Taylor Swift": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/49/3d/ab/493dab54-f920-9043-6181-80993b8116c9/19UMGIM53909.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/lover/1468058165?i=1468058173&uo=4"
 },
 "Shake It Off|Taylor Swift": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/a7/98/d8/a798d867-344d-2bf2-fbfe-d2d1412dcef8/14UMDIM03793.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/shake-it-off/1440933512?i=1440933651&uo=4"
 },
 "Wildest Dreams|Taylor Swift": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/89/4a/4a/894a4ab9-b0b0-9ea5-ca41-8da0b9b79453/14UMDIM03405.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/wildest-dreams/1440935467?i=1440936036&uo=4"
 },
 "Shallow|Lady Gaga, Bradley Cooper": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b1/9f/ef/b19fef51-79de-a940-e8ab-9e4e07b04d96/18UMGIM53752.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/shallow/1434371867?i=1434371887&uo=4"
 },
 "Million Reasons|Lady Gaga": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/d5/02/1c/d5021c56-d7da-b07c-17cd-fe3f120dc3f6/16UMGIM68302.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/million-reasons/1440866256?i=1440866660&uo=4"
 },
 "Always Remember Us This Way|Lady Gaga": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b1/9f/ef/b19fef51-79de-a940-e8ab-9e4e07b04d96/18UMGIM53752.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/always-remember-us-this-way/1434371867?i=1434372043&uo=4"
 },
 "Thinking Out Loud|Ed Sheeran": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/2d/36/f9/2d36f9a7-2c3e-ce0f-7fb6-036feecb221f/825646974450.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/thinking-out-loud/1050204616?i=1050204631&uo=4"
 },
 "The A Team|Ed Sheeran": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Features115/v4/65/fb/84/65fb8432-f539-d67d-0670-b1358d16e5af/contsched.zkbwdtfj.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/the-a-team/448213992?i=448213995&uo=4"
 },
 "Galway Girl|Ed Sheeran": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/15/e6/e8/15e6e8a4-4190-6a8b-86c3-ab4a51b88288/190295851286.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/galway-girl/1193701079?i=1193701436&uo=4"
 },
 "Drop It Like It's Hot|Snoop Dogg ft. Pharrell": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a3/75/27/a3752707-e88a-cf93-423f-c6134156962a/00075021034518.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/drop-it-like-its-hot-feat-pharrell-williams/1443395920?i=1443396469&uo=4"
 },
 "Gin and Juice|Snoop Dogg": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/59/5c/49/595c49ca-20af-1a27-3716-fe1fe481c45e/617513535860_cover.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/gin-and-juice/1683195625?i=1683195628&uo=4"
 },
 "Young, Wild & Free|Snoop Dogg, Wiz Khalifa ft. Bruno Mars": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/b1/cc/48/b1cc4833-4fcc-7c21-2c31-25c7bd18daa1/mzi.rviprhvj.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/young-wild-free-feat-bruno-mars/480436437?i=480436529&uo=4"
 },
 "Let It Be|The Beatles": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ae/98/4c/ae984c7a-cd06-a7cd-e8bf-32cb15ba698d/00602567705475.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/let-it-be/1441164495?i=1441164738&uo=4"
 },
 "No Woman No Cry|Bob Marley & The Wailers": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/b9/ec/9f/b9ec9f4a-c4f1-5136-7587-86826e28d67b/06UMGIM34964.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/no-woman-no-cry/1440861483?i=1440861526&uo=4"
 },
 "With or Without You|U2": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/9a/48/54/9a485494-b969-aaf4-a916-07452ea69869/06UMGIM72507.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/with-or-without-you/1440729856?i=1440729860&uo=4"
 },
 "Don't Stop Believin'|Journey": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/71/2d/61/712d617d-f4a4-5904-1b11-d4b4b45c47c5/828768588925.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/dont-stop-believin-2024-remaster/169003304?i=169003415&uo=4"
 },
 "I'm Yours|Jason Mraz": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/f8/ac/ec/f8acec21-40e2-fa91-fe61-1be3cbc1467a/mzi.jokpbtnf.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/im-yours/277635758?i=277635828&uo=4"
 },
 "Despacito|Luis Fonsi ft. Daddy Yankee": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/e2/ef/f0/e2eff0bc-c51d-7de5-9280-6891ddcee71b/18UMGIM85289.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/despacito/1447401519?i=1447401620&uo=4"
 },
 "Someone Like You|Adele": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/eb/ca/25/ebca2596-cd1e-b295-91a3-771c868d0a79/191404113868.png/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/someone-like-you/1544491232?i=1544491998&uo=4"
 },
 "Let Her Go|Passenger": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/9b/7e/28/9b7e2896-e049-1663-6791-e0111690ffc1/067003051361.png/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/let-her-go/1623014082?i=1623014090&uo=4"
 },
 "Stand By Me|Ben E. King": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/46/75/80/467580f9-1f8d-5c80-ac48-34e0f1a56816/081227297060.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/stand-by-me/738196400?i=738196409&uo=4"
 },
 "A Horse With No Name|America": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/20/c6/c4/20c6c488-4791-6c15-323f-e7ea79a01f31/mzi.dbcrqaoq.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/a-horse-with-no-name/301027593?i=301027918&uo=4"
 },
 "Knockin' on Heaven's Door|Bob Dylan": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/7e/06/12/7e06123a-c3af-75cf-c611-94334cb0bf20/886444247238.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/knockin-on-heavens-door/717157086?i=717157149&uo=4"
 },
 "Wonderwall|Oasis": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/04/92/e0/0492e08b-cbcc-9969-9ad6-8f5a0888068c/5051961007107.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/wonderwall/1517447039?i=1517447333&uo=4"
 },
 "Love Yourself|Justin Bieber": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/75/11/84/751184b0-77df-1eff-bb20-dac03247425d/15UMGIM59808.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/love-yourself/1440829460?i=1440829613&uo=4"
 },
 "Count on Me|Bruno Mars": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/52/b1/45/52b1452b-229e-78db-231b-7b43fa0077cc/075679956491.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/count-on-me/576654788?i=576655102&uo=4"
 },
 "Zombie|The Cranberries": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/a3/77/a3/a377a309-8e52-f787-2250-2b34d320bf7b/25UMGIM64146.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/zombie-2025-remastered/1828830621?i=1828830887&uo=4"
 },
 "Hey Soul Sister|Train": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/fa/e8/28/fae8283a-ad10-a642-1d41-a4b3402da4ba/884977817027.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/hey-soul-sister/425320463?i=425320500&uo=4"
 },
 "Viva La Vida|Coldplay": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/52/aa/85/52aa851f-15b7-6322-f91f-df84b15b7b19/190295978044.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/viva-la-vida/1122773394?i=1122773680&uo=4"
 },
 "Let It Go|Idina Menzel (Frozen)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/e7/ed/8a/e7ed8a2c-4835-e4dc-efec-5e81abd6c241/13DMGIM04438.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/let-it-go/1440626755?i=1440626764&uo=4"
 },
 "Budapest|George Ezra": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b4/3b/5d/b43b5dcf-b2b5-0cad-3512-eba02c37500a/886445001372.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/budapest/947999961?i=947999963&uo=4"
 },
 "Sweet Home Alabama|Lynyrd Skynyrd": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/cc/ff/39/ccff392e-ec9d-1ffd-6c1b-d21978bca939/06UMGIM02061.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/sweet-home-alabama/1413948379?i=1413948381&uo=4"
 },
 "Wonderful Tonight|Eric Clapton": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e6/8b/8e/e68b8eb1-ddce-3332-4e66-5a15ccc04d6f/00600753407301.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/wonderful-tonight/1440782705?i=1440783103&uo=4"
 },
 "Over the Rainbow|Israel Kamakawiwo'ole": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/e1/48/6d/e1486d07-6c2a-11df-977c-87e1e27f660e/761268591227.png/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/over-the-rainbow/1296697429?i=1296697430&uo=4"
 },
 "Chasing Cars|Snow Patrol": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/c4/25/bf/c425bf7c-f3d8-6baf-7397-40868971f77f/06UMGIM43473.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/chasing-cars/1440758222?i=1440758864&uo=4"
 },
 "Happy|Pharrell Williams": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/76/ff/5e/76ff5ee0-7ab4-2ac2-2598-486a9ccc06e1/886444516877.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/happy-from-despicable-me-2/863835302?i=863835363&uo=4"
 },
 "Banana Pancakes|Jack Johnson": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/44/06/fd/4406fdc0-aab5-e300-82ba-3e5fe81a68a7/00602537868858.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/banana-pancakes/1440857781?i=1440857795&uo=4"
 },
 "Can You Feel the Love Tonight|Elton John (The Lion King)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/ce/80/89/ce808921-d594-fa7f-03e8-adcc92a69de8/06PNDIM00020.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/can-you-feel-the-love-tonight/1445732923?i=1445733073&uo=4"
 },
 "Sweet Caroline|Neil Diamond": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/11/5a/12/115a123b-d3b6-b661-e2a3-88d6e137e25a/17UMGIM03521.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/sweet-caroline/1422721391?i=1422721989&uo=4"
 },
 "Livin' on a Prayer|Bon Jovi": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/40/16/3e/40163e24-6985-b785-d4ea-cbae07d74812/06UMGIM05422.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/livin-on-a-prayer/1422954626?i=1422955211&uo=4"
 },
 "I Will Survive|Gloria Gaynor": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/33/12/df/3312dfbf-2cd2-e149-1ccb-9688e2a60980/00731454913720.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/i-will-survive/1443818103?i=1443818368&uo=4"
 },
 "Mr. Brightside|The Killers": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/11/64/9c/11649c80-2066-dba8-77a9-df7eecae26c1/17UM1IM06937.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/mr-brightside/1440891166?i=1440891171&uo=4"
 },
 "Dancing Queen|ABBA": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/60/f8/a6/60f8a6bc-e875-238d-f2f8-f34a6034e6d2/14UMGIM07615.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/dancing-queen/1422648512?i=1422648513&uo=4"
 },
 "Summer Nights|John Travolta, Olivia Newton-John (Grease)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/25/d5/dc/25d5dc67-bf45-6e42-510e-bcf6bcee1cda/00602547377951.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/summer-nights/1440844625?i=1440844694&uo=4"
 },
 "Africa|Toto": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/69/ce/d2/69ced240-07a7-2a04-bbab-2afbacf30809/074643772822.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/africa/185716551?i=185717604&uo=4"
 },
 "Bohemian Rhapsody|Queen": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/8b/0a/ea/8b0aea60-6f4a-195b-5958-cdf459c2333b/602527644271.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/bohemian-rhapsody/6781024026?i=6781024437&uo=4"
 },
 "Autumn Leaves|Joseph Kosma (jazz standard)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music/20/bd/2e/mzi.fkokxgso.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/autumn-leaves/252676701?i=252676716&uo=4"
 },
 "All the Things You Are|Jerome Kern (jazz standard)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music/a8/ea/85/mzi.iqthihrb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/all-the-things-you-are-from-the-show-very-warm-for-may-1939/203519168?i=203519627&uo=4"
 },
 "Blue Bossa|Kenny Dorham (jazz standard)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/34/30/8c/34308c72-7054-623d-423c-194b20d64c0c/20CRGIM23233.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/blue-friday/1570360115?i=1570360423&uo=4"
 },
 "Misty|Erroll Garner (jazz standard)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/0f/f7/92/0ff792e5-9309-6684-f8c5-06d92bb6ed56/00042283491021.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/misty/1443144342?i=1443144347&uo=4"
 },
 "Take the A Train|Billy Strayhorn (jazz standard)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ce/3e/c4/ce3ec44d-cc48-6b2b-f2c2-e2750029f99f/19UMGIM06117.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/take-the-a-train/1461274653?i=1461275580&uo=4"
 },
 "So What|Miles Davis (Kind of Blue)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music/7f/9f/d6/mzi.vtnaewef.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/so-what/268443092?i=268443097&uo=4"
 },
 "Blue Monk|Thelonious Monk": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2d/f2/81/2df2813f-bcb8-5a7f-0959-e201a580ca08/074645358123.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/blue-monk/192797451?i=192798246&uo=4"
 },
 "Almost Blue|Elvis Costello (famously covered by Chet Baker)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/2d/7b/69/2d7b69ea-4eb1-3461-9b73-b4ec2a58729c/00602547382122.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/almost-blue/1440836169?i=1440836330&uo=4"
 },
 "When I Was Your Man|Bruno Mars": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e0/a4/7c/e0a47c6f-005a-9f9f-ce29-8e858e2bcfcb/075679957283.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/when-i-was-your-man/573962245?i=573962555&uo=4"
 },
 "Break My Heart Again|FINNEAS": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/f1/8f/b9/f18fb977-e326-dbc9-1416-69bb3a754d0c/5056167126287_Cover.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/break-my-heart-again/1720958343?i=1720958799&uo=4"
 },
 "Can't Help Falling in Love|Elvis Presley": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/dc/79/4c/dc794ce3-b5e3-5cbe-ccf8-c10e695a38e8/886445009798.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/cant-help-falling-in-love/949550016?i=949550091&uo=4"
 },
 "Say You Won't Let Go|James Arthur": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/9c/c2/89/9cc289cb-66fe-a754-8ec7-859d76d65c55/886445946789.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/say-you-wont-let-go/1147252339?i=1147252591&uo=4"
 },
 "Die for You|The Weeknd": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e2/61/f8/e261f8c1-73db-9a7a-c89e-1068f19970e0/16UMGIM67863.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/die-for-you/1440871397?i=1440872304&uo=4"
 },
 "All of Me|John Legend": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/22/71/b9/2271b906-85b3-06ee-e611-489b91df0b73/886444160742.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/all-of-me/1441844369?i=1441844542&uo=4"
 },
 "Just the Way You Are|Bruno Mars": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/98/ae/c2/98aec2e1-3be4-0311-1b44-69348fc87abb/075679956484.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/just-the-way-you-are/576670451?i=576670459&uo=4"
 },
 "November Rain|Guns N' Roses": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/6a/e2/1f/6ae21fa9-c897-3be1-2967-50eefae22b93/06UMGIM05041.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/november-rain/1440896026?i=1440896193&uo=4"
 },
 "Sweet Child O' Mine|Guns N' Roses": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/56/47/b7/5647b700-6b9d-9e72-ec9f-51140b6d4492/00602567673781.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/sweet-child-o-mine/1377826053?i=1377826892&uo=4"
 },
 "Hotel California|Eagles": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/88/16/2c/88162c3d-46db-8321-61f3-3a47404cfe76/075596050920.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/hotel-california/635770200?i=635770202&uo=4"
 },
 "Summer of '69|Bryan Adams": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/e4/9b/c2/e49bc283-607b-9f0b-d7d4-adaba6cd3ff3/14UMGIM34434.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/summer-of-69/1440823482?i=1440823965&uo=4"
 },
 "Make You Feel My Love|Adele (originally Bob Dylan)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/93/3b/dd/933bddde-bd73-0fd2-70f5-f4cf683c34f7/191404093863.png/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/make-you-feel-my-love/1545382283?i=1545382976&uo=4"
 },
 "Set Fire to the Rain|Adele": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/eb/ca/25/ebca2596-cd1e-b295-91a3-771c868d0a79/191404113868.png/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/set-fire-to-the-rain/1544491232?i=1544491988&uo=4"
 },
 "Somebody's Me|Enrique Iglesias": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/3b/78/c0/3b78c025-ffb2-2eeb-0009-5f232ec635b5/08UMGIM24490.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/somebodys-me/1440800394?i=1440800893&uo=4"
 },
 "Still D.R.E.|Dr. Dre ft. Snoop Dogg": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/27/6b/4c/276b4c69-99cb-6209-2fd8-3edd17ccfd06/00602517641228.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/still-d-r-e-feat-snoop-dogg/1444156266?i=1444156738&uo=4"
 },
 "25 Minutes|Michael Learns to Rock": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/11/a7/de/11a7de77-7395-1758-970f-2ad0008ae6e4/842474180686.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/25-minutes/1394059369?i=1394059371&uo=4"
 },
 "Someday|Michael Learns to Rock": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/2d/da/f0/2ddaf01e-510e-2dd0-35b8-ee2a1856f674/193428660915.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/the-fisherman/1453886907?i=1453886917&uo=4"
 },
 "My Love Mine All Mine|Mitski": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/8f/4b/40/8f4b4044-d02b-dc25-7d01-7d9d225fdce4/40240.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/my-love-mine-all-mine/1697335341?i=1697335814&uo=4"
 },
 "Heart and Soul|Hoagy Carmichael & Frank Loesser (1938)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music2/v4/89/fd/69/89fd69a4-1ca0-0761-8378-7945d3877ef2/Hoagy_Carmichael_Frank_Loesser_-_Heart_And_Soul.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/heart-and-soul-remastered/615210235?i=615210241&uo=4"
 },
 "Hallelujah|Leonard Cohen": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/b6/d8/5d/b6d85d2e-537e-5a8f-793f-78763de08dab/mzi.ppysthnn.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/hallelujah/192677178?i=192678693&uo=4"
 },
 "Imagine|John Lennon": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/21/e3/b0/21e3b048-c917-92c4-bd7d-ace44797b388/13UABIM52808.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/imagine/1440853752?i=1440853776&uo=4"
 },
 "Twinkle Twinkle Little Star|Traditional (French melody, 1761)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/89/c7/ec/89c7eccf-9ff0-882b-4bb9-13b5ea6c3715/196292472547.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/twinkle-twinkle-little-star/1589536566?i=1589536721&uo=4"
 },
 "Brown Eyed Girl|Van Morrison": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/dd/0e/bc/dd0ebcee-9d50-fe99-4ef8-c0fb79932511/886445621334_Cover.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/brown-eyed-girl/1838782090?i=1838782096&uo=4"
 },
 "Three Little Birds|Bob Marley & The Wailers": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/3c/c2/0d/3cc20dcc-8f4e-f060-36dd-7de52a7ec8fe/12UMGIM14712.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/three-little-birds/1469575763?i=1469575900&uo=4"
 },
 "Hey Jude|The Beatles": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/a6/8b/65/a68b657c-cac6-68e6-3bde-b79d58fbc795/18UMGIM30762.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/hey-jude/1441133100?i=1441133277&uo=4"
 },
 "Take Me Home, Country Roads|John Denver": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/52/ed/f3/52edf3b6-5b73-c52d-e3f6-4473412eec7c/886443406193.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/take-me-home-country-roads-original-version/511074105?i=511074294&uo=4"
 },
 "Clocks|Coldplay": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b9/b4/2a/b9b42ad1-1e25-5096-da43-497a247e69a3/190295978051.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/clocks/1122775993?i=1122776156&uo=4"
 },
 "Piano Man|Billy Joel": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Features125/v4/67/f9/8d/67f98d03-7896-153f-4965-a92458c06965/dj.aiuntmgo.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/piano-man/158617297?i=158617575&uo=4"
 },
 "Hello|Adele": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/08/8c/24/088c2405-2e33-801b-5c38-e967f2c01e69/191404113974.png/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/hello/1544494115?i=1544494392&uo=4"
 },
 "Counting Stars|OneRepublic": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/25/46/a7/2546a71a-b2bb-b4c9-4c52-a4daa3ae23ca/13UMGIM15076.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/counting-stars/1471704173?i=1471704175&uo=4"
 },
 "Comptine d'un autre été|Yann Tiersen (Amélie, 2001)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/ce/62/37/ce6237a2-ac50-54c9-cb9c-caa8132e8425/724596992258.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/comptine-dun-autre-%C3%A9t%C3%A9-lapr%C3%A8s-midi-portrait-version/1482690444?i=1482690858&uo=4"
 },
 "River Flows in You|Yiruma (2001)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5f/f4/9b/5ff49b8c-d0bb-3748-14f4-131edfb332ce/first_love_3000.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/river-flows-in-you/1436677753?i=1436677761&uo=4"
 },
 "Radioactive|Imagine Dragons": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/1f/fa/09/1ffa092f-f52f-4a66-7d10-4cc5982dc747/12UMGIM46901.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/radioactive/1440873107?i=1440873126&uo=4"
 },
 "Billie Jean|Michael Jackson": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/4f/fd/324ffda2-9e51-8f6a-0c2d-c6fd2b41ac55/074643811224.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/billie-jean/269572838?i=269573364&uo=4"
 },
 "Sweet Dreams (Are Made of This)|Eurythmics": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/f2/4c/c2/f24cc223-f889-c8a3-ebbc-8ce458438580/mzi.zbvljpxb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/sweet-dreams-are-made-of-this/255965840?i=255966421&uo=4"
 },
 "Take Five|Paul Desmond — Dave Brubeck Quartet (1959)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music/ea/fc/d8/mzi.riefxbnp.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/take-five/158587742?i=158588073&uo=4"
 },
 "All of Me (jazz standard)|Gerald Marks & Seymour Simons (1931)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music/e7/22/0c/mzi.wdyekwnt.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/all-of-me/401821343?i=401822209&uo=4"
 },
 "Summertime|George Gershwin (Porgy and Bess, 1935)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music/bc/1d/7e/mzi.inpxqryd.tif/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/summertime/433028110?i=433028204&uo=4"
 },
 "Satin Doll|Duke Ellington & Billy Strayhorn (1953)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music7/v4/c2/e1/c6/c2e1c68b-7fc7-93eb-acdd-f9017e8bb558/dj.qjkmnayr.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/satin-doll/192990980?i=192991290&uo=4"
 },
 "Cantaloupe Island|Herbie Hancock (1964)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/54/49/9d/54499dbd-8b9c-4081-7f53-23e533d8be3d/00602537465316.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/cantaloupe-island/1443829596?i=1443829786&uo=4"
 },
 "Gymnopédie No. 1|Erik Satie (1888)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/fd/fe/23/fdfe23c0-ed10-4485-a8e1-702a99a8336c/859712317261_cover.tif/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/gymnopedie-no-1/847714522?i=847718927&uo=4"
 },
 "The Blue Danube (waltz)|Johann Strauss II (1866)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music/f2/38/72/mzi.myrplddn.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/blue-danube/128820955?i=128820971&uo=4"
 },
 "Les Champs-Elysées|Joe Dassin": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/b0/49/34/b0493458-4f94-3848-05e8-ed69f560d59a/mzi.wpxhivwn.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/les-champs-%C3%A9lys%C3%A9es/311331439?i=311331447&uo=4"
 },
 "Je veux|Zaz": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a4/9c/e3/a49ce3a9-82c4-8bdf-9e9b-ba0805f36cb4/190295825522.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/je-veux-sur-la-route-live-2015-japan-version/1225685331?i=1225685657&uo=4"
 },
 "Papaoutai|Stromae": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/df/4e/f8/df4ef860-fa6c-d442-a2e3-47fcd35cc940/13UMGIM59162.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/papaoutai/1445165976?i=1445166042&uo=4"
 },
 "Non, je ne regrette rien|Édith Piaf": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/17/f7/88/17f78858-8608-12fe-8eec-04629b5fdd0d/0724358498554_1440x1440_304dpi.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/non-je-ne-regrette-rien-live/691262003?i=691262167&uo=4"
 },
 "La Bamba|Ritchie Valens": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/7b/e3/aa/7be3aa70-5cbe-26ce-b368-363d1cb6ae5e/mzi.gninxwgv.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/la-bamba/118143034?i=118142371&uo=4"
 },
 "Bailando|Enrique Iglesias ft. Descemer Bueno & Gente de Zona": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/c7/18/3e/c7183ef7-49f1-8941-03cf-ad17ca8b97ea/00602537854097.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/bailando-english-version-feat-sean-paul-descemer-bueno/1440819652?i=1440819669&uo=4"
 },
 "Vivir Mi Vida|Marc Anthony": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/f7/24/ce/f724ce48-4d0d-0cbc-3493-3d935142e5e6/886443947238.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/vivir-mi-vida/668743163?i=668743167&uo=4"
 },
 "Mas Que Nada|Jorge Ben": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2c/03/c9/2c03c9cb-857e-2f47-015e-66ed4f691473/10UMGIM02865.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/mas-que-nada-com-mais-swing/1444084628?i=1444084755&uo=4"
 },
 "Ai Se Eu Te Pego|Michel Teló": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/57/98/a5/5798a518-210c-055b-7cf8-e3341b5f9a33/194491162078.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/ai-se-eu-te-pego/1475773466?i=1475774671&uo=4"
 },
 "Trem-Bala|Ana Vilela": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ce/cd/6f/cecd6ffb-ff26-c1cb-851d-8d4b5738d344/7891430453329.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/trem-bala/1294932180?i=1294932350&uo=4"
 },
 "Tempo Perdido|Legião Urbana": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/da/72/ed/da72edf4-27c8-2d20-a870-3259f853a866/13UABIM70454.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/tempo-perdido/713514746?i=713514810&uo=4"
 },
 "Evidências|Chitãozinho & Xororó": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f4/26/e2/f426e2a3-b08b-3017-7c8c-caa153f768a3/cover.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/evid%C3%AAncias-ao-vivo/1582856679?i=1582858367&uo=4"
 },
 "Nel blu, dipinto di blu (Volare)|Domenico Modugno": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/0d/d4/4d/0dd44da1-109c-bc58-b00f-fcd88f0fe6f7/SPS0435.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/nel-blu-dipinto-di-blu-volar%C3%A9/1687594389?i=1687594391&uo=4"
 },
 "L'Italiano|Toto Cutugno": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/09/12/46/091246d2-70dc-bf5a-e652-56dd02a23b8f/8034125842735.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/litaliano/1329256164?i=1329256166&uo=4"
 },
 "Felicità|Al Bano & Romina Power": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music4/v4/ce/42/6c/ce426c6e-d493-e012-ece7-5244b5f1aef5/886444261487.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/felicit%C3%A0/818784211?i=818784240&uo=4"
 },
 "Sarà perché ti amo|Ricchi e Poveri": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music/c6/df/9d/mzi.ngbmjcuk.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/sar%C3%A0-perch%C3%A9-ti-amo/252058348?i=252058375&uo=4"
 },
 "99 Luftballons|Nena": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/05/ab/e0/05abe006-c717-5db3-db84-b3179f0af8bf/4099964122190.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/99-luftballons-remastered-2024/1765320021?i=1765320242&uo=4"
 },
 "Atemlos durch die Nacht|Helene Fischer": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/51/dd/a6/51dda668-7c1a-80b7-f139-7cde47dcc992/13UAEIM18097.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/atemlos-durch-die-nacht-bassflow-alternative-remake-edit/1444888967?i=1444889038&uo=4"
 },
 "Tage wie diese|Die Toten Hosen": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Features124/v4/25/4e/76/254e7685-d53b-a598-5c0e-abdd3d1eb6ed/dj.pvmwgmbl.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/tage-wie-diese/512312997?i=512313000&uo=4"
 },
 "Tum Hi Ho|Arijit Singh (music: Mithoon)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/bb/23/ee/bb23eeed-0c35-4f1d-2b11-485622777ae4/8902894353007_cover.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/tum-hi-ho/1073359412?i=1073359419&uo=4"
 },
 "Channa Mereya|Arijit Singh (music: Pritam)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/b7/b8/0f/b7b80fc9-e4ae-6643-da95-d90a37eea000/886449410040.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/channa-mereya-lofi-flip/1574511918?i=1574511932&uo=4"
 },
 "Kesariya|Arijit Singh (music: Pritam)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/26/6f/30/266f30f6-9502-24d9-60c7-eaae6b835058/196589413611.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/kesariya-lofi-flip/1640709566?i=1640709568&uo=4"
 },
 "Agar Tum Saath Ho|Alka Yagnik & Arijit Singh (music: A. R. Rahman)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/76/b5/2a/76b52ae5-42ae-421b-2b38-73fab3d6d50d/8903431719201_cover.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/agar-tum-saath-ho-from-tamasha/1459871024?i=1459871029&uo=4"
 },
 "Pal Pal Dil Ke Paas|Kishore Kumar (music: Kalyanji-Anandji)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/18/2c/fd/182cfdb1-c27a-8d41-d58a-fca4ff017c69/06UMGIM37432.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/pal-pal-dil-ke-paas/1443458331?i=1443458534&uo=4"
 },
 "Lemon|Kenshi Yonezu": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/86/b0/9d/86b09d63-367a-563a-1e24-d5d62c220ac8/jacket_SRCL09749B00Z_550.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/lemon/1537460610?i=1537460612&uo=4"
 },
 "Marigold|Aimyon": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/67/34/90/67349087-0609-2be4-4963-fd4682ae8c46/190295600341.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/marigold/1402042886?i=1402042897&uo=4"
 },
 "Spring Day|BTS": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/ce/fb/eb/cefbebd4-d53b-8d6c-33cf-2ee55408bd79/8804775077494_Cover.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/spring-day/1596528839?i=1596529381&uo=4"
 },
 "Love Scenario|iKON": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/66/b5/58/66b55853-9c6f-2faa-8193-d646eaa9c61c/iKON_cover.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/love-scenario/1339623377?i=1339623399&uo=4"
 },
 "Through the Night|IU": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/94/ec/24/94ec2442-5add-d1ca-5eba-37f1298abfbc/cover_KM0005225_1.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/through-the-night/1229073300?i=1229073406&uo=4"
 },
 "Stay With Me|Chanyeol & Punch": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a9/0e/cf/a90ecfd1-0fe4-0fc9-10ab-a6ee62e127ba/8809534460814_Cover.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/stay-with-me/1569279826?i=1569279827&uo=4"
 },
 "Eight|IU feat. SUGA": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/6b/65/4d/6b654d71-ed85-c6c4-8fe2-ef3d8e9f2ee0/cover_-.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/eight-feat-suga/1511885175?i=1511885178&uo=4"
 },
 "Tián Mì Mì|Teresa Teng": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/bf/b2/fe/bfb2febf-d4c8-4a15-5c7a-9e3124c89167/10UMGIM27413.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/%E4%BD%86%E9%A1%98%E4%BA%BA%E9%95%B7%E4%B9%85/1440659594?i=1440660425&uo=4"
 },
 "Sunny Day (Qíng Tiān)|Jay Chou": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/2a/cd/8f/2acd8fc7-1aa2-41fe-c5a8-55b421c6aa1c/001NPMUu1BjDQU_rfiCLeivpvJaz4AJ9m6M5Y1.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/%E7%AE%97%E4%BB%80%E4%B9%88%E7%94%B7%E4%BA%BA-live/1601722332?i=1601722355&uo=4"
 },
 "Fairy Tale (Tóng Huà)|Michael Wong": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/e8/d1/46/e8d146b6-de00-8135-9eca-e9123635a4a9/mzm.vcrwixfk.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/fairy-tale/165274168?i=165274273&uo=4"
 },
 "Tamally Maak|Amr Diab": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music69/v4/31/4d/d4/314dd42d-3246-e7a3-107a-3d521fa9a7e2/dj.iiicnpub.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/tamly-maak/880940009?i=880940097&uo=4"
 },
 "Habibi Ya Nour El Ein|Amr Diab": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music4/v4/50/3e/0a/503e0ae3-0dcd-e05e-e43b-aa364db737bc/9339718107390.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/habibi/688050536?i=688050718&uo=4"
 },
 "Ya Lili|Balti feat. Hamouda": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ba/ce/7f/bace7f85-2439-190a-cfb5-323e15b427d6/3615932032363_Cover.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/ya-lili-feat-hamouda/1736603758?i=1736603760&uo=4"
 },
 "Ya Rayah|Dahmane El Harrachi (famous cover by Rachid Taha)": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/cf/8a/82/cf8a828d-cb32-2bae-e622-2fac0714cc11/3663729038159_cover.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/ya-rayah/1261068535?i=1261069348&uo=4"
 },
 "While My Guitar Gently Weeps|The Beatles": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fa/5b/89/fa5b898d-bad6-e053-4195-260e5c74f2bb/00602567725466.rgb.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/while-my-guitar-gently-weeps/1441133180?i=1441133644&uo=4"
 },
 "Comfortably Numb|Pink Floyd": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/3e/17/ec/3e17ec6d-f980-c64f-19e0-a6fd8bbf0c10/886445635850.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/comfortably-numb/1065975633?i=1065976170&uo=4"
 },
 "Stairway to Heaven|Led Zeppelin": {
  "img": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5c/15/9b/5c159b27-95ca-b9a7-84e3-28e795fffd39/dj.kvkrpptq.jpg/400x400bb.jpg",
  "url": "https://music.apple.com/us/album/stairway-to-heaven/580708175?i=580708180&uo=4"
 }
};
export { SONG_ART };
