import axios from "axios";
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import { auth } from "../../firebase-config";
// import { AuthContext } from "../../context/AuthContext";
// import { useUserData } from "../../context/UserDataContext";


// ----------------------------------------------------------------------

export default function LoginView() {
  // const navigate = useNavigate()

  const theme = useTheme();

  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  // const { dispatch } = useContext(AuthContext);
  // const { userDatas ,updateUserData } = useUserData();

  // const handleClick = () => {
  //   router.push('/dashboard');
  // };

  const handleSignIn = async () => {
    try {

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential.user.email);

      const check = await axios.get(
        `http://127.0.0.1:1128/api/user/checkMail/${userCredential.user.email}`
      );
      // const userData = check.data
      if (check.data.email === userCredential.user.email && check.data.type === "pharmacy" && check.data.Pharmacy.isverified) {
        // dispatch({ type: "LOGIN", payload: user });
        // updateUserData(check.data)
        localStorage.setItem("userData", JSON.stringify(check));
        const storedUserData = localStorage.getItem("userData");
        const userDatas = storedUserData ? JSON.parse(storedUserData) : null;
        console.log(userDatas);
        router.push('/dashboard');
      }
      //  else {
      //   setError(true);
      //   setConfirmLoading(false);
      // }
    } catch (error) {
      // setError(true);
      // setConfirmLoading(false);
      console.error(error);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={(e) => {
          setEmail(e.target.value)
        }} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSignIn}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" style={{paddingBottom:'3rem'}}>Sign in to MediCo</Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
