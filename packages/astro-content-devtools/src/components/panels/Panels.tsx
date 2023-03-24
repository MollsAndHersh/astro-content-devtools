import { type ParentComponent } from 'solid-js'

import { useDevtools } from '../../hooks/useDevtools'
import { ErrorBoundary } from '../ErrorBoundary'

import styles from './Panels.module.css'

export const Panels: ParentComponent = (props) => {
  const { isOverlayOpened } = useDevtools()

  return (
    <div class={styles.devtools} classList={{ [styles.opened!]: isOverlayOpened() }}>
      <ErrorBoundary>{props.children}</ErrorBoundary>
    </div>
  )
}
