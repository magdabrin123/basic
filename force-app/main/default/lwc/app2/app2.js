import { LightningElement, track, api } from 'lwc';

export default class App extends LightningElement {
    @api greeting = "Dzień Dobry";
    @track time = "12:19";  

    isSelected = false;
    visible = false;
    @api number;  

    constructor(){
        super();
        console.log('PARENT :: hello from constructor');

        let number = Math.floor(Math.random() * 100);
        this.number = number;
        if(number % 3 == 0 ){
            this.greeting ="Dzień dobry";
        }else if(number % 3 == 1 ){
            this.greeting = "Guten Tag";
        }else{
            this.greeting ="Good Morning";
        }
    }

    connectedCallback(){
        console.log('PARENT :: hello from connectedCallBack');
    }

    renderedCallback(){
        console.log('PARENT :: hello from rendered CallBack');

        this.getTime();
        setInterval(()=>{
            this.getTime();
        },1000);
    }

    disconnectedCallback(){
        console.log('PARENT :: hello from disconnectedCallBack');
    }

    errorCallback(error, stack){
        console.log('PARENT :: hello from errorCallBack');
        console.log('#### error : ', error);
        console.log('#### stack : ', stack);
    }

    getTime(){
        const date = new Date();
        const hour = date.getHours();
        const min = date.getMinutes();
        const sec = date.getSeconds();
        this.time = hour + ':' + min + ':' + sec;

    }

    changeVisible(event){
        this.visible = event.target.checked;
    }

    handleClick(event){
        const target = event.target;
        target.selected = !target.selected;
    }
}