// 2008/7/3 Scripted by K-Factory@migiwa
// 2009/1/27 Modified by K-Factory@migiwa

// *****************************************************************************
str_CenterT = 'Tie!';
str_CenterB = 'Undo last choice';

str_ImgPath = 'img/';
// 0:順番に　1:昔の
var bln_ResultMode = 1;
// 0:テキスト　1:イラスト　2:テキスト＋イラスト
var int_ResultImg = 2;
// イラスト表示時、何位までをイラスト表示にするか。
var int_ResultRank = 3;

// ソート用のテーブルを
// 0:残す　1:消す
var bln_ResultStyle = 0;

// ソート進捗バーの表示
// 0:表示　1:消す
var bln_ProgessBar = 1;

// Maximum number of result rows before being broken off into another table.
var maxRows = 35;

// * タイトル情報（編集可能。最後の行に”,”を付けないようにしてください）
var int_Colspan = 3;
var ary_TitleData = [
  "Message (2010)",
  "Friends (2011)",
  "My Generation (2012)",
  "Kizuna \"Bond\" (2013)",
  "Kimi ni Todoke \"Reaching You\" (2014)",
  "Kirameki no Kakera \"Pieces of Sparkles\" (2015)",
  "Yakusoku \"Promise\" (2016)",
  "My Road (2017)",
  "Life Iro Asenai Hibi \"Unfading Days of Life\" (2018)",
  "Story (2019)",
  "Thank You (2020)",
  "Others",
];

