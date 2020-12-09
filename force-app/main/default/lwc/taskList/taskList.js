import { LightningElement, api, track, wire } from 'lwc';
import { getFieldValue,createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

import taskName_FIELD from '@salesforce/schema/Task__c.message__c';
import priority_FIELD from '@salesforce/schema/Task__c.priority__c'
import task_OBJECT from '@salesforce/schema/Task__c';

import getRecords from '@salesforce/apex/tasksController.getRecords';

export default class TaskList extends LightningElement {


    @api number; 
    @track tasks;
    
    @wire(getRecords)
    wiredRecord({error, data}) {
        if(data) {
            this.tasks = data;
        }else if(error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title:'Error',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
    }


    constructor(){
        super();
        console.log('CHILD :: hello from constructor');
    }

    connectedCallback(){
        console.log('CHILD :: hello from connectedCallBack');
    }

    renderedCallback(){
        console.log('CHILD :: hello from rendered CallBack');
        const inputBox = this.template.querySelector('[data-id="task"]');
        if(this.number % 3 == 0 ){
            inputBox.label = "do zrobienia: ";
        }else if(this.number % 3 == 1 ){
            inputBox.label ="Tu tun";
        }else{
            inputBox.label = "To do";
        }

        //return refreshApex(this.tasks);
        throw new Error('Child throws in renderedCallback');
    }

    disconnectedCallback(){
        console.log('CHILD :: hello from disconnectedCallBack');
    }

    errorCallback(error, stack){
        console.log('CHILD :: hello from errorCallBack');
        console.log('#### error : ', error);
        console.log('#### stack : ', stack);
    }


    handleClick(event){
        const target = event.target;
        target.selected = !target.selected;
    }

    addToDoHandle(){
        const inputBox = this.template.querySelector('[data-id="task"]');
        const inputBox2 = this.template.querySelector("lightning-combobox");

        const fields = {};
        fields[taskName_FIELD.fieldApiName] = inputBox.value;
        fields[priority_FIELD.fieldApiName] = inputBox2.value;

        let recordInfo = {
            apiName: task_OBJECT.objectApiName,
            fields: fields
        }

        createRecord(recordInfo)
            .then(record => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title:'Success',
                        message: 'Task created!',
                        variant: 'success'
                    })
                );
            }).catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            })
        
        refreshApex(this.tasks);

    }

    get options(){
        //return getFieldValue(task_OBJECT, priority_FIELD);

        
        return [
            {label: 'Ważny', value: 'urgent'},
            {label: 'Średnio ważne', value: 'medium'},
            {label: 'Może poczekać', value: 'low'}
        ];
    }
}