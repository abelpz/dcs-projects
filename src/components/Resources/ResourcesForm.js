import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux"
import { resourcesListUpdated } from '@store/slices/resources'
import SettingsForm from '@components/SettingsForm'
import useRepoApi from '@hooks/useRepoApi'

//mui
import { FormControl, List, IconButton, Divider, ListSubheader, Paper } from '@mui/material'

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SelectListItem from '@components/FormFields/SelectListItem'
import ClearIcon from '@mui/icons-material/Clear';
import theme from '@styles/theme'

function ResourcesForm() {
  const dispatch = useDispatch()
  const [token, savedOrg, selectedResources] = useSelector(state => [state.auth.token.sha1, state.org, state.resources.list])
  const [isLoading, error, repos, setRepos, resources, setResources] = useRepoApi(token, dispatch, resourcesListUpdated)
  useEffect(() => {
    setRepos(savedOrg.username)
  }, [setRepos,savedOrg.username])
  const handleChange = (e, value, reason) => {
    const filteredResources = selectedResources.filter( ({owner}) => owner.id !== savedOrg.id)
    setResources([
      ...filteredResources,
      ...value
    ])
  }
  const handleClearResource = (id) => {
    setResources(
      selectedResources.filter((resource) => resource.id !== id)
    )
  }
  return (
    <SettingsForm
      isLoading={isLoading}
      error={error}
      label="Select resources you will be working on"
      errorMessage="Could not find resources in the selected organization. Contact your organization admin."
    >
      <FormControl fullWidth>
        <Stack spacing={3}>
          <Autocomplete
            multiple
            value={selectedResources?.filter(({owner}) => owner.id === savedOrg.id)}
            id="tags-outlined"
            options={repos}
            isOptionEqualToValue={(option,value) => option.id === value.id}
            onChange={handleChange}
            getOptionLabel={(option) => (option.title !== "" ? option.title : option.description)}
            // defaultValue={[repositories[0]]}
            filterSelectedOptions
            renderOption={(props, option) => {
              return (
                <SelectListItem
                  avatar={{
                    alt: option.name,
                    src: option.avatar_url
                  }}
                  text={{
                    primary: option.title !== "" ? option.title : option.name,
                    secondary: option.description
                  }}
                  {...props}
                />
              )
            }}
            disableClearable
            renderTags={(resources, getTagProps) => null}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label="Resources"
                  placeholder="Type your desired resource name here..."
                />
            )}}
          />
        </Stack>
      </FormControl>
      <Paper elevation={6} sx={{mt: '1rem'}}>
        <List>
          <ListSubheader sx={{backgroundColor:'inherit'}}>
            Selected resources
          </ListSubheader>
          <Divider></Divider>
          {selectedResources.map((resource) => (
            resource.owner.id === savedOrg.id &&
            <SelectListItem
              renderButton
              secondaryAction={
                <IconButton aria-label="delete" size="small" onClick={() => handleClearResource(resource.id)}>
                  <ClearIcon fontSize="small"/>
                </IconButton>
              }
              disablePadding
              key={'selected-resource-' + resource.id}
              avatar={{
                alt: resource.name,
                src: resource.avatar_url
              }}
              text={{
                primary: resource.title !== "" ? resource.title : resource.name,
                secondary: resource.description
              }}
              sx={{background:theme.palette.background}}
            />
          ))}
        </List>
      </Paper>
    </SettingsForm>
  )
}

ResourcesForm.propTypes = {
  appName: PropTypes.string
}

export default ResourcesForm
