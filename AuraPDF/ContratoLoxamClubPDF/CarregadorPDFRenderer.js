({
    afterRender: function (component, helper) {
        this.superAfterRender();
        helper.load(component, event, helper);
    }
})