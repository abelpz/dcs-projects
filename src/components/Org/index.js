import React from 'react'
import { OrganizationApi } from 'dcs-js'
import OrgForm from './OrgForm'
import SettingsLayout from '@components/SettingsLayout'
import { NoSsr } from '@mui/material'

const SelectOrg = ({appName}) => {
    return (
        <NoSsr>
            <SettingsLayout title={appName}>
                <OrgForm appName="dcs-projects"></OrgForm>
            </SettingsLayout>
        </NoSsr>   
    )
}

export default SelectOrg
