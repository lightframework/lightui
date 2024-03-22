const fs = require("fs")

function generateApi(jsonPath) {
  const json = fs.readFileSync(jsonPath, "utf8")
  const data = JSON.parse(json)

  const ret = []

  Object.entries(data.paths).forEach(([path, apis]) => {
    Object.entries(apis).forEach(([method, api]) => {
      let p = path.replace(/\{([^}]+)\}/g, ":$1")
      if (p.endsWith("/")) {
        p = p.slice(0, -1)
      }
      ret.push({
        id: `${method}::${p}`,
        name: api.summary,
        func: api.operationId,
      })
    })
  })

  return ret
}

function generateAccessType(jsonPath) {
  const json = fs.readFileSync(jsonPath, "utf8")
  const data = JSON.parse(json)

  const funcNames = Object.values(data)
    .flat()
    .map((api) => `'${api.func}'`)
    .join("|")

  fs.writeFileSync(
    "./src/constants/api-func-name.ts",
    `export type ApiFuncName = ${funcNames}`,
  )
}

const apis = [
  ...generateApi("./swagger/sys.json"),
  ...generateApi("./swagger/cmdb.json"),
  ...generateApi("./swagger/ops.json"),
  ...generateApi("./swagger/argus.json"),
]

fs.writeFileSync("./src/constants/apis.json", JSON.stringify(apis, null, 2))

generateAccessType("./src/constants/apis.json")
