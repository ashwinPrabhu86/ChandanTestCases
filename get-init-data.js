export default data => {
    const {formFields, store, actionType } = data 
    // here I am getting formFields in immutable form. If i do formFields.toJS(), i can see all the fields
    // store is the state object and actionType is a string

    const reqBody = {
        "data": {
            "attributes": {
                "actionType": actionType === "landing" ? "SUBMIT": "SAVE",
                "overallHealth": formFields.getIn(['overallHealth', value]), // using immutable getIn function to get value
                "accountId": store.userDetails.accountId
            }
        }
    }
    return reqBody;
}

//How do i test this function ? i dont know how to bring in immutable data and use it in test case coverage
