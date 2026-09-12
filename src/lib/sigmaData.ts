export interface ModuleQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  formula?: string;
  points: number;
}

export interface ModuleMaterialSlide {
  id: string;
  title: string;
  content: string;
  formula?: string;
  exampleProblem?: string;
  solution?: string;
  keyTakeaways: string[];
}

export interface SigmaModule {
  id: string;
  districtId: number;
  districtName: string;
  title: string;
  subtitle: string;
  description: string;
  durationMinutes: number;
  xpReward: number;
  order: number;
  slides: ModuleMaterialSlide[];
  quiz: ModuleQuestion[];
}

export interface DistrictInfo {
  id: number;
  name: string;
  symbol: string;
  accent: string;
  rgb: string;
  tagline: string;
  description: string;
  guardian: string;
  modulesCount: number;
}

export const DISTRICTS: DistrictInfo[] = [
  {
    id: 1,
    name: "Distrik Aljabar & Matriks",
    symbol: "x²",
    accent: "#00F0FF",
    rgb: "0, 240, 255",
    tagline: "Gerbang Fondasi Logika & Operasi Multidimensi",
    description: "Kuasai operasi matriks, invers, determinan, serta sistem persamaan linear tiga variabel untuk membuka distrik berikutnya.",
    guardian: "Sigma-Slinger",
    modulesCount: 3,
  },
  {
    id: 2,
    name: "Distrik Fungsi & Kalkulus",
    symbol: "f(x)",
    accent: "#FFD600",
    rgb: "255, 214, 0",
    tagline: "Menara Dinamika, Limit, dan Laju Perubahan",
    description: "Pelajari sifat komposisi fungsi, fungsi invers, limit tak hingga, dan aplikasi turunan pertama dalam dunia nyata.",
    guardian: "Sigma-Slinger",
    modulesCount: 3,
  },
  {
    id: 3,
    name: "Distrik Geometri & Vektor",
    symbol: "△",
    accent: "#FF007A",
    rgb: "255, 0, 122",
    tagline: "Zona Dimensi Tiga & Proyeksi Spasial",
    description: "Menghitung jarak titik ke garis dan bidang pada kubus/limas, serta proyeksi ortogonal vektor dalam ruang 3 dimensi.",
    guardian: "Geo-Arachne",
    modulesCount: 3,
  },
  {
    id: 4,
    name: "Distrik Trigonometri Analitik",
    symbol: "sin θ",
    accent: "#A78BFA",
    rgb: "167, 139, 250",
    tagline: "Gelombang Periodik & Sudut Rangkap",
    description: "Pecahkan rumus jumlah selisih sinus-cosinus dan temukan solusi umum persamaan trigonometri untuk TKA.",
    guardian: "Prob-Spinner",
    modulesCount: 2,
  },
  {
    id: 5,
    name: "Distrik Peluang & Statistika",
    symbol: "P(A)",
    accent: "#10B981",
    rgb: "16, 185, 129",
    tagline: "Observatorium Prediksi & Analisis Data",
    description: "Permutasi, kombinasi, peluang bersyarat, serta ukuran pemusatan dan simpangan data kelompok.",
    guardian: "Prob-Spinner",
    modulesCount: 2,
  },
];

