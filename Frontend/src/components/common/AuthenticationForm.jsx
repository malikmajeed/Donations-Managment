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
  import { GoogleButton } from '../buttons/';

  import { validateSignupForm } from '../../utils/validateSignup';
  import { useRegisterUser } from '../../hooks/useAuthActions';

  
  export function AuthenticationForm(props) {

    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
      initialValues: {
        fName: "",
        lName: "",
        email: "",
        
        password: "",
        confirmPassword: "",
       
      },
  
      validate: (values) => {
        const errors = validateSignupForm(values);
        return errors;
      },
    });


const { mutateAsync, isPending } = useRegisterUser();


// handle submit
const handleSubmit = form.onSubmit(async (values) => {
    
      await mutateAsync(values); // calls API
      form.reset(); // clears form on success
    
  });


    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <Paper radius="md" p="lg" withBorder {...props} className="w-full max-w-md">
          <Text size="xl" className='font-bold'  fw={500}>
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
              <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                {type === 'register'
                  ? 'Already have an account? Login'
                  : "Don't have an account? Register"}
              </Anchor>
              <Button type="submit" radius="sm">
                {isPending?"Creating...":type === 'register' ? "Create Account" : "Login"}
              </Button>
            </Group>
          </form>
        </Paper>
      </div>
    );
  }