const { readdirSync } = require("fs")
const { parse, resolve } = require("path")

/**
 * @typedef {Object} Folder
 * @property {string} name
 * @property {string} type
 * @property {any[]} children
 */
/**
 * @typedef {Object} File
 * @property {string} name
 * @property {string} type
 */

module.exports = {
  get: dir => {
    if (dir.slice(-1) !== "/") dir += "/"

    /**
     * Generate a tree structure for pages
     *
     * @param {string} dir
     * @returns {(Folder | File)[]}
     */
    function walk(dir) {
      const files = readdirSync(dir, { withFileTypes: true })

      let tree = []

      for (const file of files) {
        const res = resolve(dir, file.name)

        if (file.isDirectory()) {
          tree.push({ name: file.name, type: "folder", children: walk(res) })
          // Sort alphabetically
          tree.sort((fa, fb) => {
            if (fa.name < fb.name) return -1
            if (fa.name > fb.name) return 1
            return 0
          })
          // Make folders be the first items
          tree.sort((fa, fb) => {
            if (fa.type === "folder") return -1
            if (fb.type === "folder") return 1
            return 0
          })
        } else {
          tree.push({ name: parse(file.name).name, type: parse(file.name).ext })
        }
      }

      return tree
    }

    const tree = walk(dir)
      // Remove unnecessary files since this is a NextJS web app
      .filter(file => {
        const name = parse(file.name).name
        if (name === "_app" || name === "api" || name === "index") return false
        else return true
      })

    return {
      type: "root",
      name: "PORTFOLIO 2022",
      children: tree,
    }
  },
}
