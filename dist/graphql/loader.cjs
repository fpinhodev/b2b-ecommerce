// import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
// import { loadTypedefs, loadTypedefsSync } from '@graphql-tools/load'

// import path from 'path'
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader')
const { loadDocuments, loadTypedefsSync, loadDocumentsSync } = require('@graphql-tools/load')
const path = require('path')
// const gql = require('graphql-tag')
const { printSchema } = require('graphql')
const { promises } = require('fs')

const mergeGraphqlTypes = async () => {
  // Note: ES module imports are not supported in .cjs files. Use require() instead.
  const baseDir = process.cwd()

  // const schema = await loadSchema('graphql/**/*.graphql', {
  //   // load files and merge them into a single schema object
  //   loaders: [new GraphQLFileLoader()]
  // })

  const schemaLoader = loadDocumentsSync(
    [
      path.join(baseDir, 'src/app/(frontend)/[locale]/_graphql/queries.graphql'),
      // `${baseDir}/src/schema.graphql`,
      // `${baseDir}/src/app/(frontend)/[locale]/_graphql/**/*.graphql`,
    ],
    {
      loaders: [new GraphQLFileLoader()],
    },
  )
  console.log(1, schemaLoader)

  // await promises.writeFile(`${baseDir}/src/mergedSchemas.graphql`, printSchema(schemaLoader))
  // console.log('Graphql fragments generated!')
}
// Run the function if this file is executed directly
if (require.main === module) {
  mergeGraphqlTypes()
  // const sources = schemaLoader()
  // console.log(1, sources)
  // const typeDefs1 = sources.map((source) => source.document.loc?.source.body).join('\n')
  // console.log(2, typeDefs1)
  // const typeDefs2 = sources.map((source) => source.schema?.getType('query')).join('\n')
  // // console.log(3, typeDefs2)
  // const Documents = gql`
  //   ${typeDefs1}
  // `
  // console.log(4, Documents)
}

// Use with graphql-tag

// export default Documents;
