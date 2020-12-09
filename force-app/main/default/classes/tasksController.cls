public with sharing class tasksController {

    @AuraEnabled(cacheable=true)
    public static List<Task__c> getRecords(){
        try {
            return [SELECT id, message__c, priority__c FROM Task__c ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}