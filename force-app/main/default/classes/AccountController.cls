public with sharing class AccountController {
    // Just a simple Apex method to fetch the first 5 accounts from a Salesforce org.
    @AuraEnabled
    public static List<Account> getAccounts() {
        return [SELECT Id, Name FROM Account WITH_SECURITY_ENFORCED LIMIT 5];
    }
}
