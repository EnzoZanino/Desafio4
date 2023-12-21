import path from 'path'
import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default __dirname;