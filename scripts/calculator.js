 function addElement(elem){
        document.getElementById("js-screen-input").value += elem;
      }
      function calculate(){
        let expression = document.getElementById('js-screen-input').value;
        expression = expression.replace(/&#215;|×/g,'*');
        expression = expression.replace(/&#247;|÷/g,'/');
        expression = expression.replace(/&#8722|−/g,'-');
        try{
          // const result = math.evaluate(expression);
          const result = math.evaluate(expression);
          let resultValue = result;
          if (String(resultValue).length > 13){
            resultValue = resultValue.toExponential(5);
          }
          document.getElementById("js-screen-result").innerText = addCommas(resultValue);
        } catch (error){
          document.getElementById("js-screen-result").innerText = error.message;
        }
         
      }

      function addCommas(number){
        let [intergerPart, decimalPart] = number.toString().split(".");
        intergerPart = intergerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return decimalPart?`${intergerPart}.${decimalPart}`: intergerPart;
      }

      function del(){
        let input = document.getElementById('js-screen-input');
        input.value= input.value.substr(0, input.value.length - 1);
      }

      function delAll(){
        document.getElementById('js-screen-input').value = '';
        document.getElementById('js-screen-result').innerText = '';
      }