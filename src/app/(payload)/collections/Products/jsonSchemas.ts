import { JSONSchema7TypeName } from 'json-schema'

export const jsonSchemaUnitBoxBoolean = {
  uri: 'a://b/foo.json', // required
  fileMatch: ['a://b/foo.json'], // required
  schema: {
    required: ['unit', 'box'],
    properties: {
      unit: {
        type: 'boolean' as JSONSchema7TypeName,
      },
      box: {
        type: 'boolean' as JSONSchema7TypeName,
      },
    },
  },
}

export const jsonSchemaUnitBoxString = {
  uri: 'a://b/foo.json', // required
  fileMatch: ['a://b/foo.json'], // required
  schema: {
    required: ['unit', 'box'],
    properties: {
      unit: {
        type: 'string' as JSONSchema7TypeName,
      },
      box: {
        type: 'string' as JSONSchema7TypeName,
      },
    },
  },
}

export const jsonSchemaUnitBoxNumber = {
  uri: 'a://b/foo.json', // required
  fileMatch: ['a://b/foo.json'], // required
  schema: {
    required: ['unit', 'box'],
    properties: {
      unit: {
        type: 'number' as JSONSchema7TypeName,
      },
      box: {
        type: 'number' as JSONSchema7TypeName,
      },
    },
  },
}

export const jsonSchemaLanguages = {
  uri: 'a://b/foo.json', // required
  fileMatch: ['a://b/foo.json'], // required
  schema: {
    required: ['pt'],
    properties: {
      pt: {
        type: 'number' as JSONSchema7TypeName,
      },
    },
  },
}
