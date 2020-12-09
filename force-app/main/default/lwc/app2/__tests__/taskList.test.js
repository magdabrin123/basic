import {createElement} from 'lwc';
import taskList from 'c/taskList';

describe('c-task-list', () =>{

    afterEach(() =>{
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('display message', () => { 
        const element = createElement('c-task-list', {is : taskList});
        document.body.appendChild(element);

        const inputBox = element.shadowRoot.querySelector('[data-id="task"]');
        expect(inputBox.label).toBe('To do');
    });
    
});
