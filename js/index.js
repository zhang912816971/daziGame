window.onload=function () {
    let game=new Game();
    game.screen=document.querySelector(".screen");
    game.fenbox=document.querySelector(".point");

    game.smbox=document.querySelector(".life");
    game.alert=document.querySelector(".alert")
    game.score=document.querySelector(".score")
    game.initi();

    let num=4;
    for (let i=0;i<num;i++) {
        game.createLetter();
    }
    let bottomcon=document.querySelector(".bottom .con");
    bottomcon.onclick=function (event) {
        if (event.target.className!="con") {
            let text=event.target.innerText;
            game.remove(text,0);
        }
    }
    //游戏暂停开始
    let voice=document.querySelector(".voice");
    let flag=document.querySelector(".stop");
    flag.onclick=function () {
        if(flag.className=="stop"){
            this.className="play";
            voice.className="voice";
            game.run();
            audio.play();
        }else {
            this.className="stop";
            voice.className="voice_close";
            game.pause();
            audio.pause();
        }
    }
    //音乐播放与停止
    let audio=document.querySelector("#audio");

    voice.onclick=function (event) {
        if (voice.className=="voice") {
            this.className="voice_close";
            audio.pause();
        }else {
            this.className="voice";
            audio.play();
        }
    }
    
    //重新开始
    let btn=document.querySelector(".alert .message .btn");
    btn.onclick=function () {
        
       
        let num1 = 64;
        do{
            num1++;
            code = String.fromCharCode(num1);
            game.remove(code,3);
            
        }while(num1<90);

        flag.className="stop";
        voice.className="voice_close";
        game.pause();
        audio.pause();
        game.restart();
        for (let i=0;i<num;i++) {
            game.createLetter();
        }
    }
}