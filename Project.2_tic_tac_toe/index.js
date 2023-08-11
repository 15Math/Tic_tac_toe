const body = document.querySelector('body');
const gameArea = document.getElementById('game-area');
const lobby = document.getElementById('lobby');
const root = document.querySelector(':root');

const ready1 = document.getElementById('ready-1');
const ready2 = document.getElementById('ready-2');
const readyBtn = document.querySelectorAll('.ready-btn');

const namePrinted = document.getElementById('player-name');

const resetBtns = document.getElementById('reset-btns');
const reset = document.getElementById('reset')
const goBack = document.getElementById('goBack')

// body.removeChild(lobby);
body.removeChild(gameArea);
body.removeChild(resetBtns);

function checkTypeVictory(vicNumber, a1,a2,a3,b1,b2,b3,c1,c2,c3){
    if(vicNumber == 1){
      a1.style.color = '#66ff7b';
      a2.style.color = '#66ff7b';
      a3.style.color = '#66ff7b';
    }else if(vicNumber == 2){
      b1.style.color = '#66ff7b';
      b2.style.color = '#66ff7b';
      b3.style.color = '#66ff7b';
    }else if(vicNumber == 3){
      c1.style.color = '#66ff7b';
      c2.style.color = '#66ff7b';
      c3.style.color = '#66ff7b';
    }
    else if(vicNumber == 4){
      a1.style.color = '#66ff7b';
      b1.style.color = '#66ff7b';
      c1.style.color = '#66ff7b';
    }
    else if(vicNumber == 5){
      a2.style.color = '#66ff7b';
      b2.style.color = '#66ff7b';
      c2.style.color = '#66ff7b';
    }
    else if(vicNumber == 6){
      a3.style.color = '#66ff7b';
      b3.style.color = '#66ff7b';
      c3.style.color = '#66ff7b';
    }
    else if(vicNumber == 7){
      a1.style.color = '#66ff7b';
      b2.style.color = '#66ff7b';
      c3.style.color = '#66ff7b';
    }
    else if(vicNumber == 8){
      a3.style.color = '#66ff7b';
      b2.style.color = '#66ff7b';
      c1.style.color = '#66ff7b';
    }
}

function checkWinner(a1,a2,a3,b1,b2,b3,c1,c2,c3,data, player){

    if(a1.dataset.value === data && a2.dataset.value === data && a3.dataset.value === data){
      return 1;
    }else if(b1.dataset.value === data && b2.dataset.value === data && b3.dataset.value === data){
      return 2;
    } else if(c1.dataset.value === data && c2.dataset.value === data && c3.dataset.value === data){
      return 3;
    }else if(a1.dataset.value === data && b1.dataset.value === data && c1.dataset.value === data){
      return 4;
    }else if(a2.dataset.value === data && b2.dataset.value === data && c2.dataset.value === data ){
      return 5;
    }else if(a3.dataset.value === data && b3.dataset.value === data && c3.dataset.value === data){
      return 6;
    }else if(a1.dataset.value === data && b2.dataset.value === data && c3.dataset.value === data ){
      return 7;
    }else if(a3.dataset.value === data && b2.dataset.value === data && c1.dataset.value === data){
      return 8;
    }else{
      return 0;
    }
}

function setDisabled(sqr){
  sqr.forEach(function (square) {
    square.disabled = true;
  })
}

function declareWinner(name, nameBox, resetBtns){
  const txt = document.getElementById('txt');
  const namePrinted = document.getElementById('player-name');

  root.style.setProperty('--bg-color', '#0072f5');

  nameBox.style.backgroundColor = 'transparent';
  nameBox.style.boxShadow = '8px 10px 0px 0px #ffffff, 8px 10px 0px 3px rgb(0, 0, 0)';
  nameBox.style.borderRadius = '10px';
  nameBox.style.width = '350px';
  nameBox.style.height = '100px';
  nameBox.style.backgroundColor = '#FAB600';
  nameBox.style.padding = '30px';

  txt.style.fontSize = "20px";
  txt.style.color = "white";
  txt.style.paddingTop = '10px'

  namePrinted.style.fontSize = "30px";
  namePrinted.style.color = "white";
  namePrinted.style.paddingTop = '5px'
  namePrinted.style.paddingBottom = '10px'

  if(name === ''){
    txt.innerText = "Deu";
    namePrinted.innerText = "VELHA";
   
  }else{
    txt.innerText  = "Vencedor";
    namePrinted.innerText = name;
  }
  body.appendChild(resetBtns);
  return 1;
}


