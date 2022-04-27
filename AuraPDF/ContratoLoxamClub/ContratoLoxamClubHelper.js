({
    buscarConta : function(component, event, helper) { 
        component.set('v.loading', true);
        let action = component.get('c.getAccountById');

        action.setParams({
            accountId: component.get('v.accountId')
        });

        action.setCallback(this, function (response) 
        {
            let state = response.getState();
            let responseValue = response.getReturnValue();
            let responseError = response.getError();

            if (state == 'SUCCESS')
            {
                component.set('v.loading', false);
                component.set('v.termoContrato', true);
                component.set('v.listAccount', responseValue);
                console.log(component.get('v.listAccount'));
            } 
            
            else if (state == 'ERROR') 
            {   
                component.set('v.welcome', false);
                component.set('v.loading', false);
                for(let error of responseError)
                {
                    console.log(error);
                    if(error.message == 'Esta Conta não é da Construção Civil.')
                    {
                        component.set('v.exceptionConstrucaoCivil', true);
                    }
                    else if(error.message == 'Esta Conta já participa do Loxam Club.')
                    {
                        component.set('v.exceptionParticipanteLoxamClub', true);
                    }
                    else if(error.message == 'Conta não encontrada.')
                    {
                        component.set('v.exceptionAccountNaoEncontrada', true);
                    }
                    else if(error.message == "Attempt to de-reference a null object")
                    {
                        component.set('v.exceptionAccountNaoEncontrada', true);
                    }
                    else if(error.message.includes('Invalid id:'))
                    {
                        component.set('v.exceptionAccountNaoEncontrada', true);
                    }
                }
            }
        });
        $A.enqueueAction(action);
    },

    tornarLoxamClub : function(component, event, helper) {

        let action = component.get('c.updateAccountForLoxamClub');
        let listAccount = component.get('v.listAccount');

        console.log('listAccount: ' + listAccount);
        console.log('listAccount em String: ' + JSON.stringify(listAccount));

        action.setParams({
            listAccountViewModelJSON: JSON.stringify(listAccount)
        });

        action.setCallback(this, function (response) 
        {
            let state = response.getState();
            let responseValue = response.getReturnValue();
            let responseError = response.getError();

            console.log('state do update: ' + state );

            if (state == 'SUCCESS')
            {
                component.set('v.contratoAceito', true);
                component.set('v.loading', false);

                console.log(responseValue);
            }
            else if(state == 'ERROR') 
            {
                for(error of responseError) 
                {
                    console.log('error ' + error );
                }
            }
       });

       $A.enqueueAction(action);
    },


    buscarTermoContrato : function(component, event, helper) {

        let action = component.get('c.getTermoContrato');

        action.setCallback(this, function (response) 
        {
            
            let state = response.getState();
            let responseValue = response.getReturnValue();

            if (state == 'SUCCESS')
            {
                component.set('v.listTermoContrato', responseValue);
            } 

       });
       $A.enqueueAction(action);
    },
})