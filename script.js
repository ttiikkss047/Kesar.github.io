"use strict"
    // Այբուբենների սահմանումներ
    const alphabets = {
      en_lower: "abcdefghijklmnopqrstuvwxyz",
      en_upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      ru_lower: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя",
      ru_upper: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",
      hy_lower: "աբգդեզէըթժիլխծկհձղճմյնշոչպջռսվտրցւփքևօֆ",
      hy_upper: "ԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿՀՁՂՃՄՅՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔևՕՖ"
    };

    function processText(encrypting = true) {
      const text = document.getElementById("text").value;
      let key = parseInt(document.getElementById("key").value);
      let result = "";

      if (isNaN(key) || text.trim() === "") {
        alert("Խնդրում ենք լրացնել տեքստը և ճիշտ բանալի մուտքագրել (թիվ):");
        return;
      }

      if (!encrypting) key = -key; // Վերծանման դեպքում բացասական բանալի

      for (let char of text) {
        let found = false;

        for (let set in alphabets) {
          const alpha = alphabets[set];
          const index = alpha.indexOf(char);

          if (index !== -1) {
            let shiftedIndex = (index + key) % alpha.length;

            if (shiftedIndex < 0) {
              shiftedIndex += alpha.length;
            }

            result += alpha[shiftedIndex];
            found = true;
            break;
          }
        }

        if (!found) {
          result += char; // ոչ այբուբենային նշանները թողնում ենք անփոփոխ
        }
      }

      document.getElementById("output").innerText = result;
    }
