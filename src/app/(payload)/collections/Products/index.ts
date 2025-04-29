import type { CollectionConfig } from 'payload'
import {
  jsonSchemaLanguages,
  jsonSchemaUnitBoxBoolean,
  jsonSchemaUnitBoxNumber,
  jsonSchemaUnitBoxString,
} from './jsonSchemas'

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'sku',
      type: 'json',
      required: true,
      jsonSchema: jsonSchemaUnitBoxString,
    },
    {
      name: 'ean',
      type: 'json',
      required: true,
      jsonSchema: jsonSchemaUnitBoxString,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'collection',
      type: 'text',
      localized: true,
    },
    {
      name: 'category',
      type: 'text',
      localized: true,
    },
    {
      name: 'subcategory',
      type: 'text',
      localized: true,
    },
    {
      name: 'sells',
      type: 'json',
      required: true,
      jsonSchema: jsonSchemaUnitBoxBoolean,
    },
    {
      name: 'onSale',
      type: 'json',
      required: true,
      jsonSchema: jsonSchemaUnitBoxBoolean,
    },
    {
      name: 'price',
      type: 'json',
      required: true,
      jsonSchema: jsonSchemaUnitBoxNumber,
    },
    {
      name: 'salePrice',
      type: 'json',
      required: true,
      jsonSchema: jsonSchemaUnitBoxNumber,
    },
    {
      name: 'salePercentage',
      type: 'json',
      required: true,
      jsonSchema: jsonSchemaUnitBoxNumber,
    },
    {
      name: 'pvp',
      type: 'json',
      required: true,
      jsonSchema: jsonSchemaUnitBoxNumber,
    },
    {
      name: 'salePvp',
      type: 'json',
      required: true,
      jsonSchema: jsonSchemaUnitBoxNumber,
    },
    {
      name: 'stock',
      type: 'json',
      required: true,
      jsonSchema: jsonSchemaUnitBoxNumber,
    },
    {
      name: 'itemsPerBox',
      type: 'number',
      required: true,
    },
    {
      name: 'taxes',
      type: 'json',
      required: true,
      jsonSchema: jsonSchemaLanguages,
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'imagesUpload',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}

export default Products
