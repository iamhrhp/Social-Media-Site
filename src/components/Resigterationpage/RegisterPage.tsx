import { Button, Box, Typography, CardMedia, TextField } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import fb from '../../images/logo/fb.png';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { auth, db } from '../../firebase/firebaseConfig';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

interface IProps {}

const RegisterPage: FC = (props: IProps) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [hashedpass, setHashedPass] = useState<string>('');

  const navigate = useNavigate();
  const uid = uuidv4();

  const navigateToLogin = () => {
    !isLogin ? setIsLogin(true) : setIsLogin(false);
  };

  // console.log(userss);
  const userRef = collection(db, 'users');

  // console.log(hashedpass);

  const handleSignUp = async () => {
    if (email === '' || password === '') {
      alert('Please Enter the valid User Details');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const userRef = doc(db, 'users', userCredential.user.uid);
        await setDoc(userRef, { email, hashedPassword });
        // console.log(userCredential.user);
        if (userCredential.user) {
          setIsLogin(false);
          setEmail('');
          setPassword('');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  isLogin;

  const handleSignIn = async () => {
    if (email === '' || password === '') {
      alert('Please Enter the valid User Details');
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        // console.log('login User', userCredential.user);
        const userRef = doc(db, 'users', userCredential.user.uid);
        const userDoc = await getDoc(userRef);
        const passwordHash = userDoc.data()?.hashedPassword;
        const userName = userCredential.user.email;
        // console.log('userName', userName);

        // console.log('password hash', passwordHash);
        if (passwordHash) {
          navigate('/feed', { state: userName });
        }
      } catch (e) {
        alert('User Not Exist');
      }
    }
  };

  return (
    <Box>
      <Box className="flex">
        <Box className="flex-col text-center bg-sky-900 h-screen p-4 pt-[15%] w-[300px]">
          <Box className="m-auto w-[100px] pb-2">
            <CardMedia component="img" src={fb} />
          </Box>
          {isLogin ? (
            <Box>
              <Typography className="text-4xl text-sky-200">
                Welcome Back
              </Typography>
              <Typography className="text-sm text-sky-200 mt-1 mb-5">
                To keep sharing your work with us, <br /> please log in
              </Typography>
              <Button className="signinBtn" onClick={navigateToLogin}>
                Sign In
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography className="text-4xl text-sky-200">
                Are You New ?
              </Typography>
              <Typography className="text-sm text-sky-200 mt-1 mb-5">
                To keep sharing your work with us, <br /> please Sign up
              </Typography>
              <Button className="signinBtn" onClick={navigateToLogin}>
                Sign Up
              </Button>
            </Box>
          )}
        </Box>
        <Box className="h-screen text-center">
          <Box className="flex flex-col transform absolute top-[25%] left-[50%] w-1/4">
            {isLogin ? (
              <Typography className="font-bold text-3xl text-sky-900 mb-10">
                Create Account
              </Typography>
            ) : (
              <Typography className="font-bold text-3xl text-sky-900 mb-10">
                Log In
              </Typography>
            )}
            <TextField
              label="Name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 w-4/4"
            />
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-10"
              type="password"
            />
            <Button
              onClick={isLogin ? handleSignUp : handleSignIn}
              className="w-2/4 m-auto text-base font-semibold rounded-full p-3 bg-sky-900 text-white text-1xl border-solid border-2 hover:bg-white hover:text-sky-900 hover:border-solid hover:border-2 hover:border-sky-900"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
