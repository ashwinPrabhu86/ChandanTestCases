import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types'
import { Input, Select, FormGroup, fields } from 'wfui-dsm-react-ui' 
import getMessage from '../../../content/messages';
import { getSelectOptions } from '../../../content/getSelectOptions';
import { updateFieldData } from '../../../../model/applicant-info/actions';

const GettingKnow = props => {
    const dispatch = useDispatch();
    const { customerDetails } = props;

    useEffect(() => {
        let index = 0;
        if(customerDetails.dependentsAgeList && customerDetails.dependentsAgeList.length > 0 ) {
            dispatch(
                fields.change([
                    {
                        id: 'dependents',
                        value: customerDetails.dependentsAgeList.length
                    },
                ]),
            );
        }
        if (customerDetails.dependentsAgeList && customerDetails.dependentsAgeList.length > 0) {
            const ageList = customerDetails.dependentsAgeList;
            while (index < ageList.length) {
                dispatch(
                    fields.change([
                        {
                            id: (index + 1).toString(),
                            value: ageList[index],
                        },
                    ]),
                );
                index += 1;
            }
        }
    }, []) // on component load only

    //Below function is missing in text case. It is triggered when user selects dropdown on form (line 42-60 missing) 
    const selectDependents = selectedValue => {
        let index = 0;
        dispatch(updateFieldData('dependents', Number(selectedValue)));
        dispatch(
            fields.change([{ id: 'dependents', value: Number(selectedValue) }]),
        );
        const ageList = customerDetails.dependentsAgeList;
        while (index < Number(selectedValue)) {
            dispatch(
                fields.change([
                    {
                        id: (index + 1).toString(),
                        value: ageList[index] ? ageList[index]: '',
                    },
                ]),
            );
            index += 1;
        }
    };


    return (
        <>
          <FormGroup>
            <Select
              id="dependents"
              options={getSelectOptions('DEPENDENTS')}
              customChangeCallback={selectDependents}
            />
            { customerDetails.dependents && 
              [...Array(+customerDetails.dependentsAgeList)].map((_, index) => {
                  return (
                      <Input 
                        id={(index+1).toString()}
                        key={(index+1).toString()}
                      />
                  )
              })
            
            }
          </FormGroup>
        </>
    )
}

GettingKnow.propTypes = {
    customerDetails: PropTypes.object
}

export default GettingKnow;