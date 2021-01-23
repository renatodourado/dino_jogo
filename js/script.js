const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;


function handleKeyDown(event) {
    if (event.keyCode === 32){
        if (!isJumping){
            jump();
        }
    }
}


function jump(){
    isJumping = true;

    let upInterval = setInterval(() =>{
        if (position >=200){

            // Descendo 
            clearInterval(upInterval);

            let downInterval = setInterval(() =>{
                if (position <=0){
                    clearInterval(downInterval);
                    isJumping = false;
                } else{
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else{
            //Subindo 

            position += 20;
            dino.style.bottom = position +'px';

        }
    }, 20);
}


//Cactus
function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1100;
    let randomTime = Math.random() *10000;

    if (isGameOver) return;

    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';

    let leftTimer = setInterval(() =>{
        if (cactusPosition < -30) {

            //Saiu da Tela

            clearInterval(leftTimer);
            background.removeChild(cactus);
        } else if (cactusPosition >0 && cactusPosition < 30 && position < 30){

            //Game Over
            clearInterval(leftTimer);
            isGameOver = true;
            document.body.innerHTML ='<h1 class="game-over"> GAME OVER </h1>';

        } else {
            cactusPosition -= 20;
            cactus.style.left = cactusPosition +'px';
        }
            
    }, 20);

    setTimeout(createCactus, randomTime);


}
createCactus();
document.addEventListener('keydown', handleKeyDown);