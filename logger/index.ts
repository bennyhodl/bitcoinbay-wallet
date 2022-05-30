import {enableLogging} from "mobx-logger"

enableLogging({predicate: () => __DEV__ && Boolean(window.navigator.userAgent)})