function gameStarter(readyBtnSelf, readyBtnOther, readyBtnAll) {
  readyBtnSelf.setAttribute('disabled', 'disabled');
  readyBtnSelf.style.backgroundColor = '#CEFC38';
  readyBtnSelf.style.boxShadow = '10px 10px 0px -5px rgb(48, 128, 24)inset';

  if (readyBtnOther.classList.contains('selected')) {
    const namePlayer1 = document.getElementById('player-1').value;
    const namePlayer2 = document.getElementById('player-2').value;

    if (namePlayer1 === '' || namePlayer2 === '') {
      alert('Devem existir dois jogadores!');

      for (let i = 0; i < readyBtnAll.length; i++) {
        readyBtnAll[i].classList.remove('selected');
        readyBtnAll[i].style.backgroundColor = 'rgb(255, 0, 0)';
        readyBtnAll[i].style.boxShadow ='6px 3px 0px 0px rgb(68, 31, 94), -10px -5px 0px -5px rgb(128, 24, 24)inset';
        readyBtnAll[i].removeAttribute('disabled');
      }
    } else {
      body.removeChild(lobby);
      body.appendChild(gameArea);

      const sqr = document.querySelectorAll('.square');

      const namePrinted = document.getElementById('player-name');
      const nameBox = document.getElementById('top-box');

      root.style.setProperty('--font-color', 'white');
      root.style.setProperty('--bg-color', '#FAB600');
      namePrinted.innerText = namePlayer1;

      let turn = 'X';
      let i = 0;

        sqr.forEach(function (square) {
          square.addEventListener('click', function () {

            if (square.dataset.value !== ''){
              return;
            } 

            i++;
            console.log(i);

            square.dataset.value = turn;
            square.innerText =  square.dataset.value;

            if (turn === 'X') {
              turn = '0';
              namePrinted.innerText = namePlayer2;
              nameBox.style.backgroundColor = "#1955FA";
              nameBox.style.boxShadow = "8px 10px 0px 0px #FA0C5D, 8px 10px 0px 3px rgb(0, 0, 0)";
              square.style.backgroundColor = "#FA0C5D";
              square.style.boxShadow = "8px 10px 0px 0px #1955FA, 8px 10px 0px 3px rgb(0, 0, 0)";
              square.style.cursor = 'default';
            } else {
              turn = 'X';
              namePrinted.innerText = namePlayer1;
              nameBox.style.backgroundColor = "#FA0C5D";
              nameBox.style.boxShadow = "8px 10px 0px 0px #1955FA, 8px 10px 0px 3px rgb(0, 0, 0)";
              square.style.backgroundColor = "#1955FA";
              square.style.boxShadow = "8px 10px 0px 0px #FA0C5D, 8px 10px 0px 3px rgb(0, 0, 0)";
              square.style.cursor = 'default';
            }

              const  a1 = document.getElementById('a-1');
              const  a2 = document.getElementById('a-2');
              const  a3 = document.getElementById('a-3');
              const  b1 = document.getElementById('b-1');
              const  b2 = document.getElementById('b-2');
              const  b3 = document.getElementById('b-3');
              const  c1 = document.getElementById('c-1');
              const  c2 = document.getElementById('c-2');
              const  c3 = document.getElementById('c-3');

              xGanha = checkWinner(a1,a2,a3,b1,b2,b3,c1,c2,c3,'X',namePlayer1)
              oGanha = checkWinner(a1,a2,a3,b1,b2,b3,c1,c2,c3,'0',namePlayer2)

              if(xGanha > 0){
                checkTypeVictory(xGanha,a1,a2,a3,b1,b2,b3,c1,c2,c3);
                setDisabled(sqr)
                declareWinner(namePlayer1, nameBox, resetBtns);
              }else if(oGanha > 0){
                checkTypeVictory(oGanha,a1,a2,a3,b1,b2,b3,c1,c2,c3);
                setDisabled(sqr);
                declareWinner(namePlayer2, nameBox, resetBtns);
                
              }else if(i === 9){
                declareWinner('', nameBox, resetBtns);
              }
              
              reset.addEventListener('click', function(){
                body.removeChild(resetBtns);

                turn = 'X';
                i = 0;
                txt.innerText = "Vez de:";
                txt.style.color = "black";
                txt.style.fontSize = "18px"
                txt.style.fontSize = "16px";
                txt.style.paddingTop = '0px'

                namePrinted.innerText = namePlayer1;
                namePrinted.style.color = "rgb(255, 208, 0)";
                namePrinted.style.fontSize = "18px"
                namePrinted.style.fontSize = "25px";
                namePrinted.style.paddingTop = '0px'
                namePrinted.style.paddingBottom = '0px'


                nameBox.style.backgroundColor = "#FA0C5D";
                nameBox.style.borderRadius = "0px";
                nameBox.style.boxShadow = "8px 10px 0px 0px #1955FA, 8px 10px 0px 3px rgb(0, 0, 0)";
                nameBox.style.padding = '0px';
                nameBox.style.height = '80px';
                nameBox.style.border = "3px black solid";
                nameBox.style.width = '280px';

                root.style.setProperty('--bg-color', '#FAB600');
                
                sqr.forEach(function (square) {
                  square.dataset.value = '';
                  square.innerText = '';
                  square.style.backgroundColor = "white";
                  square.style.boxShadow = "8px 10px 0px 0px #a5a5a5, 8px 10px 0px 3px rgb(0, 0, 0)";
                  square.style.color = "rgb(255, 208, 0)";
                  square.removeAttribute('disabled');

                })
              })
          });
        });
      }
    }
  }

ready1.addEventListener('click', function () {
  ready1.classList.add('selected');
  gameStarter(ready1, ready2, readyBtn);
});

ready2.addEventListener('click', function () {
  ready2.classList.add('selected');
  gameStarter(ready2, ready1, readyBtn);
});
