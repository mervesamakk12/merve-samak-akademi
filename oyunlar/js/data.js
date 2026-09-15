/**
 * Renkli Sıframonlar - EBOB & EKOK Dünyası Soru Bankası ve Pedagojik Veriler
 */

const GAME_DATA = {
  // Prime candies available in Level 1
  primes: [2, 3, 5, 7, 11],

  // LEVEL 1: Prime Factor Candy (Asal Şeker Canavarı)
  level1: [
    {
      id: "l1_c1",
      monsterName: "Pembiş",
      monsterColor: "pink",
      target: 36,
      factors: { 2: 2, 3: 2 }, // 2^2 * 3^2
      primesNeeded: [2, 2, 3, 3],
      explanation: "36 = 2² × 3² (2 tane 2 ve 2 tane 3 asal şekeri)"
    },
    {
      id: "l1_c2",
      monsterName: "Mavik",
      monsterColor: "blue",
      target: 48,
      factors: { 2: 4, 3: 1 }, // 2^4 * 3
      primesNeeded: [2, 2, 2, 2, 3],
      explanation: "48 = 2⁴ × 3 (4 tane 2 ve 1 tane 3 asal şekeri)"
    },
    {
      id: "l1_c3",
      monsterName: "Sarıcan",
      monsterColor: "yellow",
      target: 60,
      factors: { 2: 2, 3: 1, 5: 1 }, // 2^2 * 3 * 5
      primesNeeded: [2, 2, 3, 5],
      explanation: "60 = 2² × 3 × 5"
    },
    {
      id: "l1_c4",
      monsterName: "Pembiş",
      monsterColor: "pink",
      target: 72,
      factors: { 2: 3, 3: 2 }, // 2^3 * 3^2
      primesNeeded: [2, 2, 2, 3, 3],
      explanation: "72 = 2³ × 3²"
    },
    {
      id: "l1_c5",
      monsterName: "Yeşilko",
      monsterColor: "green",
      target: 90,
      factors: { 2: 1, 3: 2, 5: 1 }, // 2 * 3^2 * 5
      primesNeeded: [2, 3, 3, 5],
      explanation: "90 = 2 × 3² × 5"
    }
  ],

  // LEVEL 2: Cookie Boxes (Kurabiye Kutulama - EBOB)
  level2: [
    {
      id: "l2_b1",
      title: "Çilekli ve Yaban Mersinli Kurabiyeler",
      item1: { name: "Çilekli Pembe Kurabiye", count: 12, color: "pink", emoji: "🍓" },
      item2: { name: "Yaban Mersinli Mavi Kurabiye", count: 18, color: "blue", emoji: "🫐" },
      story: "Pembiş'in **12 adet Çilekli** ve **18 adet Yaban Mersinli** kurabiyesi var. Kurabiyeleri birbirine karıştırmadan **EŞİT ve EN BÜYÜK** kutulara paketlemek istiyor!",
      questionPrompt: "Bir kutuya EN FAZLA kaç adet kurabiye konulmalıdır? (EBOB)",
      ebobAnswer: 6,
      optionsEbob: [3, 4, 6, 9],
      questionBoxes: "Bu durumda toplam EN AZ kaç kutuya ihtiyaç vardır?",
      totalBoxesAnswer: 5, // 12/6 = 2, 18/6 = 3 -> 5
      optionsBoxes: [4, 5, 6, 8],
      concept: "Büyük miktardaki kurabiyeleri eşit büyüklükte küçük kutulara paylaştırdığımız için EBOB(12, 18) = 6 bulunur. Çilekli için 2 kutu, Mavi için 3 kutu olmak üzere toplam 5 kutu gerekir."
    },
    {
      id: "l2_b2",
      title: "Renkli Şeker Sepetleri",
      item1: { name: "Pembe Kalpli Şeker", count: 16, color: "pink", emoji: "💖" },
      item2: { name: "Mavi Yıldız Şeker", count: 24, color: "blue", emoji: "⭐" },
      story: "Mavik, arkadaşlarına dağıtmak için **16 adet Pembe Kalpli Şeker** ve **24 adet Mavi Yıldız Şeker** hazırladı. Hiç artmayacak şekilde **en büyük eşit paketlere** bölmek istiyor!",
      questionPrompt: "Bir pakete EN FAZLA kaç adet şeker konulabilir? (EBOB)",
      ebobAnswer: 8,
      optionsEbob: [4, 6, 8, 12],
      questionBoxes: "Bu paketleme için toplam EN AZ kaç paket gerekir?",
      totalBoxesAnswer: 5, // 16/8 = 2, 24/8 = 3 -> 5
      optionsBoxes: [3, 4, 5, 7],
      concept: "EBOB(16, 24) = 8 şeker. Pembe için 16 ÷ 8 = 2 paket, Mavi için 24 ÷ 8 = 3 paket $\\rightarrow$ Toplam 5 paket."
    },
    {
      id: "l2_b3",
      title: "Muzlu ve Çilekli Mini Kekler",
      item1: { name: "Pembe Kremalı Kek", count: 20, color: "pink", emoji: "🧁" },
      item2: { name: "Mavi Kremalı Kek", count: 30, color: "blue", emoji: "🎂" },
      story: "Sıframon Partisi için **20 adet Pembe Kek** ve **30 adet Mavi Kek** hazırlandı. Kekler eşit tepsilere ayrılacaktır.",
      questionPrompt: "Bir tepsiye EN FAZLA kaç adet kek sığar? (EBOB)",
      ebobAnswer: 10,
      optionsEbob: [5, 8, 10, 15],
      questionBoxes: "Tüm kekler için toplam EN AZ kaç tepsi gerekir?",
      totalBoxesAnswer: 5, // 20/10 = 2, 30/10 = 3 -> 5
      optionsBoxes: [4, 5, 6, 8],
      concept: "EBOB(20, 30) = 10 kek. Toplam tepsi sayısı = (20 ÷ 10) + (30 ÷ 10) = 2 + 3 = 5 tepsi."
    },
    {
      id: "l2_b4",
      title: "Sürpriz Hediye Kutuları",
      item1: { name: "Pembe Sürpriz", count: 24, color: "pink", emoji: "🎁" },
      item2: { name: "Mavi Sürpriz", count: 36, color: "blue", emoji: "🎈" },
      story: "Festivalde dağıtılmak üzere **24 Pembe Sürpriz** ve **36 Mavi Sürpriz** hediye paketi eşit kutulara yerleştirilecektir.",
      questionPrompt: "Bir hediye kutusuna EN FAZLA kaç sürpriz konulmalıdır? (EBOB)",
      ebobAnswer: 12,
      optionsEbob: [6, 8, 12, 18],
      questionBoxes: "Toplam kaç hediye kutusu hazırlanmış olur?",
      totalBoxesAnswer: 5, // 24/12=2, 36/12=3 -> 5
      optionsBoxes: [4, 5, 6, 9],
      concept: "EBOB(24, 36) = 12 sürpriz. Toplam kutu sayısı = 2 + 3 = 5 kutu."
    }
  ],

  // LEVEL 3: Bubble Hop (Baloncuk Zıplayışı - EKOK)
  level3: [
    {
      id: "l3_h1",
      title: "1. Görev: Pembiş (4) ve Mavik (6)",
      monster1: { name: "Pembiş", color: "pink", step: 4, emoji: "🌸" },
      monster2: { name: "Mavik", color: "blue", step: 6, emoji: "💧" },
      trackMax: 24,
      story: "**Pembiş 4'er 4'er**, **Mavik ise 6'şar 6'şar** baloncuklar üzerinde zıplıyor. İkisi ilk kez **hangi ortak baloncukta** aynı anda buluşurlar?",
      correctEkok: 12,
      options: [8, 10, 12, 18, 24],
      m1Steps: [0, 4, 8, 12, 16, 20, 24],
      m2Steps: [0, 6, 12, 18, 24],
      concept: "Pembiş'in adımları: 4, 8, **12**, 16... Mavik'in adımları: 6, **12**, 18... İlk ortak buluştukları nokta EKOK(4, 6) = 12 numaralı baloncuktur!"
    },
    {
      id: "l3_h2",
      title: "2. Görev: Pembiş (3) ve Sarıcan (5)",
      monster1: { name: "Pembiş", color: "pink", step: 3, emoji: "🌸" },
      monster2: { name: "Sarıcan", color: "yellow", step: 5, emoji: "⭐" },
      trackMax: 30,
      story: "**Pembiş 3'er 3'er**, **Sarıcan ise 5'er 5'er** zıplıyor. Başlangıç çizgisinden sonra ilk kez **kaçıncı baloncukta** karşılaşırlar?",
      correctEkok: 15,
      options: [9, 12, 15, 20, 30],
      m1Steps: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
      m2Steps: [0, 5, 10, 15, 20, 25, 30],
      concept: "3 ve 5 aralarında asal sayılardır. EKOK(3, 5) = 3 × 5 = 15 numaralı baloncukta ilk kez karşılaşırlar."
    },
    {
      id: "l3_h3",
      title: "3. Görev: Pembiş (6) ve Mavik (8)",
      monster1: { name: "Pembiş", color: "pink", step: 6, emoji: "🌸" },
      monster2: { name: "Mavik", color: "blue", step: 8, emoji: "💧" },
      trackMax: 32,
      story: "**Pembiş 6'şar 6'şar**, **Mavik ise 8'er 8'er** zıplayarak nehir boyunca ilerliyor. İlk ortak konaklama yeri neresidir?",
      correctEkok: 24,
      options: [16, 18, 24, 32, 48],
      m1Steps: [0, 6, 12, 18, 24, 30],
      m2Steps: [0, 8, 16, 24, 32],
      concept: "6'nın katları: 6, 12, 18, **24**... 8'in katları: 8, 16, **24**... En küçük ortak kat EKOK(6, 8) = 24'tür."
    },
    {
      id: "l3_h4",
      title: "4. Görev: Pembiş (8) ve Mavik (12)",
      monster1: { name: "Pembiş", color: "pink", step: 8, emoji: "🌸" },
      monster2: { name: "Mavik", color: "blue", step: 12, emoji: "💧" },
      trackMax: 40,
      story: "**Pembiş 8 metre**, **Mavik 12 metre** aralıklarla bayrak dikiyor. İlk kez **kaçıncı metrede** her ikisi de aynı yere bayrak dikmiş olur?",
      correctEkok: 24,
      options: [16, 20, 24, 36, 48],
      m1Steps: [0, 8, 16, 24, 32, 40],
      m2Steps: [0, 12, 24, 36],
      concept: "Bayrakların aynı noktaya gelmesi için her iki mesafenin ortak katı bulunmalıdır: EKOK(8, 12) = 24 metredir."
    }
  ]
};
