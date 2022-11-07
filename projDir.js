const { readdirSync } = require("fs")
const { parse, resolve, basename } = require("path")

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
    // Psuedo markdown files since I am not implementing MDX
    const mds = ["about", "projects", "tech"]

    /**
     * Generate a tree structure for pages
     *
     * @param {string} dir
     * @returns {(Folder | File)[]}
     */
    function walk(dir) {
      const files = readdirSync(dir, { withFileTypes: true })

      let tree = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const res = resolve(dir, file.name)

        if (file.isDirectory()) {
          tree.push({
            name: i === 0 ? "PORTFOLIO-2022" : file.name,
            type: "folder",
            children: walk(res),
          })
          // Sort everything alphabetically
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
          // Sort folders alphabetically
          tree.sort((fa, fb) => {
            if (fa.type === "folder" && fb.type === "folder") {
              if (fa.name < fb.name) return -1
              if (fa.name > fb.name) return 1
              return 0
            }
          })
        } else {
          const fileName = parse(file.name).name

          tree.push({
            name: fileName,
            type:
              // "tips" folder contains psuedo markdown files
              mds.includes(fileName) || basename(dir) === "tips"
                ? ".md"
                : parse(file.name).ext,
          })
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
      name: basename(__dirname).toUpperCase(),
      children: tree,
    }
  },
}
