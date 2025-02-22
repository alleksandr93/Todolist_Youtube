import type { AppRootState } from './store'

export const selectStatus = (state: AppRootState) => state.app.status
export const selectIsInitialized = (state: AppRootState) => state.app.isInitialized
export const selectIsLoggedIn = (state: AppRootState) => state.auth.isLoggedIn
export const selectTodolists = (state: AppRootState) => state.todolists
export const selectTasks = (state: AppRootState) => state.tasks
