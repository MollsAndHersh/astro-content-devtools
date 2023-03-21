import { type JsonSchema7AnyType } from 'zod-to-json-schema/src/parsers/any'
import { type JsonSchema7BigintType } from 'zod-to-json-schema/src/parsers/bigint'
import { type JsonSchema7BooleanType } from 'zod-to-json-schema/src/parsers/boolean'
import { type JsonSchema7DateType } from 'zod-to-json-schema/src/parsers/date'
import { type JsonSchema7LiteralType } from 'zod-to-json-schema/src/parsers/literal'
import { type JsonSchema7NumberType } from 'zod-to-json-schema/src/parsers/number'
import { type JsonSchema7ObjectType } from 'zod-to-json-schema/src/parsers/object'
import { type JsonSchema7RecordType } from 'zod-to-json-schema/src/parsers/record'
import { type JsonSchema7StringType } from 'zod-to-json-schema/src/parsers/string'

export function isObjectSchema(schema: JsonSchema): schema is ObjectSchemaType {
  return isTypedSchema(schema) && schema.type === 'object' && 'properties' in schema
}

export function isStringSchema(schema: JsonSchema): schema is StringSchemaType {
  return (
    isTypedSchema(schema) &&
    !isConstSchema(schema) &&
    schema.type === 'string' &&
    (schema as StringSchemaType).format !== 'date-time'
  )
}

export function isNumberSchema(schema: JsonSchema): schema is NumberSchemaType {
  return (
    isTypedSchema(schema) &&
    !isConstSchema(schema) &&
    (schema.type === 'number' || (schema.type === 'integer' && !('format' in schema)))
  )
}

export function isBooleanSchema(schema: JsonSchema): schema is BooleanSchemaType {
  return isTypedSchema(schema) && !isConstSchema(schema) && schema.type === 'boolean'
}

export function isBigIntSchema(schema: JsonSchema): schema is BigIntSchemaType {
  return isTypedSchema(schema) && schema.type === 'integer' && 'format' in schema
}

export function isDateSchema(schema: JsonSchema): schema is DateSchemaType {
  return isTypedSchema(schema) && schema.type === 'string' && (schema as StringSchemaType).format === 'date-time'
}

export function isRecordSchema(schema: JsonSchema): schema is RecordSchemaType {
  return isTypedSchema(schema) && schema.type === 'object' && !('properties' in schema)
}

export function isLiteralSchema(schema: JsonSchema): schema is LiteralSchemaType {
  return (
    isTypedSchema(schema) &&
    (schema.type === 'string' || schema.type === 'number' || schema.type === 'integer' || schema.type === 'boolean') &&
    isConstSchema(schema)
  )
}

export function isConstSchema(schema: JsonSchema): schema is ConstSchema {
  return (
    typeof (schema as ConstSchema).const === 'string' ||
    typeof (schema as ConstSchema).const === 'number' ||
    typeof (schema as ConstSchema).const === 'boolean'
  )
}

function isTypedSchema(schema: JsonSchema): schema is TypedSchema {
  return typeof (schema as TypedSchema).type === 'string'
}

// TODO(HiDeoo)
export type JsonSchema =
  | StringSchemaType
  //   | JsonSchema7ArrayType
  | NumberSchemaType
  | BigIntSchemaType
  | BooleanSchemaType
  | DateSchemaType
  //   | JsonSchema7EnumType
  | LiteralSchemaType
  //   | JsonSchema7NativeEnumType
  //   | JsonSchema7NullType
  | ObjectSchemaType
  | RecordSchemaType
  //   | JsonSchema7TupleType
  //   | JsonSchema7UnionType
  //   | JsonSchema7UndefinedType
  //   | JsonSchema7RefType
  //   | JsonSchema7NeverType
  //   | JsonSchema7MapType
  | JsonSchema7AnyType
//   | JsonSchema7NullableType
//   | JsonSchema7AllOfType
//   | JsonSchema7UnknownType
//   | JsonSchema7SetType

export type BigIntSchemaType = JsonSchema7BigintType
export type BooleanSchemaType = JsonSchema7BooleanType
export type DateSchemaType = JsonSchema7DateType
export type LiteralSchemaType = JsonSchema7LiteralType
export type NumberSchemaType = JsonSchema7NumberType
export type ObjectSchemaType = JsonSchema7ObjectType
export type RecordSchemaType = JsonSchema7RecordType
export type StringSchemaType = JsonSchema7StringType

interface TypedSchema {
  type: string
}

interface ConstSchema {
  const: string | number | boolean
}

export interface WithSchemaProps<TSchema> {
  schema: TSchema
}
