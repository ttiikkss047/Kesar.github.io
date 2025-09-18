   "use strict";

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
      let steps = "";

      if (isNaN(key) || text.trim() === "") {
        alert("Խնդրում ենք լրացնել տեքստը և ճիշտ բանալի մուտքագրել (թիվ):");
        return;
      }

      if (!encrypting) key = -key;

      for (let char of text) {
        let found = false;

        for (let set in alphabets) {
          const alpha = alphabets[set];
          const index = alpha.indexOf(char);

          if (index !== -1) {
            let shiftedIndex = (index + key) % alpha.length;
            if (shiftedIndex < 0) shiftedIndex += alpha.length;
            const shiftedChar = alpha[shiftedIndex];

            result += shiftedChar;
            steps += `${char} → (${index}+${key}) mod ${alpha.length} = ${shiftedIndex} → ${shiftedChar}\n`;

            found = true;
            break;
          }
        }

        if (!found) {
          result += char;
          steps += `${char} → անփոփոխ\n`;
        }
      }

      document.getElementById("output").innerText = result;
      document.getElementById("steps").innerText = steps;
    }

    function toggleSteps() {
      const stepsDiv = document.getElementById("steps");
      if (stepsDiv.style.display === "none") {
        stepsDiv.style.display = "block";
      } else {
        stepsDiv.style.display = "none";
      }
    }
