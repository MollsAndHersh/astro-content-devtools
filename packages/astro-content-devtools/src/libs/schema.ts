import { type JsonSchema7AnyType } from 'zod-to-json-schema/src/parsers/any'
import { type JsonSchema7ObjectType } from 'zod-to-json-schema/src/parsers/object'
import { type JsonSchema7StringType } from 'zod-to-json-schema/src/parsers/string'

export function isObjectSchema(schema: JsonSchema): schema is ObjectSchemaType {
  return isTypedSchema(schema) && schema.type === 'object'
}

export function isStringSchema(schema: JsonSchema): schema is StringSchemaType {
  return isTypedSchema(schema) && schema.type === 'string'
}

function isTypedSchema(schema: JsonSchema): schema is TypedSchema {
  return typeof (schema as TypedSchema).type === 'string'
}

// TODO(HiDeoo)
export type JsonSchema =
  | StringSchemaType
  //   | JsonSchema7ArrayType
  //   | JsonSchema7NumberType
  //   | JsonSchema7BigintType
  //   | JsonSchema7BooleanType
  //   | JsonSchema7DateType
  //   | JsonSchema7EnumType
  //   | JsonSchema7LiteralType
  //   | JsonSchema7NativeEnumType
  //   | JsonSchema7NullType
  //   | JsonSchema7NumberType
  | ObjectSchemaType
  //   | JsonSchema7RecordType
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

export type ObjectSchemaType = JsonSchema7ObjectType
export type StringSchemaType = JsonSchema7StringType

interface TypedSchema {
  type: string
}
