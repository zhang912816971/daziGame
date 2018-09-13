class Game {
    constructor(){
        this.screen="";
        this.letters=[];
        this.sm=10;
        this.fen=0;
        this.fenbox="";
        this.smbox="";
        this.voice="";
        this.alert="";
        this.score="";

}
    createLetter(){
        let letterBox=document.createElement("div");
        letterBox.className="letterBox";
        let asc;
        let letter;
        do{
           asc=Math.floor(Math.random()*26+65);
           letter=String.fromCharCode(asc);
        }while (letterrepeat(letter,this.letters)) ;
        letterBox.style.backgroundImage=`url(img/A_Z/${letter}.png)`

        let left;
        do{
            left=Math.random()*(7.5-0.5*3)+0.5;
        }while (leftrepeat(left,this.letters)) ;
        let top=Math.random()*.72+.76;
        let obj={};
        let speed=Math.random()*0.05+0.05;
        obj['top']=top;
        obj['left']=left;
        obj['node']=letterBox;
        obj['name']=letter;
        obj['speed']=speed;

        this.letters.push(obj);


        letterBox.style.left=left+"rem";
        letterBox.style.top=top+"rem";

        this.screen.appendChild(letterBox);

    };
    //下落
    run(){
        this.t=setInterval(()=>{
            for (let item of this.letters) {
                item['top']+=item['speed'];
                if(item['top']>=7.18){
                    this.remove(item['name'],1);
                    continue;
                }
                item['node'].style.top=item['top']+"rem";
            }
        },100)
    }
    //消失
    remove(letter,type) {
        for (let item of this.letters) {
            if (item['name'] == letter) {
                
                let index = this.letters.indexOf(item);
                this.screen.removeChild(item['node']);
                this.letters.splice(index, 1);
                if (type == 0) {
                    this.fen++;
                    this.createLetter();
                } else if (type == 1) {
                    this.sm--;
                    this.createLetter();
                }
                if (this.sm < 0) {
                    this.death();
                }
                this.fenbox.innerText = this.fen;
                this.smbox.innerText = this.sm;
                if(type == 3){
                    this.fen = 0;
                    this.sm = 10;
                }
            }
        }
    }
    //停止
    pause(){
        clearInterval(this.t)
    }
    death(){
        clearInterval(this.t);
        this.alert.style.display="block";
        this.score.innerText = this.fenbox.innerText;
    }
    //initi
    initi(){
        this.letters=[];
        this.fenbox.innerText=0;
        this.smbox.innerText=10;
        this.voice="";
    }
    restart(){
        this.initi();
        // this.createLetter(5);
        this.alert.style.display="none";
    }
}
//去重复
function leftrepeat(left,letters){
    for (let item of letters) {
        if (Math.abs(item['left']-left)<0.53) {
            return true
        }
    }
    return false;
}
function letterrepeat(letter,letters) {
    for (item of letters) {
        if (item['name']==letter) {
            return true;
        }
    }
    return false;
}