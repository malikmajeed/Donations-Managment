import Header from './components/common/Header'
import { Bounce, Flip, Slide, ToastContainer, Zoom } from 'react-toastify';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import HomePage from './components/pages/home-page'
import { AuthenticationForm } from './components/common/AuthenticationForm';

// import AdminDashboard from './components/pages/adminDashbaord/AdminDashboard'
// import DonationCart from './components/donations/donationCart'
// import Dashboard from './components/pages/adminDashbaord/Dashboard'

const queryClient = new   QueryClient();


function App() {

  return (
    <> 
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
  <QueryClientProvider client={queryClient} >

         <Header />
    {/* <GetStudentByID studentId={"6842cacb05709a76c110f023"}/> */}
   
        {/* <HomePage /> */}
        <AuthenticationForm />
        {/* <DonationCart causeId="687f3e9d6da95ff8b4a5f1a7"/> */}
       

        </QueryClientProvider>
        </>
        
  )
}

export default App
