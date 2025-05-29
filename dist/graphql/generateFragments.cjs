const { buildSchema, isObjectType } = require('graphql')
const { promises } = require('fs')
const path = require('path')

const generateGraphQLFragments = async () => {
  const baseDir = process.cwd()

  // Load your schema as SDL string
  const readFilePath = path.resolve(baseDir, 'src/schema.graphql')
  const schemaSDL = await promises.readFile(readFilePath, 'utf8')
  const schema = buildSchema(schemaSDL)

  // Get all types from the schema
  const typeMap = schema.getTypeMap()

  const fragments = []

  for (const typeName in typeMap) {
    // Skip built-in types and introspection types
    if (typeName.startsWith('__') || ['Query', 'Mutation', 'Subscription'].includes(typeName)) {
      continue
    }

    const type = typeMap[typeName]
    if (isObjectType(type)) {
      const fields = Object.keys(type.getFields())
      const fragment = `fragment ${typeName}Fields on ${typeName} {\n  ${fields.join('\n  ')}\n}`
      fragments.push(fragment)
    }
  }

  // Write all fragments to a file
  const writeFilePath = path.resolve(
    baseDir,
    'src/app/(frontend)/[locale]/_graphql/fragments.graphql',
  )
  await promises.writeFile(writeFilePath, fragments.join('\n\n'))
  console.log('Graphql fragments generated!')
}

// Run the function if this file is executed directly
if (require.main === module) {
  generateGraphQLFragments()
}
