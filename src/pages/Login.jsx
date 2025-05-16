import { useFileHandler, useInputValidation, useStrongPassword } from '6pp';
import { CameraAlt, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button, Container,
  IconButton,
  Paper,
  Stack,
  TextField, Typography
} from '@mui/material';
import Spline from '@splinetool/react-spline';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // ✅ import navigate
import '../components/CssStyles/loginAndSignup.css';
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { server } from '../constants/SCONFIG';
import { userExits } from '../redux/reducer/auth';
import { usernameValidator } from '../utils/Validator';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const toggleLogin = () => setIsLogin(false);
  const toggleSignUp = () => setIsLogin(true);

  const name = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const email = useInputValidation("");
  const password = useStrongPassword();
  const confirmPassword = useInputValidation("");
  const avatar = useFileHandler("single");

  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ create instance

  const handleLogin = async (e) => {
    e.preventDefault();
    const config = {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    };
    try {
      const { data } = await axios.post(`${server}/api/v1/user/login`,
        { username: username.value, password: password.value }, config);
      dispatch(userExits(data.user));
      toast.success(data.message);
      navigate("/"); // ✅ redirect
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const config = {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    };
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("username", username.value);
    formData.append("email", email.value);
    formData.append("password", password.value);
    formData.append("confirmPassword", confirmPassword.value);
    formData.append("avatar", avatar.file);

    try {
      const { data } = await axios.post(`${server}/api/v1/user/new`, formData, config);
      dispatch(userExits(data.user));
      toast.success(data.message);
      navigate("/"); // ✅ redirect
    } catch (error) {
      console.error("❌ Error in newUser:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <div





    >
      <div
        className="left"
        style={{
          width: '50%',
          height: '100%',



        }}
      >




      </div>
      <div className="background" >
        <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
          <Paper
            elevation={6}
            sx={{
              padding: 3,
              borderRadius: '10px',
              maxWidth: 350,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(15, 14, 14, 0.13)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Rubik Puddles",
                borderBottom: '1px solid white',
                color: 'white',
                mb: 2,
                '&:hover': { color: 'blue' }
              }}
            >
              {isLogin ? 'USER LOGIN' : 'SIGN UP'}
            </Typography>

            <form
              onSubmit={isLogin ? handleLogin : handleSignup}
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {!isLogin && (
                <Stack position="relative" width="8rem" mb={2}>
                  <Avatar sx={{ width: '4.5rem', height: '4.5rem', left: '30px', }} src={avatar.preview} />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: '0.5rem',
                      color: 'white',
                      backgroundColor: 'rgba(0, 0, 0, 0.33)',
                      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                    }}
                    component="label"
                  >
                    <CameraAlt fontSize="small" />
                    <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                  </IconButton>
                </Stack>
              )}

              {!isLogin && (
                <>
                  <TextField
                    label="Name"
                    variant="standard"
                    fullWidth
                    required
                    value={name.value}
                    onChange={name.changeHandler}
                    InputLabelProps={{
                      style: { color: 'white', fontSize: '0.8rem' }
                    }}
                    inputProps={{
                      style: { fontSize: '0.85rem', color: 'white' }
                    }}
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    label="Email"
                    variant="standard"
                    fullWidth
                    required
                    type="email"
                    value={email.value}
                    onChange={email.changeHandler}
                    InputLabelProps={{
                      style: { color: 'white', fontSize: '0.8rem' }
                    }}
                    inputProps={{
                      style: { fontSize: '0.85rem', color: 'white' }
                    }}
                    sx={{ mb: 1 }}
                  />
                </>
              )}

              <TextField
                label="Username"
                variant="standard"
                fullWidth
                required
                value={username.value}
                onChange={username.changeHandler}
                InputLabelProps={{
                  style: { color: 'white', fontSize: '0.8rem' }
                }}
                inputProps={{
                  style: { fontSize: '0.85rem', color: 'white' }
                }}
                sx={{ mb: 1 }}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <TextField
                  label="Password"
                  variant="standard"
                  fullWidth
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password.value}
                  onChange={password.changeHandler}
                  InputLabelProps={{
                    style: { color: 'white', fontSize: '0.8rem' }
                  }}
                  inputProps={{
                    style: { fontSize: '0.85rem', color: 'white' }
                  }}
                />
                <IconButton
                  sx={{ color: 'white' }}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Box>

              {!isLogin && (
                <TextField
                  label="Confirm Password"
                  variant="standard"
                  fullWidth
                  required
                  type="password"
                  value={confirmPassword.value}
                  onChange={confirmPassword.changeHandler}
                  InputLabelProps={{
                    style: { color: 'white', fontSize: '0.8rem' }
                  }}
                  inputProps={{
                    style: { fontSize: '0.85rem', color: 'white' }
                  }}
                  sx={{ mt: 1 }}
                />
              )}

              <Button
                variant="contained"
                type="submit"
                sx={{
                  mt: 2,
                  fontFamily: 'Rubik Puddles',
                  fontSize: '0.9rem',
                  width: '60%',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  }
                }}
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>

              <Typography sx={{ color: 'white', my: 1 }}>Or</Typography>

              <Button
                onClick={isLogin ? toggleLogin : toggleSignUp}
                variant="text"
                sx={{ fontFamily: 'Rubik Puddles', color: 'white', fontSize: '0.85rem' }}
              >
                {isLogin ? 'Sign Up' : 'Login Instead'}
              </Button>
            </form>
          </Paper>
        </Container>
      </div>

    </div>


  );
};

export default Login;
