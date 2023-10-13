import '../styles/globals.css'
import {  Roboto } from "next/font/google";
import {AuthProvider} from '../context/AuthProvider'
import {OrderProvider} from '../context/OrderContext'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createTheme, ThemeProvider } from '@mui/material/styles';
const font = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

const queryClient = new QueryClient();

const theme = createTheme();
export default function App({ Component, pageProps }) {
  return (
    <>
    <QueryClientProvider client={queryClient}>
  <main className={font.className}>
  <AuthProvider>
    <OrderProvider>
    <ThemeProvider theme={theme}>
    <Component {...pageProps}/>
    </ThemeProvider>
    </OrderProvider>
    </AuthProvider>
    </main> 
    </QueryClientProvider>
    </>
    )
}
