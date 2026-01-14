let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [2,4,6],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [6,7,8],
];

const resetGame = () =>{
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    //clear all boxes contents
    boxes.forEach(box =>{
        box.innerText = "";
        box.classList.remove("player-x", "player-o");
    });
}

boxes.forEach((box) =>{
    box.addEventListener("click" ,() =>{
        // console.log("Box was clicked");
        if(turn0){
            box.innerText = "O";
            box.classList.add("player-o");
            turn0 = false;
        } else{
            box.innerText = "X";
            box.classList.add("player-x");
            turn0 = true;
        }
        box.disabled = true;

        checkWinner();
    })
});

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("player-x", "player-o");
    }
}

const showWinner = (winner) =>{
    msg.innerText = `Congratulations winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkDraw = () =>{
    //check if all boxes 
    for(let box of boxes){
        if(box.innerText === ""){
            return false; //game is not draw yet
        }
    }
    //If we get here ,  all boxes are filled and no winner
    return true;
}

const checkWinner = () =>{
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                // console.log("Winner" , pos1Val);
                showWinner(pos1Val);
                return;
            }
        }
    }
    //check for a draw if there is no winner
    if(checkDraw()){
        msg.innerText = "Game ended in a draw";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
