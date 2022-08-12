import './styles/index.css'
import { withConfigProvider } from './composables/config'
import VPApp from './components/VPApp.vue'
import VPNotFound from './components/VPNotFound.vue'
import { Theme } from 'vitepress'

const VPTheme: Theme =  {
  Layout: withConfigProvider(VPApp),
  NotFound: VPNotFound
}

export { VPTheme }
