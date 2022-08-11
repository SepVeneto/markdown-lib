import '../theme/styles/index.css'
import { withConfigProvider } from './composables/config'
import VPApp from './components/VPApp.vue'

export default {
  Layout: withConfigProvider(VPApp)
}