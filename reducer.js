import { 
    INIT_APPLICANT_REQUEST,
    APPLICANT_REQUEST_SUCCESS,
    APPLICANT_REQUEST_FAILURE,
    UPDATE_FIELD_DATA
} from './constants';

const initialState = {
    userData: {}
}

const applicantData = (state = initialState, action) => {
    switch (action.type) {
        case INIT_APPLICANT_REQUEST:
        case APPLICANT_REQUEST_FAILURE:
          return {
              ...state
          }

        case APPLICANT_REQUEST_SUCCESS: {
            return {
                ...state,
                userData: action.payload.data.attributes
            }
        }

        case UPDATE_FIELD_DATA: {
            const {field, value } = action;
            return {
                ...state,
                userData: {
                  ...state.userData,
                  [field]: value
                }
            }
        }

        default:
            return state;
    }
};
export default applicantData;