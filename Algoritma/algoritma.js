//1. Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"

const string1 = "NEGIE1";
let reverseString1 = "";

for (let i = 4; i >= 0; i--) {
    reverseString1 += string1[i]
}
reverseString1 += 1;

console.log(reverseString1)

//2. Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, 
// jika ada kata dengan panjang yang sama silahkan ambil salah satu

// Contoh:
// const sentence = "Saya sangat senang mengerjakan soal algoritma"
// longest(sentence) 

// mengerjakan: 11 character

const sentence = "Saya sangat senang mengerjakan soal algoritma";
let arraySentence = sentence.split(' ');
let arrayCount = [];
let longestSentenceNum = 0;
let biggestNumber = 0;

for (let i = 0; i < arraySentence.length; i++) {
    let count = 0
    for (let j = 0; j < arraySentence[i].length; j++) {
        count += 1;
    }
    arrayCount.push(count)
}

for (let i = 0; i < arrayCount.length; i++) {
    if (arrayCount[i] > biggestNumber) {
        biggestNumber = arrayCount[i];
        longestSentenceNum = i
    }
}

console.log(`kata terpanjang : ${arraySentence[longestSentenceNum]}, jumlah huruf dalam kata = ${biggestNumber}`)


// 3. Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT
// Contoh:

// INPUT = ['xc', 'dz', 'bbb', 'dz']  
// QUERY = ['bbb', 'ac', 'dz']  

// OUTPUT = [1, 0, 2] karena kata 'bbb' terdapat 1 pada INPUT, kata 'ac' tidak ada pada INPUT, dan kata 'dz' terdapat 2 pada INPUT

let INPUT = ['xc', 'dz', 'bbb', 'dz'];  
let QUERY = ['bbb', 'ac', 'dz'];  
let OUTPUT = [];

for (let i = 0; i < QUERY.length; i++) {
    let count = 0;
    for (let j = 0; j <= INPUT.length; j++) {
        if (QUERY[i] == INPUT[j]) {
            count += 1
        }
    }
    OUTPUT.push(count)
}

console.log(OUTPUT)

// 4. Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN Contoh:
// Contoh:

// Matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]

// diagonal pertama = 1 + 5 + 9 = 15 
// diagonal kedua = 0 + 5 + 7 = 12 

// maka hasilnya adalah 15 - 12 = 3

let Matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]];

let diagonal1 = [];
let diagonal2 = [];
let countDiagonal2 = 0;
let totalDiagonal1 = 0;
let totalDiagonal2 = 0;

for (let i = 0; i < Matrix.length; i++) {
    for (let j = 0; j <= Matrix[i].length; j++) {
        if (j == i) {
            diagonal1.push(Matrix[i][j])
        }
    }
};

for (let i = Matrix.length-1; i >= 0; i--) {
    for (let j = 0; j <= Matrix[i].length; j++) {
        if (j == countDiagonal2) {
            diagonal2.push(Matrix[i][j])
        }
    }
    countDiagonal2 += 1
};

for (let i = 0; i<diagonal1.length; i++) {
    totalDiagonal1 += diagonal1[i]
};

for (let i = 0; i<diagonal2.length; i++) {
    totalDiagonal2 += diagonal2[i]
};

let grandTotalDiagonal = totalDiagonal1 - totalDiagonal2;

console.log(`jumlah pengurangan diagonal = ${grandTotalDiagonal}`);
