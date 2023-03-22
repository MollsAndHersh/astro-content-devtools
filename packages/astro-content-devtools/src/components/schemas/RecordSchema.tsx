import { type Component, Show } from 'solid-js'

import { type RecordSchemaType, type SchemaProps } from '../../libs/schema'

import styles from './ObjectSchema.module.css'
import { Schema } from './Schema'

export const RecordSchema: Component<SchemaProps<RecordSchemaType>> = (props) => {
  return (
    <div>
      <div class={styles['header']}>
        record
        <Show when={props.nullable}>
          <span>(nullable)</span>
        </Show>
      </div>
      <div class={styles['record']}>
        <div class={styles['propertyName']}>[key: string]</div>
        <div>
          <Schema schema={props.schema.additionalProperties} />
        </div>
      </div>
    </div>
  )
}