export const MODULES: SigmaModule[] = [
  {
    id: "mod-aljabar-1",
    districtId: 1,
    districtName: "Distrik Aljabar & Matriks",
    title: "Operasi & Determinan Matriks 2x2 dan 3x3",
    subtitle: "Pengantar Matriks Transformasi",
    description: "Pahami konsep perkalian baris kali kolom, sifat determinan, serta penerapan aturan Cramer.",
    durationMinutes: 45,
    xpReward: 350,
    order: 1,
    slides: [
      {
        id: "slide-1",
        title: "Konsep Dasar Matriks & Notasi",
        content: "Matriks adalah susunan bilangan berbentuk persegi panjang yang diatur menurut baris dan kolom. Ordo m x n menyatakan jumlah m baris dan n kolom.",
        formula: "A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}, \\quad \\det(A) = ad - bc",
        keyTakeaways: [
          "Penjumlahan matriks hanya bisa dilakukan jika ordo sama.",
          "Perkalian AB mensyaratkan kolom A = baris B.",
          "Perkalian matriks tidak bersifat komutatif (AB ≠ BA).",
        ],
      },
      {
        id: "slide-2",
        title: "Invers Matriks Ordo 2x2",
        content: "Matriks memiliki invers jika dan hanya jika determinannya tidak nol (matriks nonsingular). Jika det(A) = 0, matriks disebut singular.",
        formula: "A^{-1} = \\frac{1}{ad - bc} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}",
        exampleProblem: "Tentukan invers dari matriks A = [[3, 1], [5, 2]].",
        solution: "det(A) = (3)(2) - (1)(5) = 6 - 5 = 1. Maka A^{-1} = 1/1 * [[2, -1], [-5, 3]] = [[2, -1], [-5, 3]].",
        keyTakeaways: [
          "Tukar posisi elemen diagonal utama (a dan d).",
          "Beri tanda negatif pada diagonal samping (-b dan -c).",
          "Bagi setiap elemen dengan determinan.",
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "Jika matriks A = [[4, 2], [3, 1]], berapakah nilai determinan dari matriks A?",
        options: ["-2", "2", "10", "-10"],
        correctAnswer: 0,
        explanation: "det(A) = (4)(1) - (2)(3) = 4 - 6 = -2.",
        formula: "\\det(A) = (4)(1) - (2)(3) = -2",
        points: 50,
      },
      {
        id: "q2",
        question: "Manakah syarat mutlak agar perkalian matriks A_{m \\times n} dengan B_{p \\times q} dapat dilakukan?",
        options: ["m = q", "n = p", "m = p", "n = q"],
        correctAnswer: 1,
        explanation: "Syarat perkalian matriks adalah jumlah kolom matriks pertama (n) harus sama dengan jumlah baris matriks kedua (p).",
        points: 50,
      },
    ],
  },
  {
    id: "mod-fungsi-1",
    districtId: 2,
    districtName: "Distrik Fungsi & Kalkulus",
    title: "Komposisi Fungsi (f ∘ g)(x) & Invers",
    subtitle: "Rantai Pemetaan Nilai Variabel",
    description: "Menghubungkan dua fungsi bertingkat dan mencari rumus balik fungsi menggunakan aljabar sistematis.",
    durationMinutes: 40,
    xpReward: 300,
    order: 2,
    slides: [
      {
        id: "slide-1",
        title: "Operasi Komposisi Fungsi",
        content: "Komposisi fungsi (f ∘ g)(x) didefinisikan sebagai memasukkan rumus g(x) ke dalam variabel x pada f(x).",
        formula: "(f \\circ g)(x) = f(g(x))",
        exampleProblem: "Jika f(x) = 2x + 3 dan g(x) = x^2 - 1, tentukan (f ∘ g)(x).",
        solution: "(f ∘ g)(x) = f(x^2 - 1) = 2(x^2 - 1) + 3 = 2x^2 - 2 + 3 = 2x^2 + 1.",
        keyTakeaways: [
          "(f ∘ g)(x) umumnya tidak sama dengan (g ∘ f)(x).",
          "Domain hasil komposisi dipengaruhi oleh domain fungsi dalam g(x).",
        ],
      },
    ],
    quiz: [
      {
        id: "q-comp-1",
        question: "Jika f(x) = 3x - 2 dan g(x) = 2x + 5, berapakah nilai dari (f ∘ g)(2)?",
        options: ["25", "27", "18", "21"],
        correctAnswer: 0,
        explanation: "g(2) = 2(2) + 5 = 9. Maka f(g(2)) = f(9) = 3(9) - 2 = 27 - 2 = 25.",
        points: 50,
      },
    ],
  },
  {
    id: "mod-vektor-1",
    districtId: 3,
    districtName: "Distrik Geometri & Vektor",
    title: "Dimensi Tiga: Jarak Titik ke Bidang",
    subtitle: "Analisis Ruang Bangun Kubus & Limas",
    description: "Kuasai teknik proyeksi tegak lurus pada bidang diagonal kubus dan teorema Pythagoras ruang.",
    durationMinutes: 50,
    xpReward: 400,
    order: 3,
    slides: [
      {
        id: "slide-dim3-1",
        title: "Jarak Titik ke Bidang pada Kubus",
        content: "Jarak titik ke bidang adalah panjang ruas garis yang ditarik dari titik tersebut tegak lurus terhadap bidang.",
        formula: "\\text{Diagonal Ruang} = s\\sqrt{3}, \\quad \\text{Diagonal Sisi} = s\\sqrt{2}",
        exampleProblem: "Pada kubus ABCD.EFGH dengan rusuk 6 cm, berapakah jarak titik C ke bidang BDHF?",
        solution: "Jarak C ke BDHF sama dengan setengah dari diagonal sisi AC. Jarak = 1/2 * 6√2 = 3√2 cm.",
        keyTakeaways: [
          "Temukan garis proyeksi yang tegak lurus pada bidang sasaran.",
          "Gunakan segitiga siku-siku penolong untuk teorema Pythagoras.",
        ],
      },
    ],
    quiz: [
      {
        id: "q-dim3-1",
        question: "Pada kubus ABCD.EFGH dengan panjang rusuk 8 cm, panjang diagonal ruang AG adalah...",
        options: ["8√2 cm", "8√3 cm", "16 cm", "12 cm"],
        correctAnswer: 1,
        explanation: "Panjang diagonal ruang kubus dengan rusuk s adalah s√3, sehingga AG = 8√3 cm.",
        points: 50,
      },
    ],
  },
];

export interface DiscussionThread {
  id: string;
  authorName: string;
  authorRole: "student" | "teacher";
  authorClass: string;
  title: string;
  content: string;
  category: string;
  repliesCount: number;
  upvotes: number;
  createdAt: string;
  isPinned?: boolean;
}

export const INITIAL_DISCUSSIONS: DiscussionThread[] = [];
