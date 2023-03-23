import { type Component, For, Show } from 'solid-js'

import {
  isObjectSchema,
  isRecordSchema,
  type JsonSchema,
  type ObjectSchemaType,
  type SchemaProps,
} from '../../libs/schema'

import { Schema } from './Schema'
import { TabularSchema } from './TabularSchema'

export const ObjectSchema: Component<ObjectSchemaProps> = (props) => {
  const properties = () => Object.entries(props.schema.properties)

  return (
    <Show when={properties().length > 0} fallback={props.root ? '// TODO' : 'object'}>
      <TabularSchema nullable={props.nullable} showBorder={!props.root} showHeader={!props.root} type="object">
        <For each={properties()}>
          {([propertyName, propertySchema]: [string, JsonSchema]) => {
            const isRequired = isRequiredProperty(propertyName, props.schema.required)
            const isNested = isObjectSchema(propertySchema) || isRecordSchema(propertySchema)

            const SchemaContent = () => <Schema schema={propertySchema} />

            return (
              <>
                <TabularSchema.PropertyName required={isRequired}>{propertyName}</TabularSchema.PropertyName>
                <Show when={isNested} fallback={<SchemaContent />}>
                  <div>
                    <SchemaContent />
                  </div>
                </Show>
                <div>
                  <Show when={isRequired} fallback="optional">
                    required
                  </Show>
                </div>
              </>
            )
          }}
        </For>
      </TabularSchema>
    </Show>
  )
}

function isRequiredProperty(propertyName: string, required: string[] | undefined) {
  return required?.includes(propertyName) ?? false
}

interface ObjectSchemaProps extends SchemaProps<ObjectSchemaType> {
  root?: boolean | undefined
}
