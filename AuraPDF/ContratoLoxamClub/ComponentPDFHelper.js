({
    method : function(component, event, helper) { 
        component.set('v.loading', true);
        // let action = component.get('c.');

        // action.setParams({

        // });

        action.setCallback(this, function (response) 
        {
            let state = response.getState();
            let responseValue = response.getReturnValue();
            let responseError = response.getError();

            if (state == 'SUCCESS')
            {
                component.set('v.loading', false);
            } 
            
            else if (state == 'ERROR') 
            {   
                for(let error of responseError)
                {
                    console.log(error);
                }
            }
        });
        $A.enqueueAction(action);
    }

})