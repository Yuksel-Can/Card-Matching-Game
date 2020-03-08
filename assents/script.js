$(document).ready(function(){ 
    console.log("Ready");

    $(".card").on("click",function(){

        this.classList.add('is-flipped');
        tryCounter++;
        $(".tryCounter").text(" "+ tryCounter);
        openCard++;
        if(openCard==1){
            $(this).addClass("open");
        }
        else if(openCard==2){
            var first = $(".open").children(".card__face--back").children(".card-imgBack").attr("src");
            var second = $(this).children(".card__face--back").children(".card-imgBack").attr("src");
            console.log(first);
            console.log(second);
            if(first == second){
                setTimeout(() => {$(".is-flipped").addClass("pointerNone");$(".is-flipped").removeClass("is-flipped"); }, 1000);
                console.log("deleted");
                openCard=0;
            }
            else{
                setTimeout(() => {$(".is-flipped").removeClass("is-flipped"); }, 1000);
                console.log("closed");
                openCard=0;
            }
            $(".open").removeClass("open");
            
            setTimeout(() => {endGame()}, 2000);
        }
    });
    $("#starter").on("click",function(){
        setTimeout(() => {window.location.reload()}, 1000);
    });

});

function onCreate(){
    var horizontal=2;
    var vertical=5;
    var right = document.querySelector("#right");
    for(var i=0;i<horizontal;i++){
        var row = document.createElement("div");
        row.classList="row row-cols-lg-5 row-cols-2";
        right.appendChild(row);
        for(var j=0;j<vertical;j++){

            var col = document.createElement("div");
            col.classList="col mb-4 ";
            row.appendChild(col);

            var scene = document.createElement("div");
            scene.classList="scene scene--card";
            col.appendChild(scene);

            var card = document.createElement("div");
            card.classList="card";
            scene.appendChild(card);

            var cardFront = document.createElement("div");
            cardFront.classList="card__face card__face--front";
            card.appendChild(cardFront);

            var imgFront = document.createElement("img");
            imgFront.classList="card-img";
            imgFront.setAttribute("src","assents/images/cards/card.jpg");
            cardFront.appendChild(imgFront);

            var cardBack = document.createElement("div");
            cardBack.classList="card__face card__face--back";
            card.appendChild(cardBack);

            var imgBack = document.createElement("img");
            imgBack.classList="card-img card-imgBack";
            var random = Math.floor(Math.random()*imageIndex.length);
            imgBack.setAttribute("src","assents/images/cards/animal"+imageIndex[random]+".png");
            imageIndex.splice(random,1);
            cardBack.appendChild(imgBack);
        }
    }
}

var imageIndex= new Array();

function randomIndex(){
    for(var i=0;i<5;i++){
        var random = 0;
        function randomUret(){
            random = Math.floor(Math.random()*17+1);
            if(imageIndex.indexOf(random) != -1 ){
                randomUret();
            }
            return random;
        }
        random = randomUret();
        for(var j=0;j<2;j++){
            imageIndex.push(random);
        }
    };
}

function endGame(){
    var closed = $(".pointerNone").length;
    if (closed == $(".col").length){
        $("#myModal").modal();
    }
}

var openCard= 0;
var tryCounter = 0;
randomIndex();
onCreate();
