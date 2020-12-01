import { LightningElement, track, api } from 'lwc';

export default class App extends LightningElement {
 @api greeting = "Dzień Dobry";
 @track time = "12:19";

 @track task; //od summer 20 - nie jest wymagany
 @track taskList=[];

 isSelected = false;

 connectedCallback(){
     this.getTime();
     setInterval(()=>{
         this.getTime();
     },1000);
 }

 getTime(){
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    this.time = hour + ':' + min + ':' + sec;

 }

 addToDoHandle(){
    const inputBox = this.template.querySelector("Lightning-input");
    this.task = inputBox.value;
    this.taskList.push(inputBox.value);
 }

 handleClick(event){
     const target = event.target;
     target.selected = !target.selected;
 }
}