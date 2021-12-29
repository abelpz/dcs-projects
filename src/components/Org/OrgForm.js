import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

//mui
import { useSelector } from 'react-redux'
import SettingsForm from '@components/SettingsForm'
import useOrgApi from '@hooks/useOrgApi'
import { InputLabel, MenuItem, Select, FormControl, Avatar, ListItem, ListItemAvatar, ListItemText, Stack, Autocomplete, TextField, Typography} from '@mui/material'
import SelectListItem from '@components/FormFields/SelectListItem'


function OrgForm({ handleOnChange }) {
  const { t, i18n } = useTranslation()
  const [token, savedOrg] = useSelector(state => [state?.auth?.token?.sha1, state?.org])
  const [isLoading, error, orgs, setOrgs, org, setOrg] = useOrgApi(token)
  useEffect(() => {
    setOrgs()
  }, [setOrgs])
  const handleChange = (e) => {
    setOrg(e.target.value)
    handleOnChange()
  }
  return (
    <SettingsForm
      isLoading={isLoading}
      error={error}
      label={t("Select an organization")}
      errorMessage={t("Could not find the user organizations. Contact your organization admin.")}
    >
      <FormControl fullWidth>
        <InputLabel id="select-org-label">{t("Organization")}</InputLabel>
        <Select
          labelId="select-org-label"
          id="demo-simple-select"
          value={(orgs?.find((fetchedOrg) => fetchedOrg.id === org?.id)) ? org.id : (savedOrg.id || "")}
          renderValue={(value) => {
            const selectedOrg = org?.id ? org : savedOrg
            if(!selectedOrg?.id) return undefined
            return (
              <SelectListItem
                component="div"
                avatar={{
                  alt: selectedOrg.name,
                  src: selectedOrg.avatar_url
                }}
                text={{
                  primary: selectedOrg.full_name !== "" ? selectedOrg.full_name : selectedOrg.username,
                  secondary: selectedOrg.description
                }}
              />
            )
          }}
          label={t("Organization")}
          onChange={handleChange}
          sx={{ textOverflow: 'ellipsis' }}
        >
          <MenuItem disabled value="">
            <em>{t("Organizations")}</em>
          </MenuItem>
          {(orgs.length > 0)
            ? orgs.map((org) => (
                <MenuItem value={org.id} key={org.id}>
                  <SelectListItem
                    component="div"
                    avatar={{
                      alt: org.name,
                      src: org.avatar_url
                    }}
                    text={{
                      primary: org.full_name !== "" ? org.full_name : org.username,
                      secondary: org.description
                    }}
                  />
                </MenuItem>
              ))
            : <MenuItem value={savedOrg.id} key={savedOrg.id}>
                <SelectListItem
                  component="div"
                  avatar={{
                    alt: savedOrg.name,
                    src: savedOrg.avatar_url
                  }}
                  text={{
                    primary: savedOrg.full_name !== "" ? savedOrg.full_name : savedOrg.username,
                    secondary: savedOrg.description
                  }}
                />
              </MenuItem>
          }
        </Select>
      </FormControl>
    </SettingsForm>
  )
}

OrgForm.propTypes = {
  appName: PropTypes.string
}

export default OrgForm
