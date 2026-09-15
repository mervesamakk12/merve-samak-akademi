/**
 * Sayı Avcısı: Asal Kaçış - Question Bank & Pedagogical Data
 */

const GAME_DATA = {
  primes: [2, 3, 5, 7, 11, 13],

  // LEVEL 1: Prime Factorization Data
  level1: [
    {
      id: "l1_q1",
      target: 72,
      factors: { 2: 3, 3: 2 },
      primesNeeded: [2, 2, 2, 3, 3],
      explanation: "72 = 2³ × 3²"
    },
    {
      id: "l1_q2",
      target: 90,
      factors: { 2: 1, 3: 2, 5: 1 },
      primesNeeded: [2, 3, 3, 5],
      explanation: "90 = 2 × 3² × 5"
    },
    {
      id: "l1_q3",
      target: 180,
      factors: { 2: 2, 3: 2, 5: 1 },
      primesNeeded: [2, 2, 3, 3, 5],
      explanation: "180 = 2² × 3² × 5"
    },
    {
      id: "l1_q4",
      target: 84,
      factors: { 2: 2, 3: 1, 7: 1 },
      primesNeeded: [2, 2, 3, 7],
      explanation: "84 = 2² × 3 × 7"
    },
    {
      id: "l1_q5",
      target: 300,
      factors: { 2: 2, 3: 1, 5: 2 },
      primesNeeded: [2, 2, 3, 5, 5],
      explanation: "300 = 2² × 3 × 5²"
    },
    {
      id: "l1_q6",
      target: 252,
      factors: { 2: 2, 3: 2, 7: 1 },
      primesNeeded: [2, 2, 3, 3, 7],
      explanation: "252 = 2² × 3² × 7"
    }
  ],

  // LEVEL 2: EBOB vs EKOK Strategy & Decision Story Problems
  level2: [
    {
      id: "l2_q1",
      story: "Bir çiftçi, ürettiği **48 kg ceviz** ve **60 kg fındığı** birbirine karıştırmadan, hiç artmayacak şekilde **eşit büyüklükteki en büyük torbalara** paylaştıracaktır. Bir torba kaç kg olmalıdır?",
      correctMethod: "EBOB",
      numbers: [48, 60],
      methodReason: "Büyük miktarlardaki çuvallar daha küçük eşit paketlere bölünmektedir (Bütünden $\\rightarrow$ Parçaya). Bu sebeple En Büyük Ortak Bölen (EBOB) hesaplanmalıdır.",
      questionPrompt: "Bir torbanın ağırlığı en fazla kaç kg olmalıdır?",
      correctAnswer: 12,
      options: [6, 8, 12, 24],
      solutionSteps: [
        "1. Adım: Bütünü parçalara ayırdığımız için EBOB(48, 60) bulunur.",
        "2. Adım: 48 ve 60'ın asal çarpanlar algoritması ile ortak bölenleri: 2 × 2 × 3 = 12.",
        "3. Adım: Bir torba en fazla 12 kg olmalıdır."
      ]
    },
    {
      id: "l2_q2",
      story: "İki uzay keşif fenerinden biri **15 saniyede bir**, diğeri **20 saniyede bir** sinyal göndermektedir. Bu iki fener aynı anda sinyal gönderdikten en az kaç saniye sonra **tekrar birlikte** sinyal gönderir?",
      correctMethod: "EKOK",
      numbers: [15, 20],
      methodReason: "Zaman aralıkları ileriye doğru periyodik olarak birikip ortak bir zamanda buluşmaktadır (Parçadan $\\rightarrow$ Bütüne). Bu sebeple En Küçük Ortak Kat (EKOK) hesaplanmalıdır.",
      questionPrompt: "Fenerler kaç saniye sonra tekrar birlikte sinyal gönderir?",
      correctAnswer: 60,
      options: [30, 45, 60, 120],
      solutionSteps: [
        "1. Adım: Zamanlar ileriye doğru katlanarak ortak anda buluştuğu için EKOK(15, 20) bulunur.",
        "2. Adım: 15 = 3 × 5 ve 20 = 2² × 5 olduğundan EKOK = 2² × 3 × 5 = 60.",
        "3. Adım: 60 saniye sonra tekrar birlikte sinyal gönderirler."
      ]
    },
    {
      id: "l2_q3",
      story: "Kenar uzunlukları **24 metre** ve **36 metre** olan dikdörtgen şeklindeki bir bahçenin köşelerine de dikilmek şartıyla **eşit aralıklarla** aydınlatma direkleri dikilecektir. İki direk arası mesafe en fazla kaç metre olmalıdır?",
      correctMethod: "EBOB",
      numbers: [24, 36],
      methodReason: "Bahçenin kenar uzunlukları eşit parçalara bölünmektedir (Bütünden $\\rightarrow$ Parçaya). Bu sebeple EBOB kullanılır.",
      questionPrompt: "İki direk arasındaki mesafe en fazla kaç metre olmalıdır?",
      correctAnswer: 12,
      options: [4, 6, 12, 18],
      solutionSteps: [
        "1. Adım: Kenarlar eşit mesafelere bölüneceği için EBOB(24, 36) hesaplanır.",
        "2. Adım: 24 ve 36'nın en büyük ortak böleni 12'dir.",
        "3. Adım: İki direk arası mesafe en fazla 12 metre olabilir."
      ]
    },
    {
      id: "l2_q4",
      story: "Boyutları **6 cm** ve **8 cm** olan dikdörtgen biçimindeki nano-çipler yan yana ve alt alta dizilerek **en küçük boyutlu bir kare devre kartı** oluşturulacaktır. Oluşturulacak karenin bir kenar uzunluğu kaç cm olmalıdır?",
      correctMethod: "EKOK",
      numbers: [6, 8],
      methodReason: "Küçük dikdörtgen parçalar bir araya getirilerek daha büyük bir kare oluşturulmaktadır (Parçadan $\\rightarrow$ Bütüne). Bu sebeple EKOK hesaplanmalıdır.",
      questionPrompt: "Oluşturulacak kare devre kartının bir kenarı kaç cm'dir?",
      correctAnswer: 24,
      options: [16, 24, 36, 48],
      solutionSteps: [
        "1. Adım: Küçük parçalar birleştirilip büyük bir kare oluşturulduğu için EKOK(6, 8) bulunur.",
        "2. Adım: 6 ve 8'in en küçük ortak katı 24'tür.",
        "3. Adım: Karenin bir kenarı en az 24 cm olmalıdır."
      ]
    },
    {
      id: "l2_q5",
      story: "Bir depoda bulunan **40 litre zeytinyağı** ve **56 litre ayçiçek yağı**, birbirine karıştırılmadan **eşit hacimli en büyük şişelere** hiç artmayacak şekilde doldurulacaktır. Bu işlem için toplam **en az kaç şişe** gerekir?",
      correctMethod: "EBOB",
      numbers: [40, 56],
      methodReason: "Sıvı miktarları eşit hacimli küçük şişelere paylaştırılmaktadır (Bütünden $\\rightarrow$ Parçaya). Öncelikle bir şişenin hacmini bulmak için EBOB hesaplanır.",
      questionPrompt: "Bu işlem için toplam en az kaç şişe gerekir?",
      correctAnswer: 12,
      options: [8, 12, 14, 16],
      solutionSteps: [
        "1. Adım: Bir şişenin alabileceği en büyük hacim: EBOB(40, 56) = 8 litredir.",
        "2. Adım: Zeytinyağı için gereken şişe: 40 ÷ 8 = 5 adet.",
        "3. Adım: Ayçiçek yağı için gereken şişe: 56 ÷ 8 = 7 adet.",
        "4. Adım: Toplam şişe sayısı: 5 + 7 = 12 adet şişe gerekir."
      ]
    }
  ],

  // LEVEL 3: LGS Yeni Nesil Challenge
  level3: [
    {
      id: "l3_q1",
      title: "Görev 1: Siber Şehir Enerji Hatları",
      diagramType: "solar_poles",
      story: "Siber Şehir ana bulvarında **120 metre** ve **180 metre** uzunluğunda iki doğrusal yol bulunmaktadır. Her iki yolun da **her iki tarafına** başlarına ve sonlarına da gelmek şartıyla **eşit aralıklarla** foton aydınlatma direkleri dikilecektir. Direk sayısının en az olması istendiğine göre toplam kaç aydınlatma direği dikilmelidir?",
      correctAnswer: 14,
      options: [10, 12, 14, 28],
      hints: [
        "💡 İpucu 1 (Yöntem): Direk sayısının EN AZ olması için direkler arasındaki mesafe EN FAZLA olmalıdır. 120 ve 180'in EBOB'unu bulmalısın.",
        "💡 İpucu 2 (Hesaplama): EBOB(120, 180) = 60 m. Yolun başında ve sonunda da direk olacağı için: Aralık Sayısı + 1 formülü kullanılır. Yolun her iki tarafı olduğunu unutma!"
      ],
      solution: {
        method: "EBOB",
        steps: [
          "EBOB(120, 180) = 60 m (Direkler arası en büyük eşit mesafe).",
          "120 m'lik yol için: 120 ÷ 60 = 2 aralık $\\rightarrow$ 2 + 1 = 3 direk. İki taraf için 3 × 2 = 6 direk.",
          "180 m'lik yol için: 180 ÷ 60 = 3 aralık $\\rightarrow$ 3 + 1 = 4 direk. İki taraf için 4 × 2 = 8 direk.",
          "Toplam Direk Sayısı = 6 + 8 = 14 adet."
        ]
      }
    },
    {
      id: "l3_q2",
      title: "Görev 2: Uzay İstasyonu Dişli Mekanizması",
      diagramType: "gears",
      story: "Bir uzay istasyonunun reaktör kapağını açan dişli mekanizmasında **A dişlisinde 18 diş**, **B dişlisinde 24 diş** bulunmaktadır. Dişliler görselde işaretli kırmızı ok hizasından aynı anda dönmeye başlıyor. İşaretli noktalar **ilk kez tekrar aynı hizada** karşı karşıya geldiğinde A dişlisi kaç tam tur atmış olur?",
      correctAnswer: 4,
      options: [3, 4, 6, 8],
      hints: [
        "💡 İpucu 1 (Yöntem): İki dişlinin işaretli noktalarının tekrar aynı hizada buluşması için geçen toplam diş sayısı her iki sayının EKOK'u olmalıdır.",
        "💡 İpucu 2 (Hesaplama): EKOK(18, 24) = 72 diş. A dişlisinin 1 turu 18 diş olduğuna göre, 72 dişi tamamlamak için kaç tur atması gerektiğini hesapla."
      ],
      solution: {
        method: "EKOK",
        steps: [
          "İşaretli noktaların tekrar karşılaşması için dönmesi gereken diş sayısı EKOK(18, 24)'tür.",
          "EKOK(18, 24) = 72 diş.",
          "A dişlisinin tur sayısı = Toplam Diş ÷ A'nın Diş Sayısı = 72 ÷ 18 = 4 tam tur.",
          "B dişlisi ise 72 ÷ 24 = 3 tam tur atmıştır."
        ]
      }
    },
    {
      id: "l3_q3",
      title: "Görev 3: Kuantum Kargo Platformu",
      diagramType: "grid_tiling",
      story: "Boyutları **45 cm** ve **60 cm** olan dikdörtgen şeklindeki kuantum batarya modülleri, aralarında boşluk kalmayacak şekilde yan yana ve alt alta dizilerek **en küçük alanlı karesel bir enerji platformu** oluşturulacaktır. Bu platformun tamamlanması için **en az kaç adet batarya modülü** gerekir?",
      correctAnswer: 12,
      options: [8, 12, 15, 20],
      hints: [
        "💡 İpucu 1 (Yöntem): Dikdörtgenlerden kare oluşturulduğu için karenin bir kenarı 45 ve 60'ın en küçük ortak katı (EKOK) olmalıdır.",
        "💡 İpucu 2 (Hesaplama): EKOK(45, 60) = 180 cm (Karenin kenarı). Gereken modül sayısı = (Karenin Alanı) ÷ (Bir Modülün Alanı) veya (180 ÷ 45) × (180 ÷ 60)."
      ],
      solution: {
        method: "EKOK",
        steps: [
          "Karenin bir kenar uzunluğu = EKOK(45, 60) = 180 cm.",
          "Yatayda gereken modül sayısı = 180 ÷ 45 = 4 adet.",
          "Düşeyde gereken modül sayısı = 180 ÷ 60 = 3 adet.",
          "Toplam modül sayısı = 4 × 3 = 12 adet batarya modülü gerekir."
        ]
      }
    }
  ]
};
