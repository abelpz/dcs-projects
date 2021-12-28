import { useSelector } from "react-redux"
import Login from "./Login"
import SelectOrg from "./Org"
import Head from "next/head"
import { APP_NAME } from "@common/constants"
import { t } from "i18next"
import SettingsStepper from "./SettingsStepper"
import { Box } from "@mui/material"

export default function Layout({ children }) {
    return (
    <>
        <Head>
            <title>{APP_NAME}</title>
            <meta name="description" content="POC of handling DCS issues with react" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box component="main" sx={{height:"100vh"}}>{children}</Box>      
    </>
      
  )
}