({
    doInit : function(component, event, helper) {
        //component.set('v.accountId', '001f000001hboTD'); //- para fins de teste
        helper.buscarConta(component, event, helper);
        helper.buscarTermoContrato(component, event, helper);
        console.log(component.get('v.accountId')); //- para fins de teste
    },

    aceitarContrato: function(component, event, helper) {
        helper.tornarLoxamClub(component, event, helper);
        component.set('v.termoContrato', false);
    }
})