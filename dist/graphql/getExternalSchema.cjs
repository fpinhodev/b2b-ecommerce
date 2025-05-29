require('dotenv').config()
const path = require('path')
const { promises } = require('fs')
const { printSchema } = require('graphql')
const { loadSchema } = require('@graphql-tools/load')
const { UrlLoader } = require('@graphql-tools/url-loader')

const getExternalGraphqlSchema = async () => {
  const baseDir = process.cwd()
  const schema = await loadSchema(`${process.env.GRAPHQL_API_URL}/public/schema.graphql`, {
    loaders: [new UrlLoader()],
  })
  const schemaString = printSchema(schema)
  const writeFilePath = path.resolve(baseDir, 'src/app-schema.graphql')
  await promises.writeFile(writeFilePath, schemaString)
  console.log('External Graphql Schema generated successfully!')
}

if (require.main === module) {
  getExternalGraphqlSchema()
}
