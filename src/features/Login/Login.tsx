import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import { FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, InputAdornment } from '@mui/material'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useDispatch, useSelector } from 'react-redux'
import { loginTС } from './auth-reduser'
import type { AppRootState } from '../../app/store'
import { Navigate } from 'react-router-dom'

export const Login = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
  const [showPassword, setShowPassword] = useState(false)
  console.log(isLoggedIn)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const formik = useFormik({
    validate: values => {
      if (!values.email) {
        return { email: 'Required' }
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        return { email: 'Invalid email address' }
      }
      if (!values.password) {
        return { password: 'Required' }
      }
    },
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
      captcha: true,
    },
    onSubmit: values => {
      // alert(JSON.stringify(values))
      dispatch(loginTС(values))
    },
  })

  if (isLoggedIn) {
    debugger
    return <Navigate to={'/'} />
  }
  return (
    <div style={{ display: 'flex', width: '100%', alignItems: 'center', marginTop: '150px' }}>
      <Grid container justifyContent={'center'}>
        <Grid item xs={3}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth={true}>
              <FormLabel>
                <p>
                  To log in get registered{' '}
                  <a href="https://social-network.samuraijs.com/" target={'_blank'}>
                    here
                  </a>
                </p>
              </FormLabel>
              <FormGroup>
                <TextField label={'Email'} margin={'normal'} {...formik.getFieldProps('email')} />
                {formik.errors.email ? (
                  <div style={{ color: 'red', fontWeight: '600', textAlign: 'center' }}>{formik.errors.email}</div>
                ) : null}
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  label={'Password'}
                  margin={'normal'}
                  {...formik.getFieldProps('password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {formik.errors.password ? (
                  <div style={{ color: 'red', fontWeight: '600', textAlign: 'center' }}>{formik.errors.password}</div>
                ) : null}
                <FormControlLabel
                  label={'Remember me'}
                  control={<Checkbox {...formik.getFieldProps('rememberMe')} checked={formik.values.rememberMe} />}
                />
                <Button type="submit" variant={'contained'} color="primary">
                  Login
                </Button>
              </FormGroup>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    </div>
  )
}
