import React from 'react'
import ResourcesForm from './ResourcesForm'
import SettingsLayout from '@components/SettingsLayout'
import NoSsr from '@mui/base/NoSsr';

const SelectRepo = ({appName}) => {
    return (
        <NoSsr>
            <SettingsLayout title={appName}>
                <ResourcesForm appName="dcs-projects"></ResourcesForm>
            </SettingsLayout>
        </NoSsr>
    )
}

export default SelectRepo
