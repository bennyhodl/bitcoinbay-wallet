import React from "react"
import { Provider } from "mobx-react"
import { NativeBaseProvider } from "native-base"
import { theme } from "./util/config"
import stores from "./stores"

const AppProvider = ({children}:any) => {
    return (
        <Provider userStore={stores.userStore} lnbitsStore={stores.lnbitsStore}>
            <NativeBaseProvider theme={theme}>
                {children}
            </NativeBaseProvider>
        </Provider>
    )
}

export default AppProvider