// * キャラクター情報（編集可能。最後の行に”,”を付けないようにしてください）
// * 使用フラグ（0にするとソートに入りません）, 
//   "タイトルID"（先頭から0, 1, 2...）, 
//   {タイトル別参加フラグ}（1を入れると対象タイトルに入ります）,
//   "キャラクター名", "画像（空白の場合、キャラクター名が使用されます）"
//                                      [1,2,3,4,5,6,7,8,9,
var ary_CharacterData = [
[1, "Fly Away",                            [1,0,0,0,0,0,0,0,0,0,0,0], "sgsong/2010 Message.jpg"],
[1, "Hello! Ivy",                          [1,0,0,0,0,0,0,0,0,0,0,0], "sgsong/2011 Hello! IVY.jpg"],
[1, "Chime",                               [1,0,0,0,0,0,0,0,0,0,0,0], "sgsong/2010 Message.jpg"],
[1, "Happy Birthday",                       [1,0,0,0,0,0,0,0,0,0,0,0], "sgsong/2010 Message.jpg"],
[1, "Princess ☆ à la Mode",                [1,0,0,0,0,0,0,0,0,0,0,0], "sgsong/2010 Message.jpg"],
[1, "Brand New Day",                        [1,0,0,0,0,0,0,0,0,0,0,0], "sgsong/2010 Message.jpg"],
[1, "Dear Mr. Socrates",                    [1,0,0,0,0,0,0,0,0,0,0,0], "sgsong/2010 Dear Mr. Socrates.jpg"],
[1, "Medaka no Kyōdai",                     [1,0,0,0,0,0,0,0,0,0,0,0], "sgsong/2010 Message.jpg"],
[1, "Doki Doki ☆ Morning",                 [1,0,0,0,0,0,0,0,0,0,0,0], "sgsong/2010 Doki Doki Morning.jpg"],
[1, "Yume ni Mukatte",                      [1,0,0,0,0,0,0,0,0,0,0,0], "sgsong/2011 Yume ni Mukatte.jpg"],
[1, "Message",                              [1,0,0,0,0,0,0,0,0,0,0,0], "sgsong/2010 Message.jpg"],
[1, "Verishuvi",                            [0,1,0,0,0,0,0,0,0,0,0,0], "sgsong/2011 Verishuvi.jpg"],
[1, "Friends",                              [0,1,0,0,0,0,0,0,0,0,0,0], "sgsong/2011 Friends.jpg"],
[1, "Please! Please! Please!",              [0,1,0,0,0,0,0,0,0,0,0,0], "sgsong/2011 Friends.jpg"],
[1, "Rapikamu",                             [0,1,0,0,0,0,0,0,0,0,0,0], "sgsong/2011 Friends.jpg"],
[1, "Hashire Shōjiki-mono",                 [0,1,0,0,0,0,0,0,0,0,0,0], "sgsong/2011 Friends.jpg"],
[1, "Yokubari Feuille",                     [0,1,0,0,0,0,0,0,0,0,0,0], "sgsong/2011 Friends.jpg"],
[1, "Iine!",                                [0,1,0,0,0,0,0,0,0,0,0,0], "sgsong/2011 Friends.jpg"],
[1, "Otomegokoro",                          [0,1,0,0,0,0,0,0,0,0,0,0], "sgsong/2011 Friends.jpg"],
[1, "Pictogram",                            [0,1,0,0,0,0,0,0,0,0,0,0], "sgsong/2011 Friends.jpg"],
[1, "3.a.m",                                [0,1,0,0,0,0,0,0,0,0,0,0], "sgsong/2011 Friends.jpg"],
[1, "See you...",                           [0,1,0,0,0,0,0,0,0,0,0,0], "sgsong/2011 Friends.jpg"],
[1, "Tabidachi no Hi ni",                   [0,1,0,0,0,0,0,0,0,0,0,0], "sgsong/2011 Tabidachi no Hi.jpg"],
[1, "Wonderful Journey",                    [0,0,1,0,0,0,0,0,0,0,0,0], "sgsong/2012 Wonderful Journey.jpg"],
[1, "Sleep Wonder",                         [0,0,1,0,0,0,0,0,0,0,0,0], "sgsong/2012 My Generation (Album).jpg"],
[1, "Headbangeeeeeerrrrr!!!!!!",            [0,0,1,0,0,0,0,0,0,0,0,0], "sgsong/2012 My Generation (Album).jpg"],
[1, "Miracle ♪ Patiful ♪ Hamburger",        [0,0,1,0,0,0,0,0,0,0,0,0], "sgsong/2012 My Generation (Album).jpg"],
[1, "Suimin Busoku",                        [0,0,1,0,0,0,0,0,0,0,0,0], "sgsong/2012 My Generation (Album).jpg"],
[1, "Scoreboard ni Love ga Aru",            [0,0,1,0,0,0,0,0,0,0,0,0], "sgsong/2012 My Generation (Album).jpg"],
[1, "Science Girl ▽ Silence Boy",           [0,0,1,0,0,0,0,0,0,0,0,0], "sgsong/2012 My Generation (Album).jpg"],
[1, "Delta",                                [0,0,1,0,0,0,0,0,0,0,0,0], "sgsong/2012 My Generation (Album).jpg"],
[1, "Sakura-iro no Avenue",                 [0,0,1,0,0,0,0,0,0,0,0,0], "sgsong/2012 My Generation (Album).jpg"],
[1, "My Graduation Toss",                   [0,0,1,0,0,0,0,0,0,0,0,0], "sgsong/2012 My Graduation Toss.jpg"],
[1, "Marshmallow-iro no Kimi to",           [0,0,1,0,0,0,0,0,0,0,0,0], "sgsong/2012 My Generation (Album).jpg"],
[1, "Mezase! Super Lady",                   [0,0,0,1,0,0,0,0,0,0,0,0], "sgsong/2013 Kizuna (Album).jpg"],
[1, "Makeruna! Seishun Hizakozō",           [0,0,0,1,0,0,0,0,0,0,0,0], "sgsong/2013 Kizuna (Album).jpg"],
[1, "Hana*Hana",                            [0,0,0,1,0,0,0,0,0,0,0,0], "sgsong/2013 Kizuna (Album).jpg"],
[1, "Ganbare!!",                            [0,0,0,1,0,0,0,0,0,0,0,0], "sgsong/2013 Ganbare.jpg"],
[1, "Shanari Hannari Dorayaki Hime",        [0,0,0,1,0,0,0,0,0,0,0,0], "sgsong/2013 Kizuna (Album).jpg"],
[1, "Welcome to My Computer",               [0,0,0,1,0,0,0,0,0,0,0,0], "sgsong/2013 Kizuna (Album).jpg"],
[1, "Yosōijō no Smash",                     [0,0,0,1,0,0,0,0,0,0,0,0], "sgsong/2013 Kizuna (Album).jpg"],
[1, "I・J・I",                               [0,0,0,1,0,0,0,0,0,0,0,0], "sgsong/2013 Kizuna (Album).jpg"],
[1, "Mikansei Silhouette",                  [0,0,0,1,0,0,0,0,0,0,0,0], "sgsong/2013 Kizuna (Album).jpg"],
[1, "Jump Up",                              [0,0,0,1,0,0,0,0,0,0,0,0], "sgsong/2013 Jump Up.jpg"],
[1, "Animal Rhythm",                        [0,0,0,0,1,0,0,0,0,0,0,0], "sgsong/2014 Kimi ni Todoke (Album).jpg"],
[1, "Heart no Hoshi",                       [0,0,0,0,1,0,0,0,0,0,0,0], "sgsong/2014 Heart no Hoshi.jpg"],
[1, "Spin in the Wind",                     [0,0,0,0,1,0,0,0,0,0,0,0], "sgsong/2014 Kimi ni Todoke (Album).jpg"],
[1, "Tenshi no Akuma",                      [0,0,0,0,1,0,0,0,0,0,0,0], "sgsong/2014 Kimi ni Todoke (Album).jpg"],
[1, "Hirari! Kira Kira ☆ Yami Yami Museum", [0,0,0,0,1,0,0,0,0,0,0,0], "sgsong/2014 Kimi ni Todoke (Album).jpg"],
[1, "Piece de Check",                       [0,0,0,0,1,0,0,0,0,0,0,0], "sgsong/2014 Kimi ni Todoke (Album).jpg"],
[1, "Takaramono",                           [0,0,0,0,1,0,0,0,0,0,0,0], "sgsong/2014 Kimi ni Todoke (Album).jpg"],
[1, "Gokigen! Mr. Tropicalorie",            [0,0,0,0,1,0,0,0,0,0,0,0], "sgsong/2014 Kimi ni Todoke (Album).jpg"],
[1, "Aogeba Tōtoshi",                       [0,0,0,0,1,0,0,0,0,0,0,0], "sgsong/2014 Aogeba Totoshi.jpg"],
[1, "Sayonara, Namida",                     [0,0,0,0,1,0,0,0,0,0,0,0], "sgsong/2014 Kimi ni Todoke (Album).jpg"],
[1, "Kimi ni Todoke",                       [0,0,0,0,1,0,0,0,0,0,0,0], "sgsong/2014 Kimi ni Todoke (Album).jpg"],
[1, "School Days",                          [0,0,0,0,0,1,0,0,0,0,0,0], "sgsong/2015 School Days.jpg"],
[1, "Mathematica!",                         [0,0,0,0,0,1,0,0,0,0,0,0], "sgsong/2015 Mathematica.jpg"],
[1, "Jacapara Goo Goo ♡ Omurice",           [0,0,0,0,0,1,0,0,0,0,0,0], "sgsong/2015 Kirameki no Kakera (Album).jpg"],
[1, "Michishirube",                         [0,0,0,0,0,1,0,0,0,0,0,0], "sgsong/2015 Kirameki no Kakera (Album).jpg"],
[1, "Yakusoku no Mirai",                    [0,0,0,0,0,1,0,0,0,0,0,0], "sgsong/2015 Kirameki no Kakera (Album).jpg"],
[1, "Kirameki no Kakera",                   [0,0,0,0,0,1,0,0,0,0,0,0], "sgsong/2015 Kirameki no Kakera (Album).jpg"],
[1, "Makeruna! Seishun Hizakozō",           [0,0,0,0,0,0,1,0,0,0,0,0], "sgsong/2016 Yakusoku (Album).jpg"],
[1, "Song for Smiling",                     [0,0,0,0,0,0,1,0,0,0,0,0], "sgsong/2016 Yakusoku (Album).jpg"],
[1, "Melodic Solfége",                      [0,0,0,0,0,0,1,0,0,0,0,0], "sgsong/2016 Melodic Solfege.jpg"],
[1, "Dabada ♪ Salad de C'est bon ☆ Avenue", [0,0,0,0,0,0,1,0,0,0,0,0], "sgsong/2016 Yakusoku (Album).jpg"],
[1, "Delta",                                [0,0,0,0,0,0,1,0,0,0,0,0], "sgsong/2016 Yakusoku (Album).jpg"],
[1, "Yubikiri (Pinky Promise)",             [0,0,0,0,0,0,1,0,0,0,0,0], "sgsong/2016 Yakusoku (Album).jpg"],
[1, "Identity",                             [0,0,0,0,0,0,1,0,0,0,0,0], "sgsong/2016 Yakusoku (Album).jpg"],
[1, "Capsule Scope",                        [0,0,0,0,0,0,0,1,0,0,0,0], "sgsong/2017 My Road Album.jpg"],
[1, "Nee (Perfume Cover)",                  [0,0,0,0,0,0,0,1,0,0,0,0], "sgsong/2017 My Road Album.jpg"],
[1, "Futari Kotoba",                        [0,0,0,0,0,0,0,1,0,0,0,0], "sgsong/2017 My Road Album.jpg"],
[1, "Akindo",                               [0,0,0,0,0,0,0,1,0,0,0,0], "sgsong/2017 My Road Album.jpg"],
[1, "Mirai Dokei",                          [0,0,0,0,0,0,0,1,0,0,0,0], "sgsong/2017 My Road Album.jpg"],
[1, "Magic Melody",                         [0,0,0,0,0,0,0,1,0,0,0,0], "sgsong/2017 My Road Album.jpg"],
[1, "My Road",                              [0,0,0,0,0,0,0,1,0,0,0,0], "sgsong/2017 My Road Album.jpg"],
[1, "Gokigen! Mr. Tropicalorie",            [0,0,0,0,0,0,0,0,1,0,0,0], "sgsong/2018 Life Iro Asenai Hibi.jpg"],
[1, "C'est la vie",                         [0,0,0,0,0,0,0,0,1,0,0,0], "sgsong/2018 Life Iro Asenai Hibi.jpg"],
[1, "Clover",                               [0,0,0,0,0,0,0,0,1,0,0,0], "sgsong/2018 Life Iro Asenai Hibi.jpg"],
[1, "Fairy Tale",                           [0,0,0,0,0,0,0,0,1,0,0,0], "sgsong/2018 Life Iro Asenai Hibi.jpg"],
[1, "Carry On",                             [0,0,0,0,0,0,0,0,1,0,0,0], "sgsong/2018 Life Iro Asenai Hibi.jpg"],
[1, "#Aoharu Hakusho",                      [0,0,0,0,0,0,0,0,0,1,0,0], "sgsong/2019 Story Album.jpg"],
[1, "Let's Dance",                          [0,0,0,0,0,0,0,0,0,1,0,0], "sgsong/2019 Story Album.jpg"],
[1, "Merry Xmas to you",                    [0,0,0,0,0,0,0,0,0,1,0,0], "sgsong/2019 Story Album.jpg"],
[1, "Monochrome",                           [0,0,0,0,0,0,0,0,0,1,0,0], "sgsong/2019 Story Album.jpg"],
[1, "Crossroad",                            [0,0,0,0,0,0,0,0,0,1,0,0], "sgsong/2019 Story Album.jpg"],
[1, "The Days ～New Departure～",           [0,0,0,0,0,0,0,0,0,0,1,0], "sgsong/2020 Thank You Album.jpg"],
[1, "Thank You...",                         [0,0,0,0,0,0,0,0,0,0,1,0], "sgsong/2020 Thank You Album.jpg"],
[1, "Ningen tte iina",                      [0,0,0,0,0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Tenshi to Akuma",                      [0,0,0,0,0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Sakura Hyakunin Isshuu",               [0,0,0,0,0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Tabidachi no Hi ni (J-MIX 2011)",      [0,0,0,0,0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Planet Episode 008",                   [0,0,0,0,0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Mezase! Super Lady (2012)",            [0,0,0,0,0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Acha! Cha! Kari",                      [0,0,0,0,0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Pumpkin Parade",                       [0,0,0,0,0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Day Dream Believer",                   [0,0,0,0,0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Yume wo Hodoku Riron",                 [0,0,0,0,0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "IMA ELEMENT",                          [0,0,0,0,0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "My Graduation Toss (Su solo)",         [0,0,0,0,0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Capsule Scope (NHMR ver)",             [0,0,0,0,0,0,0,0,0,0,0,1], "sgsong/sg.png"]
];
