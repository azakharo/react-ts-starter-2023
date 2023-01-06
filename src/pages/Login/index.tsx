import React, {useCallback, memo, useState} from 'react';
import {Box, Button, FormHelperText, Typography} from '@mui/material';
import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';

import TextField from 'src/components/FormikInputs/TextField';
import useAuth from 'src/hooks/useAuth';

const v8nSchema = Yup.object().shape({
  username: Yup.string().required('required'),
  password: Yup.string().required('required'),
});

interface FormValues {
  username: string;
  password: string;
}

const Login = () => {
  const {login} = useAuth();
  const [authError, setAuthError] = useState('');
  const initialValues: FormValues = {
    username: '',
    password: '',
  };

  const handleFormSubmit = useCallback(
    async (values: FormValues, {setSubmitting}: FormikHelpers<FormValues>) => {
      const {username, password} = values;

      try {
        await login(username, password);
      } catch (e) {
        setSubmitting(false);
        setAuthError((e as Error).message);
      }
    },
    [login],
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={v8nSchema}
      onSubmit={handleFormSubmit}
    >
      {({handleSubmit, isSubmitting}) => (
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <form noValidate onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography variant="h4" color="textPrimary">
                Welcome to the test
              </Typography>

              <TextField label="Username" name="username" />

              <TextField label="Password" name="password" type="password" />

              {authError && <FormHelperText error>{authError}</FormHelperText>}

              <Box pt={2}>
                <Button
                  color="secondary"
                  disabled={isSubmitting}
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Login
                </Button>
              </Box>

              <Typography
                align="center"
                variant="subtitle2"
                color="textSecondary"
              >
                For login use &quot;eve.holt@reqres.in&quot; username with any
                password
              </Typography>
            </Box>
          </form>
        </Box>
      )}
    </Formik>
  );
};

export default memo(Login);
