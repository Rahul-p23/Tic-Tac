let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#newbtn");
let message = document.querySelector(".message");
let msg = document.querySelector("#msg");


let turnX = true;
let count = 0;

const winPattern =[
    [0,1,2] , [0,3,6] , [0,4,8] ,
    [1,4,7] , [2,5,8] , [2,4,6] ,
    [3,4,5] , [6,7,8]
];

const resetGame =() =>{
    turnX=true;
    count=0;
    enableBoxes();
    message.classList.add("hide");
};

const disableBoxes =() => {
    for(let box of boxes) {
        box.disabled=true;
    }
};

const enableBoxes =() => {
    for(let box of boxes) {
        box.disabled=false;
        box.innerText="";
    }
};

const checkWinner= () =>{
    for(let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val !=""){
            if (pos1Val===pos2Val && pos2Val===pos3Val){
                showWinner(pos1Val);
            }
        }
    }
};

const showWinner = (winner) =>{
    let player;
    if (winner==="X"){
        player="player 1";
    } else {
        player="player 2";
    }

    msg.innerText = `Congratulations, Winner is ${player}`;
    message.classList.remove("hide");
    disableBoxes();
};

const gameDraw =() =>{
    msg.innerText=(`Game is Draw`);
    message.classList.remove("hide");
    disableBoxes();
}

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
        if (turnX) {        //player1
            box.innerText="X";
            turnX=false;
        } else {            //player2
            box.innerText="O";
            turnX=true;
        }
        box.disabled=true;
        count++;

       let isWinner =checkWinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);