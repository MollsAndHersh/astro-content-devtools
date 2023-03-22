import { type JsonSchema7AnyType } from 'zod-to-json-schema/src/parsers/any'
import { type JsonSchema7ArrayType } from 'zod-to-json-schema/src/parsers/array'
import { type JsonSchema7BigintType } from 'zod-to-json-schema/src/parsers/bigint'
import { type JsonSchema7BooleanType } from 'zod-to-json-schema/src/parsers/boolean'
import { type JsonSchema7DateType } from 'zod-to-json-schema/src/parsers/date'
import { type JsonSchema7EnumType } from 'zod-to-json-schema/src/parsers/enum'
import { type JsonSchema7LiteralType } from 'zod-to-json-schema/src/parsers/literal'
import { type JsonSchema7NativeEnumType } from 'zod-to-json-schema/src/parsers/nativeEnum'
import { type JsonSchema7NullType } from 'zod-to-json-schema/src/parsers/null'
import { type JsonSchema7NullableType } from 'zod-to-json-schema/src/parsers/nullable'
import { type JsonSchema7NumberType } from 'zod-to-json-schema/src/parsers/number'
import { type JsonSchema7ObjectType } from 'zod-to-json-schema/src/parsers/object'
import { type JsonSchema7RecordType } from 'zod-to-json-schema/src/parsers/record'
import { type JsonSchema7StringType } from 'zod-to-json-schema/src/parsers/string'
import { type JsonSchema7TupleType } from 'zod-to-json-schema/src/parsers/tuple'
import { type JsonSchema7UndefinedType } from 'zod-to-json-schema/src/parsers/undefined'
import { type JsonSchema7UnknownType } from 'zod-to-json-schema/src/parsers/unknown'

export function isObjectSchema(schema: JsonSchema): schema is ObjectSchemaType {
  return isTypedSchema(schema) && schema.type === 'object' && 'properties' in schema
}

export function isStringSchema(schema: JsonSchema): schema is StringSchemaType {
  return (
    isTypedSchema(schema) &&
    !isConstSchema(schema) &&
    !isZodOrNativeEnumSchema(schema) &&
    schema.type === 'string' &&
    (schema as StringSchemaType).format !== 'date-time'
  )
}

export function isNumberSchema(schema: JsonSchema): schema is NumberSchemaType {
  return (
    isTypedSchema(schema) &&
    !isConstSchema(schema) &&
    !isZodOrNativeEnumSchema(schema) &&
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

export function isArrayOrTupleSchema(schema: JsonSchema): schema is ArraySchemaType | TupleSchemaType {
  return isTypedSchema(schema) && schema.type === 'array'
}

export function isTupleSchema(schema: JsonSchema): schema is TupleSchemaType {
  return isTypedSchema(schema) && schema.type === 'array' && Array.isArray((schema as TupleSchemaType).items)
}

export function isVariadicTupleSchema(schema: TupleSchemaType): schema is VariadicTupleSchema {
  return !(`maxItems` in schema) && `additionalItems` in schema
}

export function isZodOrNativeEnumSchema(schema: JsonSchema): schema is EnumSchemaType | NativeEnumSchemaType {
  return isTypedSchema(schema) && 'enum' in schema
}

export function isUndefinedSchema(schema: JsonSchema): schema is UndefinedSchemaType {
  return 'not' in schema
}

export function isUnknownSchema(schema: JsonSchema): schema is UnknownSchemaType {
  return Object.keys(schema).length === 0
}

export function isNullSchema(schema: JsonSchema): schema is NullSchemaType {
  return isTypedSchema(schema) && schema.type === 'null'
}

export function isNullableSchema(schema: JsonSchema): schema is NullableSchemaType {
  return isTypedNullableSchema(schema) || isAnyOfNullableSchema(schema)
}

export function isConstSchema(schema: JsonSchema): schema is ConstSchema {
  return (
    typeof (schema as ConstSchema).const === 'string' ||
    typeof (schema as ConstSchema).const === 'number' ||
    typeof (schema as ConstSchema).const === 'boolean'
  )
}

export function isTypedNullableSchema(schema: JsonSchema): schema is TypedNullableSchema {
  return Array.isArray((schema as TypedNullableSchema).type) && (schema as { type?: string[] }).type?.[1] === 'null'
}

export function isAnyOfNullableSchema(schema: JsonSchema): schema is AnyOfSchema {
  return !isTypedSchema(schema) && 'anyOf' in schema && (schema.anyOf[1] as { type?: string }).type === 'null'
}

export function isTypedSchema(schema: JsonSchema): schema is TypedSchema {
  return typeof (schema as TypedSchema).type === 'string'
}

// TODO(HiDeoo)
export type JsonSchema =
  | StringSchemaType
  | ArraySchemaType
  | NumberSchemaType
  | BigIntSchemaType
  | BooleanSchemaType
  | DateSchemaType
  | EnumSchemaType
  | LiteralSchemaType
  | NativeEnumSchemaType
  | NullSchemaType
  | ObjectSchemaType
  | RecordSchemaType
  | TupleSchemaType
  //   | JsonSchema7UnionType
  | UndefinedSchemaType
  //   | JsonSchema7RefType
  //   | JsonSchema7MapType
  | JsonSchema7AnyType
  | NullableSchemaType
  //   | JsonSchema7AllOfType
  | UnknownSchemaType
//   | JsonSchema7SetType

export type ArraySchemaType = JsonSchema7ArrayType
export type BigIntSchemaType = JsonSchema7BigintType
export type BooleanSchemaType = JsonSchema7BooleanType
export type DateSchemaType = JsonSchema7DateType
export type EnumSchemaType = JsonSchema7EnumType
export type LiteralSchemaType = JsonSchema7LiteralType
export type NativeEnumSchemaType = JsonSchema7NativeEnumType
export type NumberSchemaType = JsonSchema7NumberType
export type NullSchemaType = JsonSchema7NullType
export type NullableSchemaType = JsonSchema7NullableType
export type ObjectSchemaType = JsonSchema7ObjectType
export type RecordSchemaType = JsonSchema7RecordType
export type StringSchemaType = JsonSchema7StringType
export type TupleSchemaType = JsonSchema7TupleType
export type UndefinedSchemaType = JsonSchema7UndefinedType
export type UnknownSchemaType = JsonSchema7UnknownType

interface TypedSchema {
  type: string
}

interface TypedNullableSchema {
  type: [string, 'null']
}

interface AnyOfSchema {
  anyOf: [JsonSchema, NullSchemaType]
}

interface ConstSchema {
  const: string | number | boolean
}

type VariadicTupleSchema = Omit<TupleSchemaType, 'maxItems'> & { additionalItems: JsonSchema }

export interface SchemaProps<TSchema> {
  nullable?: boolean | undefined
  schema: TSchema
}
