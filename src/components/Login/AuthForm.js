import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useLogin from '@hooks/useLogin'
import { TOKEN_ID } from '@common/constants'
import { useDispatch, useSelector } from 'react-redux'
import { PASSWORD_RECOVERY_LINK, SIGNUP_LINK } from '@common/constants'
import { settingsAdded } from '@store/slices/settings'

//mui
import TextField from '@mui/material/TextField'
import SettingsForm from '@components/SettingsForm'
import { Button, CircularProgress, InputAdornment, Stack, Link, FormControlLabel, Checkbox, Divider, Typography } from '@mui/material'
import useLogout from '@hooks/useLogout'
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useTranslation } from 'react-i18next'

function AuthForm({ handleOnChange }) {
  const { t, i18n } = useTranslation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [disabled, setDisabled] = useState()
  
  const [isLoading, error, setLogin] = useLogin(TOKEN_ID)
  const dispatch = useDispatch()
  const { token, user } = useSelector(state => state.auth !== null && state.auth)
  const settings = useSelector(state => state.settings)
  const [keepLoggedIn, setKeepLoggedIn] = useState(settings.saveToken)

  const handleFormSubmit = () => {
    if (username && password)
      setLogin({ username, password }).then((token) => {
        if(token && handleOnChange) handleOnChange()
      })
  }

  const handleKeepLoggedIn = (event) => {
    const newSettings = {
      ...settings,
      saveToken: event.target.checked,
    }
    setKeepLoggedIn(event.target.checked)
    dispatch(settingsAdded(newSettings))
  }

  useEffect(() => {
    setDisabled(isLoading || !!token?.sha1)
  }, [isLoading,token?.sha1])

  const logout = useLogout()
  const handleLogout = () => {
    logout()
    setPassword('')
  }

  return (
    <>
      <SettingsForm
        isLoading={isLoading}
        error={error}
        label={t('Login')}
        errorMessage={t("Something went wrong, please try again.")}
      >
        <TextField
          required
          disabled={disabled}
          id="name"
          label={t("Username")}
          defaultValue={user?.username}
          fullWidth={true}
          onChange={(e) => setUsername(e.target.value)}
          inputProps={{
            style: {
              borderRadius: 'unset',
              WebkitBoxShadow: `0 0 0 100px #232323 inset`
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          required
          disabled={disabled}
          id="password"
          type="password"
          label={t("Password")}
          value={password}
          fullWidth={true}
          onChange={e => setPassword(e.target.value)}
          inputProps={{
            style: {
              borderRadius: 'unset',
              WebkitBoxShadow: `0 0 0 100px #232323 inset`
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VpnKeyIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <Link target="_blank" href={PASSWORD_RECOVERY_LINK} variant="caption">{t('Forgot password?')}</Link>
            )
          }}
        />

        <FormControlLabel
          label={
            <Typography variant="caption">{t("Keep me logged in")}</Typography>
          }
          control={
            <Checkbox
              //size="small"
              //disabled={disabled && settings.saveToken}
              onChange={handleKeepLoggedIn}
              checked={
                keepLoggedIn || false
              }
            />
          } 
        />

        <Stack spacing={2} direction="row" sx={{ mt: '1rem' }}>
          <Button disabled={disabled} color="primary" variant="contained" onClick={handleFormSubmit} sx={{flex:1}}>
            {
              isLoading ?
                <>
                  <CircularProgress size="1rem" sx={{mr:'0.5rem'}}/> {t("Loading...")}
                </>
              : t('Login')
            }
          </Button>
          { token?.sha1 && 
            <Button variant="outlined" onClick={handleLogout} sx={{flex:1}}>
              {t('Logout')}
            </Button>
          }
        </Stack>      
      </SettingsForm>
      <Typography variant="caption">{t("Need an account?")}{" "}<Link target="_blank" href={SIGNUP_LINK}>{t("Register now")}</Link></Typography>
    </>
  )
}

AuthForm.propTypes = {
  appName: PropTypes.string
}

export default AuthForm

