import {
    Anchor,
    Button,
    Checkbox,
    Divider,
    Group,
    Paper,
    PasswordInput,
    Stack,
    Text,
    TextInput,
  } from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useToggle } from '@mantine/hooks';
import { GoogleButton, PrimaryButton, SecondaryButton } from '../buttons';
import { useNavigate } from 'react-router-dom';

import { validateSignupForm } from '../../utils/validateSignup';
import { useRegisterUser } from '../../hooks/useAuthActions';

  
  export function AuthenticationForm({ type: initialType = 'login', onTypeChange, onSuccess, ...props }) {
    const navigate = useNavigate();
    const [type, toggle] = useToggle([initialType, initialType === 'login' ? 'register' : 'login']);
    
    const handleToggle = () => {
      const newType = type === 'login' ? 'register' : 'login';
      toggle();
      
      // If onTypeChange is provided (modal mode), use it instead of navigation
      if (onTypeChange) {
        onTypeChange(newType);
      } else {
        // Otherwise navigate (page mode)
        if (newType === 'login') {
          navigate('/auth/log-in');
        } else {
          navigate('/auth/sign-up');
        }
      }
    };
    const form = useForm({
      initialValues: {
        fName: "",
        lName: "",
        email: "",
        
        password: "",
        confirmPassword: "",
       
      },
  
      validate: (values) => {
        if (type === 'register') {
          return validateSignupForm(values);
        } else {
          // For login, only validate email and password
          const errors = {};
          if (!values.email.trim()) {
            errors.email = "Email is required";
          } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Email is invalid";
          }
          if (!values.password) {
            errors.password = "Password is required";
          }
          return errors;
        }
      },
    });


const { mutateAsync, isPending } = useRegisterUser();


// handle submit
const handleSubmit = form.onSubmit(async (values) => {
  try {
    if (type === 'register') {
      await mutateAsync(values); // calls register API
    } else {
      // Handle login logic here
      console.log('Login values:', values);
    }
    form.reset(); // clears form on success
    
    // Call onSuccess callback if provided (for modal mode)
    if (onSuccess) {
      onSuccess();
    }
  } catch (err) {
    console.error('Authentication error:', err);
  }
});


    return (
      <div>
        <Text size="xl" className='font-bold' fw={500}>
         {type === 'register' ? 'Create an Account' : 'Login to your account'}
        </Text>
  
        <form onSubmit={handleSubmit}>
          <Stack>
            {type === 'register' && (
              <>
                <TextInput
                  label="First Name"
                  placeholder="Your first name"
                  value={form.values.fName}
                  onChange={(event) => form.setFieldValue('fName', event.currentTarget.value)}
                  error={form.errors.fName}
                  radius="md"
                />
                <TextInput
                  label="Last Name"
                  placeholder="Your last name"
                  value={form.values.lName}
                  onChange={(event) => form.setFieldValue('lName', event.currentTarget.value)}
                  error={form.errors.lName}
                  radius="md"
                />
              </>
            )}
  
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email}
              radius="md"
            />
  
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password}
              radius="md"
            />

            {type === 'register' && (
              <PasswordInput
                required
                label="Confirm Password"
                placeholder="Confirm your password"
                value={form.values.confirmPassword}
                onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
                error={form.errors.confirmPassword}
                radius="md"
              />
            )}
          </Stack>
  
           <Group justify="space-between" mt="xl">
             <Anchor component="button" type="button" c="dimmed" onClick={handleToggle} size="xs">
               {type === 'register'
                 ? 'Already have an account? Login'
                 : "Don't have an account? Register"}
             </Anchor>
             <PrimaryButton type="submit" disabled={isPending}>
               {isPending ? (type === 'register' ? "Creating..." : "Logging in...") : (type === 'register' ? "Create Account" : "Login")}
             </PrimaryButton>
           </Group>
        </form>
      </div>
    );
  }