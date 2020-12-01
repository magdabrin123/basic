import { LightningElement, track, api } from 'lwc';

export default class App extends LightningElement {
 @api greeting = "Dzień Dobry";
 @track time = "12:19";

 @track task; //od summer 20 - nie jest wymagany
 @track taskList=[];

 isSelected = false;
 visible = false;
 @track number;

 constructor(){
    super();
    console.log('hello from constructor');

    let number = Math.floor(Math.random() * 100);
    this.number = number;
    if(number % 3 == 0 ){
        this.greeting ="Dzień dobry";
        //inputBox.label = "do zrobienia: ";
    }else if(number % 3 == 1 ){
        this.greeting = "Guten Tag";
        //inputBox.label ="Tu tun";
    }else{
        this.greeting ="Good Morning";
        //inputBox.label = "To do";
    }


 }

 connectedCallback(){

    //const inputBox = this.template.querySelector("Lightning-input");
    console.log('hello from connectedCallBack');


/*
     this.getTime();
     setInterval(()=>{
         this.getTime();
     },1000);*/
 }

 renderedCallback(){

     console.log('hello from rendered CallBack');

    if(this.visible){
        const inputBox = this.template.querySelector('[data-id="task"]');
        if(this.number % 3 == 0 ){
            //this.greeting ="Dzień dobry";
            inputBox.label = "do zrobienia: ";
        }else if(this.number % 3 == 1 ){
            //this.greeting = "Guten Tag";
            inputBox.label ="Tu tun";
        }else{
            //this.greeting ="Good Morning";
            inputBox.label = "To do";
        }
    }

 }

disconnectedCallback(){
    console.log('hello from disconnectedCallBack');
}

 getTime(){
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    this.time = hour + ':' + min + ':' + sec;

 }

 addToDoHandle(){
    const inputBox = this.template.querySelector('[data-id="task"]');

    const inputBox2 = this.template.querySelector("lightning-combobox");

    //this.task = inputBox.value;
    this.task = {Name: inputBox.value, Priority: inputBox2.value};
    //let task =  {Name: inputBox, Priority: inputBox2};
    //this.taskList.push(inputBox.value);
    this.taskList.push(this.task); 
 }

 handleClick(event){
     const target = event.target;
     target.selected = !target.selected;
 }

 get options(){
     return [
         {label: 'Ważny', value: 'urgent'},
         {label: 'Średnio ważne', value: 'medium'},
         {label: 'Może poczekać', value: 'low'}
     ];
 }

 changeVisible(event){
     this.visible = event.target.checked;
 }
}