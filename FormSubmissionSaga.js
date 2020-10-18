import { takeEvery, call, put } from 'rediux-saga/effects';
import { popup } from 'wfui-dsm-react-ui'
import constructApiData from '../update-applicant-info/construct-api-data';
import {
    INIT_FORM_SUBMISSION,
    INIT_SAVE_SUBMISSION
}  from '../../model/form-submission/constants'
import { formSubmitFailure } from '../../model/form-submission/action';
import { saveRecommendations } from '../../model/save-reco/action';
import { postData } from '../../communication/api';

export const formSubmission = function*(action) {
    try {
        const { submitPayload, onFormSubmitSuccess, onFormSubmitError } = action;
        yield put(popup.open('wait-popup'));
        const modifyData = {
            store: submitPayload.customerDetails,
            formFields: submitPayload.formFields,
            actionType: submitPayload.actionType
        }
        const formData = yield call(constructApiData, modifyData);
        const response = yield call(postData, submitPayload.url, formData);

        if(response.data.attributes.status === 'SUCCESS') {
            yield put(saveRecommendations(response.data.attributes.recommendedPriorities));
            yield call(onFormSubmitSuccess)
        }
        else if(typeof onError === 'function')
            yield call(onFormSubmitError)
    } catch (error) {
        if (typeof onError === 'function') {
            yield call(onError);
        }
        yield put(formSubmitFailure(error));
    }
    yield put(popup.close('wait-popup'))
}


export const saveSubmission = function*(action) {
    try {
        const { url, customerDetails, formFields, pageId } = action;
        yield put(popup.open('wait-popup'));
        const saveData = {
            store: customerDetails,
            formFields,
            actionType: pageId
        }
        const formData = yield call(constructApiData, modifyData);
        const response = yield call(postData, url, formData);

        if(response.data.attributes.status === 'SUCCESS') {
            window.close()
        }
    } catch (error) {
        if (typeof onError === 'function') {
            yield call(onError);
        }
        yield put(formSubmitFailure(error));
    }
    yield put(popup.close('wait-popup'))
}

export default function* formSubmissionSaga() {
    yield takeEvery(INIT_FORM_SUBMISSION, formSubmission);
    yield takeEvery(INIT_SAVE_SUBMISSION, saveSubmission);
}