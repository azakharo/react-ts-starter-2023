import React, {useCallback, memo} from 'react';
import {
  Box,
  Button,
  FormHelperText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {login, selectError} from '@/store/slices/auth';
import TextField from '@/components/FormikInputs/TextField';
import useIsMountedRef from '@/hooks/useIsMountedRef';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

const v8nSchema = Yup.object().shape({
  username: Yup.string().required('required'),
  password: Yup.string().required('required'),
});

const Login = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isMountedRef = useIsMountedRef();
  const authError = useAppSelector(selectError);

  const handleFormSubmit = useCallback(
    (values, {setSubmitting}) => {
      const {username, password} = values;

      dispatch(login(username, password)).finally(() => {
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      });
    },
    [dispatch, isMountedRef],
  );

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={v8nSchema}
      onSubmit={handleFormSubmit}
    >
      {({handleSubmit, isSubmitting}) => (
        <div className={classes.container}>
          <form noValidate onSubmit={handleSubmit} className={classes.form}>
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
          </form>
        </div>
      )}
    </Formik>
  );
};

export default memo(Login);
